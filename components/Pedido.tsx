"use client";

// Janela "Seu pedido vai direto para a Tatá".
// Qualquer botão de pedido do site abre esta janela com a mensagem pronta,
// e o botão verde abre o WhatsApp com o texto já escrito.

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { loja, enderecoCompleto } from "@/data/loja";
import { linkWhatsApp } from "@/lib/whatsapp";
import { Botao, type BotaoTamanho, type BotaoVariante } from "./Botao";
import { IconMapPin, IconWhatsApp, IconX } from "./icons";
import styles from "./Pedido.module.css";

type PedidoAberto = { mensagem: string; titulo?: string; detalhe?: string };

const PedidoContext = createContext<(pedido: PedidoAberto) => void>(() => {});

export function usePedido() {
  return useContext(PedidoContext);
}

export function PedidoProvider({ children }: { children: React.ReactNode }) {
  const [pedido, setPedido] = useState<PedidoAberto | null>(null);
  const abrir = useCallback((p: PedidoAberto) => setPedido(p), []);
  const fechar = useCallback(() => setPedido(null), []);

  return (
    <PedidoContext.Provider value={abrir}>
      {children}
      {pedido && <JanelaPedido pedido={pedido} onFechar={fechar} />}
    </PedidoContext.Provider>
  );
}

function JanelaPedido({ pedido, onFechar }: { pedido: PedidoAberto; onFechar: () => void }) {
  const botaoFechar = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const anterior = document.activeElement as HTMLElement | null;
    botaoFechar.current?.focus();
    document.body.style.overflow = "hidden";

    function aoApertarTecla(e: KeyboardEvent) {
      if (e.key === "Escape") onFechar();
    }
    window.addEventListener("keydown", aoApertarTecla);

    return () => {
      window.removeEventListener("keydown", aoApertarTecla);
      document.body.style.overflow = "";
      anterior?.focus();
    };
  }, [onFechar]);

  return (
    <div className={styles.fundo} onClick={onFechar}>
      <div
        className={styles.janela}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pedido-titulo"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.topo}>
          <span className={styles.iconeZap}>
            <IconWhatsApp size={28} />
          </span>
          <div>
            <h2 id="pedido-titulo" className={styles.titulo}>
              Seu pedido vai direto para a Tatá
            </h2>
            <p className={styles.subtitulo}>pelo WhatsApp • {loja.whatsappFormatado}</p>
          </div>
          <button
            ref={botaoFechar}
            type="button"
            className={styles.fechar}
            onClick={onFechar}
            aria-label="Fechar"
          >
            <IconX size={18} />
          </button>
        </div>

        {pedido.titulo && (
          <div className={styles.produto}>
            <strong>{pedido.titulo}</strong>
            {pedido.detalhe && <span>{pedido.detalhe}</span>}
          </div>
        )}

        <p className={styles.rotulo}>Mensagem que vai chegar para ela:</p>
        <p className={styles.mensagem}>{pedido.mensagem}</p>

        <p className={styles.retirada}>
          <IconMapPin size={18} />
          <span>
            Retirada na loja: {enderecoCompleto.replace("/MG", "")}
            <br />
            {loja.horarios.retirada}
          </span>
        </p>

        <Botao
          href={linkWhatsApp(pedido.mensagem)}
          externo
          variante="zap"
          tamanho="grande"
          cheio
        >
          <IconWhatsApp size={22} />
          Abrir o WhatsApp
        </Botao>

        <p className={styles.dica}>O WhatsApp abre com a mensagem pronta. É só tocar em enviar.</p>
      </div>
    </div>
  );
}

/** Botão que abre a janela de pedido com a mensagem indicada. */
export function BotaoPedido({
  mensagem,
  titulo,
  detalhe,
  variante = "primario",
  tamanho = "normal",
  className,
  desativado = false,
  children,
}: PedidoAberto & {
  variante?: BotaoVariante;
  tamanho?: BotaoTamanho;
  className?: string;
  desativado?: boolean;
  children: React.ReactNode;
}) {
  const abrir = usePedido();
  return (
    <Botao
      variante={variante}
      tamanho={tamanho}
      className={className}
      desativado={desativado}
      onClick={() => abrir({ mensagem, titulo, detalhe })}
    >
      {children}
    </Botao>
  );
}
