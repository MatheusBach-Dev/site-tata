import Image from "next/image";
import { tiposPonto, type TipoPonto } from "@/data/pontos";
import { prepararCaminho } from "@/lib/fotos";
import { linkWhatsApp, mensagens } from "@/lib/whatsapp";
import { Botao } from "../Botao";
import { IconSnowflake, IconWhatsApp } from "../icons";
import { IconeTipo } from "./IconeTipo";
import styles from "./CardRevenda.module.css";

// FOTO DO FREEZER: salve a foto com este nome. Sem foto, aparece um desenho no lugar.
const fotoDoFreezer = "public/onde-encontrar/freezer.jpg";

// Card "Pontos de revenda": foto do freezer, tipos de comércio e o botão que leva ao buscador.
export function CardRevenda({ tipos, temPontos }: { tipos: TipoPonto[]; temPontos: boolean }) {
  const foto = prepararCaminho(fotoDoFreezer, "Freezer da Tatá");

  return (
    <article className={styles.card}>
      <div className={styles.foto}>
        {foto ? (
          <Image src={foto} alt="Freezer da Tatá com os chup-chups" fill sizes="(max-width: 860px) 100vw, 590px" />
        ) : (
          <span className={styles.semFoto} role="img" aria-label="Freezer da Tatá">
            <IconSnowflake size={56} />
            <span>freezer da Tatá</span>
          </span>
        )}
        <span className={styles.selo}>
          <IconSnowflake size={14} />
          Procure o freezer da Tatá
        </span>
      </div>

      <div className={styles.corpo}>
        <h2 className={styles.titulo}>Pontos de revenda</h2>
        <p className={styles.texto}>
          Os chup-chups da Tatá também estão em freezers espalhados pela cidade. Procure em:
        </p>

        {tipos.length > 0 && (
          <ul className={styles.tipos}>
            {tipos.map((t) => (
              <li key={t}>
                <IconeTipo tipo={t} size={16} />
                {tiposPonto[t].plural}
              </li>
            ))}
          </ul>
        )}

        <div className={styles.botao}>
          {temPontos ? (
            <Botao href="#pontos" variante="zap">
              <IconWhatsApp size={20} />
              Qual o ponto mais perto de mim?
            </Botao>
          ) : (
            <Botao href={linkWhatsApp(mensagens.pontoMaisPerto)} externo variante="zap">
              <IconWhatsApp size={20} />
              Qual o ponto mais perto de mim?
            </Botao>
          )}
        </div>
      </div>
    </article>
  );
}
