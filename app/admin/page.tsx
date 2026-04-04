"use client";

import { ShieldCheck, Users, Settings, MessageSquareText } from "lucide-react";
import { AdminLogoutButton } from "@/components/admin-logout-button";
import { useLanguage } from "@/components/language-provider";
import { translations } from "@/app/translations";

export default function AdminDashboardPage() {
  const { locale } = useLanguage();
  const copy = translations[locale].admin.dashboard;
  const panels = [
    {
      title: copy.panels[0].title,
      description: copy.panels[0].description,
      icon: Users,
    },
    {
      title: copy.panels[1].title,
      description: copy.panels[1].description,
      icon: Settings,
    },
    {
      title: copy.panels[2].title,
      description: copy.panels[2].description,
      icon: MessageSquareText,
    },
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_28%),linear-gradient(180deg,_#f8fafc_0%,_#eef6f1_42%,_#ffffff_100%)] px-6 pb-20 pt-32 text-slate-900 md:pt-36">
      <section className="mx-auto max-w-6xl rounded-[2.5rem] bg-[linear-gradient(135deg,_#065f46_0%,_#022c22_52%,_#020617_100%)] p-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.24)] md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.24em] uppercase text-emerald-100">
              {copy.badge}
            </div>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              {copy.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-emerald-50/90">
              {copy.description}
            </p>
          </div>

          <AdminLogoutButton />
        </div>
      </section>

      <section className="mx-auto mt-10 grid max-w-6xl gap-6 md:grid-cols-3">
        {panels.map(({ title, description, icon: Icon }) => (
          <div
            key={title}
            className="rounded-[2rem] border border-emerald-100 bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.06)]"
          >
            <Icon className="text-emerald-600" />
            <h2 className="mt-4 text-xl font-semibold">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto mt-10 max-w-6xl rounded-[2rem] border border-slate-200 bg-slate-950 px-8 py-8 text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)]">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
          <div className="text-sm leading-6 text-slate-200">
            {copy.note}
          </div>
        </div>
      </section>
    </div>
  );
}
