import { NextResponse } from "next/server";
import { getAdminSessionCookieName } from "@/lib/admin-session";

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const response = NextResponse.json({ ok: true });
    response.cookies.set({
      name: getAdminSessionCookieName(),
      value: "",
      path: "/",
      maxAge: 0,
    });
    return response;
  }

  const response = NextResponse.redirect(new URL("/admin/login", request.url), {
    status: 303,
  });

  response.cookies.set({
    name: getAdminSessionCookieName(),
    value: "",
    path: "/",
    maxAge: 0,
  });

  return response;
}
