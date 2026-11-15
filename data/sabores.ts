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
// - creditoFoto       → crédito da foto, quando ela é de outra pessoa (aparece pequeno embaixo
//                       da foto na página do sabor). Fotos da Tatá não precisam.
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
  creditoFoto?: string;
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
    foto: "public/sabores/ninho-com-frutas-vermelhas.jpg",
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
    foto: "public/sabores/amendoim-torrado.jpg",
    nome: "Amendoim Torrado",
    apelido: "festa junina o ano todo",
    linha: "gourmet",
    descricao: "Cremoso de amendoim torrado: gostinho de festa junina o ano todo.",
    maisPedido: false,
    esgotado: false,
  },
  {
    slug: "pacoca-com-nutella",
    foto: "public/sabores/pacoca-com-nutella.jpg",
    nome: "Paçoca com Nutella",
    apelido: "pra quem é formiguinha",
    linha: "gourmet",
    descricao: "Paçoca cremosa com recheio generoso de Nutella.",
    maisPedido: false,
    esgotado: false,
  },
  { slug: "coco-queimado", foto: "public/sabores/coco-queimado.jpg", nome: "Coco Queimado", linha: "gourmet", maisPedido: false, esgotado: false },
  { slug: "cocada", foto: "public/sabores/cocada.jpg", nome: "Cocada", linha: "gourmet", maisPedido: false, esgotado: false },
  {
    slug: "delicia-de-abacaxi",
    foto: "public/sabores/delicia-de-abacaxi.jpg",
    nome: "Delícia de Abacaxi",
    apelido: "refrescância pura",
    linha: "gourmet",
    descricao: "Abacaxi com creme: refrescante e docinho na medida certa.",
    maisPedido: false,
    esgotado: false,
  },
  {
    slug: "pudim",
    foto: "public/sabores/pudim.jpg",
    nome: "Pudim",
    apelido: "gostinho de casa de vó",
    linha: "gourmet",
    descricao: "Cremoso sabor pudim de leite, com aquela calda de caramelo.",
    maisPedido: false,
    esgotado: false,
  },
  {
    slug: "romeu-e-julieta",
    foto: "public/sabores/romeu-e-julieta.jpg",
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
    foto: "public/sabores/mousse-de-maracuja.jpg",
    nome: "Mousse de Maracujá",
    apelido: "azedinho na medida",
    linha: "gourmet",
    descricao: "Mousse de maracujá com calda da fruta e sementinhas crocantes.",
    maisPedido: false,
    esgotado: false,
  },
  { slug: "acai-com-leite-ninho", foto: "public/sabores/acai-com-leite-ninho.jpg", nome: "Açaí com Leite Ninho", linha: "gourmet", maisPedido: false, esgotado: false },
  { slug: "brigadeiro", foto: "public/sabores/brigadeiro.jpg", nome: "Brigadeiro", apelido: "festa de criança", linha: "gourmet", maisPedido: false, esgotado: false },
  { slug: "caipirinha", nome: "Caipirinha", linha: "gourmet", maisPedido: false, esgotado: false },
  { slug: "ninho-com-morango", foto: "public/sabores/ninho-com-morango.jpg", nome: "Ninho com Morango", linha: "gourmet", maisPedido: false, esgotado: false },

  // 🍫 Chup-chup Gourmet com casquinha de chocolate — R$ 10,00
  { slug: "prestigio", foto: "public/sabores/prestigio.jpg", nome: "Prestígio", apelido: "coco com chocolate", linha: "casquinha", maisPedido: false, esgotado: false },
  { slug: "cafe-com-chocolate", foto: "public/sabores/cafe-com-chocolate.jpg", nome: "Café com Chocolate", linha: "casquinha", maisPedido: false, esgotado: false },
  { slug: "ninho-trufado", foto: "public/sabores/ninho-trufado.jpg", nome: "Ninho Trufado", linha: "casquinha", maisPedido: false, esgotado: false },

  // ✨ Linha Premium — R$ 11,00
  { slug: "torta-de-limao", nome: "Torta de Limão", apelido: "sobremesa de domingo", linha: "premium", maisPedido: false, esgotado: false },
  {
    slug: "cheesecake-de-frutas-vermelhas",
    foto: "public/sabores/cheesecake-de-frutas-vermelhas.jpg",
    nome: "Cheesecake de Frutas Vermelhas",
    linha: "premium",
    maisPedido: false,
    esgotado: false,
  },

  // 🌈 Chup-chup Cremoso — R$ 4,50
  { slug: "cremoso-chocolate", foto: "public/sabores/cremoso-chocolate.jpg", nome: "Chocolate", linha: "cremoso", maisPedido: false, esgotado: false },
  { slug: "cremoso-morango", foto: "public/sabores/cremoso-morango.jpg", nome: "Morango", linha: "cremoso", maisPedido: false, esgotado: false },
  { slug: "cremoso-menta", nome: "Menta", linha: "cremoso", maisPedido: false, esgotado: false },
  // Milho Verde está esgotado de verdade na loja. Quando voltar, troque esgotado para false.
  { slug: "cremoso-milho-verde", nome: "Milho Verde", linha: "cremoso", maisPedido: false, esgotado: true },
  { slug: "cremoso-creme-de-ovos", nome: "Creme de Ovos", linha: "cremoso", maisPedido: false, esgotado: false },
  { slug: "cremoso-maracuja", foto: "public/sabores/cremoso-maracuja.jpg", nome: "Maracujá", linha: "cremoso", maisPedido: false, esgotado: false },
  { slug: "cremoso-blue-ice", foto: "public/sabores/cremoso-blue-ice.jpg", creditoFoto: "Foto: Ginny from USA (CC BY-SA 2.0, Wikimedia Commons)", nome: "Blue Ice", linha: "cremoso", maisPedido: false, esgotado: false },
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
