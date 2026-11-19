"use client";

// Buscador de pontos de revenda: busca, cidade, tipos, "Perto de mim", lista e mapa.
// Feito para continuar simples com 10, 50 ou 200 pontos.

import { useId, useMemo, useState } from "react";
import { tiposPonto, type Ponto, type TipoPonto } from "@/data/pontos";
import {
  cidadesPorEstado,
  filtrarPontos,
  ordenarPorDistancia,
  tiposPresentes,
  type Coordenada,
  type Filtros,
} from "@/lib/mapa";
import { linkWhatsApp, mensagens } from "@/lib/whatsapp";
import { Botao } from "../Botao";
import { IconList, IconLocate, IconMap, IconSearch, IconWhatsApp } from "../icons";
import { IconeTipo } from "./IconeTipo";
import { ItemPonto } from "./ItemPonto";
import { MapaDinamico, type PinoMapa } from "./MapaDinamico";
import styles from "./BuscadorPontos.module.css";

const POR_PAGINA = 12;
const SEM_FILTROS: Filtros = { busca: "", cidade: "", tipos: [] };

type Localizacao = { estado: "inativo" | "buscando" | "erro" } | { estado: "ok"; coords: Coordenada };

export function BuscadorPontos({ pontos }: { pontos: Ponto[] }) {
  const [filtros, setFiltros] = useState<Filtros>(SEM_FILTROS);
  const [limite, setLimite] = useState(POR_PAGINA);
  const [selecionado, setSelecionado] = useState<string | null>(null);
  const [aba, setAba] = useState<"lista" | "mapa">("lista");
  const [localizacao, setLocalizacao] = useState<Localizacao>({ estado: "inativo" });
  const idCidade = useId();

  const grupos = useMemo(() => cidadesPorEstado(pontos), [pontos]);
  const tipos = useMemo(() => tiposPresentes(pontos), [pontos]);
  const filtrados = useMemo(() => filtrarPontos(pontos, filtros), [pontos, filtros]);
  const pinos = useMemo<PinoMapa[]>(
    () =>
      filtrados.map((p) => ({
        id: p.id,
        lat: p.lat,
        lng: p.lng,
        titulo: p.nome,
        subtitulo: `${p.endereco} · ${p.bairro}, ${p.cidade}/${p.estado}`,
      })),
    [filtrados],
  );
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
    if (selecionado && !filtrarPontos(pontos, novos).some((p) => p.id === selecionado)) setSelecionado(null);
  }

  function alternarTipo(tipo: TipoPonto) {
    const ativos = filtros.tipos.includes(tipo) ? filtros.tipos.filter((t) => t !== tipo) : [...filtros.tipos, tipo];
    mudarFiltros({ tipos: ativos });
  }

  function pertoDeMim() {
    if (localizacao.estado === "ok") {
      setLocalizacao({ estado: "inativo" });
      return;
    }
    if (!("geolocation" in navigator)) {
      setLocalizacao({ estado: "erro" });
      return;
    }
    setLocalizacao({ estado: "buscando" });
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocalizacao({ estado: "ok", coords: { lat: pos.coords.latitude, lng: pos.coords.longitude } });
        setLimite(POR_PAGINA);
      },
      () => setLocalizacao({ estado: "erro" }),
      { timeout: 10000, maximumAge: 5 * 60 * 1000 },
    );
  }

  function verNoMapa(id: string) {
    setSelecionado(id);
    if (window.matchMedia("(max-width: 959px)").matches) setAba("mapa");
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
          disabled={localizacao.estado === "buscando"}
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
      <p className={styles.erroLocalizacao} aria-live="polite">
        {localizacao.estado === "erro" && "Sem a localização, escolha sua cidade ou busque pelo bairro."}
      </p>

      <div className={styles.abas} role="tablist" aria-label="Ver os pontos em">
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
            tipo="revenda"
            rotulo="Mapa com os pontos de revenda"
            pinos={pinos}
            selecionado={selecionado}
            onSelecionar={selecionarDoMapa}
            voce={localizacao.estado === "ok" ? localizacao.coords : null}
          />
        </div>
      </div>
    </div>
  );
}
