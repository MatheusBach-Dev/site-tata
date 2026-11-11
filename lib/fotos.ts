import fs from "node:fs";
import path from "node:path";
import type { Sabor } from "@/data/sabores";

// Procura a foto de cada sabor em public/sabores/<slug>.<extensão>.
// Roda no servidor, na hora do build (e a cada recarregada no npm run dev).

const PASTA = path.join(process.cwd(), "public", "sabores");
const EXTENSOES = [".webp", ".jpg", ".jpeg", ".png"];

export type SaborComFoto = Sabor & { foto?: string };

function arquivosDaPasta(): Set<string> {
  try {
    return new Set(fs.readdirSync(PASTA));
  } catch {
    return new Set();
  }
}

export function comFoto(sabor: Sabor, arquivos = arquivosDaPasta()): SaborComFoto {
  const ext = EXTENSOES.find((e) => arquivos.has(sabor.slug + e));
  return ext ? { ...sabor, foto: `/sabores/${sabor.slug}${ext}` } : sabor;
}

export function todosComFoto(lista: Sabor[]): SaborComFoto[] {
  const arquivos = arquivosDaPasta();
  return lista.map((s) => comFoto(s, arquivos));
}
