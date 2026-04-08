import { NextResponse } from "next/server";
import {
  createAdminSessionValue,
  getAdminSessionCookieName,
  validateAdminCredentials,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  let username = "";
  let password = "";

  if (contentType.includes("application/json")) {
    const body = (await request.json()) as {
      email?: string;
      username?: string;
      password?: string;
    };

    username = String(body.username || body.email || "");
    password = String(body.password || "");
  } else {
    const formData = await request.formData();
    username = String(formData.get("username") || formData.get("email") || "");
    password = String(formData.get("password") || "");
  }

  try {
    if (!validateAdminCredentials(username, password)) {
      if (contentType.includes("application/json")) {
        return NextResponse.json(
          { ok: false, error: "Credenciais inválidas." },
          { status: 401 },
        );
      }

      return NextResponse.redirect(
        new URL("/admin/login?error=Credenciais%20inv%C3%A1lidas.", request.url),
        { status: 303 },
      );
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Falha ao validar credenciais.";

    if (contentType.includes("application/json")) {
      return NextResponse.json({ ok: false, error: message }, { status: 503 });
    }

    return NextResponse.redirect(
      new URL(`/admin/login?error=${encodeURIComponent(message)}`, request.url),
      { status: 303 },
    );
  }

  const sessionValue = createAdminSessionValue(username);

  if (contentType.includes("application/json")) {
    const response = NextResponse.json({ ok: true });
    response.cookies.set({
      name: getAdminSessionCookieName(),
      value: sessionValue,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 12,
    });
    return response;
  }

  const response = NextResponse.redirect(new URL("/admin", request.url), {
    status: 303,
  });

  response.cookies.set({
    name: getAdminSessionCookieName(),
    value: sessionValue,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return response;
}
