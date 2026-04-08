import { NextResponse, type NextRequest } from "next/server";

const ADMIN_SESSION_COOKIE = "brasilsmart_admin_session";

function getAdminSecret() {
  return process.env.ADMIN_SESSION_SECRET;
}

async function sign(payload: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload),
  );

  return Array.from(new Uint8Array(signature))
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("");
}

async function hasValidAdminSession(token?: string) {
  const secret = getAdminSecret();

  if (!token || !secret) {
    return false;
  }

  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const [username, expiresAtRaw, signature] = decoded.split(".");

    if (!username || !expiresAtRaw || !signature) {
      return false;
    }

    const expectedSignature = await sign(`${username}.${expiresAtRaw}`, secret);

    if (signature !== expectedSignature) {
      return false;
    }

    const expiresAt = Number(expiresAtRaw);
    return Number.isFinite(expiresAt) && Date.now() <= expiresAt;
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const secret = getAdminSecret();

  if (!secret) {
    return NextResponse.next();
  }

  const sessionToken = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const hasSession = await hasValidAdminSession(sessionToken);

  if (pathname === "/admin/login") {
    if (hasSession) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return NextResponse.next();
  }

  if (!hasSession) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
