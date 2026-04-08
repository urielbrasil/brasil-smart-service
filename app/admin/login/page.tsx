import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { contactEmail } from "@/lib/site-config";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  const { error } = await searchParams;

  return (
    <section className="min-h-[calc(100vh-73px)] bg-[linear-gradient(180deg,_#f8fafc_0%,_#eef6f1_45%,_#ffffff_100%)] px-6 py-16">
      <div className="mx-auto max-w-md rounded-[2rem] border border-emerald-100 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-[0.22em] text-emerald-700 uppercase">
            Admin
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">
            Entrar no painel
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Acesse a área administrativa conectada à Railway com o e-mail corporativo{" "}
            <strong>{contactEmail}</strong>.
          </p>
        </div>

        {error ? (
          <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        <form action="/api/admin/login" method="post" className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">
              E-mail administrativo
            </span>
            <input
              name="username"
              type="email"
              required
              defaultValue={contactEmail}
              autoComplete="username"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none ring-0 transition focus:border-emerald-500"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Senha
            </span>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none ring-0 transition focus:border-emerald-500"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            Entrar
          </button>
        </form>
      </div>
    </section>
  );
}
