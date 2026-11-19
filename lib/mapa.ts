// Funções do mapa e do buscador de pontos de revenda.
// Tudo aqui é "puro" (sem tela, sem internet), por isso é testado em lib/mapa.test.ts.

import { tiposPonto, type Ponto, type TipoPonto } from "@/data/pontos";

export type Coordenada = { lat: number; lng: number };

/** cidade = "" mostra todas; senão é a chaveCidade, ex.: "Contagem|MG" */
export type Filtros = { busca: string; cidade: string; tipos: TipoPonto[] };

/** "  CONCEIÇÃO " → "conceicao" */
export function semAcento(texto: string): string {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}

/** Cidade + estado juntos, para não misturar cidades de mesmo nome em estados diferentes. */
export function chaveCidade(p: Pick<Ponto, "cidade" | "estado">): string {
  return `${p.cidade}|${p.estado}`;
}

export function cidadesPorEstado(
  pontos: Ponto[],
): { estado: string; cidades: { chave: string; nome: string; quantidade: number }[] }[] {
  const porEstado = new Map<string, Map<string, { chave: string; nome: string; quantidade: number }>>();
  for (const p of pontos) {
    const cidades = porEstado.get(p.estado) ?? new Map();
    const chave = chaveCidade(p);
    const cidade = cidades.get(chave) ?? { chave, nome: p.cidade, quantidade: 0 };
    cidade.quantidade += 1;
    cidades.set(chave, cidade);
    porEstado.set(p.estado, cidades);
  }
  const ordem = (a: string, b: string) => a.localeCompare(b, "pt-BR");
  return [...porEstado.entries()]
    .sort(([a], [b]) => ordem(a, b))
    .map(([estado, cidades]) => ({
      estado,
      cidades: [...cidades.values()].sort((a, b) => ordem(a.nome, b.nome)),
    }));
}

/** Tipos que aparecem nos pontos, na ordem da lista de tipos. */
export function tiposPresentes(pontos: Ponto[]): TipoPonto[] {
  const presentes = new Set(pontos.map((p) => p.tipo));
  return (Object.keys(tiposPonto) as TipoPonto[]).filter((t) => presentes.has(t));
}

/**
 * Busca em nome, bairro, cidade e tipo. Cada palavra digitada precisa aparecer,
 * em qualquer ordem: "padaria eldorado" e "eldorado padaria" acham o mesmo ponto.
 */
export function filtrarPontos(pontos: Ponto[], filtros: Filtros): Ponto[] {
  const palavras = semAcento(filtros.busca).split(/\s+/).filter(Boolean);
  return pontos.filter((p) => {
    if (filtros.cidade && chaveCidade(p) !== filtros.cidade) return false;
    if (filtros.tipos.length > 0 && !filtros.tipos.includes(p.tipo)) return false;
    if (palavras.length > 0) {
      const tipo = tiposPonto[p.tipo];
      const texto = semAcento(`${p.nome} ${p.bairro} ${p.cidade} ${tipo.rotulo} ${tipo.plural}`);
      if (!palavras.every((palavra) => texto.includes(palavra))) return false;
    }
    return true;
  });
}

/** Distância em linha reta (fórmula de haversine), em km. */
export function distanciaKm(a: Coordenada, b: Coordenada): number {
  const rad = (graus: number) => (graus * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

export function ordenarPorDistancia(pontos: Ponto[], origem: Coordenada): { ponto: Ponto; km: number }[] {
  return pontos.map((ponto) => ({ ponto, km: distanciaKm(origem, ponto) })).sort((a, b) => a.km - b.km);
}

/** 0.85 → "a 850 m" · 1.234 → "a 1,2 km" · 12.6 → "a 13 km" */
export function formatarDistancia(km: number): string {
  if (km < 1) return `a ${Math.round((km * 1000) / 10) * 10} m`;
  if (km < 10) return `a ${km.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} km`;
  return `a ${Math.round(km)} km`;
}

/** Abre o Google Maps (app ou site) com a rota até o lugar. */
export function linkComoChegar(c: Coordenada): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${c.lat},${c.lng}`;
}

/** Abre o lugar no Google Maps. */
export function linkVerNoMaps(c: Coordenada): string {
  return `https://www.google.com/maps/search/?api=1&query=${c.lat},${c.lng}`;
}

/** Confere se a coordenada cai dentro do Brasil (pega número trocado ou digitado errado). */
export function coordenadaNoBrasil(c: Coordenada): boolean {
  return c.lat >= -34 && c.lat <= 6 && c.lng >= -74 && c.lng <= -28;
}
