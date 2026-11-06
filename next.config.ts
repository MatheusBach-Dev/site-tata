import type { NextConfig } from "next";

// No GitHub Pages o site fica em usuario.github.io/site-tata, então todos os
// caminhos precisam começar com /site-tata. Quem define isso é o workflow de
// deploy (variável PAGES_BASE_PATH). No computador e com domínio próprio fica vazio.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // cacheComponents e partialPrefetching foram tirados: os dois precisam de servidor
  // Node e não funcionam com output: "export". O site é todo estático, então nada muda.

  // Gera o site como arquivos estáticos (pasta out/), que qualquer hospedagem serve.
  output: "export",
  // Cada página vira pasta/index.html (ex.: /sabores/), que é o formato que o GitHub Pages entende.
  trailingSlash: true,
  basePath,
  // Sem servidor não há otimização de imagem do Next; as fotos vão como estão.
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
