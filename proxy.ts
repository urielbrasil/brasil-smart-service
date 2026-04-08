import { NextResponse, type NextRequest } from "next/server";
import {
  getAdminSessionCookieName,
  verifySignedAdminSessionValue,
} from "@/lib/admin-session";
import { contactEmail } from "@/lib/site-config";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (
    !process.env.ADMIN_SESSION_SECRET ||
    !(process.env.ADMIN_PASSWORD || process.env.ADMIN_LOGIN_PASSWORD)
  ) {
    return NextResponse.next();
  }

  const sessionToken = request.cookies.get(getAdminSessionCookieName())?.value;
  const hasSession = await verifySignedAdminSessionValue({
    secret: process.env.ADMIN_SESSION_SECRET,
    value: sessionToken,
    expectedUsername:
      (process.env.ADMIN_LOGIN_EMAIL || process.env.ADMIN_USERNAME || contactEmail)
        .trim()
        .toLowerCase(),
  });

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
