import styles from "./Logo.module.css";

// Selo provisório nas cores da logo (círculo Amarelo Tatá com letras Rosa Tatá).
// Quando o arquivo da logo chegar: coloque em public/logo.png e troque o <span>
// por <Image src="/logo.png" alt="" width={size} height={size} className={styles.logo} />.
export function Logo({ size = 64, className }: { size?: number; className?: string }) {
  return (
    <span
      className={`${styles.logo} ${className ?? ""}`}
      style={{ "--tamanho-padrao": `${size}px` } as React.CSSProperties}
      aria-hidden="true"
    >
      <span className={styles.linha1}>Gostosuras</span>
      <span className={styles.linha2}>da Tatá</span>
      <span className={styles.linha3}>gourmet</span>
    </span>
  );
}
