# Gostosuras da Tatá — site

Site de catálogo do chup chup gourmet da Tatá (Contagem/MG), feito em Next.js.
O pedido é feito pelo WhatsApp com a mensagem já escrita.

## Rodar no computador

Precisa do Node.js 20 ou mais novo.

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Onde mexer

| O que | Arquivo |
| --- | --- |
| Telefone, endereço, horários, Instagram | `data/loja.ts` |
| Sabores (nome, descrição, mais pedido, esgotado) | `data/sabores.ts` |
| Linhas e preços (Gourmet R$ 9, Casquinha R$ 10, Premium R$ 11, Cremoso R$ 4,50) | `data/linhas.ts` |
| Links do iFood e do 99Food (botões aparecem quando preenchidos) | `data/loja.ts` |
| Links do menu | `data/menu.ts` |
| Mensagens que vão para o WhatsApp | `lib/whatsapp.ts` |
| Cores e fontes (identidade visual do Figma) | `app/globals.css` (bloco `:root`) e as fontes em `app/layout.tsx` |
| Página Início | `app/page.tsx` e `components/home/` |
| Faixa de cima, cabeçalho, rodapé | `components/FaixaInfo.tsx`, `Cabecalho.tsx`, `Rodape.tsx` |
| Janela de pedido do WhatsApp | `components/Pedido.tsx` |
| Pontos de revenda (nome, endereço, tipo e coordenadas) | `data/pontos.ts` |
| Posição da loja no mapa | `data/loja.ts` (`coordenadas`) |
| Página Onde Encontrar (mapa e buscador) | `app/onde-encontrar/` e `components/onde-encontrar/` |

## Fotos e logo

- **Fotos dos sabores:** salve em `public/sabores/` com o `slug` do sabor como nome
  (ex.: `public/sabores/pudim.jpg`; vale `.jpg`, `.png` ou `.webp`). O site encontra sozinho.
  Sem foto, aparece um desenho com a cor da linha. Dica: fotos quadradas, ~800 px, até 300 KB.
- **Mais pedido:** `maisPedido: true` no sabor mostra a etiqueta no card e na página do sabor.
- **Esgotado:** `esgotado: true` deixa a foto apagada e sem cor.
- **Logo:** coloque em `public/logo.png` e siga o comentário em `components/Logo.tsx`.

## Testes

```bash
npm test
```

Confere as funções do mapa e os dados de `data/pontos.ts` (avisa se alguma coordenada estiver fora do Brasil, id repetido ou tipo errado). Rode depois de colocar os pontos reais.

## Status

- [x] 1. Início (desktop e celular)
- [x] 2. Sabores (lista com filtros por linha + página de cada sabor em `/sabores/<slug>`)
- [x] 3. Nossa História
- [x] 4. Onde Encontrar (loja + buscador de pontos de revenda com mapa; pontos ainda fictícios)
- [ ] 5. Seja Revendedor

As páginas que faltam mostram por enquanto a tela "Esta página ainda está no forno".
