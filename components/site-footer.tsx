"use client";

import Link from "next/link";
import { contactEmail, siteUrl } from "@/app/site-data";
import { translations } from "@/app/translations";
import { useLanguage } from "@/components/language-provider";

export function SiteFooter() {
  const { locale } = useLanguage();
  const copy = translations[locale];

  return (
    <footer className="border-t border-slate-200 bg-slate-950 px-6 py-10 text-sm text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-white">
            © {new Date().getFullYear()} Brasil Smart Service
          </p>
          <p>{copy.footer}</p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link href={siteUrl}>brasilsmart.com</Link>
          <Link href={`mailto:${contactEmail}`}>{contactEmail}</Link>
        </div>
      </div>
    </footer>
  );
}
