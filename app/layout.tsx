import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brasil Smart Service",
  description:
    "Automação inteligente para hotéis e pousadas com atendimento via WhatsApp, reservas e implantação guiada.",
  metadataBase: new URL("https://www.brasilsmart.com"),
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Brasil Smart Service",
    description:
      "Automação inteligente e soluções digitais para o atendimento do seu hotel.",
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
      "Automação inteligente e soluções digitais para o atendimento do seu hotel.",
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
        <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="flex items-center gap-3 text-sm font-semibold tracking-[0.24em] text-white uppercase"
            >
              <Image
                src="/icon.png"
                alt="Brasil Smart Service"
                width={40}
                height={40}
                priority
                className="rounded-xl"
              />
              Brasil Smart Service
            </Link>

            <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
              <Link href="/demonstracao" target="_blank" rel="noreferrer">
                Demonstração
              </Link>
              <Link href="/whatsapp" target="_blank" rel="noreferrer">
                WhatsApp
              </Link>
              <Link href="/comecar" target="_blank" rel="noreferrer">
                Começar
              </Link>
            </nav>
          </div>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
