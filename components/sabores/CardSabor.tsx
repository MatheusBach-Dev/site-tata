import Link from "next/link";
import { buscarLinha } from "@/data/linhas";
import type { SaborComFoto } from "@/lib/fotos";
import { formatarPreco } from "@/lib/formato";
import { mensagens } from "@/lib/whatsapp";
import { FotoSabor } from "../FotoSabor";
import { BotaoPedido } from "../Pedido";
import { IconSparkles, IconWhatsApp } from "../icons";
import styles from "./CardSabor.module.css";

// Card de um sabor na página Sabores. A foto e o nome levam para a página do sabor;
// o botão verde abre a janela de pedido do WhatsApp.
export function CardSabor({ sabor }: { sabor: SaborComFoto }) {
  const linha = buscarLinha(sabor.linha);
  const href = `/sabores/${sabor.slug}`;

  return (
    <article className={`${styles.card} ${sabor.esgotado ? styles.cardEsgotado : ""}`}>
      <Link href={href} className={styles.fotoLink} tabIndex={-1} aria-hidden="true">
        <FotoSabor
          sabor={sabor}
          sizes="(max-width: 640px) 50vw, (max-width: 1100px) 33vw, 282px"
          className={styles.foto}
        />
        {linha.peso && <span className={styles.peso}>{linha.peso}</span>}
        {sabor.maisPedido && (
          <span className={styles.maisPedido}>
            <IconSparkles size={12} />
            Mais pedido
          </span>
        )}
        {sabor.esgotado && <span className={styles.avisoEsgotado}>Produto esgotado</span>}
      </Link>

      <div className={styles.corpo}>
        <h3 className={styles.nome}>
          <Link href={href}>{sabor.nome}</Link>
        </h3>
        {sabor.descricao && <p className={styles.descricao}>{sabor.descricao}</p>}
        <p className={styles.preco}>{formatarPreco(linha.preco)}</p>
        <BotaoPedido
          mensagem={mensagens.sabor(sabor.nome, linha.curto)}
          titulo={sabor.nome}
          detalhe={`${linha.nome} • ${formatarPreco(linha.preco)}`}
          variante="zap"
          tamanho="pequeno"
          desativado={sabor.esgotado}
          className={styles.botao}
        >
          <IconWhatsApp size={16} />
          {sabor.esgotado ? "Esgotado" : "Pedir este sabor"}
        </BotaoPedido>
      </div>
    </article>
  );
}
