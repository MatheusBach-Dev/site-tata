import { loja } from "@/data/loja";
import styles from "./FaixaDelivery.module.css";

// Faixa "Peça pelo app de entrega". Só aparece quando algum link de app
// estiver preenchido em data/loja.ts (ifoodUrl ou noveNoveFoodUrl).
export function FaixaDelivery() {
  const ifood: string = loja.ifoodUrl;
  const noveNove: string = loja.noveNoveFoodUrl;
  if (!ifood && !noveNove) return null;

  return (
    <section className={styles.faixa}>
      <div className={`container ${styles.conteudo}`}>
        <p className={styles.chamada}>Quer receber em casa?</p>
        <h2 className={styles.titulo}>Peça pelo app de entrega</h2>
        <p className={styles.texto}>
          A entrega é por conta do app. Para retirar na loja ou revender, é pelo WhatsApp.
        </p>
        <div className={styles.botoes}>
          {noveNove && (
            <a href={noveNove} target="_blank" rel="noopener noreferrer" className={`${styles.app} ${styles.noveNove}`}>
              <span className={styles.selo}>99</span>
              Pedir no 99Food
            </a>
          )}
          {ifood && (
            <a href={ifood} target="_blank" rel="noopener noreferrer" className={`${styles.app} ${styles.ifood}`}>
              <span className={styles.selo}>iF</span>
              Pedir no iFood
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
