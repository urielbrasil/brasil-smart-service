"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { translations } from "@/app/translations";
import { useLanguage } from "@/components/language-provider";

export function AdminLoginForm({ nextPath }: { nextPath: string }) {
  const router = useRouter();
  const { locale } = useLanguage();
  const copy = translations[locale].admin.login.form;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const payload = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !payload.ok) {
        setError(payload.error || copy.genericError);
        return;
      }

      router.push(nextPath);
      router.refresh();
    } catch {
      setError(copy.networkError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <label className="grid gap-2 text-sm">
        <span className="font-medium text-slate-700">{copy.emailLabel}</span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-0 transition focus:border-emerald-500"
          placeholder={copy.emailPlaceholder}
          autoComplete="email"
          required
        />
      </label>

      <label className="grid gap-2 text-sm">
        <span className="font-medium text-slate-700">{copy.passwordLabel}</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-0 transition focus:border-emerald-500"
          placeholder={copy.passwordPlaceholder}
          autoComplete="current-password"
          required
        />
      </label>

      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center rounded-2xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? copy.loading : copy.submit}
      </button>
    </form>
  );
}
