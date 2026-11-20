import { enderecoCompleto, loja } from "@/data/loja";
import { formatarDistancia, linkComoChegar } from "@/lib/mapa";
import { linkWhatsApp, mensagens } from "@/lib/whatsapp";
import { Botao } from "../Botao";
import { Logo } from "../Logo";
import { IconClock, IconMapPin, IconWhatsApp } from "../icons";
import styles from "./CardLojaDestaque.module.css";

// A loja da Tatá em destaque, sempre no topo da lista (não some com os filtros).
export function CardLojaDestaque({
  km,
  selecionado,
  onVerNoMapa,
}: {
  km?: number;
  selecionado: boolean;
  onVerNoMapa: () => void;
}) {
  return (
    <article id="ponto-loja" data-loja className={`${styles.card} ${selecionado ? styles.selecionado : ""}`}>
      <div className={styles.topo}>
        <Logo size={60} />
        <div>
          <span className={styles.selo}>Nossa loja</span>
          <h3 className={styles.nome}>{loja.nome}</h3>
        </div>
        {km !== undefined && <span className={styles.distancia}>{formatarDistancia(km)}</span>}
      </div>

      <ul className={styles.infos}>
        <li>
          <IconMapPin size={16} />
          {enderecoCompleto}
        </li>
        <li>
          <IconClock size={16} />
          {loja.horarios.retirada}
        </li>
      </ul>

      <div className={styles.botoes}>
        <button type="button" className={styles.verNoMapa} onClick={onVerNoMapa}>
          Ver no mapa
        </button>
        <Botao href={linkComoChegar(loja.coordenadas)} externo variante="branco" tamanho="pequeno">
          Como chegar
        </Botao>
        <Botao href={linkWhatsApp(mensagens.pedido)} externo variante="zap" tamanho="pequeno">
          <IconWhatsApp size={16} />
          WhatsApp
        </Botao>
      </div>
    </article>
  );
}
