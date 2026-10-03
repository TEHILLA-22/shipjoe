import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { Quotes } from "@/lib/db/orm";
import type { Quote } from "@/lib/db/models";
import {
  hashAccessToken,
  normalizeEmail,
  phoneVariants,
  toPublicQuote,
} from "@/lib/quotes/access";

const MAX_ATTEMPTS = 8;
const WINDOW_MS = 10 * 60 * 1000;

type RateEntry = {
  count: number;
  resetAt: number;
};

const attempts = new Map<string, RateEntry>();

function clientKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");

  if (forwarded) {
    return forwarded.split(",")[0]!.trim();
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = attempts.get(key);

  if (!entry || entry.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;

  return entry.count > MAX_ATTEMPTS;
}

function clearAttempts(key: string): void {
  attempts.delete(key);
}

function failure(message: string, status = 401) {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status },
  );
}

type LookupBody = {
  reference?: unknown;
  email?: unknown;
  phone?: unknown;
  accessToken?: unknown;
};

function timingSafeEqualString(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  if (left.length !== right.length) {
    return false;
  }

  return timingSafeEqual(left, right);
}

function timingSafeEqualHex(a: string, b: string): boolean {
  if (!/^[a-f0-9]{64}$/.test(a) || !/^[a-f0-9]{64}$/.test(b)) {
    return false;
  }

  return timingSafeEqualString(a, b);
}

type StoredQuote = {
  email: string;
  phone: string;
  accessTokenHash: string;
  quote: Quote;
};

async function fetchStored(
  reference: string,
): Promise<StoredQuote | null> {
  const rows = await Quotes.query()
    .where("reference", "=", reference)
    .limit(1)
    .get();

  const quote = rows[0];

  if (!quote) {
    return null;
  }

  return {
    email: quote.email,
    phone: quote.phone,
    accessTokenHash: quote.accessTokenHash,
    quote,
  };
}

export async function POST(request: NextRequest) {
  const key = clientKey(request);

  if (isRateLimited(key)) {
    return failure(
      "Too many attempts. Please try again in a few minutes.",
      429,
    );
  }

  let body: LookupBody;

  try {
    body = (await request.json()) as LookupBody;
  } catch {
    return failure("Invalid request.", 400);
  }

  const reference =
    typeof body.reference === "string"
      ? body.reference.trim().toUpperCase()
      : "";

  const email =
    typeof body.email === "string" ? normalizeEmail(body.email) : "";

  const phone =
    typeof body.phone === "string" ? body.phone.trim() : "";

  const accessToken =
    typeof body.accessToken === "string" ? body.accessToken.trim() : "";

  if (!reference) {
    return failure("Enter your quote reference.", 400);
  }

  if (!email && !phone) {
    return failure(
      "Enter the email address or phone number you quoted with.",
      400,
    );
  }

  try {
    const stored = await fetchStored(reference);

    if (!stored) {
      return failure(
        "We couldn't find a quote with that reference and contact details.",
      );
    }

    if (accessToken) {
      const providedHash = hashAccessToken(accessToken);

      if (!timingSafeEqualHex(providedHash, stored.accessTokenHash)) {
        return failure(
          "We couldn't find a quote with that reference and contact details.",
        );
      }

      clearAttempts(key);

      return NextResponse.json({
        success: true,
        quote: toPublicQuote(stored.quote),
      });
    }

    const identities = phoneVariants(phone);

    const emailMatches =
      email.length > 0 &&
      timingSafeEqualString(
        stored.email.trim().toLowerCase(),
        email,
      );

    const phoneMatches =
      identities.length > 0 &&
      identities.some((identity) =>
        timingSafeEqualString(
          stored.phone.replace(/\D/g, ""),
          identity,
        ),
      );

    if (!emailMatches && !phoneMatches) {
      return failure(
        "We couldn't find a quote with that reference and contact details.",
      );
    }

    clearAttempts(key);

    return NextResponse.json({
      success: true,
      quote: toPublicQuote(stored.quote),
    });
  } catch (error) {
    console.error("POST /api/quotes/lookup failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to look up your quote.",
      },
      { status: 500 },
    );
  }
}