// As 4 linhas do cardápio da Tatá. O preço vale para todos os sabores da linha.
// Mudou o preço? Troque só aqui.

export type LinhaId = "gourmet" | "casquinha" | "premium" | "cremoso";

export type Linha = {
  id: LinhaId;
  /** Nome completo, usado no título de cada bloco do cardápio */
  nome: string;
  /** Nome curto, usado nos filtros e nas etiquetas */
  curto: string;
  preco: number;
  /** Frase do cardápio (opcional) */
  frase?: string;
  /** Peso do saquinho. Deixe vazio enquanto não tiver certeza. */
  peso?: string;
  /** Cor de fundo do desenho que aparece enquanto o sabor não tem foto */
  cor: string;
};

export const linhas: Linha[] = [
  {
    id: "gourmet",
    nome: "Chup-chup Gourmet",
    curto: "Gourmet",
    preco: 9,
    frase: "Muitas emoções em um saquinho só",
    peso: "135g",
    cor: "#fff3c4",
  },
  {
    id: "casquinha",
    nome: "Chup-chup Gourmet com casquinha de chocolate",
    curto: "Com casquinha",
    preco: 10,
    cor: "#ecd9cc",
  },
  {
    id: "premium",
    nome: "Linha Premium",
    curto: "Premium",
    preco: 11,
    cor: "#fde7ec",
  },
  {
    id: "cremoso",
    nome: "Chup-chup Cremoso",
    curto: "Cremoso",
    preco: 4.5,
    frase: "Refrescante, cremoso e gostoso",
    cor: "#e3f4ee",
  },
];

export function buscarLinha(id: LinhaId): Linha {
  const linha = linhas.find((l) => l.id === id);
  if (!linha) throw new Error(`Linha não encontrada: ${id}`);
  return linha;
}
