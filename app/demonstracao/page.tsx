import { CalendarClock, Mail, Rocket } from "lucide-react";
import { CtaLink } from "@/components/cta-link";
import { SiteFooter } from "@/components/site-footer";
import { mailLinks } from "../site-data";

const agenda = [
  "Mapeamento do atendimento atual do hotel ou pousada",
  "Demonstração do fluxo de respostas automáticas",
  "Exemplo de qualificação de hóspedes e reservas",
  "Próximos passos para implantação no brasilsmart.com",
];

export default function DemonstracaoPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_28%),linear-gradient(180deg,_#f8fafc_0%,_#eef6f1_42%,_#ffffff_100%)] text-slate-900">
      <section className="overflow-hidden bg-[linear-gradient(135deg,_#065f46_0%,_#022c22_52%,_#020617_100%)] px-6 py-20 text-white">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-white/10 bg-white/10 px-8 py-14 shadow-[0_25px_80px_rgba(15,118,110,0.28)] backdrop-blur md:px-14">
          <div className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.24em] uppercase">
            Demonstração
          </div>
          <p className="mt-5 max-w-2xl text-lg text-emerald-50/90">
            Veja como a Brasil Smart Service pode responder, organizar e converter atendimentos.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <CtaLink href={mailLinks.demo} external>
              Solicitar demonstração por e-mail
            </CtaLink>
            <CtaLink href="/comecar" variant="secondary">
              Ver implantação
            </CtaLink>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-6 pb-20 md:grid-cols-[1.25fr_0.9fr]">
        <div className="rounded-[2rem] border border-emerald-100 bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
          <div className="mb-5 flex items-center gap-3">
            <CalendarClock className="text-emerald-600" />
            <h2 className="text-2xl font-semibold">O que a demonstração cobre</h2>
          </div>

          <div className="grid gap-4">
            {agenda.map((item) => (
              <div key={item} className="rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 text-sm leading-6 text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,_#065f46_0%,_#022c22_52%,_#020617_100%)] p-8 text-white shadow-[0_24px_70px_rgba(5,150,105,0.25)]">
            <Rocket className="text-emerald-300" />
            <h2 className="mt-4 text-2xl font-semibold">Pronto para apresentar</h2>
            <p className="mt-3 text-sm leading-6 text-emerald-50/85">
              Esta rota pode ser usada como destino direto de anúncios, QR codes ou botões da home.
            </p>
          </div>

          <div className="rounded-[2rem] border border-emerald-100 bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
            <Mail className="text-emerald-700" />
            <h2 className="mt-4 text-xl font-semibold">Canal de contato</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Para manter o fluxo funcional sem depender de integrações externas ainda não configuradas, o pedido de demonstração segue por e-mail.
            </p>
            <CtaLink href={mailLinks.demo} external variant="ghost" className="mt-6 w-full">
              Abrir e-mail de demonstração
            </CtaLink>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
