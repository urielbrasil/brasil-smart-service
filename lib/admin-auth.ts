import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SESSION_COOKIE = "brasilsmart_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12;

function getAdminConfig() {
  const username = process.env.ADMIN_USERNAME || process.env.ADMIN_LOGIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD || process.env.ADMIN_LOGIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!username || !password || !secret) {
    throw new Error(
      "Missing admin auth configuration. Set ADMIN_USERNAME or ADMIN_LOGIN_EMAIL, ADMIN_PASSWORD or ADMIN_LOGIN_PASSWORD, and ADMIN_SESSION_SECRET.",
    );
  }

  return { username, password, secret };
}

function sign(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function validateAdminCredentials(username: string, password: string) {
  const config = getAdminConfig();
  return username === config.username && password === config.password;
}

export function createAdminSessionValue(username: string) {
  const { secret } = getAdminConfig();
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload = `${username}.${expiresAt}`;
  const signature = sign(payload, secret);

  return Buffer.from(`${payload}.${signature}`).toString("base64url");
}

export function verifyAdminSessionValue(value?: string) {
  if (!value) {
    return false;
  }

  try {
    const decoded = Buffer.from(value, "base64url").toString("utf8");
    const [username, expiresAtRaw, signature] = decoded.split(".");

    if (!username || !expiresAtRaw || !signature) {
      return false;
    }

    const { secret, username: expectedUsername } = getAdminConfig();
    const payload = `${username}.${expiresAtRaw}`;
    const expectedSignature = sign(payload, secret);

    if (
      !timingSafeEqual(
        Buffer.from(signature, "utf8"),
        Buffer.from(expectedSignature, "utf8"),
      )
    ) {
      return false;
    }

    const expiresAt = Number(expiresAtRaw);

    if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) {
      return false;
    }

    return username === expectedUsername;
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return verifyAdminSessionValue(cookieStore.get(SESSION_COOKIE)?.value);
}

export async function requireAdminSession() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
}

export function getAdminSessionCookieName() {
  return SESSION_COOKIE;
}
