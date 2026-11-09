import Link from "next/link";
import { buscarLinha } from "@/data/linhas";
import type { SaborComFoto } from "@/lib/fotos";
import { formatarPreco } from "@/lib/formato";
import { FotoSabor } from "../FotoSabor";
import { IconArrowRight } from "../icons";
import styles from "./CardMini.module.css";

// Card pequeno da seção "Outros sabores": o card inteiro leva para a página do sabor.
export function CardMini({ sabor }: { sabor: SaborComFoto }) {
  const linha = buscarLinha(sabor.linha);
  return (
    <Link href={`/sabores/${sabor.slug}`} className={styles.card}>
      <FotoSabor sabor={sabor} sizes="(max-width: 760px) 50vw, 282px" className={styles.foto} />
      <span className={styles.corpo}>
        <strong className={styles.nome}>{sabor.nome}</strong>
        <span className={styles.linha}>
          <span className={styles.preco}>{formatarPreco(linha.preco)}</span>
          <span className={styles.seta} aria-hidden="true">
            <IconArrowRight size={14} />
          </span>
        </span>
      </span>
    </Link>
  );
}
