import { describe, expect, it } from "vitest";
import { coordenadaNoBrasil } from "@/lib/mapa";
import { loja } from "./loja";
import { pontos, tiposPonto } from "./pontos";

// Confere os dados antes de ir pro ar: pega coordenada digitada errada,
// id repetido e tipo que não existe.
describe("data/pontos.ts", () => {
  it("não repete id", () => {
    expect(new Set(pontos.map((p) => p.id)).size).toBe(pontos.length);
  });

  it("todo ponto está dentro do Brasil (coordenada certa)", () => {
    const fora = pontos.filter((p) => !coordenadaNoBrasil(p)).map((p) => p.id);
    expect(fora).toEqual([]);
  });

  it("a loja está dentro do Brasil", () => {
    expect(coordenadaNoBrasil(loja.coordenadas)).toBe(true);
  });

  it("todo tipo existe na lista de tipos", () => {
    const invalidos = pontos.filter((p) => !(p.tipo in tiposPonto)).map((p) => p.id);
    expect(invalidos).toEqual([]);
  });
});
