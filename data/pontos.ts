// Pontos de revenda: comércios que têm o freezer da Tatá.
//
// FICTÍCIOS: trocar pelos pontos reais da Tatá
//
// Para cada ponto real, a Tatá manda: nome, endereço completo, o link do Google Maps e o tipo.
//
// Como pegar as coordenadas (lat e lng) no Google Maps do computador:
// 1. Abra o link que a Tatá mandou (ou procure o lugar no Google Maps).
// 2. Clique com o botão DIREITO em cima do lugar.
// 3. A primeira linha do menu são as coordenadas, ex.: -19.9312, -44.0536 → clique para copiar.
// 4. O primeiro número é a lat e o segundo é a lng.
// O `npm test` avisa se alguma coordenada estiver fora do Brasil (número trocado ou digitado errado).

export type TipoPonto = "restaurante" | "farmacia" | "lanchonete" | "mercadinho" | "padaria" | "outro";

/** Nome de cada tipo. `plural` é o texto dos filtros e dos selos da página. */
export const tiposPonto: Record<TipoPonto, { rotulo: string; plural: string }> = {
  restaurante: { rotulo: "Restaurante", plural: "Restaurantes" },
  farmacia: { rotulo: "Farmácia", plural: "Farmácias" },
  lanchonete: { rotulo: "Lanchonete", plural: "Lanchonetes" },
  mercadinho: { rotulo: "Mercadinho", plural: "Mercadinhos" },
  padaria: { rotulo: "Padaria", plural: "Padarias" },
  outro: { rotulo: "Outro", plural: "Outros" },
};

export type Ponto = {
  /** Identificador único, sem acento nem espaço. Ex.: "padaria-pao-quente-eldorado" */
  id: string;
  /** Nome do estabelecimento */
  nome: string;
  tipo: TipoPonto;
  /** Rua e número */
  endereco: string;
  bairro: string;
  cidade: string;
  /** Sigla do estado: "MG", "SP"… */
  estado: string;
  lat: number;
  lng: number;
};

export const pontos: Ponto[] = [
  // Contagem
  { id: "padaria-pao-quente-eldorado", nome: "Padaria Pão Quente", tipo: "padaria", endereco: "Av. João César de Oliveira, 1500", bairro: "Eldorado", cidade: "Contagem", estado: "MG", lat: -19.9395, lng: -44.0446 },
  { id: "farmacia-bem-estar-industrial", nome: "Farmácia Bem Estar", tipo: "farmacia", endereco: "Rua Rio Comprido, 300", bairro: "Industrial", cidade: "Contagem", estado: "MG", lat: -19.9558, lng: -44.0064 },
  { id: "lanchonete-do-ze-riacho", nome: "Lanchonete do Zé", tipo: "lanchonete", endereco: "Rua Uberaba, 85", bairro: "Riacho das Pedras", cidade: "Contagem", estado: "MG", lat: -19.9256, lng: -44.0322 },
  { id: "mercadinho-boa-compra-inconfidentes", nome: "Mercadinho Boa Compra", tipo: "mercadinho", endereco: "Rua Joaquim Camargos, 410", bairro: "Inconfidentes", cidade: "Contagem", estado: "MG", lat: -19.9131, lng: -44.0672 },
  { id: "restaurante-sabor-de-minas-centro-contagem", nome: "Restaurante Sabor de Minas", tipo: "restaurante", endereco: "Rua Dr. Cassiano, 120", bairro: "Centro", cidade: "Contagem", estado: "MG", lat: -19.9168, lng: -44.0832 },
  // Belo Horizonte
  { id: "restaurante-cantinho-mineiro-savassi", nome: "Restaurante Cantinho Mineiro", tipo: "restaurante", endereco: "Rua Pernambuco, 900", bairro: "Savassi", cidade: "Belo Horizonte", estado: "MG", lat: -19.9381, lng: -43.9352 },
  { id: "lanchonete-sabor-caseiro-sao-jose", nome: "Lanchonete Sabor Caseiro", tipo: "lanchonete", endereco: "Rua Itaipu, 210", bairro: "São José", cidade: "Belo Horizonte", estado: "MG", lat: -19.8665, lng: -43.9746 },
  { id: "farmacia-vida-barreiro", nome: "Farmácia Vida", tipo: "farmacia", endereco: "Av. Sinfrônio Brochado, 640", bairro: "Barreiro", cidade: "Belo Horizonte", estado: "MG", lat: -19.9763, lng: -44.0204 },
  // Betim
  { id: "mercadinho-bom-preco-centro-betim", nome: "Mercadinho Bom Preço", tipo: "mercadinho", endereco: "Rua do Rosário, 55", bairro: "Centro", cidade: "Betim", estado: "MG", lat: -19.9678, lng: -44.1984 },
  // Outro estado
  { id: "emporio-doce-vida-vila-mariana", nome: "Empório Doce Vida", tipo: "outro", endereco: "Rua Domingos de Morais, 1200", bairro: "Vila Mariana", cidade: "São Paulo", estado: "SP", lat: -23.5893, lng: -46.6345 },
];
