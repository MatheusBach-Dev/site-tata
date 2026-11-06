import { mensagens } from "@/lib/whatsapp";
import { Logo } from "../Logo";
import { BotaoPedido } from "../Pedido";
import { IconWhatsApp } from "../icons";
import styles from "./ChamadaFinal.module.css";

export function ChamadaFinal() {
  return (
    <section className={`container ${styles.secao}`}>
      <div className={styles.caixa}>
        <span className={`${styles.bolha} ${styles.bolha1}`} aria-hidden="true" />
        <span className={`${styles.bolha} ${styles.bolha2}`} aria-hidden="true" />

        <div className={styles.texto}>
          <h2 className={styles.titulo}>Bateu vontade de um docinho?</h2>
          <p className={styles.descricao}>
            Chama a Tatá no WhatsApp e garanta o seu. Atendimento de segunda a sábado.
          </p>
          <BotaoPedido mensagem={mensagens.pedido} variante="zap" tamanho="grande">
            <IconWhatsApp size={22} />
            Chamar no WhatsApp
          </BotaoPedido>
        </div>

        <Logo size={253} className={styles.logo} />
      </div>
    </section>
  );
}
