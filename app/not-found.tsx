import { Botao } from "@/components/Botao";
import styles from "./not-found.module.css";

// Aparece nas páginas que ainda não foram feitas (Sabores, Nossa História...).
export default function NaoEncontrada() {
  return (
    <section className={`container ${styles.secao}`}>
      <h1>Esta página ainda está no forno</h1>
      <p>Estamos preparando esta parte do site. Volte para o início enquanto isso.</p>
      <Botao href="/">Voltar para o início</Botao>
    </section>
  );
}
