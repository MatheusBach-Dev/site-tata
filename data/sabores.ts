// Lista de sabores do site.
// Hoje fica aqui no código. Quando o painel admin existir,
// estes dados passam a vir do banco (Supabase) e as páginas não mudam.

export type Categoria = "frutados" | "cremosos" | "classicos";

export type Sabor = {
  slug: string;
  nome: string;
  descricao: string;
  peso: string;
  categoria: Categoria;
  /** Caminho da foto dentro de /public, ex.: "/sabores/pudim.jpg". Sem foto, aparece um desenho no lugar. */
  foto?: string;
  /** Cor de fundo do desenho que aparece enquanto não há foto. */
  cor: string;
  esgotado: boolean;
  ordem: number;
};

export const sabores: Sabor[] = [
  {
    slug: "romeu-e-julieta",
    nome: "Romeu e Julieta",
    descricao: "Goiabada cremosa com queijo: o clássico mineiro geladinho.",
    peso: "135g",
    categoria: "classicos",
    cor: "#F7C6C9",
    esgotado: false,
    ordem: 1,
  },
  {
    slug: "maracuja",
    nome: "Maracujá",
    descricao: "Mousse de maracujá com calda e sementinhas crocantes.",
    peso: "135g",
    categoria: "frutados",
    cor: "#FFE08A",
    esgotado: false,
    ordem: 2,
  },
  {
    slug: "pudim",
    nome: "Pudim",
    descricao: "Sabor pudim de leite com calda de caramelo.",
    peso: "135g",
    categoria: "cremosos",
    cor: "#F5D3A6",
    esgotado: false,
    ordem: 3,
  },
  {
    slug: "ninho-frutas-vermelhas",
    nome: "Ninho c/ Frutas Vermelhas",
    descricao: "Creme de Leite Ninho com geleia de frutas vermelhas.",
    peso: "135g",
    categoria: "cremosos",
    cor: "#F9B9CB",
    esgotado: false,
    ordem: 4,
  },
  {
    slug: "amendoim-torrado",
    nome: "Amendoim Torrado",
    descricao: "Cremoso de amendoim torrado, gostinho de festa junina.",
    peso: "135g",
    categoria: "classicos",
    cor: "#E9C9A0",
    esgotado: false,
    ordem: 5,
  },
  {
    slug: "pacoca-nutella",
    nome: "Paçoca c/ Nutella",
    descricao: "Paçoca cremosa com recheio generoso de Nutella.",
    peso: "135g",
    categoria: "cremosos",
    cor: "#D9B49A",
    esgotado: false,
    ordem: 6,
  },
  {
    slug: "delicia-de-abacaxi",
    nome: "Delícia de Abacaxi",
    descricao: "Abacaxi com creme: refrescante e docinho na medida.",
    peso: "135g",
    categoria: "frutados",
    cor: "#FCE7A2",
    esgotado: false,
    ordem: 7,
  },
];

export function buscarSabor(slug: string): Sabor {
  const sabor = sabores.find((s) => s.slug === slug);
  if (!sabor) throw new Error(`Sabor não encontrado: ${slug}`);
  return sabor;
}
