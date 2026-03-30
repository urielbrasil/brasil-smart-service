import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Brasil Smart Service",
  description:
    "Automação inteligente, bots WhatsApp e soluções digitais para empresas.",

  openGraph: {
    title: "Brasil Smart Service",
    description:
      "Automação inteligente e soluções digitais para o seu negócio.",
    url: "https://www.brasilsmart.com",
    siteName: "Brasil Smart Service",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "pt_BR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
};

export default function Header() {
  return (
    <header>
      <Image
        src="/icon.png"
        alt="Brasil Smart Service"
        width={40}
        height={40}
      />
    </header>
  );
}