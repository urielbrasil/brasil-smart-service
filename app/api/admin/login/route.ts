import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  adminSessionCookieOptions,
  createAdminSession,
  getAdminCredentials,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  const credentials = getAdminCredentials();

  if (!credentials) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Credenciais de administrador não configuradas no servidor. Defina ADMIN_LOGIN_EMAIL, ADMIN_LOGIN_PASSWORD e ADMIN_SESSION_SECRET.",
      },
      { status: 503 }
    );
  }

  const body = (await request.json()) as {
    email?: string;
    password?: string;
  };

  if (body.email !== credentials.email || body.password !== credentials.password) {
    return NextResponse.json(
      { ok: false, error: "E-mail ou senha inválidos." },
      { status: 401 }
    );
  }

  const token = await createAdminSession(credentials.email, credentials.secret);
  const cookieStore = await cookies();

  cookieStore.set(ADMIN_SESSION_COOKIE, token, adminSessionCookieOptions());

  return NextResponse.json({ ok: true });
}
