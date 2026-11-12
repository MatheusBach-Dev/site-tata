// Cardápio completo da Tatá.
// Hoje fica aqui no código. Quando o painel admin existir,
// estes dados passam a vir do banco (Supabase) e as páginas não mudam.
//
// Como mexer:
// - maisPedido: true  → aparece a etiqueta "Mais pedido" no card e na página do sabor.
//                       O PRIMEIRO sabor com maisPedido: true é o destaque do topo da home
//                       (foto grande + card com o botão de pedir).
// - esgotado: true    → foto apagada e sem cor, "Produto esgotado" e botão de pedido desligado
// - descricao         → frase curta do card (opcional)
// - sobre             → texto maior da página do sabor (opcional)
// - apelido           → recadinho escrito à mão em cima da foto, um por sabor (opcional)
// - foto              → caminho da foto do sabor. Ex.: foto: "public/sabores/ninho com nutella.jpg"
//                       (pode ter espaço no nome. Sem foto, aparece um desenho no lugar)
// - fotoCard          → foto do quadradinho do card "O mais pedido" no topo da home (opcional).
//                       Sem ela, o quadradinho mostra um brilho.
// - slug              → nome do sabor no endereço da página: /sabores/ninho-com-nutella.
//                       Sem espaço e sem acento, porque vai no link. Não precisa mexer.

import type { LinhaId } from "./linhas";

export type Sabor = {
  slug: string;
  nome: string;
  linha: LinhaId;
  descricao?: string;
  sobre?: string;
  apelido?: string;
  foto?: string;
  fotoCard?: string;
  maisPedido: boolean;
  esgotado: boolean;
};

