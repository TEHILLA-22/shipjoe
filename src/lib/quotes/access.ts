import crypto from "node:crypto";
import type { Quote } from "@/lib/db/models";
import { getCurrencyRates } from "@/lib/exchange-rates";
import { calculateEstimate } from "@/lib/shipping-rates";
import type { FreightEstimate } from "@/lib/shipping-rates";

export type PublicQuote = {
  reference: string;
  origin: string;
  destination: string;
  shipmentType: string;
  weight: number;
  dimensions: string;
  quantity: number;
  description?: string;
  preferredMethod?: string;
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  notes?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  estimate: FreightEstimate | null;
};

const REFERENCE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateReference(): string {
  const bytes = crypto.randomBytes(8);

  let body = "";

  for (const byte of bytes) {
    body += REFERENCE_ALPHABET[byte % REFERENCE_ALPHABET.length];
  }

  return `EMQ-${body.slice(0, 4)}-${body.slice(4, 8)}`;
}

export function generateAccessToken(): string {
  return crypto.randomBytes(32).toString("base64url");
}

export function hashAccessToken(token: string): string {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
}

export function toPublicQuote(
  quote: Quote,
  estimate: FreightEstimate | null = null,
): PublicQuote {
  return {
    reference: quote.reference,
    origin: quote.origin,
    destination: quote.destination,
    shipmentType: quote.shipmentType,
    weight: quote.weight,
    dimensions: quote.dimensions,
    quantity: quote.quantity,
    description: quote.description,
    preferredMethod: quote.preferredMethod,
    fullName: quote.fullName,
    email: quote.email,
    phone: quote.phone,
    companyName: quote.companyName,
    notes: quote.notes,
    status: quote.status,
    createdAt: quote.createdAt,
    updatedAt: quote.updatedAt,
    estimate,
  };
}

export async function buildPublicQuote(
  quote: Quote,
): Promise<PublicQuote> {
  const rates = await getCurrencyRates();

  const estimate = calculateEstimate(
    quote.origin,
    quote.destination,
    quote.preferredMethod ?? "",
    quote.weight,
    rates,
  );

  return toPublicQuote(quote, estimate);
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "");
}

export function phoneVariants(phone: string): string[] {
  let digits = normalizePhone(phone);

  if (!digits) {
    return [];
  }

  if (digits.startsWith("00")) {
    digits = digits.slice(2);
  }

  const variants = new Set<string>([digits]);

  if (digits.startsWith("0")) {
    variants.add(`44${digits.slice(1)}`);
  }

  if (digits.startsWith("44")) {
    variants.add(`0${digits.slice(2)}`);
    variants.add(digits.slice(2));
  }

  return [...variants];
}