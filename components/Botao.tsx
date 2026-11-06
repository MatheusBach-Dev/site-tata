import Link from "next/link";
import styles from "./Botao.module.css";

export type BotaoVariante = "primario" | "secundario" | "contorno" | "branco" | "zap";
export type BotaoTamanho = "pequeno" | "normal" | "grande";

type Comum = {
  variante?: BotaoVariante;
  tamanho?: BotaoTamanho;
  cheio?: boolean;
  className?: string;
  children: React.ReactNode;
};

type BotaoLink = Comum & { href: string; externo?: boolean; onClick?: never };
type BotaoAcao = Comum & { onClick: () => void; href?: never; externo?: never };

export function classesBotao({
  variante = "primario",
  tamanho = "normal",
  cheio = false,
  className,
}: Omit<Comum, "children">) {
  return [
    styles.botao,
    styles[variante],
    tamanho !== "normal" ? styles[tamanho] : "",
    cheio ? styles.cheio : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function Botao(props: BotaoLink | BotaoAcao) {
  const classes = classesBotao(props);

  if (props.href !== undefined) {
    if (props.externo) {
      return (
        <a href={props.href} className={classes} target="_blank" rel="noopener noreferrer">
          {props.children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {props.children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={props.onClick} className={classes}>
      {props.children}
    </button>
  );
}
