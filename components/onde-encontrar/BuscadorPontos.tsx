"use client";

// Buscador de pontos de revenda: busca, cidade, tipos, "Perto de mim", lista e mapa.
// Feito para continuar simples com 10, 50 ou 200 pontos.

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { enderecoCompleto, loja } from "@/data/loja";
import { tiposPonto, type Ponto, type TipoPonto } from "@/data/pontos";
import {
  cidadesPorEstado,
  distanciaKm,
  filtrarPontos,
  ordenarPorDistancia,
  tiposPresentes,
  type Coordenada,
  type Filtros,
} from "@/lib/mapa";
import { linkWhatsApp, mensagens } from "@/lib/whatsapp";
import { Botao } from "../Botao";
import { IconList, IconLocate, IconMap, IconSearch, IconWhatsApp } from "../icons";
import { CardLojaDestaque } from "./CardLojaDestaque";
import { IconeTipo } from "./IconeTipo";
import { ItemPonto } from "./ItemPonto";
import { MapaDinamico, type FocoMapa, type PinoMapa } from "./MapaDinamico";
import styles from "./BuscadorPontos.module.css";

const POR_PAGINA = 12;
/** Tempo máximo esperando a localização (inclui a pessoa não responder o pedido do navegador). */
const ESPERA_LOCALIZACAO_MS = 10000;

/** A loja da Tatá no mapa: pino com a logo, sempre visível e em destaque. */
const PINO_LOJA: PinoMapa = {
  id: "loja",
  lat: loja.coordenadas.lat,
  lng: loja.coordenadas.lng,
  posicao: [loja.coordenadas.lat, loja.coordenadas.lng],
  titulo: loja.nome,
  subtitulo: enderecoCompleto,
};
const SEM_FILTROS: Filtros = { busca: "", cidade: "", tipos: [] };

type Localizacao = { estado: "inativo" | "buscando" | "erro" } | { estado: "ok"; coords: Coordenada };

