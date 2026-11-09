const reais = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

/** 9 → "R$ 9,00" */
export function formatarPreco(valor: number): string {
  return reais.format(valor);
}

/** 9 → { moeda: "R$", valor: "9,00" }, para mostrar o "R$" menor que o número */
export function partesDoPreco(valor: number): { moeda: string; valor: string } {
  return {
    moeda: "R$",
    valor: valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  };
}
