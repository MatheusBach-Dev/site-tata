import { describe, expect, it } from "vitest";
import type { Ponto } from "@/data/pontos";
import {
  cidadesPorEstado,
  distanciaKm,
  filtrarPontos,
  formatarDistancia,
  linkComoChegar,
  linkVerNoMaps,
  ordenarPorDistancia,
  semAcento,
} from "./mapa";

// Lista de teste: duas "Santa Luzia" em estados diferentes e um bairro com acento.
const lista: Ponto[] = [
  { id: "a", nome: "Padaria Pão Bom", tipo: "padaria", endereco: "Rua A, 1", bairro: "Centro", cidade: "Santa Luzia", estado: "MG", lat: -19.77, lng: -43.85 },
  { id: "b", nome: "Farmácia Saúde", tipo: "farmacia", endereco: "Rua B, 2", bairro: "Centro", cidade: "Santa Luzia", estado: "PB", lat: -6.87, lng: -36.92 },
  { id: "c", nome: "Lanchonete da Esquina", tipo: "lanchonete", endereco: "Rua C, 3", bairro: "Conceição", cidade: "Contagem", estado: "MG", lat: -19.93, lng: -44.05 },
  { id: "d", nome: "Restaurante Sabor", tipo: "restaurante", endereco: "Rua D, 4", bairro: "Savassi", cidade: "Belo Horizonte", estado: "MG", lat: -19.94, lng: -43.93 },
];

const semFiltro = { busca: "", cidade: "", tipos: [] };

describe("textos e links", () => {
  it("semAcento tira acento, maiúscula e espaços das pontas", () => {
    expect(semAcento("  CONCEIÇÃO ")).toBe("conceicao");
  });

  it("formatarDistancia usa metros abaixo de 1 km e vírgula até 10 km", () => {
    expect(formatarDistancia(0.85)).toBe("a 850 m");
    expect(formatarDistancia(1.234)).toBe("a 1,2 km");
    expect(formatarDistancia(12.6)).toBe("a 13 km");
  });

  it("links oficiais do Google Maps", () => {
    expect(linkComoChegar({ lat: -19.9, lng: -44.05 })).toBe(
      "https://www.google.com/maps/dir/?api=1&destination=-19.9,-44.05",
    );
    expect(linkVerNoMaps({ lat: -19.9, lng: -44.05 })).toBe(
      "https://www.google.com/maps/search/?api=1&query=-19.9,-44.05",
    );
  });
});

describe("distância", () => {
  it("BH centro → Contagem centro dá uns 12,6 km", () => {
    expect(distanciaKm({ lat: -19.9167, lng: -43.9345 }, { lat: -19.9321, lng: -44.0539 })).toBeCloseTo(12.6, 0);
  });

  it("ordenarPorDistancia põe o mais perto primeiro", () => {
    const origem = { lat: -19.935, lng: -44.045 }; // perto da lanchonete de Contagem
    const ordenados = ordenarPorDistancia(lista, origem);
    expect(ordenados[0].ponto.id).toBe("c");
    expect(ordenados.map((o) => o.km)).toEqual([...ordenados.map((o) => o.km)].sort((a, b) => a - b));
  });
});

describe("filtrarPontos", () => {
  it("filtros vazios devolvem a lista inteira", () => {
    expect(filtrarPontos(lista, semFiltro)).toHaveLength(4);
  });

  it("busca ignora acento, maiúscula e espaços", () => {
    expect(filtrarPontos(lista, { ...semFiltro, busca: "  conceicao " }).map((p) => p.id)).toEqual(["c"]);
  });

  it("busca também olha nome e cidade", () => {
    expect(filtrarPontos(lista, { ...semFiltro, busca: "farmacia" }).map((p) => p.id)).toEqual(["b"]);
    expect(filtrarPontos(lista, { ...semFiltro, busca: "belo horizonte" }).map((p) => p.id)).toEqual(["d"]);
  });

  it("cidade com o mesmo nome em outro estado não mistura", () => {
    expect(filtrarPontos(lista, { ...semFiltro, cidade: "Santa Luzia|PB" }).map((p) => p.id)).toEqual(["b"]);
  });

  it("vários tipos ao mesmo tempo", () => {
    const ids = filtrarPontos(lista, { ...semFiltro, tipos: ["farmacia", "padaria"] }).map((p) => p.id);
    expect(ids.sort()).toEqual(["a", "b"]);
  });
});

describe("cidadesPorEstado", () => {
  it("agrupa por estado e separa cidades de mesmo nome", () => {
    expect(cidadesPorEstado(lista)).toEqual([
      {
        estado: "MG",
        cidades: [
          { chave: "Belo Horizonte|MG", nome: "Belo Horizonte", quantidade: 1 },
          { chave: "Contagem|MG", nome: "Contagem", quantidade: 1 },
          { chave: "Santa Luzia|MG", nome: "Santa Luzia", quantidade: 1 },
        ],
      },
      { estado: "PB", cidades: [{ chave: "Santa Luzia|PB", nome: "Santa Luzia", quantidade: 1 }] },
    ]);
  });
});

describe("escala: 200 pontos", () => {
  const cidades = ["Contagem", "Betim", "Belo Horizonte", "Ibirité", "Sabará", "Nova Lima", "Santa Luzia", "Vespasiano", "Lagoa Santa", "Sete Lagoas"];
  const muitos: Ponto[] = Array.from({ length: 200 }, (_, i) => ({
    id: `p${i}`,
    nome: `Ponto ${i}`,
    tipo: i % 2 ? "farmacia" : "restaurante",
    endereco: `Rua ${i}`,
    bairro: "Centro",
    cidade: cidades[i % 10],
    estado: "MG",
    lat: -19.9 + (i % 10) * 0.01,
    lng: -44 + Math.floor(i / 10) * 0.01,
  }));

  it("filtrar por cidade devolve os 20 daquela cidade", () => {
    expect(filtrarPontos(muitos, { ...semFiltro, cidade: "Betim|MG" })).toHaveLength(20);
  });

  it("as cidades somam 200 pontos", () => {
    const total = cidadesPorEstado(muitos)
      .flatMap((g) => g.cidades)
      .reduce((soma, c) => soma + c.quantidade, 0);
    expect(total).toBe(200);
  });
});
