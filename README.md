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
| Sabores (nome, descrição, foto, esgotado) | `data/sabores.ts` |
| Links do menu | `data/menu.ts` |
| Mensagens que vão para o WhatsApp | `lib/whatsapp.ts` |
| Cores e fontes (identidade visual do Figma) | `app/globals.css` (bloco `:root`) e as fontes em `app/layout.tsx` |
| Página Início | `app/page.tsx` e `components/home/` |
| Faixa de cima, cabeçalho, rodapé | `components/FaixaInfo.tsx`, `Cabecalho.tsx`, `Rodape.tsx` |
| Janela de pedido do WhatsApp | `components/Pedido.tsx` |

## Fotos e logo

- **Fotos dos sabores:** coloque em `public/sabores/` (ex.: `public/sabores/pudim.jpg`)
  e preencha o campo `foto: "/sabores/pudim.jpg"` do sabor em `data/sabores.ts`.
  Sem foto, aparece um desenho com a cor do sabor.
- **Esgotado:** `esgotado: true` deixa a foto apagada e sem cor.
- **Logo:** coloque em `public/logo.png` e siga o comentário em `components/Logo.tsx`.

## Status

- [x] 1. Início (desktop e celular)
- [ ] 2. Sabores
- [ ] 3. Nossa História
- [ ] 4. Onde Encontrar
- [ ] 5. Seja Revendedor

As páginas que faltam mostram por enquanto a tela "Esta página ainda está no forno".
