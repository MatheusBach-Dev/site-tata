import Link from "next/link";
import { loja } from "@/data/loja";
import { menu } from "@/data/menu";
import { Logo } from "./Logo";
import { IconInstagram, IconMapPin, IconWhatsApp } from "./icons";
import { linkWhatsApp, mensagens } from "@/lib/whatsapp";
import styles from "./Rodape.module.css";

export function Rodape() {
  return (
    <footer className={styles.rodape}>
      <div className={`container ${styles.colunas}`}>
        <div className={styles.marca}>
          <div className={styles.logo}>
            <Logo size={68} />
            <span className={styles.nome}>
              <strong>{loja.nome}</strong>
              <span>{loja.slogan}</span>
            </span>
          </div>
          <p>{loja.descricaoCurta}</p>
        </div>

        <nav className={styles.coluna} aria-label="Rodapé">
          <h3>Navegue</h3>
          {menu.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.rotulo}
            </Link>
          ))}
        </nav>

        <div className={styles.coluna}>
          <h3>Contato</h3>
          <a href={linkWhatsApp(mensagens.pedido)} target="_blank" rel="noopener noreferrer" className={styles.comIcone}>
            <IconWhatsApp size={18} />
            {loja.whatsappFormatado}
          </a>
          <a href={loja.instagramUrl} target="_blank" rel="noopener noreferrer" className={styles.comIcone}>
            <IconInstagram size={18} />
            {loja.instagram}
          </a>
          <span className={styles.comIcone}>
            <IconMapPin size={18} />
            <span>
              {loja.endereco.rua} — {loja.endereco.bairro}
              <br />
              {loja.endereco.cidade}
            </span>
          </span>
        </div>

        <div className={styles.coluna}>
          <h3>Horários</h3>
          <span>{loja.horarios.semana}</span>
          <span>{loja.horarios.sabado}</span>
        </div>
      </div>

      <div className={`container ${styles.creditos}`}>
        <span>© 2026 {loja.nome} • Todos os direitos reservados</span>
        <span>Site desenvolvido por Matheus</span>
      </div>
    </footer>
  );
}
