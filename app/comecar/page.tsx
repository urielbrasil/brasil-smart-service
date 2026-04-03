import { CheckCircle2, Settings2, MailPlus } from "lucide-react";
import { CtaLink } from "@/components/cta-link";
import { SiteFooter } from "@/components/site-footer";
import { mailLinks } from "../site-data";

const checklist = [
  "Definir número principal de atendimento",
  "Separar perguntas frequentes, tarifas e horários",
  "Escolher quem recebe escalonamentos humanos",
  "Publicar os CTAs da home e rotas internas do site",
];

export default function ComecarPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-slate-950 px-8 py-14 text-white shadow-[0_24px_80px_rgba(15,23,42,0.24)] md:px-14">
          <div className="mb-6 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.24em] uppercase">
            Começar
          </div>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
            Prepare a operação e ligue sua jornada comercial no site.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-300">
            Esta rota transforma o botão “Começar Agora” em uma página real, pronta para orientar o cliente até o primeiro contato.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <CtaLink href={mailLinks.onboarding} external>
              Iniciar implantação por e-mail
            </CtaLink>
            <CtaLink href="/demonstracao" variant="secondary">
              Abrir demonstração
            </CtaLink>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-6 pb-20 md:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <Settings2 className="text-emerald-600" />
            <h2 className="text-2xl font-semibold">Checklist de ativação</h2>
          </div>

          <div className="grid gap-4">
            {checklist.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl bg-slate-50 px-5 py-4 text-sm leading-6 text-slate-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-emerald-100 bg-emerald-50 p-8">
          <MailPlus className="text-emerald-700" />
          <h2 className="mt-4 text-2xl font-semibold">Próximo contato</h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Se quiser, esta página pode virar depois um formulário real. Por agora, ela já entrega um destino funcional para o CTA final e evita botão sem ação.
          </p>
          <CtaLink href={mailLinks.onboarding} external variant="ghost" className="mt-6 w-full">
            Abrir e-mail de implantação
          </CtaLink>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
