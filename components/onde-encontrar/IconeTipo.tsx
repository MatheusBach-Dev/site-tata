import type { TipoPonto } from "@/data/pontos";
import { IconCart, IconCoffee, IconCroissant, IconPill, IconStore, IconUtensils } from "../icons";

const icones = {
  restaurante: IconUtensils,
  farmacia: IconPill,
  lanchonete: IconCoffee,
  mercadinho: IconCart,
  padaria: IconCroissant,
  outro: IconStore,
} satisfies Record<TipoPonto, unknown>;

/** Ícone de cada tipo de comércio (restaurante = talheres, farmácia = pílula…). */
export function IconeTipo({ tipo, size = 18 }: { tipo: TipoPonto; size?: number }) {
  const Icone = icones[tipo];
  return <Icone size={size} />;
}
