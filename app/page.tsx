"use client";

import Image from "next/image";
import { MessageCircle, Bot, BriefcaseBusiness, CheckCircle, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { CtaLink } from "@/components/cta-link";
import { SiteFooter } from "@/components/site-footer";
import { mailLinks } from "./site-data";
import { translations } from "./translations";
import { useLanguage } from "@/components/language-provider";

const icons = [MessageCircle, BriefcaseBusiness, Bot];

export default function BrasilSmartServiceWebsite() {
  const { locale } = useLanguage();
  const copy = translations[locale];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_28%),linear-gradient(180deg,_#f8fafc_0%,_#eef6f1_42%,_#ffffff_100%)] pt-28 text-slate-900">
      <section className="overflow-hidden bg-[linear-gradient(135deg,_#065f46_0%,_#022c22_52%,_#020617_100%)] px-6 py-20 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div className="text-center md:text-left">
            <div className="mb-6 flex justify-center md:justify-start">
              <div className="w-full max-w-[220px] md:max-w-[260px]">
                <Image
                  src="/og-image.png"
                  alt="Logo e identidade visual da Brasil Smart Service"
                  width={1200}
                  height={630}
                  priority
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>

            <div className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium tracking-[0.24em] uppercase text-emerald-100">
              {copy.hero.badge}
            </div>

            <h1 className="mb-6 max-w-xl text-4xl font-bold leading-tight md:text-6xl">
              {copy.hero.title}
            </h1>

            <p className="mb-8 max-w-xl text-lg text-emerald-50/90 md:max-w-xl">
              {copy.hero.description}
            </p>

            <div className="flex flex-wrap justify-center gap-4 md:justify-start">
              <CtaLink href="/demonstracao" variant="primary">
                {copy.hero.primaryCta}
              </CtaLink>
              <CtaLink href="/whatsapp" variant="secondary">
                {copy.hero.secondaryCta}
              </CtaLink>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-[2rem] border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur"
          >
            <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            <Bot size={60} />
            <h2 className="mt-4 text-2xl font-semibold">{copy.hero.cardTitle}</h2>
            <p className="mt-3 text-sm leading-6 text-emerald-50/85">
              {copy.hero.cardDescription}
            </p>

            <div className="mt-8 grid gap-3 rounded-3xl bg-slate-950/30 p-4 text-sm">
              {copy.hero.cardItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3"
                >
                  <span>{item}</span>
                  <ArrowUpRight size={18} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-12 text-center text-3xl font-bold">
          {copy.hero.howItWorksTitle}
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {copy.hero.steps.map((item, index) => {
            const Icon = icons[index];

            return (
              <div
                key={item.title}
                className="rounded-[1.75rem] border border-emerald-100 bg-white p-6 text-center shadow-[0_18px_50px_rgba(15,23,42,0.06)]"
              >
                <Icon className="mx-auto text-emerald-600" size={40} />
                <h3 className="mt-4 font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold">
            {copy.hero.benefitsTitle}
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {copy.hero.benefits.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4"
              >
                <CheckCircle className="text-emerald-600" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 rounded-[2rem] bg-emerald-700 px-8 py-14 text-center text-white shadow-[0_24px_70px_rgba(5,150,105,0.35)]">
          <h2 className="text-3xl font-bold">{copy.hero.ctaTitle}</h2>

          <p className="max-w-2xl text-emerald-50/90">{copy.hero.ctaDescription}</p>

          <div className="flex flex-wrap justify-center gap-4">
            <CtaLink href="/comecar" variant="primary">
              {copy.hero.ctaButton}
            </CtaLink>
            <CtaLink href={mailLinks.sales} variant="secondary" external>
              {copy.hero.ctaProposal}
            </CtaLink>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
