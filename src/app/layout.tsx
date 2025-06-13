// src/app/layout.tsx
import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";

// Configure a nova fonte
const onest = Onest({ subsets: ["latin"], weight: ["400", "500", "700", "900"] });

export const metadata: Metadata = {
  title: "Gerador de Conteúdo com IA",
  description: "Crie posts para redes sociais de forma rápida e eficiente.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${onest.className} bg-slate-50 text-slate-800`}>
        {children}
      </body>
    </html>
  );
}