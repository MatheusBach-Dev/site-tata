import { linkWhatsApp, mensagens } from "@/lib/whatsapp";
import { Botao } from "../Botao";
import { IconWhatsApp } from "../icons";
import styles from "./FaixaDuvida.module.css";

export function FaixaDuvida() {
  return (
    <div className={styles.faixa}>
      <span className={styles.icone}>
        <IconWhatsApp size={26} />
      </span>
      <div className={styles.texto}>
        <h2>Ficou com alguma dúvida?</h2>
        <p>Chama a Tatá no WhatsApp que ela te ajuda a escolher.</p>
      </div>
      <Botao href={linkWhatsApp(mensagens.duvida)} externo variante="zap" className={styles.botao}>
        <IconWhatsApp size={20} />
        Chamar a Tatá
      </Botao>
    </div>
  );
}
