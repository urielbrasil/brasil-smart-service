const SESSION_COOKIE = "brasilsmart_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12;

function encodeBase64Url(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function decodeBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
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

export function getAdminSessionCookieName() {
  return SESSION_COOKIE;
}

export function getAdminSessionTtlSeconds() {
  return SESSION_TTL_MS / 1000;
}

export async function createSignedAdminSessionValue(username: string, secret: string) {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload = `${username}.${expiresAt}`;
  const signature = await sign(payload, secret);
  return encodeBase64Url(`${payload}.${signature}`);
}

export async function verifySignedAdminSessionValue(input: {
  secret?: string;
  value?: string;
  expectedUsername?: string;
}) {
  const { secret, value, expectedUsername } = input;

  if (!secret || !value) {
    return false;
  }

  try {
    const decoded = decodeBase64Url(value);
    const [username, expiresAtRaw, signature] = decoded.split(".");

    if (!username || !expiresAtRaw || !signature) {
      return false;
    }

    const expectedSignature = await sign(`${username}.${expiresAtRaw}`, secret);

    if (signature !== expectedSignature) {
      return false;
    }

    const expiresAt = Number(expiresAtRaw);

    if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) {
      return false;
    }

    if (expectedUsername && username !== expectedUsername) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}
