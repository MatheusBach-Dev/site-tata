import Image from "next/image";
import type { Sabor } from "@/data/sabores";
import { IconIceCream } from "./icons";
import styles from "./FotoSabor.module.css";

// Mostra a foto do sabor. Se ainda não tiver foto em data/sabores.ts,
// mostra um desenho com a cor do sabor no lugar.
export function FotoSabor({
  sabor,
  sizes,
  className,
  priority = false,
}: {
  sabor: Sabor;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={[styles.foto, sabor.esgotado ? styles.esgotado : "", className ?? ""].join(" ")}
      style={{ "--cor-sabor": sabor.cor } as React.CSSProperties}
    >
      {sabor.foto ? (
        <Image src={sabor.foto} alt={sabor.nome} fill sizes={sizes} priority={priority} />
      ) : (
        <span className={styles.desenho} role="img" aria-label={sabor.nome}>
          <IconIceCream />
        </span>
      )}
    </div>
  );
}
