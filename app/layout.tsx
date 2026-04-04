import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/language-provider";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Brasil Smart Service",
  description:
    "Bot inteligente para negocios no WhatsApp com atendimento, qualificação e vendas automatizadas.",
  metadataBase: new URL("https://www.brasilsmart.com"),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Brasil Smart Service",
    description:
      "Bot inteligente para negocios com atendimento automatizado no WhatsApp.",
    url: "https://www.brasilsmart.com",
    siteName: "Brasil Smart Service",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brasil Smart Service",
    description:
      "Bot inteligente para negocios com atendimento automatizado no WhatsApp.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
        <LanguageProvider>
          <SiteHeader />
          <main>{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}
