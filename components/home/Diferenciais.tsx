import { IconHeart, IconIceCream, IconMapPin, IconSparkles } from "../icons";
import styles from "./Diferenciais.module.css";

const itens = [
  { Icone: IconHeart, titulo: "Muito recheio", texto: "Capricho em cada saquinho" },
  { Icone: IconSparkles, titulo: "Receitas da Tatá", texto: "Feito artesanalmente" },
  { Icone: IconIceCream, titulo: "Vários sabores", texto: "Do clássico ao gourmet" },
  { Icone: IconMapPin, titulo: "Pertinho de você", texto: "Loja + pontos de revenda" },
];

export function Diferenciais() {
  return (
    <section className={styles.faixa} aria-label="Diferenciais">
      <ul className={`container ${styles.lista}`}>
        {itens.map(({ Icone, titulo, texto }) => (
          <li key={titulo} className={styles.item}>
            <span className={styles.icone}>
              <Icone size={24} />
            </span>
            <span>
              <strong>{titulo}</strong>
              <span>{texto}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
