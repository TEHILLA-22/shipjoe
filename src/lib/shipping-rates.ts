import {
  NIGERIA,
  UNITED_KINGDOM,
  FREIGHT_METHODS,
  isEuCountry,
  availableMethods,
  type FreightMethod,
} from "@/lib/quote-validation";

import type { LiveRates } from "@/lib/rates-config";

export {
  NIGERIA,
  UNITED_KINGDOM,
  FREIGHT_METHODS,
  isEuCountry,
  availableMethods,
};

export type { FreightMethod };

export type RateCurrency = "GBP" | "EUR" | "NGN";

export type { LiveRates } from "@/lib/rates-config";

export type RatePerKg = {
  currency: Exclude<RateCurrency, "NGN">;
  amountPerKg: number;
  origin: string;
  destination: string;
  method: FreightMethod;
};

type RouteRule =
  | { currency: "GBP" | "EUR"; kind: "fixed"; amountPerKg: number }
  | { currency: "GBP"; kind: "fromNaira"; nairaPerKg: number };

function matchRoute(
  from: string,
  to: string,
  method: string,
): RouteRule | null {
  if (!from || !to) {
    return null;
  }

  if (from === NIGERIA && isEuCountry(to) && method === "Sea Freight") {
    return { currency: "EUR", kind: "fixed", amountPerKg: 3 };
  }

  if (from === NIGERIA && to === UNITED_KINGDOM && method === "Sea Freight") {
    return { currency: "GBP", kind: "fixed", amountPerKg: 1.5 };
  }

  if (from === NIGERIA && to === UNITED_KINGDOM && method === "Air Freight") {
    return { currency: "GBP", kind: "fromNaira", nairaPerKg: 7500 };
  }

  if (from === UNITED_KINGDOM && to === NIGERIA && method === "Air Freight") {
    return { currency: "GBP", kind: "fixed", amountPerKg: 5.1 };
  }

  return null;
}

export function getRouteCurrency(
  origin: string,
  destination: string,
  method: string,
): Exclude<RateCurrency, "NGN"> | null {
  const rule = matchRoute(
    origin.trim(),
    destination.trim(),
    method?.trim() ?? "",
  );

  return rule ? rule.currency : null;
}

export function getRatePerKg(
  origin: string,
  destination: string,
  method: string,
  rates: LiveRates,
): RatePerKg | null {
  const from = origin.trim();
  const to = destination.trim();

  const rule = matchRoute(from, to, method?.trim() ?? "");

  if (!rule) {
    return null;
  }

  const amountPerKg =
    rule.kind === "fromNaira"
      ? rule.nairaPerKg / rates.ngnPerGbp
      : rule.amountPerKg;

  if (!Number.isFinite(amountPerKg) || amountPerKg <= 0) {
    return null;
  }

  const freightMethod = (method.trim() || "Sea Freight") as FreightMethod;

  return {
    currency: rule.currency,
    amountPerKg,
    origin: from,
    destination: to,
    method: freightMethod,
  };
}

export type FreightEstimate = {
  currency: Exclude<RateCurrency, "NGN">;
  amountPerKg: number;
  weightKg: number;
  total: number;
  totalInNaira: number;
  nairaPerUnit: number;
  method: FreightMethod;
  origin: string;
  destination: string;
  nairaPerKg: number | null;
  rateUsed: LiveRates;
};

export function calculateEstimate(
  origin: string,
  destination: string,
  method: string,
  weightKg: number,
  rates: LiveRates,
): FreightEstimate | null {
  const rate = getRatePerKg(origin, destination, method, rates);

  if (!rate) {
    return null;
  }

  if (!Number.isFinite(weightKg) || weightKg <= 0) {
    return null;
  }

  const total = round2(rate.amountPerKg * weightKg);

  const nairaPerUnit =
    rate.currency === "GBP" ? rates.ngnPerGbp : rates.ngnPerEur;

  const totalInNaira =
    Number.isFinite(nairaPerUnit) && nairaPerUnit > 0
      ? round2(total * nairaPerUnit)
      : 0;

  return {
    currency: rate.currency,
    amountPerKg: rate.amountPerKg,
    weightKg,
    total,
    totalInNaira,
    nairaPerUnit: Number.isFinite(nairaPerUnit) ? nairaPerUnit : 0,
    method: rate.method,
    origin: rate.origin,
    destination: rate.destination,
    nairaPerKg:
      rate.method === "Air Freight" &&
      rate.origin === NIGERIA &&
      rate.destination === UNITED_KINGDOM
        ? 7500
        : null,
    rateUsed: rates,
  };
}

export function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

const currencyFormatters: Record<RateCurrency, Intl.NumberFormat> = {
  GBP: new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }),
  EUR: new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }),
  NGN: new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }),
};

export function formatMoney(amount: number, currency: RateCurrency): string {
  return currencyFormatters[currency].format(amount);
}

export function formatRate(rate: number): string {
  return new Intl.NumberFormat("en-GB", {
    maximumFractionDigits: 2,
    minimumFractionDigits: rate % 1 === 0 ? 0 : 2,
  }).format(rate);
}