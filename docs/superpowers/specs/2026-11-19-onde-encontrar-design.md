# Página Onde Encontrar — design

Data: 19/11/2026 · Rota: `/onde-encontrar` · Referência: prints do Figma "Onde Encontrar" (desktop e celular)

## Objetivo

Mostrar **onde comprar os chup-chups da Tatá**:

1. **Nossa loja** — a loja dela (um endereço só), com mapa, horário e "Como chegar".
2. **Pontos de revenda** — todos os comércios que têm o freezer da Tatá, num buscador com
   mapa que continue simples de usar com **10, 50 ou 200 pontos**, sem precisar refazer a página.

Quem visita precisa: ver no mapa que "tem um ponto aqui, outro ali", achar o ponto da
**sua cidade** ou **mais perto de onde está**, e abrir o ponto escolhido no **Google Maps**.

**Fora deste trabalho:** a página Seja Revendedor (talvez com formulário, depende do que a Tatá
pedir), o painel admin, busca por endereço digitado (exigiria API paga do Google) e o rodapé
compacto do celular que aparece no print.

## Decisões

| Assunto | Decisão | Por quê |
|---|---|---|
| Mapa | **Leaflet + OpenStreetMap** (opção A) | Mostra todos os pinos, agrupa os próximos, grátis, sem chave nem cartão |
| Google Maps | Botões **"Como chegar"** e **"Ver no Google Maps"** em cada ponto e na loja | A pessoa abre o app do Google já com a rota |
| "Onde eu moro" | Botão **"Perto de mim"** (localização do celular) + filtro de **cidade** + **busca** por nome, bairro ou cidade | Funciona sem API paga |
| Dados agora | **No máximo 10 pontos fictícios** em `data/pontos.ts`, marcados para trocar | O Matheus vai pegar os reais com a Tatá |
| Dados depois | Mesma estrutura vira tabela no Supabase (painel admin) | As páginas não mudam |
| Cores e fontes | Paleta suave já usada no site (`app/globals.css`) | Igual ao resto do site e ao print |

## Estrutura da página

### 1. Topo (igual ao print)
"onde encontrar" (letra cursiva, rosa) · **Pertinho de você** (Fraunces, vinho) · texto
"Retire na nossa loja em Contagem ou procure o freezer da Tatá em restaurantes, farmácias e
lanchonetes da região."

### 2. Dois cards lado a lado (igual ao print; um embaixo do outro no celular)

**Nossa loja**
- No lugar do mapa desenhado do print: **mapa de verdade** (Leaflet) com **um pino** com a logo
  da Tatá e a etiqueta "Gostosuras da Tatá". Mapa parado (sem zoom pela rolagem da página).
- Endereço e horário de funcionamento, com ícones, como no print.
- Botões **"Como chegar"** (contorno, abre a rota no Google Maps) e **"Chamar no WhatsApp"** (verde).

**Pontos de revenda**
- Foto do freezer com o selo "Procure o freezer da Tatá". Foto em `public/onde-encontrar/freezer.jpg`;
  sem a foto, aparece um desenho no lugar (mesmo padrão da Nossa História).
- Texto "Os chup-chups da Tatá também estão em freezers espalhados pela cidade. Procure em:"
- Chips dos tipos (Restaurantes, Farmácias, Lanchonetes, Mercadinhos…), gerados a partir dos dados.
- Botão verde **"Qual o ponto mais perto de mim?"** → rola até o buscador (seção 3).

### 3. Buscador de pontos de revenda (seção nova, `id="pontos"`)

**Controles**
- Busca por texto: nome, bairro ou cidade. Ignora acentos e maiúsculas ("conceicao" acha "Conceição").
- Seletor de cidade: "Todas as cidades" + cidades **agrupadas por estado**, montadas a partir dos dados.
- Chips de tipo (pode marcar vários; nenhum marcado = todos).
- Botão **"Perto de mim"**: pede a localização ao navegador; com permissão, ordena por distância,
  mostra "a 1,2 km" em cada ponto e um pino "você está aqui" no mapa. A localização fica só no
  aparelho da pessoa e não é salva nem enviada.
- Texto com o resultado: "7 pontos em Contagem" e o link "Limpar filtros".

**Resultado**
- **Computador:** lista à esquerda (rolagem própria) e mapa à direita, lado a lado.
- **Celular:** abas **Lista | Mapa**.
- O mapa mostra **todos os pontos filtrados**; os próximos viram bolinhas com o número de pontos,
  que se abrem com zoom. O mapa se ajusta para caber os pontos filtrados.
- A lista mostra **12** e o botão **"Ver mais"** (+12). Volta para 12 quando o filtro muda.
- Item da lista: nome, tipo, endereço, bairro/cidade, distância (se "Perto de mim" ativo),
  **"Ver no mapa"** e **"Como chegar"**.
- "Ver no mapa" centraliza o pino e abre o balão dele (no celular, troca para a aba Mapa).
  Tocar num pino destaca o item na lista.
