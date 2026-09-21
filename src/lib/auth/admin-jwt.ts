import { SignJWT, jwtVerify, type JWTPayload } from "jose";

const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME || "shipjo";

function parseSessionDuration(rawValue: string | undefined): number {
  const fallback = 60 * 60 * 24; // 1 day
  const value = rawValue?.trim();

  if (!value) {
    return fallback;
  }

  if (/^\d+$/.test(value)) {
    const parsed = Number.parseInt(value, 10);

    if (Number.isFinite(parsed) && parsed > 0) {
      return parsed;
    }
  }

  const parts = value
    .split("*")
    .map((part) => Number.parseInt(part.trim(), 10))
    .filter((part) => Number.isFinite(part));

  if (parts.length > 1) {
    const product = parts.reduce((total, value) => total * value, 1);

    if (Number.isFinite(product) && product > 0) {
      return product;
    }
  }

  return fallback;
}

const SESSION_DURATION_SECONDS = parseSessionDuration(
  process.env.SESSION_DURATION_SECONDS,
);

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not configured.");
}

const secret = new TextEncoder().encode(JWT_SECRET);

export type AdminTokenPayload = JWTPayload & {
  role: "admin";
  email: string;
};

export async function createAdminToken(email: string) {
  const now = Math.floor(Date.now() / 1000);

  return new SignJWT({
    role: "admin",
    email,
  })
    .setProtectedHeader({
      alg: "HS256",
      typ: "JWT",
    })
    .setIssuedAt(now)
    .setExpirationTime(now + SESSION_DURATION_SECONDS)
    .setSubject("shipjoe-admin")
    .sign(secret);
}

export async function verifyAdminToken(
  token: string,
): Promise<AdminTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
      subject: "shipjoe-admin",
    });

    if (
      payload.role !== "admin" ||
      typeof payload.email !== "string"
    ) {
      return null;
    }

    return payload as AdminTokenPayload;
  } catch {
    return null;
  }
}

export {
  SESSION_COOKIE_NAME,
  SESSION_DURATION_SECONDS,
};