export function BuscadorPontos({ pontos }: { pontos: Ponto[] }) {
  const [filtros, setFiltros] = useState<Filtros>(SEM_FILTROS);
  const [limite, setLimite] = useState(POR_PAGINA);
  const [selecionado, setSelecionado] = useState<string | null>(null);
  const [foco, setFoco] = useState<FocoMapa | null>(null);
  const [aba, setAba] = useState<"lista" | "mapa">("lista");
  const [localizacao, setLocalizacao] = useState<Localizacao>({ estado: "inativo" });
  const idCidade = useId();
  const abasRef = useRef<HTMLDivElement>(null);
  const esperaLocalizacao = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => clearTimeout(esperaLocalizacao.current ?? undefined), []);

  const grupos = useMemo(() => cidadesPorEstado(pontos), [pontos]);
  const tipos = useMemo(() => tiposPresentes(pontos), [pontos]);
  const filtrados = useMemo(() => filtrarPontos(pontos, filtros), [pontos, filtros]);
  // Um pino por ponto, criado uma vez só: o mapa não precisa redesenhar os pinos a cada clique.
  const pinoPorId = useMemo(
    () =>
      new Map<string, PinoMapa>(
        pontos.map((p) => [
          p.id,
          {
            id: p.id,
            lat: p.lat,
            lng: p.lng,
            posicao: [p.lat, p.lng],
            titulo: p.nome,
            subtitulo: `${p.endereco} · ${p.bairro}, ${p.cidade}/${p.estado}`,
          },
        ]),
      ),
    [pontos],
  );
  const pinos = useMemo(() => filtrados.map((p) => pinoPorId.get(p.id)!), [filtrados, pinoPorId]);
  const resultado = useMemo(
    () =>
      localizacao.estado === "ok"
        ? ordenarPorDistancia(filtrados, localizacao.coords)
        : filtrados.map((ponto) => ({ ponto, km: undefined as number | undefined })),
    [filtrados, localizacao],
  );

  const temFiltro = filtros.busca.trim() !== "" || filtros.cidade !== "" || filtros.tipos.length > 0;

  /** Muda os filtros: a lista volta para 12 e a seleção some se o ponto saiu do resultado. */
  function mudarFiltros(parcial: Partial<Filtros>) {
    const novos = { ...filtros, ...parcial };
    setFiltros(novos);
    setLimite(POR_PAGINA);
    // A loja não é afetada pelos filtros, então a seleção dela continua.
    if (selecionado && selecionado !== PINO_LOJA.id && !filtrarPontos(pontos, novos).some((p) => p.id === selecionado)) {
      setSelecionado(null);
    }
  }

  function alternarTipo(tipo: TipoPonto) {
    const ativos = filtros.tipos.includes(tipo) ? filtros.tipos.filter((t) => t !== tipo) : [...filtros.tipos, tipo];
    mudarFiltros({ tipos: ativos });
  }

  function pertoDeMim() {
    if (localizacao.estado === "buscando") return; // já está procurando (o botão continua focável)
    if (localizacao.estado === "ok") {
      setLocalizacao({ estado: "inativo" });
      return;
    }
    if (!("geolocation" in navigator)) {
      setLocalizacao({ estado: "erro" });
      return;
    }
    setLocalizacao({ estado: "buscando" });
    // O "timeout" do navegador não conta o tempo do pedido de permissão sem resposta,
    // então a gente mesmo desiste depois de 10 segundos.
    const terminar = (proxima: Localizacao) => {
      clearTimeout(esperaLocalizacao.current ?? undefined);
      setLocalizacao((atual) => (atual.estado === "buscando" ? proxima : atual));
    };
    esperaLocalizacao.current = setTimeout(() => terminar({ estado: "erro" }), ESPERA_LOCALIZACAO_MS);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        terminar({ estado: "ok", coords: { lat: pos.coords.latitude, lng: pos.coords.longitude } });
        setLimite(POR_PAGINA);
      },
      () => terminar({ estado: "erro" }),
      { timeout: ESPERA_LOCALIZACAO_MS, maximumAge: 5 * 60 * 1000 },
    );
  }

  /** "Ver no mapa": leva o mapa até o ponto (mesmo se for o mesmo de antes). No celular, abre a aba Mapa. */
  function verNoMapa(id: string) {
    setSelecionado(id);
    setFoco((anterior) => ({ id, vez: (anterior?.vez ?? 0) + 1 }));
    if (window.matchMedia("(max-width: 959px)").matches) {
      setAba("mapa");
      requestAnimationFrame(() => abasRef.current?.scrollIntoView({ block: "start" }));
    }
  }

  /** Clique num pino: destaca o item e garante que ele está visível na lista. */
  function selecionarDoMapa(id: string) {
    setSelecionado(id);
    const posicao = resultado.findIndex((r) => r.ponto.id === id);
    if (posicao >= limite) setLimite(Math.ceil((posicao + 1) / POR_PAGINA) * POR_PAGINA);
    requestAnimationFrame(() =>
      document.getElementById(`ponto-${id}`)?.scrollIntoView({ block: "nearest", behavior: "smooth" }),
    );
  }

  const nomeCidade = grupos.flatMap((g) => g.cidades).find((c) => c.chave === filtros.cidade)?.nome;
  const n = filtrados.length;
  const textoResultado = nomeCidade
    ? `${n} ${n === 1 ? "ponto" : "pontos"} em ${nomeCidade}`
    : `${n} ${n === 1 ? "ponto de revenda" : "pontos de revenda"}`;

  return (
    <div className={styles.buscador}>
      <div className={styles.controles}>
        <label className={styles.busca}>
          <span className="visually-hidden">Buscar por nome, bairro ou cidade</span>
          <IconSearch size={18} />
          <input
            type="search"
            value={filtros.busca}
            onChange={(e) => mudarFiltros({ busca: e.target.value })}
            placeholder="Buscar por nome, bairro ou cidade"
          />
        </label>

        <div className={styles.cidade}>
          <label htmlFor={idCidade} className="visually-hidden">
            Cidade
          </label>
          <select id={idCidade} value={filtros.cidade} onChange={(e) => mudarFiltros({ cidade: e.target.value })}>
            <option value="">Todas as cidades</option>
            {grupos.map((g) => (
              <optgroup key={g.estado} label={g.estado}>
                {g.cidades.map((c) => (
                  <option key={c.chave} value={c.chave}>
                    {`${c.nome} (${c.quantidade})`}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <button
          type="button"
          className={`${styles.pertoDeMim} ${localizacao.estado === "ok" ? styles.pertoDeMimAtivo : ""}`}
          onClick={pertoDeMim}
          aria-pressed={localizacao.estado === "ok"}
          aria-disabled={localizacao.estado === "buscando"}
        >
          <IconLocate size={18} />
          {localizacao.estado === "buscando" ? "Procurando…" : "Perto de mim"}
        </button>
      </div>

      {tipos.length > 1 && (
        <div className={styles.tipos} role="group" aria-label="Filtrar por tipo de comércio">
          {tipos.map((t) => (
            <button
              key={t}
              type="button"
              className={`${styles.tipo} ${filtros.tipos.includes(t) ? styles.tipoAtivo : ""}`}
              aria-pressed={filtros.tipos.includes(t)}
              onClick={() => alternarTipo(t)}
            >
              <IconeTipo tipo={t} size={16} />
              {tiposPonto[t].plural}
            </button>
          ))}
        </div>
      )}

      <div className={styles.resumo}>
        <p aria-live="polite">
          {textoResultado}
          {localizacao.estado === "ok" && n > 0 && " · do mais perto ao mais longe"}
        </p>
        {temFiltro && (
          <button type="button" className={styles.limpar} onClick={() => mudarFiltros(SEM_FILTROS)}>
            Limpar filtros
          </button>
        )}
      </div>
      {/* A região de aviso fica sempre na página, para o leitor de tela anunciar quando a mensagem aparecer. */}
      <div aria-live="polite">
        {localizacao.estado === "erro" && (
          <p className={styles.erroLocalizacao}>Sem a localização, escolha sua cidade ou busque pelo bairro.</p>
        )}
      </div>

      <div ref={abasRef} className={styles.abas} role="tablist" aria-label="Ver os pontos em">
        <button type="button" role="tab" aria-selected={aba === "lista"} onClick={() => setAba("lista")}>
          <IconList size={18} />
          Lista
        </button>
        <button type="button" role="tab" aria-selected={aba === "mapa"} onClick={() => setAba("mapa")}>
          <IconMap size={18} />
          Mapa
        </button>
      </div>

      <div className={styles.resultado} data-aba={aba}>
        <div className={styles.lista}>
          <CardLojaDestaque
            km={localizacao.estado === "ok" ? distanciaKm(localizacao.coords, loja.coordenadas) : undefined}
            selecionado={selecionado === PINO_LOJA.id}
            onVerNoMapa={() => verNoMapa(PINO_LOJA.id)}
          />
          {n === 0 ? (
            <div className={styles.vazio}>
              <p>Não achamos um ponto com esses filtros.</p>
              <button type="button" className={styles.limpar} onClick={() => mudarFiltros(SEM_FILTROS)}>
                Limpar filtros
              </button>
              <Botao href={linkWhatsApp(mensagens.pontoMaisPerto)} externo variante="zap">
                <IconWhatsApp size={20} />
                Perguntar para a Tatá
              </Botao>
            </div>
          ) : (
            <>
              <ul className={styles.itens}>
                {resultado.slice(0, limite).map(({ ponto, km }) => (
                  <ItemPonto
                    key={ponto.id}
                    ponto={ponto}
                    km={km}
                    selecionado={ponto.id === selecionado}
                    onVerNoMapa={() => verNoMapa(ponto.id)}
                  />
                ))}
              </ul>
              {resultado.length > limite && (
                <button type="button" className={styles.verMais} onClick={() => setLimite(limite + POR_PAGINA)}>
                  Ver mais ({resultado.length - limite})
                </button>
              )}
            </>
          )}
        </div>

        <div className={styles.mapa}>
          <MapaDinamico
            rotulo="Mapa com a loja da Tatá e os pontos de revenda"
            pinos={pinos}
            loja={PINO_LOJA}
            foco={foco}
            onSelecionar={selecionarDoMapa}
            voce={localizacao.estado === "ok" ? localizacao.coords : null}
          />
        </div>
      </div>
    </div>
  );
}
