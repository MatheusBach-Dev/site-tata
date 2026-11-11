import { loja } from "@/data/loja";

/** Monta o link que abre o WhatsApp da Tatá com a mensagem já escrita. */
export function linkWhatsApp(mensagem: string): string {
  return `https://wa.me/${loja.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

export const mensagens = {
  pedido: "Oi, Tatá! Vim pelo site e quero fazer um pedido.",
  cardapio:
    "Oi, Tatá! Vim pelo site e quero receber o cardápio completo com os preços.",
  sabor: (nome: string, linha?: string) =>
    `Oi, Tatá! Vim pelo site e quero pedir: 1x ${nome}${linha ? ` (${linha})` : ""}. Vou retirar na loja!`,
  duvida: "Oi, Tatá! Vim pelo site e queria tirar uma dúvida sobre os sabores.",
};
