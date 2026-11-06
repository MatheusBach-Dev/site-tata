import { loja, enderecoCompleto } from "@/data/loja";
import { IconClock, IconInstagram, IconMapPin } from "./icons";
import styles from "./FaixaInfo.module.css";

export function FaixaInfo() {
  return (
    <div className={styles.faixa}>
      <div className={`container ${styles.itens}`}>
        <span className={styles.item}>
          <IconClock size={16} />
          {loja.horarios.curto}
        </span>
        <span className={`${styles.item} ${styles.endereco}`}>
          <IconMapPin size={16} />
          {enderecoCompleto}
        </span>
        <a className={styles.item} href={loja.instagramUrl} target="_blank" rel="noopener noreferrer">
          <IconInstagram size={16} />
          {loja.instagram}
        </a>
      </div>
    </div>
  );
}
