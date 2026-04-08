import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  createSignedAdminSessionValue,
  getAdminSessionCookieName,
  verifySignedAdminSessionValue,
} from "@/lib/admin-session";
import { contactEmail } from "@/lib/site-config";

function normalizeIdentifier(value: string) {
  return value.trim().toLowerCase();
}

function getAdminConfig() {
  const username = normalizeIdentifier(
    process.env.ADMIN_LOGIN_EMAIL ||
      process.env.ADMIN_USERNAME ||
      contactEmail,
  );
  const password = process.env.ADMIN_PASSWORD || process.env.ADMIN_LOGIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!username || !password || !secret) {
    throw new Error(
      "Missing admin auth configuration. Set ADMIN_PASSWORD or ADMIN_LOGIN_PASSWORD and ADMIN_SESSION_SECRET. ADMIN_LOGIN_EMAIL defaults to contato@brasilsmart.com.",
    );
  }

  return { username, password, secret };
}

export function hasAdminAuthConfig() {
  return Boolean(
    process.env.ADMIN_SESSION_SECRET &&
      (process.env.ADMIN_PASSWORD || process.env.ADMIN_LOGIN_PASSWORD),
  );
}

export function validateAdminCredentials(username: string, password: string) {
  const config = getAdminConfig();
  return (
    normalizeIdentifier(username) === config.username &&
    password === config.password
  );
}

export async function createAdminSessionValue(username: string) {
  const { secret, username: expectedUsername } = getAdminConfig();
  return createSignedAdminSessionValue(
    normalizeIdentifier(username) || expectedUsername,
    secret,
  );
}

export async function verifyAdminSessionValue(value?: string) {
  const { secret, username } = getAdminConfig();
  return verifySignedAdminSessionValue({
    secret,
    value,
    expectedUsername: username,
  });
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return verifyAdminSessionValue(
    cookieStore.get(getAdminSessionCookieName())?.value,
  );
}

export async function requireAdminSession() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
}
