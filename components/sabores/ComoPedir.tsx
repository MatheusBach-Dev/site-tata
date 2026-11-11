"use client";

import { loja } from "@/data/loja";
import { usePedido } from "../Pedido";
import { IconArrowRight, IconWhatsApp } from "../icons";
import styles from "./ComoPedir.module.css";

// Bloco "Como você quer pedir?" da página de cada sabor.
// WhatsApp abre a janela de pedido; iFood e 99Food só aparecem com o link preenchido em data/loja.ts.
export function ComoPedir({
  mensagem,
  titulo,
  detalhe,
  esgotado,
}: {
  mensagem: string;
  titulo: string;
  detalhe: string;
  esgotado: boolean;
}) {
  const abrir = usePedido();
  const ifood: string = loja.ifoodUrl;
  const noveNove: string = loja.noveNoveFoodUrl;

  return (
    <div className={styles.opcoes}>
      <button
        type="button"
        className={`${styles.opcao} ${styles.whatsapp}`}
        onClick={() => abrir({ mensagem, titulo, detalhe })}
        disabled={esgotado}
      >
        <span className={styles.icone}>
          <IconWhatsApp size={22} />
        </span>
        <span className={styles.textos}>
          <strong>{esgotado ? "Sabor esgotado no momento" : "Pedir no WhatsApp"}</strong>
          <small>
            {esgotado ? "Chama a Tatá para saber quando volta" : `Retire na loja • ${loja.endereco.bairro}`}
          </small>
        </span>
        {!esgotado && <IconArrowRight size={20} className={styles.seta} />}
      </button>

      {!esgotado && (ifood || noveNove) && (
        <div className={styles.apps}>
          {ifood && (
            <a href={ifood} target="_blank" rel="noopener noreferrer" className={`${styles.opcao} ${styles.ifood}`}>
              <span className={styles.icone}>iFood</span>
              <span className={styles.textos}>
                <strong>Pedir no iFood</strong>
                <small>Entrega em casa</small>
              </span>
            </a>
          )}
          {noveNove && (
            <a href={noveNove} target="_blank" rel="noopener noreferrer" className={`${styles.opcao} ${styles.noveNove}`}>
              <span className={styles.icone}>99</span>
              <span className={styles.textos}>
                <strong>Pedir no 99Food</strong>
                <small>Entrega em casa</small>
              </span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
