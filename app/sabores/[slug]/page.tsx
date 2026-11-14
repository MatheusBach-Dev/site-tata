import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Botao } from "@/components/Botao";
import { FotoSabor } from "@/components/FotoSabor";
import { CardMini } from "@/components/sabores/CardMini";
import { ComoPedir } from "@/components/sabores/ComoPedir";
import {
  IconArrowRight,
  IconChevronLeft,
  IconHeart,
  IconIceCream,
  IconMessage,
  IconSnowflake,
  IconSparkles,
} from "@/components/icons";
import { buscarLinha } from "@/data/linhas";
import { buscarSabor, sabores, type Sabor } from "@/data/sabores";
import { comFoto, todosComFoto } from "@/lib/fotos";
import { partesDoPreco, formatarPreco } from "@/lib/formato";
import { linkWhatsApp, mensagens } from "@/lib/whatsapp";
import styles from "./page.module.css";

// Uma página para cada sabor, gerada na hora do build: /sabores/pudim, /sabores/cocada...
export function generateStaticParams() {
  return sabores.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/sabores/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const sabor = buscarSabor(slug);
  if (!sabor) return {};
  const linha = buscarLinha(sabor.linha);
  return {
    title: `${sabor.nome} (${linha.curto})`,
    description: `${sabor.descricao ?? linha.nome} ${formatarPreco(linha.preco)} na Gostosuras da Tatá. Peça pelo WhatsApp.`,
  };
}

/** Até 4 sabores parecidos: primeiro da mesma linha, depois das outras. Esgotados vão para o fim. */
function outrosSabores(atual: Sabor): Sabor[] {
  const disponiveisPrimeiro = (a: Sabor, b: Sabor) => Number(a.esgotado) - Number(b.esgotado);
  const mesmaLinha = sabores.filter((s) => s.linha === atual.linha && s.slug !== atual.slug).sort(disponiveisPrimeiro);
  const outrasLinhas = sabores.filter((s) => s.linha !== atual.linha && !s.esgotado);
  return [...mesmaLinha, ...outrasLinhas].slice(0, 4);
}

export default async function PaginaSabor({ params }: PageProps<"/sabores/[slug]">) {
  const { slug } = await params;
  const encontrado = buscarSabor(slug);
  if (!encontrado) notFound();

  const sabor = comFoto(encontrado);
  const linha = buscarLinha(sabor.linha);
  const preco = partesDoPreco(linha.preco);
  const outros = todosComFoto(outrosSabores(sabor));
  const recadinho = sabor.apelido ?? (sabor.maisPedido ? "o queridinho da casa" : undefined);

  const caracteristicas = [
    { Icone: IconIceCream, texto: linha.peso ? `${linha.peso} de recheio` : linha.nome },
    { Icone: IconHeart, texto: "Feito à mão" },
    { Icone: IconSnowflake, texto: "Bem geladinho" },
  ];

  return (
    <>
      <div className={styles.fundo}>
        <div className="container">
          <nav className={styles.navegacao} aria-label="Você está em">
            <Link href="/sabores" className={styles.voltar}>
              <IconChevronLeft size={16} />
              Voltar aos sabores
            </Link>
            <ol className={styles.caminho}>
              <li>
                <Link href="/">Início</Link>
              </li>
              <li>
                <Link href="/sabores">Sabores</Link>
              </li>
              <li aria-current="page">{sabor.nome}</li>
            </ol>
          </nav>

          <div className={styles.grade}>
            <div className={styles.vitrine}>
              <span className={styles.bolha} aria-hidden="true" />
              {recadinho && (
                <p className={styles.queridinho} aria-hidden="true">
                  {recadinho}
                  <svg viewBox="0 0 60 40" className={styles.setaCurva}>
                    <path d="M4 6 C 10 30, 30 34, 52 30" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                    <path d="M44 23 L 53 30 L 44 36" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </p>
              )}
              <FotoSabor sabor={sabor} sizes="(max-width: 960px) 80vw, 300px" className={styles.foto} priority />
              {linha.peso && (
                <span className={styles.seloPeso}>
                  <strong>{linha.peso}</strong>
                  de recheio
                </span>
              )}
              {sabor.esgotado && <span className={styles.avisoEsgotado}>Produto esgotado</span>}
              {sabor.creditoFoto && <small className={styles.credito}>{sabor.creditoFoto}</small>}
            </div>

            <div className={styles.info}>
              <div className={styles.etiquetas}>
                <span className={styles.etiqueta}>{linha.curto}</span>
                {sabor.maisPedido && (
                  <span className={`${styles.etiqueta} ${styles.etiquetaMaisPedido}`}>
                    <IconSparkles size={12} />
                    Mais pedido
                  </span>
                )}
                {sabor.esgotado && <span className={`${styles.etiqueta} ${styles.etiquetaEsgotado}`}>Esgotado</span>}
              </div>

              <h1 className={styles.titulo}>{sabor.nome}</h1>
              <p className={styles.descricao}>{sabor.descricao ?? linha.nome}</p>

              <p className={styles.preco}>
                <span className={styles.moeda}>{preco.moeda}</span>
                <strong>{preco.valor}</strong>
                <span className={styles.unidade}>a unidade</span>
              </p>

              {sabor.sobre && (
                <>
                  <h2 className={styles.rotulo}>Sobre o sabor</h2>
                  <p className={styles.sobre}>{sabor.sobre}</p>
                </>
              )}

              <ul className={styles.caracteristicas}>
                {caracteristicas.map(({ Icone, texto }) => (
                  <li key={texto}>
                    <span className={styles.caracteristicaIcone}>
                      <Icone size={18} />
                    </span>
                    {texto}
                  </li>
                ))}
              </ul>

              <h2 className={styles.tituloPedido}>Como você quer pedir?</h2>
              <ComoPedir
                mensagem={mensagens.sabor(sabor.nome, linha.curto)}
                titulo={sabor.nome}
                detalhe={`${linha.nome} • ${formatarPreco(linha.preco)}`}
                esgotado={sabor.esgotado}
              />

              <a
                href={linkWhatsApp(mensagens.duvida)}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.duvida}
              >
                <IconMessage size={18} />
                <span>
                  Não achou o sabor que queria?
                  <strong>Chama a Tatá no WhatsApp</strong>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <section className={styles.outros}>
        <div className="container">
          <p className={styles.chamada}>quem gosta desse, também ama</p>
          <h2 className={styles.tituloOutros}>Outros sabores</h2>
          <div className={styles.gradeOutros}>
            {outros.map((s) => (
              <CardMini key={s.slug} sabor={s} />
            ))}
          </div>
          <div className={styles.verTodos}>
            <Botao href="/sabores" variante="contorno">
              Ver cardápio completo
              <IconArrowRight size={18} />
            </Botao>
          </div>
        </div>
      </section>
    </>
  );
}
