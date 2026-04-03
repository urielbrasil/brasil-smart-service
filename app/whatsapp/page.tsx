import { MessageCircleMore, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { CtaLink } from "@/components/cta-link";
import { SiteFooter } from "@/components/site-footer";
import { mailLinks } from "../site-data";

const highlights = [
  "Atendimento inicial automatizado em poucos segundos",
  "Qualificação e encaminhamento de oportunidades para sua equipe",
  "Organização de dúvidas, propostas, serviços e próximos passos",
];

export default function WhatsAppPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_28%),linear-gradient(180deg,_#f8fafc_0%,_#eef6f1_42%,_#ffffff_100%)] text-slate-900">
      <section className="overflow-hidden bg-[linear-gradient(135deg,_#065f46_0%,_#022c22_52%,_#020617_100%)] px-6 py-20 text-white">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-white/10 bg-white/10 px-8 py-14 shadow-[0_24px_80px_rgba(15,23,42,0.18)] backdrop-blur md:px-14">
          <div className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.24em] uppercase text-emerald-100">
            WhatsApp
          </div>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
            Transforme seu WhatsApp em um canal inteligente de atendimento e vendas.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-emerald-50/90">
            O bot atua como servidor do seu negócio: responde clientes, apresenta soluções, coleta contexto e leva cada conversa para a etapa certa.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <CtaLink href={mailLinks.sales} external>
              Solicitar proposta
            </CtaLink>
            <CtaLink href="/demonstracao" variant="ghost">
              Ver demonstração
            </CtaLink>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-6 pb-20 md:grid-cols-2">
        <div className="rounded-[2rem] bg-[linear-gradient(135deg,_#065f46_0%,_#022c22_52%,_#020617_100%)] p-8 text-white shadow-[0_24px_70px_rgba(5,150,105,0.25)]">
          <MessageCircleMore className="text-emerald-400" />
          <h2 className="mt-4 text-2xl font-semibold">Fluxo preparado</h2>
          <div className="mt-6 grid gap-3">
            {highlights.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/8 px-4 py-4 text-sm text-slate-200">
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-[2rem] border border-emerald-100 bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
            <ShieldCheck className="text-emerald-600" />
            <h2 className="mt-4 text-xl font-semibold">Próximo passo recomendado</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Assim que o número oficial da operação estiver definido, esta rota pode apontar para um canal direto com o mesmo contexto comercial do site.
            </p>
          </div>

          <div className="rounded-[2rem] border border-emerald-100 bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
            <Mail className="text-emerald-700" />
            <h2 className="mt-4 text-xl font-semibold">Contato atual</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Enquanto isso, o visitante pode iniciar a conversa comercial por e-mail sem quebrar o fluxo principal do site.
            </p>
            <CtaLink href={mailLinks.sales} external variant="ghost" className="mt-6 w-full">
              Abrir contato comercial
            </CtaLink>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
