import type { Metadata } from "next";
import { ChamadaFinal } from "@/components/home/ChamadaFinal";
import { BuscadorPontos } from "@/components/onde-encontrar/BuscadorPontos";
import { CardLoja } from "@/components/onde-encontrar/CardLoja";
import { CardRevenda } from "@/components/onde-encontrar/CardRevenda";
import { pontos } from "@/data/pontos";
import { tiposPresentes } from "@/lib/mapa";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Onde Encontrar",
  description:
    "Retire na loja da Gostosuras da Tatá em Contagem/MG ou encontre o freezer da Tatá em restaurantes, farmácias e lanchonetes perto de você.",
};

// Página 4 do Figma: Onde Encontrar
export default function OndeEncontrar() {
  return (
    <>
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

          <div className={styles.cards}>
            <CardLoja />
            <CardRevenda tipos={tiposPresentes(pontos)} temPontos={pontos.length > 0} />
          </div>

          {pontos.length > 0 && (
            <section id="pontos" className={styles.pontos} aria-labelledby="titulo-pontos">
              <h2 id="titulo-pontos" className={styles.tituloPontos}>
                Encontre um ponto de revenda
              </h2>
              <p className={styles.textoPontos}>
                Escolha sua cidade, busque pelo bairro ou use a sua localização.
              </p>
              <BuscadorPontos pontos={pontos} />
            </section>
          )}
        </div>
      </div>
      <ChamadaFinal />
    </>
  );
}
