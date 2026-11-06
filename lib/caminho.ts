// Coloca o prefixo do site (ex.: /site-tata no GitHub Pages) na frente de um
// arquivo de /public. Os links (<Link>) já recebem o prefixo sozinhos; fotos não.
export function comBase(caminho: string) {
  if (!caminho.startsWith("/")) return caminho;
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${caminho}`;
}
