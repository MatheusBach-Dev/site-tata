import fs from "node:fs";
import path from "node:path";
import type { Sabor } from "@/data/sabores";

// Pega o caminho escrito em foto: / fotoCard: no data/sabores.ts e deixa pronto para o site.
// Aceita "public/sabores/x.jpg", "/sabores/x.jpg" ou "sabores/x.jpg" (tudo vira /sabores/x.jpg).
// Se o arquivo não existir, avisa no terminal e o sabor aparece com o desenho no lugar da foto.
// Roda no servidor, na hora do build (e a cada recarregada no npm run dev).

export type SaborComFoto = Sabor;

function prepararCaminho(caminho: string | undefined, nome: string): string | undefined {
  if (!caminho) return undefined;
  const limpo = "/" + caminho.replaceAll("\\", "/").replace(/^\/+/, "").replace(/^public\//, "");
  if (!fs.existsSync(path.join(process.cwd(), "public", limpo))) {
    console.warn(`⚠ Foto não encontrada para "${nome}": public${limpo}`);
    return undefined;
  }
  return limpo;
}

export function comFoto(sabor: Sabor): SaborComFoto {
  return {
    ...sabor,
    foto: prepararCaminho(sabor.foto, sabor.nome),
    fotoCard: prepararCaminho(sabor.fotoCard, sabor.nome),
  };
}

export function todosComFoto(lista: Sabor[]): SaborComFoto[] {
  return lista.map((s) => comFoto(s));
}
