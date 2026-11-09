import { buscarLinha } from "@/data/linhas";
import { buscarSabor } from "@/data/sabores";
import { comFoto } from "@/lib/fotos";
import { mensagens } from "@/lib/whatsapp";
import { Botao } from "../Botao";
import { FotoSabor } from "../FotoSabor";
import { BotaoPedido } from "../Pedido";
import { IconHeart, IconWhatsApp } from "../icons";
import styles from "./Destaque.module.css";

const numeros = [
  { valor: "11,5 mil", legenda: "seguidores no Instagram" },
  { valor: "15 anos", legenda: "de sonhos adoçando vidas" },
  { valor: "135g", legenda: "de puro recheio" },
];

export function Destaque() {
  const ninho = comFoto(buscarSabor("ninho-com-frutas-vermelhas")!);
  const pudim = comFoto(buscarSabor("pudim")!);
  const linhaPudim = buscarLinha(pudim.linha);

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
          <FotoSabor sabor={ninho} sizes="(max-width: 960px) 80vw, 468px" className={styles.fotoPrincipal} priority />

          <IconHeart className={`${styles.coracao} ${styles.coracao1}`} />
          <IconHeart className={`${styles.coracao} ${styles.coracao2}`} />
          <IconHeart className={`${styles.coracao} ${styles.coracao3}`} />

          <span className={styles.carimbo} aria-hidden="true">
            <span className={styles.carimboFeito}>feito com</span>
            <span className={styles.carimboCarinho}>carinho</span>
            <IconHeart className={styles.carimboCoracao} />
          </span>

          <div className={styles.cartao}>
            <FotoSabor sabor={pudim} sizes="64px" className={styles.cartaoFoto} />
            <div className={styles.cartaoInfo}>
              <strong>{pudim.nome}</strong>
              <span>{linhaPudim.peso ? `${linhaPudim.peso} de cremosidade` : linhaPudim.nome}</span>
            </div>
            <BotaoPedidoIcone nome={pudim.nome} linha={linhaPudim.curto} detalhe={pudim.descricao} />
          </div>

          <p className={styles.etiqueta}>
            <span className={styles.ponto} aria-hidden="true" />
            {ninho.nome}
          </p>
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
