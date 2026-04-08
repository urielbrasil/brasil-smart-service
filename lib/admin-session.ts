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

function serializePayload(input: { username: string; expiresAt: number }) {
  return JSON.stringify(input);
}

function parsePayload(value: string): { username: string; expiresAt: number } {
  const parsed = JSON.parse(value) as {
    username?: string;
    expiresAt?: number;
  };

  if (typeof parsed.username !== "string" || typeof parsed.expiresAt !== "number") {
    throw new Error("Invalid admin session payload.");
  }

  return {
    username: parsed.username,
    expiresAt: parsed.expiresAt,
  };
}

export function getAdminSessionCookieName() {
  return SESSION_COOKIE;
}

export function getAdminSessionTtlSeconds() {
  return SESSION_TTL_MS / 1000;
}

export async function createSignedAdminSessionValue(username: string, secret: string) {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload = serializePayload({ username, expiresAt });
  const signature = await sign(payload, secret);
  return encodeBase64Url(
    JSON.stringify({
      payload,
      signature,
    }),
  );
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
    const parsed = JSON.parse(decoded) as {
      payload?: string;
      signature?: string;
    };

    if (!parsed.payload || !parsed.signature) {
      return false;
    }

    const expectedSignature = await sign(parsed.payload, secret);

    if (parsed.signature !== expectedSignature) {
      return false;
    }

    const { username, expiresAt } = parsePayload(parsed.payload);

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
