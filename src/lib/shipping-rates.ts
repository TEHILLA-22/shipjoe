import {
  NIGERIA,
  UNITED_KINGDOM,
  FREIGHT_METHODS,
  isEuCountry,
  availableMethods,
  type FreightMethod,
} from "@/lib/quote-validation";

export {
  NIGERIA,
  UNITED_KINGDOM,
  FREIGHT_METHODS,
  isEuCountry,
  availableMethods,
};

export type { FreightMethod };

export type RateCurrency = "GBP" | "EUR";

export type RatePerKg = {
  currency: RateCurrency;
  amountPerKg: number;
  origin: string;
  destination: string;
  method: FreightMethod;
};

function eur(amountPerKg: number, origin: string, destination: string, method: FreightMethod): RatePerKg {
  return { currency: "EUR", amountPerKg, origin, destination, method };
}

function gbp(amountPerKg: number, origin: string, destination: string, method: FreightMethod): RatePerKg {
  return { currency: "GBP", amountPerKg, origin, destination, method };
}

export function getRatePerKg(
  origin: string,
  destination: string,
  method: string,
  ngnPerGbp: number,
): RatePerKg | null {
  const from = origin.trim();
  const to = destination.trim();

  if (!from || !to || !ngnPerGbp || ngnPerGbp <= 0) {
    return null;
  }

  if (from === NIGERIA && isEuCountry(to) && method === "Sea Freight") {
    return eur(3, from, to, "Sea Freight");
  }

  if (from === NIGERIA && to === UNITED_KINGDOM && method === "Sea Freight") {
    return gbp(1.5, from, to, "Sea Freight");
  }

  if (from === NIGERIA && to === UNITED_KINGDOM && method === "Air Freight") {
    return gbp(7500 / ngnPerGbp, from, to, "Air Freight");
  }

  if (from === UNITED_KINGDOM && to === NIGERIA && method === "Air Freight") {
    return gbp(5.1, from, to, "Air Freight");
  }

  return null;
}

export type FreightEstimate = {
  currency: RateCurrency;
  amountPerKg: number;
  weightKg: number;
  total: number;
  method: FreightMethod;
  origin: string;
  destination: string;
  nairaPerKg: number | null;
};

export function calculateEstimate(
  origin: string,
  destination: string,
  method: string,
  weightKg: number,
  ngnPerGbp: number,
): FreightEstimate | null {
  const rate = getRatePerKg(origin, destination, method, ngnPerGbp);

  if (!rate) {
    return null;
  }

  if (!Number.isFinite(weightKg) || weightKg <= 0) {
    return null;
  }

  const total = round2(rate.amountPerKg * weightKg);

  return {
    currency: rate.currency,
    amountPerKg: rate.amountPerKg,
    weightKg,
    total,
    method: rate.method,
    origin: rate.origin,
    destination: rate.destination,
    nairaPerKg:
      rate.currency === "GBP" &&
      rate.method === "Air Freight" &&
      rate.origin === NIGERIA
        ? 7500
        : null,
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
};

export function formatMoney(amount: number, currency: RateCurrency): string {
  return currencyFormatters[currency].format(amount);
}