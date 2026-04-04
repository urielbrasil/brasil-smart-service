"use client";

import { CheckCircle2, Settings2, MailPlus } from "lucide-react";
import { CtaLink } from "@/components/cta-link";
import { SiteFooter } from "@/components/site-footer";
import { useLanguage } from "@/components/language-provider";
import { mailLinks } from "../site-data";
import { translations } from "../translations";

export default function ComecarPage() {
  const { locale } = useLanguage();
  const copy = translations[locale].start;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_28%),linear-gradient(180deg,_#f8fafc_0%,_#eef6f1_42%,_#ffffff_100%)] pt-28 text-slate-900">
      <section className="overflow-hidden bg-[linear-gradient(135deg,_#065f46_0%,_#022c22_52%,_#020617_100%)] px-6 py-20 text-white">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-white/10 bg-white/10 px-8 py-14 shadow-[0_24px_80px_rgba(15,23,42,0.24)] backdrop-blur md:px-14">
          <div className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.24em] uppercase text-emerald-100">
            {copy.badge}
          </div>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
            {copy.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-emerald-50/90">{copy.intro}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <CtaLink href={mailLinks.onboarding} external>{copy.primary}</CtaLink>
            <CtaLink href="/demonstracao" variant="secondary">
              {copy.secondary}
            </CtaLink>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-6 pb-20 md:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-emerald-100 bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
          <div className="mb-5 flex items-center gap-3">
            <Settings2 className="text-emerald-600" />
            <h2 className="text-2xl font-semibold">{copy.checklistTitle}</h2>
          </div>

          <div className="grid gap-4">
            {copy.checklist.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 text-sm leading-6 text-slate-700"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,_#065f46_0%,_#022c22_52%,_#020617_100%)] p-8 text-white shadow-[0_24px_70px_rgba(5,150,105,0.25)]">
          <MailPlus className="text-emerald-300" />
          <h2 className="mt-4 text-2xl font-semibold">{copy.nextTitle}</h2>
          <p className="mt-3 text-sm leading-6 text-emerald-50/85">
            {copy.nextDescription}
          </p>
          <CtaLink href={mailLinks.onboarding} external variant="ghost" className="mt-6 w-full">
            {copy.nextButton}
          </CtaLink>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
