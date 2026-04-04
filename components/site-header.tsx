"use client";

import Image from "next/image";
import Link from "next/link";
import { locales, translations } from "@/app/translations";
import { useLanguage } from "@/components/language-provider";

export function SiteHeader() {
  const { locale, setLocale } = useLanguage();
  const copy = translations[locale];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-3 text-sm font-semibold tracking-[0.18em] text-white uppercase"
        >
          <Image
            src="/icon.png"
            alt="Brasil Smart Service"
            width={40}
            height={40}
            priority
            className="rounded-xl"
          />
          <span className="hidden sm:inline">Brasil Smart Service</span>
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-5 text-sm text-white/80 md:flex">
            <Link href="/demonstracao">{copy.nav.demo}</Link>
            <Link href="/whatsapp">{copy.nav.whatsapp}</Link>
            <Link href="/comecar">{copy.nav.start}</Link>
          </nav>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1">
            <span className="hidden px-2 text-xs font-medium text-white/60 lg:inline">
              {copy.nav.language}
            </span>
            {locales.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => setLocale(item.code)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  locale === item.code
                    ? "bg-white text-slate-950"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
