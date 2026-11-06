import Image from "next/image";
import { buscarLinha } from "@/data/linhas";
import type { SaborComFoto } from "@/lib/fotos";
import { comBase } from "@/lib/caminho";
import { IconIceCream } from "./icons";
import styles from "./FotoSabor.module.css";

// Mostra a foto do sabor. Sem foto em public/sabores/, mostra um desenho
// com a cor da linha no lugar. Sabor esgotado fica apagado e sem cor.
export function FotoSabor({
  sabor,
  sizes,
  className,
  priority = false,
}: {
  sabor: SaborComFoto;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={[styles.foto, sabor.esgotado ? styles.esgotado : "", className ?? ""].join(" ")}
      style={{ "--cor-sabor": buscarLinha(sabor.linha).cor } as React.CSSProperties}
    >
      {sabor.foto ? (
        <Image src={comBase(sabor.foto)} alt={sabor.nome} fill sizes={sizes} priority={priority} />
      ) : (
        <span className={styles.desenho} role="img" aria-label={sabor.nome}>
          <IconIceCream />
        </span>
      )}
    </div>
  );
}
