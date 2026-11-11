"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { loja } from "@/data/loja";
import { menu } from "@/data/menu";
import { mensagens } from "@/lib/whatsapp";
import { Logo } from "./Logo";
import { BotaoPedido } from "./Pedido";
import { IconMenu, IconWhatsApp, IconX } from "./icons";
import styles from "./Cabecalho.module.css";

// "/sabores/" e "/sabores" são a mesma página (o site usa barra no fim por causa do GitHub Pages).
const semBarra = (c: string) => (c.length > 1 ? c.replace(/\/+$/, "") : c);

// Cabeçalho igual ao da página do sabor no Figma: marca, menu com tracinho na página atual
// e o botão do WhatsApp. O Instagram fica na faixa de cima e no rodapé.
export function Cabecalho() {
  const caminho = semBarra(usePathname());
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className={styles.cabecalho}>
      <div className={`container ${styles.linha}`}>
        <Link href="/" className={styles.marca} onClick={() => setMenuAberto(false)}>
          <Logo size={48} />
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
          {menu.map((item) => {
            const ativo = caminho === item.href || caminho.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={ativo ? styles.ativo : undefined}
                aria-current={caminho === item.href ? "page" : undefined}
                onClick={() => setMenuAberto(false)}
              >
                {item.rotulo}
              </Link>
            );
          })}
        </nav>

        <div className={styles.acoes}>
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
            {menuAberto ? <IconX size={20} /> : <IconMenu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
