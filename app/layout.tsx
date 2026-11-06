import type { Metadata, Viewport } from "next";
// Fontes da identidade visual: Fraunces (títulos; 900 = Black, usado no nome da marca),
// Dancing Script (detalhes), Poppins (textos)
import "@fontsource/fraunces/700.css";
import "@fontsource/fraunces/800.css";
import "@fontsource/fraunces/900.css";
import "@fontsource/dancing-script/600.css";
import "@fontsource/dancing-script/700.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "./globals.css";

import { Cabecalho } from "@/components/Cabecalho";
import { FaixaInfo } from "@/components/FaixaInfo";
import { PedidoProvider } from "@/components/Pedido";
import { Rodape } from "@/components/Rodape";
import { WhatsAppFlutuante } from "@/components/WhatsAppFlutuante";

export const metadata: Metadata = {
  metadataBase: new URL("https://gostosurasdatata.com.br"),
  title: {
    default: "Gostosuras da Tatá | Chup chup gourmet em Contagem/MG",
    template: "%s | Gostosuras da Tatá",
  },
  description:
    "Chup chup gourmet feito à mão, com muito recheio e carinho em cada saquinho. Peça pelo WhatsApp e retire na loja em Contagem/MG.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Gostosuras da Tatá",
  },
};

export const viewport: Viewport = {
  themeColor: "#7a2e37",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body>
        <PedidoProvider>
          <FaixaInfo />
          <Cabecalho />
          <main>{children}</main>
          <Rodape />
          <WhatsAppFlutuante />
        </PedidoProvider>
      </body>
    </html>
  );
}
