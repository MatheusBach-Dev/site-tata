import type { Metadata } from "next";
import Image from "next/image";
import { IconHeart, IconInstagram } from "@/components/icons";
import { loja } from "@/data/loja";
import { prepararCaminho } from "@/lib/fotos";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Nossa História",
  description:
    "Conheça a Tatá: de doces na escola à dona do próprio negócio. 15 anos adoçando vidas em Contagem/MG.",
};

// FOTO DA TATÁ: salve a foto e escreva o caminho aqui. Sem foto, aparece um coração no lugar.
const fotoDaTata = "public/nossa-historia/tata.jpg";

// Fotos da faixa do Instagram (6 fotos). Troque à vontade, é só o caminho.
const fotosInstagram = [
  "public/instagram/1.jpg",
  "public/instagram/2.jpg",
  "public/instagram/3.jpg",
  "public/instagram/4.jpg",
  "public/instagram/5.jpg",
  "public/instagram/6.jpg",
];

// Página 3 do Figma: Nossa História
export default function NossaHistoria() {
  const foto = prepararCaminho(fotoDaTata, "Tatá");
  const instagram = fotosInstagram
    .map((c) => prepararCaminho(c, "Instagram"))
    .filter((c): c is string => Boolean(c));

  return (
    <>
      <section className={styles.historia}>
        <div className={`container ${styles.grade}`}>
          <div className={styles.moldura}>
            <span className={styles.tracejado} aria-hidden="true" />
            <div className={styles.foto}>
              {foto ? (
                <Image
                  src={foto}
                  alt="Tatá, dona da Gostosuras da Tatá"
                  fill
                  sizes="(max-width: 860px) 80vw, 330px"
                  priority
                />
              ) : (
                <span className={styles.semFoto} role="img" aria-label="Tatá">
                  <IconHeart size={64} />
                  <span>Tatá</span>
                </span>
              )}
            </div>
            <span className={styles.anos}>
              <strong>15</strong>
              anos de sonhos
            </span>
          </div>

          <div className={styles.texto}>
            <p className={styles.chamada}>conheça a Tatá</p>
            <h1 className={styles.titulo}>De doces na escola à dona do próprio negócio</h1>
            <p>
              A Tatá começou cedo: ainda menina, vendia doces na escola. De menina sonhadora virou
              mulher empreendedora, e hoje a Gostosuras da Tatá leva chup chup gourmet para toda
              Contagem e região.
            </p>
            <p className={styles.destaque}>
              São 15 anos de sonhos e um propósito que a escolheu há muito tempo: adoçar vidas.
            </p>
            <blockquote className={styles.citacao}>
              <p>
                “Mais que vender doces, eu espalho amor, felicidade e muitas emoções em um saquinho
                só!”
              </p>
              <cite>— Tatá</cite>
            </blockquote>
          </div>
        </div>
      </section>

      <section className={styles.insta}>
        <div className="container">
          <div className={styles.instaTopo}>
            <div>
              <p className={styles.chamada}>siga a gente</p>
              <h2 className={styles.instaTitulo}>{loja.instagram}</h2>
              <p className={styles.instaTexto}>
                11,5 mil pessoas já acompanham as novidades, os lançamentos e as promoções.
              </p>
            </div>
            <a
              href={loja.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.seguir}
            >
              <IconInstagram size={20} />
              Seguir no Instagram
            </a>
          </div>

          <div className={styles.instaFotos}>
            {instagram.map((src) => (
              <a
                key={src}
                href={loja.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.instaFoto}
              >
                <Image
                  src={src}
                  alt="Post do Instagram da Gostosuras da Tatá"
                  fill
                  sizes="(max-width: 860px) 33vw, 160px"
                />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