- Balão do pino: nome, endereço e "Como chegar".
- Zoom pelos botões + e − ou com dois dedos; a rodinha do mouse **não** dá zoom, para o mapa
  não "prender" a rolagem da página.

**Quando não há resultado:** "Não achamos um ponto com esses filtros." + "Limpar filtros" +
botão verde "Perguntar para a Tatá" (WhatsApp: "Oi, Tatá! Vim pelo site e queria saber qual o ponto
de revenda mais perto de mim.").

**Quando ainda não há nenhum ponto cadastrado:** o buscador some e fica só o card "Pontos de
revenda" com o botão do WhatsApp.

### 4. Chamada final e rodapé
Os mesmos das outras páginas.

## Dados

`data/pontos.ts`:

```ts
type TipoPonto = "restaurante" | "farmacia" | "lanchonete" | "mercadinho" | "padaria" | "outro";

type Ponto = {
  id: string;        // ex.: "padaria-pao-quente-eldorado"
  nome: string;      // nome do estabelecimento
  tipo: TipoPonto;
  endereco: string;  // rua e número
  bairro: string;
  cidade: string;
  estado: string;    // sigla: "MG", "SP"…
  lat: number;       // coordenadas do Google Maps
  lng: number;
};
```

- Lista de tipos com rótulo e ícone no mesmo arquivo; os chips só mostram tipos que existem nos dados.
- **Até 10 pontos fictícios** (Contagem, BH, Betim e 1 em outro estado), com o aviso
  `// FICTÍCIOS: trocar pelos pontos reais da Tatá` no topo.
- Como pegar as coordenadas (vai num comentário do arquivo): no Google Maps do computador,
  clicar com o botão direito no lugar → a primeira linha do menu são as coordenadas
  (ex.: `-19.9312, -44.0536`) → clicar copia.

`data/loja.ts`: ganha `coordenadas: { lat, lng }` da loja. Até chegar o link da Tatá, ficam
coordenadas aproximadas da Rua Itambé, 232, com o aviso de trocar.

## Como o código fica dividido

| Arquivo | Faz |
|---|---|
| `data/pontos.ts` | Tipos de ponto e a lista de pontos |
| `lib/mapa.ts` | Funções puras: distância em km, "a 1,2 km", links do Google Maps, filtro (busca/cidade/tipo), cidades agrupadas por estado, texto sem acento |
| `components/onde-encontrar/CardLoja.tsx` | Card "Nossa loja" |
| `components/onde-encontrar/CardRevenda.tsx` | Card "Pontos de revenda" (foto, chips, botão) |
| `components/onde-encontrar/BuscadorPontos.tsx` | Client: controles, lista, abas e estado do ponto escolhido |
| `components/onde-encontrar/Mapa.tsx` | Client: mapa Leaflet (pinos, agrupamento, "você está aqui", foco no ponto escolhido) |
| `app/onde-encontrar/page.tsx` | Página: junta tudo, título e descrição para o Google |

- O mapa só carrega no navegador (`next/dynamic` sem SSR), com um fundo cor areia enquanto carrega.
- Os pinos são desenhados em SVG nas cores da Tatá (vinho para revenda, mostarda com a logo para a loja).
- O endereço das imagens do mapa (OpenStreetMap) fica numa constante só, com a atribuição
  "© OpenStreetMap". Se um dia o site tiver muito acesso, troca-se o provedor nessa linha.
- Links do Google Maps (formato oficial, abre o app no celular):
  - Como chegar: `https://www.google.com/maps/dir/?api=1&destination=LAT,LNG`
  - Ver no mapa: `https://www.google.com/maps/search/?api=1&query=LAT,LNG`

## Erros e casos especiais

- Localização negada: "Sem a localização, escolha sua cidade ou busque pelo bairro." O resto continua funcionando.
- Navegador sem localização ou demora: mesma mensagem, depois de 10 segundos.
- Mapa que não carregou (sem internet): a lista continua completa; o mapa mostra o fundo areia.
- Mensagens de erro e o número de resultados são lidos por leitores de tela (`aria-live`).

## Teste

- `npm run build` e `npm run lint` sem erros.
- Teste no navegador (Playwright) com o site de produção:
  - total de pontos e números certos ao filtrar por cidade, tipo e busca (incluindo busca sem acento);
  - "Perto de mim" com localização simulada: o ponto mais perto fica em primeiro e aparece a distância;
  - "Ver no mapa" troca para a aba Mapa no celular;
  - nenhuma página rola para o lado no celular.
- **Escala:** build local temporário com **200 pontos gerados** (não vai para o repositório) para
  conferir lista com "Ver mais", agrupamento no mapa e que nada trava.
- Prints no computador e no celular. Nesta sessão as imagens do mapa não carregam (rede
  bloqueada), então o fundo do mapa aparece cinza; no computador do Matheus aparece completo.
