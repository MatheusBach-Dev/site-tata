import type { Metadata } from "next";
import { BuscadorPontos } from "@/components/onde-encontrar/BuscadorPontos";
import { pontos } from "@/data/pontos";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Onde Encontrar",
  description:
    "Retire na loja da Gostosuras da Tatá em Contagem/MG ou encontre o freezer da Tatá em restaurantes, farmácias e lanchonetes perto de você.",
};

// Página 4 do Figma: Onde Encontrar — a loja da Tatá em destaque + buscador de pontos de revenda
export default function OndeEncontrar() {
  return (
    <div className={styles.fundo}>
      <div className="container">
        <header className={styles.topo}>
          <p className={styles.chamada}>onde encontrar</p>
          <h1 className={styles.titulo}>Pertinho de você</h1>
          <p className={styles.texto}>
            Retire na nossa loja em Contagem ou procure o freezer da Tatá em restaurantes, farmácias e
            lanchonetes da região.
          </p>
        </header>

        <section id="pontos" className={styles.pontos} aria-label="Loja da Tatá e pontos de revenda">
          <BuscadorPontos pontos={pontos} />
        </section>
      </div>
    </div>
  );
}
