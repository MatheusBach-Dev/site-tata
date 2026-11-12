import Image from "next/image";
import { buscarLinha } from "@/data/linhas";
import { saborDestaque } from "@/data/sabores";
import { comFoto } from "@/lib/fotos";
import { formatarPreco } from "@/lib/formato";
import { mensagens } from "@/lib/whatsapp";
import { Botao } from "../Botao";
import { FotoSabor } from "../FotoSabor";
import { BotaoPedido } from "../Pedido";
import { IconHeart, IconSparkles, IconWhatsApp } from "../icons";
import styles from "./Destaque.module.css";

const numeros = [
  { valor: "11,5 mil", legenda: "seguidores no Instagram" },
  { valor: "15 anos", legenda: "de sonhos adoçando vidas" },
  { valor: "135g", legenda: "de puro recheio" },
];

// Topo da home: UM sabor só, o mais pedido. A foto grande e o card de pedir são do mesmo sabor.
// Para trocar o sabor, mude o maisPedido em data/sabores.ts.
// As fotos são as do próprio sabor lá no data/sabores.ts: foto (a grande) e fotoCard (a do quadradinho).
export function Destaque() {
  const destaque = comFoto(saborDestaque());
  const linha = buscarLinha(destaque.linha);

  return (
    <section className={styles.destaque}>
      <span className={`${styles.bolha} ${styles.bolha1}`} aria-hidden="true" />
      <span className={`${styles.bolha} ${styles.bolha2}`} aria-hidden="true" />
      <span className={`${styles.bolha} ${styles.bolha3}`} aria-hidden="true" />

      <div className={`container ${styles.grade}`}>
        <div className={styles.texto}>
          <p className={styles.selo}>
            <IconHeart size={16} />
            Chup Chup Gourmet • Contagem/MG
          </p>

          <h1 className={styles.titulo}>
            Você merece um docinho <span className={styles.hoje}>hoje!</span>
          </h1>

          <p className={styles.descricao}>
            Chup chup gourmet feito à mão, com muito recheio e carinho em cada saquinho. Peça pelo
            WhatsApp e retire na nossa loja ou encontre nos pontos de revenda.
          </p>

          <div className={styles.botoes}>
            <BotaoPedido mensagem={mensagens.pedido} variante="zap" tamanho="grande">
              <IconWhatsApp size={22} />
              Pedir pelo WhatsApp
            </BotaoPedido>
            <Botao href="/sabores" variante="contorno" tamanho="grande">
              Ver os sabores
            </Botao>
          </div>

          <dl className={styles.numeros}>
            {numeros.map((n) => (
              <div key={n.valor} className={styles.numero}>
                <dt>{n.valor}</dt>
                <dd>{n.legenda}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={styles.vitrine}>
          <span className={styles.anel} aria-hidden="true" />
          <FotoSabor sabor={destaque} sizes="(max-width: 960px) 80vw, 468px" className={styles.fotoPrincipal} priority />

          <IconHeart className={`${styles.coracao} ${styles.coracao1}`} />
          <IconHeart className={`${styles.coracao} ${styles.coracao2}`} />
          <IconHeart className={`${styles.coracao} ${styles.coracao3}`} />

          <span className={styles.carimbo} aria-hidden="true">
            <span className={styles.carimboFeito}>feito com</span>
            <span className={styles.carimboCarinho}>carinho</span>
            <IconHeart className={styles.carimboCoracao} />
          </span>

          {/* card do mesmo sabor da foto. Quadradinho: a fotoCard do sabor, ou um brilho se não tiver */}
          <div className={styles.cartao}>
            {destaque.fotoCard ? (
              <Image src={destaque.fotoCard} alt="" width={64} height={64} className={styles.cartaoSelo} />
            ) : (
              <span className={styles.cartaoSelo} aria-hidden="true">
                <IconSparkles size={26} />
              </span>
            )}
            <div className={styles.cartaoInfo}>
              <small>O mais pedido</small>
              <strong>{destaque.nome}</strong>
              <span>
                {formatarPreco(linha.preco)}
                {linha.peso ? ` • ${linha.peso} de recheio` : ""}
              </span>
            </div>
            <BotaoPedidoIcone nome={destaque.nome} linha={linha.curto} detalhe={destaque.descricao} />
          </div>
        </div>
      </div>
    </section>
  );
}

function BotaoPedidoIcone({ nome, linha, detalhe }: { nome: string; linha: string; detalhe?: string }) {
  return (
    <BotaoPedido
      mensagem={mensagens.sabor(nome, linha)}
      titulo={nome}
      detalhe={detalhe}
      variante="zap"
      className={styles.cartaoPedir}
    >
      <IconWhatsApp size={22} />
      <span className="visually-hidden">Pedir {nome}</span>
    </BotaoPedido>
  );
}
