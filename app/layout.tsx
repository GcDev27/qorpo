import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Estúdio Qorpo | Tatuagem em Fortaleza",
  description:
    "Estúdio Qorpo: tatuagem autoral em Fortaleza. Conheça os tatuadores, veja os trabalhos e peça seu orçamento pelo WhatsApp.",
};

export const viewport: Viewport = {
  themeColor: "#0b0a09",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="granulado">{children}</body>
    </html>
  );
}
