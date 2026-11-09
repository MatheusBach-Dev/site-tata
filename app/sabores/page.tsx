import type { Metadata } from "next";
import { CardapioFiltrado } from "@/components/sabores/CardapioFiltrado";
import { FaixaDelivery } from "@/components/sabores/FaixaDelivery";
import { FaixaDuvida } from "@/components/sabores/FaixaDuvida";
import { linhas } from "@/data/linhas";
import { sabores } from "@/data/sabores";
import { todosComFoto } from "@/lib/fotos";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Sabores",
  description:
    "Cardápio completo da Gostosuras da Tatá: chup-chup gourmet, com casquinha de chocolate, linha premium e cremosos. Peça pelo WhatsApp.",
};

// Página 2 do Figma: Sabores
export default function Sabores() {
  const todos = todosComFoto(sabores);
  const grupos = linhas.map((linha) => ({
    linha,
    sabores: todos.filter((s) => s.linha === linha.id),
  }));

  return (
    <>
      <div className={styles.fundo}>
        <div className="container">
          <header className={styles.topo}>
            <p className={styles.chamada}>nosso cardápio</p>
            <h1 className={styles.titulo}>Escolha seu sabor favorito</h1>
            <p className={styles.texto}>
              Toque em “Pedir este sabor” e a gente já te atende no WhatsApp com o sabor escolhido.
            </p>
          </header>

          <CardapioFiltrado grupos={grupos} />
          <FaixaDuvida />
        </div>
      </div>
      <FaixaDelivery />
    </>
  );
}
