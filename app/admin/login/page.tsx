import { ShieldCheck, LockKeyhole, UserCog } from "lucide-react";
import { AdminLoginForm } from "@/components/admin-login-form";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const nextPath = params.next || "/admin";

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_28%),linear-gradient(180deg,_#f8fafc_0%,_#eef6f1_42%,_#ffffff_100%)] px-6 pb-20 pt-32 text-slate-900 md:pt-36">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[2.5rem] bg-[linear-gradient(135deg,_#065f46_0%,_#022c22_52%,_#020617_100%)] p-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.24)] md:p-10">
          <div className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.24em] uppercase text-emerald-100">
            Administradores certificados
          </div>
          <h1 className="max-w-xl text-4xl font-bold leading-tight md:text-5xl">
            Acesso administrativo Brasil Smart
          </h1>
          <p className="mt-5 max-w-xl text-lg text-emerald-50/90">
            Estrutura inicial de login para equipe administrativa da Brasil Smart.
            A autenticação real fica vinculada ao servidor por variáveis de ambiente.
          </p>

          <div className="mt-8 grid gap-4">
            <div className="flex items-start gap-3 rounded-2xl bg-white/10 px-4 py-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
              <span className="text-sm text-emerald-50/90">
                Sessão HTTP-only com proteção de rota em `/admin`.
              </span>
            </div>
            <div className="flex items-start gap-3 rounded-2xl bg-white/10 px-4 py-4">
              <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
              <span className="text-sm text-emerald-50/90">
                Credenciais não ficam no frontend; o login depende do servidor.
              </span>
            </div>
            <div className="flex items-start gap-3 rounded-2xl bg-white/10 px-4 py-4">
              <UserCog className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
              <span className="text-sm text-emerald-50/90">
                Estrutura pronta para expansão futura do login dos clientes.
              </span>
            </div>
          </div>
        </section>

        <section className="rounded-[2.5rem] border border-emerald-100 bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.06)] md:p-10">
          <h2 className="text-2xl font-semibold">Entrar</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Use as credenciais administrativas configuradas no ambiente do projeto.
          </p>

          <div className="mt-8">
            <AdminLoginForm nextPath={nextPath} />
          </div>

          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm leading-6 text-amber-800">
            Variáveis exigidas no servidor:
            <code className="ml-1">ADMIN_LOGIN_EMAIL</code>,
            <code className="ml-1">ADMIN_LOGIN_PASSWORD</code> e
            <code className="ml-1">ADMIN_SESSION_SECRET</code>.
          </div>
        </section>
      </div>
    </div>
  );
}
