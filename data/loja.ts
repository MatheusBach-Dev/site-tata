// Informações da loja usadas em todo o site.
// Mudou telefone, endereço ou horário? Troque só aqui.

export const loja = {
  nome: "Gostosuras da Tatá",
  slogan: "chup chup gourmet",
  descricaoCurta:
    "Chup chup gourmet feito com carinho em Contagem/MG. Adoçando vidas há 15 anos.",

  // Só números, com 55 (Brasil) + DDD na frente.
  whatsapp: "5531995661997",
  whatsappFormatado: "(31) 99566-1997",

  // Links da loja nos apps de entrega (botões da página de cada sabor e faixa do cardápio).
  // Deixar "" esconde o botão.
  ifoodUrl:
    "https://www.ifood.com.br/delivery/contagem-mg/gostosuras-da-tata-monte-castelo/9048260d-8f48-4e21-8c25-ae15efe9edc4",
  // 99Food: ainda sem o link da loja, então o botão fica escondido.
  // Para pegar: no app 99, abrir a loja da Tatá → compartilhar → copiar link, e colar aqui.
  noveNoveFoodUrl: "",

  instagram: "@gostosurasda_tata",
  instagramUrl: "https://www.instagram.com/gostosurasda_tata/",

  endereco: {
    rua: "Rua Itambé, 232",
    bairro: "Monte Castelo",
    cidade: "Contagem/MG",
  },

  horarios: {
    curto: "Seg a Sex 11h às 19h  •  Sábado 11h às 18h",
    semana: "Segunda a sexta: 11h às 19h",
    sabado: "Sábado: 11h às 18h",
    retirada: "Seg a Sex 11h às 19h • Sáb 11h às 18h",
  },
} as const;

export const enderecoCompleto = `${loja.endereco.rua} — ${loja.endereco.bairro}, ${loja.endereco.cidade}`;
