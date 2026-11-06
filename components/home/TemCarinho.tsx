import { buscarSabor } from "@/data/sabores";
import { FotoSabor } from "../FotoSabor";
import { mensagens } from "@/lib/whatsapp";
import { BotaoPedido } from "../Pedido";
import { IconCheck, IconHeart, IconWhatsApp } from "../icons";
import styles from "./TemCarinho.module.css";

const lista = [
  "Receitas desenvolvidas pela própria Tatá",
  "Embalagem individual de 135g, prática para levar",
  "Do clássico mineiro aos sabores gourmet",
];

export function TemCarinho() {
  const romeu = buscarSabor("romeu-e-julieta");
  const maracuja = buscarSabor("maracuja");

  return (
    <section className={styles.secao}>
      <span className={`${styles.bolha} ${styles.bolha1}`} aria-hidden="true" />
      <span className={`${styles.bolha} ${styles.bolha2}`} aria-hidden="true" />

      <div className={`container ${styles.grade}`}>
        <div className={styles.fotos}>
          <FotoSabor sabor={romeu} sizes="(max-width: 960px) 70vw, 432px" className={styles.foto1} />
          <FotoSabor sabor={maracuja} sizes="(max-width: 960px) 45vw, 272px" className={styles.foto2} />
          <IconHeart className={styles.coracao} />
        </div>

        <div className={styles.texto}>
          <h2 className={styles.titulo}>
            Tem <span className={styles.destaqueTitulo}>carinho</span>, tem capricho e muito{" "}
            <span className={styles.destaqueTitulo}>recheio</span>!
          </h2>

          <p className={styles.frase}>Aqui, o sabor é levado a sério.</p>

          <ul className={styles.lista}>
            {lista.map((item) => (
              <li key={item}>
                <span className={styles.check}>
                  <IconCheck size={16} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <BotaoPedido mensagem={mensagens.pedido} tamanho="grande">
            <IconWhatsApp size={22} />
            Quero provar!
          </BotaoPedido>
        </div>
      </div>
    </section>
  );
}