export const sabores: Sabor[] = [
  // ⭐ Chup-chup Gourmet — R$ 9,00
  {
    slug: "ninho-com-nutella",
    nome: "Ninho com Nutella",
    apelido: "dupla que não tem erro",
    linha: "gourmet",
    foto: "public/sabores/ninho-com-nutella.jpeg",
    fotoCard: "public/sabores/ninho-com-nutella2.jpeg",
    maisPedido: true,
    esgotado: false,
  },
  {
    slug: "ninho-com-frutas-vermelhas",
    nome: "Ninho com Frutas Vermelhas",
    apelido: "docinho com azedinho",
    linha: "gourmet",
    descricao: "Creme de Leite Ninho com geleia de frutas vermelhas.",
    sobre:
      "Creme de Leite Ninho bem geladinho, com geleia de frutas vermelhas no meio. O docinho do leite com o azedinho das frutas, na medida certa.",
    maisPedido: false,
    esgotado: false,
  },
  {
    slug: "amendoim-torrado",
    nome: "Amendoim Torrado",
    apelido: "festa junina o ano todo",
    linha: "gourmet",
    descricao: "Cremoso de amendoim torrado: gostinho de festa junina o ano todo.",
    maisPedido: false,
    esgotado: false,
  },
  {
    slug: "pacoca-com-nutella",
    nome: "Paçoca com Nutella",
    apelido: "pra quem é formiguinha",
    linha: "gourmet",
    descricao: "Paçoca cremosa com recheio generoso de Nutella.",
    maisPedido: false,
    esgotado: false,
  },
  { slug: "coco-queimado", nome: "Coco Queimado", linha: "gourmet", maisPedido: false, esgotado: false },
  { slug: "cocada", nome: "Cocada", linha: "gourmet", maisPedido: false, esgotado: false },
  {
    slug: "delicia-de-abacaxi",
    nome: "Delícia de Abacaxi",
    apelido: "refrescância pura",
    linha: "gourmet",
    descricao: "Abacaxi com creme: refrescante e docinho na medida certa.",
    maisPedido: false,
    esgotado: false,
  },
  {
    slug: "pudim",
    nome: "Pudim",
    apelido: "gostinho de casa de vó",
    linha: "gourmet",
    descricao: "Cremoso sabor pudim de leite, com aquela calda de caramelo.",
    maisPedido: false,
    esgotado: false,
  },
  {
    slug: "romeu-e-julieta",
    nome: "Romeu e Julieta",
    apelido: "clássico mineiro",
    linha: "gourmet",
    descricao: "Goiabada cremosa com queijo: o clássico mineiro em versão geladinha.",
    maisPedido: false,
    esgotado: false,
  },
  { slug: "mousse-de-limao", nome: "Mousse de Limão", apelido: "azedinho que refresca", linha: "gourmet", maisPedido: false, esgotado: false },
  {
    slug: "mousse-de-maracuja",
    nome: "Mousse de Maracujá",
    apelido: "azedinho na medida",
    linha: "gourmet",
    descricao: "Mousse de maracujá com calda da fruta e sementinhas crocantes.",
    maisPedido: false,
    esgotado: false,
  },
  { slug: "acai-com-leite-ninho", nome: "Açaí com Leite Ninho", linha: "gourmet", maisPedido: false, esgotado: false },
  { slug: "brigadeiro", nome: "Brigadeiro", apelido: "festa de criança", linha: "gourmet", maisPedido: false, esgotado: false },
  { slug: "caipirinha", nome: "Caipirinha", linha: "gourmet", maisPedido: false, esgotado: false },
  { slug: "ninho-com-morango", nome: "Ninho com Morango", linha: "gourmet", maisPedido: false, esgotado: false },

  // 🍫 Chup-chup Gourmet com casquinha de chocolate — R$ 10,00
  { slug: "prestigio", nome: "Prestígio", apelido: "coco com chocolate", linha: "casquinha", maisPedido: false, esgotado: false },
  { slug: "cafe-com-chocolate", nome: "Café com Chocolate", linha: "casquinha", maisPedido: false, esgotado: false },
  { slug: "ninho-trufado", nome: "Ninho Trufado", linha: "casquinha", maisPedido: false, esgotado: false },

  // ✨ Linha Premium — R$ 11,00
  { slug: "torta-de-limao", nome: "Torta de Limão", apelido: "sobremesa de domingo", linha: "premium", maisPedido: false, esgotado: false },
  {
    slug: "cheesecake-de-frutas-vermelhas",
    nome: "Cheesecake de Frutas Vermelhas",
    linha: "premium",
    maisPedido: false,
    esgotado: false,
  },

  // 🌈 Chup-chup Cremoso — R$ 4,50
  { slug: "cremoso-chocolate", nome: "Chocolate", linha: "cremoso", maisPedido: false, esgotado: false },
  { slug: "cremoso-morango", nome: "Morango", linha: "cremoso", maisPedido: false, esgotado: false },
  { slug: "cremoso-menta", nome: "Menta", linha: "cremoso", maisPedido: false, esgotado: false },
  // esgotado: true só para testar como fica. Troque para false quando quiser.
  { slug: "cremoso-milho-verde", nome: "Milho Verde", linha: "cremoso", maisPedido: false, esgotado: true },
  { slug: "cremoso-creme-de-ovos", nome: "Creme de Ovos", linha: "cremoso", maisPedido: false, esgotado: false },
  { slug: "cremoso-maracuja", nome: "Maracujá", linha: "cremoso", maisPedido: false, esgotado: false },
  { slug: "cremoso-blue-ice", nome: "Blue Ice", linha: "cremoso", maisPedido: false, esgotado: false },
  { slug: "cremoso-leite-condensado", nome: "Leite Condensado", linha: "cremoso", maisPedido: false, esgotado: false },
  { slug: "cremoso-kiwi", nome: "Kiwi", linha: "cremoso", maisPedido: false, esgotado: false },
  { slug: "cremoso-uva", nome: "Uva", linha: "cremoso", maisPedido: false, esgotado: false },
  { slug: "cremoso-limao", nome: "Limão", linha: "cremoso", maisPedido: false, esgotado: false },
];

/** Sabor do topo da home: o primeiro com maisPedido: true (se nenhum tiver, o primeiro da lista). */
export function saborDestaque(): Sabor {
  return sabores.find((s) => s.maisPedido && !s.esgotado) ?? sabores[0];
}

export function buscarSabor(slug: string): Sabor | undefined {
  return sabores.find((s) => s.slug === slug);
}

export function saboresDaLinha(linha: LinhaId): Sabor[] {
  return sabores.filter((s) => s.linha === linha);
}
