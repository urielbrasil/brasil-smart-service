import Link from "next/link";
import { requireAdminSession } from "@/lib/admin-auth";
import { listBots } from "@/lib/railway";

function formatBotStatus(status: string) {
  const map: Record<string, string> = {
    SUCCESS: "Ativo",
    BUILDING: "Buildando",
    DEPLOYING: "Publicando",
    FAILED: "Falhou",
    CRASHED: "Crashed",
    REMOVED: "Removido",
    SLEEPING: "Dormindo",
    SKIPPED: "Ignorado",
    WAITING: "Aguardando",
    QUEUED: "Na fila",
    NOT_DEPLOYED: "Sem deploy",
  };

  return map[status] || status;
}

function formatHealthStatus(status: "online" | "offline" | "unknown") {
  if (status === "online") {
    return "Health OK";
  }

  if (status === "offline") {
    return "Health com erro";
  }

  return "Health indisponível";
}

function getStatusTone(status: string) {
  if (["SUCCESS"].includes(status)) {
    return "border-emerald-200 bg-emerald-50 text-emerald-800";
  }

  if (["FAILED", "CRASHED", "REMOVED", "NOT_DEPLOYED"].includes(status)) {
    return "border-rose-200 bg-rose-50 text-rose-700";
  }

  return "border-amber-200 bg-amber-50 text-amber-800";
}

function getHealthTone(status: "online" | "offline" | "unknown") {
  if (status === "online") {
    return "border-emerald-200 bg-emerald-50 text-emerald-800";
  }

  if (status === "offline") {
    return "border-rose-200 bg-rose-50 text-rose-700";
  }

  return "border-slate-200 bg-slate-100 text-slate-700";
}

