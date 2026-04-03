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
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-[linear-gradient(135deg,_#0f766e_0%,_#065f46_55%,_#022c22_100%)] px-8 py-14 text-white shadow-[0_25px_80px_rgba(15,118,110,0.28)] md:px-14">
          <div className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.24em] uppercase">
            Demonstração
          </div>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
            Veja como a Brasil Smart Service pode responder, organizar e converter atendimentos.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-emerald-50/90">
            Esta página já abre em uma nova aba a partir da home e centraliza o próximo passo comercial do seu site.
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
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <CalendarClock className="text-emerald-600" />
            <h2 className="text-2xl font-semibold">O que a demonstração cobre</h2>
          </div>

          <div className="grid gap-4">
            {agenda.map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 px-5 py-4 text-sm leading-6 text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-[2rem] border border-emerald-100 bg-emerald-50 p-8">
            <Rocket className="text-emerald-700" />
            <h2 className="mt-4 text-2xl font-semibold">Pronto para apresentar</h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              Esta rota pode ser usada como destino direto de anúncios, QR codes ou botões da home.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8">
            <Mail className="text-slate-900" />
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
