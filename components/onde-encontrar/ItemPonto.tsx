import { tiposPonto, type Ponto } from "@/data/pontos";
import { formatarDistancia, linkComoChegar } from "@/lib/mapa";
import { Botao } from "../Botao";
import { IconeTipo } from "./IconeTipo";
import styles from "./ItemPonto.module.css";

// Um ponto de revenda na lista do buscador.
export function ItemPonto({
  ponto,
  km,
  selecionado,
  onVerNoMapa,
}: {
  ponto: Ponto;
  km?: number;
  selecionado: boolean;
  onVerNoMapa: () => void;
}) {
  return (
    <li id={`ponto-${ponto.id}`} data-ponto={ponto.id} className={`${styles.item} ${selecionado ? styles.selecionado : ""}`}>
      <div className={styles.topo}>
        <h3 className={styles.nome}>{ponto.nome}</h3>
        {km !== undefined && <span className={styles.distancia}>{formatarDistancia(km)}</span>}
      </div>
      <span className={styles.tipo}>
        <IconeTipo tipo={ponto.tipo} size={14} />
        {tiposPonto[ponto.tipo].rotulo}
      </span>
      <p className={styles.endereco}>
        {ponto.endereco}
        <br />
        {ponto.bairro} · {ponto.cidade}/{ponto.estado}
      </p>
      <div className={styles.botoes}>
        <Botao onClick={onVerNoMapa} variante="contorno" tamanho="pequeno">
          Ver no mapa
        </Botao>
        <Botao href={linkComoChegar(ponto)} externo variante="primario" tamanho="pequeno">
          Como chegar
        </Botao>
      </div>
    </li>
  );
}