function formatDate(value?: string) {
  if (!value) {
    return "Sem registro";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  await requireAdminSession();

  const { success, error } = await searchParams;

  let dashboard;

  try {
    dashboard = await listBots();
  } catch (railwayError) {
    const message =
      railwayError instanceof Error
        ? railwayError.message
        : "Falha ao consultar a Railway.";

    return (
      <section className="min-h-[calc(100vh-73px)] bg-[linear-gradient(180deg,_#f8fafc_0%,_#eef6f1_45%,_#ffffff_100%)] px-6 py-16">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-rose-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
          <h1 className="text-3xl font-bold text-slate-900">Admin</h1>
          <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {message}
          </p>
          <p className="mt-4 text-sm text-slate-600">
            Verifique as envs do site: `RAILWAY_TOKEN`, `RAILWAY_PROJECT_ID` e,
            se necessário, `RAILWAY_ENVIRONMENT_ID`.
          </p>
          <div className="mt-6">
            <Link href="/admin/login" className="text-sm font-medium text-emerald-700">
              Voltar para login
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const { bots, environmentName, projectName, refreshedAt, summary } = dashboard;

  return (
    <section className="min-h-[calc(100vh-73px)] bg-[linear-gradient(180deg,_#f8fafc_0%,_#eef6f1_45%,_#ffffff_100%)] px-6 py-16">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] text-emerald-700 uppercase">
              Admin
            </p>
            <h1 className="mt-3 text-3xl font-bold text-slate-900">
              Bots na Railway
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Projeto: <strong>{projectName}</strong> · Ambiente:{" "}
              <strong>{environmentName}</strong>
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Última leitura do painel: <strong>{formatDate(refreshedAt)}</strong>
            </p>
          </div>

          <form action="/api/admin/logout" method="post">
            <button
              type="submit"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:border-slate-300"
            >
              Sair
            </button>
          </form>
        </div>

        {success ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            {success}
          </div>
        ) : null}

        {error ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
            <p className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
              Serviços monitorados
            </p>
            <p className="mt-4 text-3xl font-bold text-slate-900">{summary.totalBots}</p>
            <p className="mt-2 text-sm text-slate-600">Total listado no ambiente atual.</p>
          </article>

          <article className="rounded-[1.75rem] border border-emerald-200 bg-emerald-50 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
            <p className="text-xs font-semibold tracking-[0.18em] text-emerald-800 uppercase">
              Deploys ativos
            </p>
            <p className="mt-4 text-3xl font-bold text-emerald-950">{summary.activeBots}</p>
            <p className="mt-2 text-sm text-emerald-900/80">
              Serviços com deploy publicado ou em andamento.
            </p>
          </article>

          <article className="rounded-[1.75rem] border border-emerald-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
            <p className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
              Health OK
            </p>
            <p className="mt-4 text-3xl font-bold text-slate-900">{summary.onlineBots}</p>
            <p className="mt-2 text-sm text-slate-600">
              Serviços respondendo no endpoint `/health`.
            </p>
          </article>

          <article className="rounded-[1.75rem] border border-rose-200 bg-rose-50 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
            <p className="text-xs font-semibold tracking-[0.18em] text-rose-700 uppercase">
              Exigem atenção
            </p>
            <p className="mt-4 text-3xl font-bold text-rose-950">
              {summary.botsRequiringAttention}
            </p>
            <p className="mt-2 text-sm text-rose-900/80">
              Falha, sem deploy ou health com erro.
            </p>
          </article>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_1.7fr]">
          <div className="rounded-[2rem] border border-emerald-100 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
            <h2 className="text-xl font-semibold text-slate-900">
              Criar novo bot
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Cada bot vira um serviço novo no projeto configurado da Railway,
              apontando para o repositório do WhatsAppBot.
            </p>

            <form action="/api/admin/bots/create" method="post" className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">
                  Nome do serviço na Railway
                </span>
                <input
                  name="name"
                  required
                  placeholder="bot-clinica-centro"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">
                  WHATSAPP_VERIFY_TOKEN
                </span>
                <input
                  name="whatsappVerifyToken"
                  required
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">
                  WHATSAPP_ACCESS_TOKEN
                </span>
                <input
                  name="whatsappAccessToken"
                  required
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">
                  WHATSAPP_PHONE_NUMBER_ID
                </span>
                <input
                  name="whatsappPhoneNumberId"
                  required
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">
                  OPENAI_API_KEY
                </span>
                <input
                  name="openaiApiKey"
                  required
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">
                  OPENAI_MODEL
                </span>
                <input
                  name="openaiModel"
                  defaultValue="gpt-4.1-mini"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500"
                />
              </label>

              <button
                type="submit"
                className="w-full rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
              >
                Criar bot
              </button>
            </form>
          </div>

          <div className="rounded-[2rem] border border-emerald-100 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Bots criados
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Aqui voce acompanha status do deploy, health check e pode
                  desabilitar ou reativar cada bot.
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Último deploy registrado:{" "}
                  <strong>{formatDate(summary.lastDeploymentAt)}</strong>
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {bots.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-6 text-sm text-slate-500">
                  Nenhum bot encontrado no projeto filtrado.
                </div>
              ) : null}

              {bots.map((bot) => {
                const isActive = !["REMOVED", "NOT_DEPLOYED"].includes(bot.deploymentStatus);

                return (
                  <article
                    key={bot.id}
                    className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                          {bot.name}
                        </h3>
                        <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium">
                          <span
                            className={`rounded-full border px-3 py-1 ${getStatusTone(bot.deploymentStatus)}`}
                          >
                            {formatBotStatus(bot.deploymentStatus)}
                          </span>
                          <span
                            className={`rounded-full border px-3 py-1 ${getHealthTone(bot.healthStatus)}`}
                          >
                            {formatHealthStatus(bot.healthStatus)}
                          </span>
                          <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-700">
                            Replicas: {bot.replicas}
                          </span>
                        </div>
                        <p className="mt-4 text-sm text-slate-600">
                          Ultimo deploy: {formatDate(bot.deploymentCreatedAt)}
                        </p>
                        {bot.deploymentUrl ? (
                          <p className="mt-2 text-sm text-slate-600">
                            URL:{" "}
                            <a
                              href={bot.deploymentUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="font-medium text-emerald-700"
                            >
                              abrir bot
                            </a>
                          </p>
                        ) : null}
                        {bot.staticUrl ? (
                          <p className="mt-2 text-sm text-slate-600">
                            Static URL:{" "}
                            <a
                              href={bot.staticUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="font-medium text-emerald-700"
                            >
                              abrir endpoint
                            </a>
                          </p>
                        ) : null}
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <form action={`/api/admin/bots/${bot.id}/enable`} method="post">
                          <button
                            type="submit"
                            className="rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-sm font-medium text-emerald-700 hover:border-emerald-300"
                          >
                            Reativar
                          </button>
                        </form>

                        <form action={`/api/admin/bots/${bot.id}/disable`} method="post">
                          <button
                            type="submit"
                            disabled={!isActive}
                            className="rounded-2xl border border-rose-200 bg-white px-4 py-3 text-sm font-medium text-rose-700 hover:border-rose-300 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Desabilitar
                          </button>
                        </form>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
