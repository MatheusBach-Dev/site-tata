"use client";

import { mensagens } from "@/lib/whatsapp";
import { usePedido } from "./Pedido";
import { IconWhatsApp } from "./icons";
import styles from "./WhatsAppFlutuante.module.css";

export function WhatsAppFlutuante() {
  const abrir = usePedido();
  return (
    <button
      type="button"
      className={styles.botao}
      onClick={() => abrir({ mensagem: mensagens.pedido })}
      aria-label="Fazer pedido pelo WhatsApp"
    >
      <span className={styles.icone}>
        <IconWhatsApp size={26} />
      </span>
      <span className={styles.texto}>
        <small>Fale com a Tatá</small>
        Peça pelo WhatsApp
      </span>
    </button>
  );
}
