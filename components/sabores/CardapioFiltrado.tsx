"use client";

import { useState } from "react";
import type { Linha, LinhaId } from "@/data/linhas";
import type { SaborComFoto } from "@/lib/fotos";
import { formatarPreco } from "@/lib/formato";
import { CardSabor } from "./CardSabor";
import styles from "./CardapioFiltrado.module.css";

type Grupo = { linha: Linha; sabores: SaborComFoto[] };
type Filtro = "todos" | LinhaId;

// Filtros por linha + os sabores separados em blocos, cada um com o preço da linha.
export function CardapioFiltrado({ grupos }: { grupos: Grupo[] }) {
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const total = grupos.reduce((soma, g) => soma + g.sabores.length, 0);
  const visiveis = filtro === "todos" ? grupos : grupos.filter((g) => g.linha.id === filtro);

  const opcoes: { id: Filtro; rotulo: string; quantidade: number }[] = [
    { id: "todos", rotulo: "Todos", quantidade: total },
    ...grupos.map((g) => ({ id: g.linha.id, rotulo: g.linha.curto, quantidade: g.sabores.length })),
  ];

  return (
    <>
      <div className={styles.filtros} role="group" aria-label="Filtrar sabores por linha">
        {opcoes.map((o) => (
          <button
            key={o.id}
            type="button"
            className={`${styles.filtro} ${filtro === o.id ? styles.filtroAtivo : ""}`}
            aria-pressed={filtro === o.id}
            onClick={() => setFiltro(o.id)}
          >
            {o.rotulo}
            <span className={styles.quantidade}>{o.quantidade}</span>
          </button>
        ))}
      </div>

      {visiveis.map(({ linha, sabores }) => (
        <section key={linha.id} className={styles.bloco} aria-labelledby={`linha-${linha.id}`}>
          <header className={styles.cabecalhoBloco}>
            <div>
              {linha.frase && <p className={styles.frase}>{linha.frase}</p>}
              <h2 id={`linha-${linha.id}`} className={styles.tituloBloco}>
                {linha.nome}
              </h2>
            </div>
            <p className={styles.precoBloco}>
              <strong>{formatarPreco(linha.preco)}</strong> cada
            </p>
          </header>

          <div className={styles.grade}>
            {sabores.map((sabor) => (
              <CardSabor key={sabor.slug} sabor={sabor} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
