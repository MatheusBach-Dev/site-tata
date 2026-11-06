"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { loja } from "@/data/loja";
import { menu } from "@/data/menu";
import { mensagens } from "@/lib/whatsapp";
import { Logo } from "./Logo";
import { BotaoPedido } from "./Pedido";
import { IconInstagram, IconMenu, IconWhatsApp, IconX } from "./icons";
import styles from "./Cabecalho.module.css";

export function Cabecalho() {
  const caminho = usePathname();
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className={styles.cabecalho}>
      <div className={`container ${styles.linha}`}>
        <Link href="/" className={styles.marca} onClick={() => setMenuAberto(false)}>
          <Logo size={64} />
          <span className={styles.nome}>
            <strong>{loja.nome}</strong>
            <span>{loja.slogan}</span>
          </span>
        </Link>

        <nav
          id="menu-principal"
          className={`${styles.menu} ${menuAberto ? styles.menuAberto : ""}`}
          aria-label="Menu principal"
        >
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={caminho === item.href ? styles.ativo : undefined}
              aria-current={caminho === item.href ? "page" : undefined}
              onClick={() => setMenuAberto(false)}
            >
              {item.rotulo}
            </Link>
          ))}
        </nav>

        <div className={styles.acoes}>
          <a
            href={loja.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.instagram}
            aria-label={`Instagram ${loja.instagram}`}
          >
            <IconInstagram size={22} />
          </a>
          <BotaoPedido mensagem={mensagens.pedido} variante="zap" tamanho="pequeno" className={styles.botaoPedido}>
            <IconWhatsApp size={18} />
            Pedir no WhatsApp
          </BotaoPedido>
          <button
            type="button"
            className={styles.abrirMenu}
            aria-expanded={menuAberto}
            aria-controls="menu-principal"
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuAberto((aberto) => !aberto)}
          >
            {menuAberto ? <IconX size={24} /> : <IconMenu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
