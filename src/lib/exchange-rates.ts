import {
  FALLBACK_NGN_PER_EUR,
  FALLBACK_NGN_PER_GBP,
} from "@/lib/rates-config";

export { FALLBACK_NGN_PER_EUR, FALLBACK_NGN_PER_GBP };

export type CurrencyRates = {
  ngnPerGbp: number;
  ngnPerEur: number;
  updatedAt: string;
  live: boolean;
};

const API_BASE = "https://v6.exchangerate-api.com/v6";

const TTL_MS = 15 * 60 * 1000;
const FAILURE_RETRY_MS = 60 * 1000;

let cached: CurrencyRates | null = null;
let expiresAt = 0;
let inflight: Promise<CurrencyRates> | null = null;

function fallbackRates(): CurrencyRates {
  return {
    ngnPerGbp: FALLBACK_NGN_PER_GBP,
    ngnPerEur: FALLBACK_NGN_PER_EUR,
    updatedAt: new Date().toISOString(),
    live: false,
  };
}

function isUsable(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

async function fetchLiveRates(): Promise<CurrencyRates> {
  const apiKey = process.env.EXCHANGE_RATE_API_KEY;

  if (!apiKey) {
    console.warn("EXCHANGE_RATE_API_KEY is not configured.");
    return fallbackRates();
  }

  const response = await fetch(
    `${API_BASE}/${apiKey}/latest/NGN`,
    { next: { revalidate: TTL_MS / 1000 } },
  );

  if (!response.ok) {
    throw new Error(`Exchange rate API responded ${response.status}.`);
  }

  const data = (await response.json()) as {
    result?: string;
    conversion_rates?: Record<string, number>;
  };

  const gbpFromNgn = data.conversion_rates?.GBP;
  const eurFromNgn = data.conversion_rates?.EUR;

  if (
    data.result !== "success" ||
    !isUsable(gbpFromNgn) ||
    !isUsable(eurFromNgn)
  ) {
    throw new Error("Exchange rate API returned an unusable payload.");
  }

  return {
    ngnPerGbp: 1 / gbpFromNgn,
    ngnPerEur: 1 / eurFromNgn,
    updatedAt: new Date().toISOString(),
    live: true,
  };
}

export async function getCurrencyRates(): Promise<CurrencyRates> {
  if (cached && Date.now() < expiresAt) {
    return cached;
  }

  if (inflight) {
    return inflight;
  }

  inflight = (async () => {
    try {
      const rates = await fetchLiveRates();
      cached = rates;
      expiresAt = Date.now() + TTL_MS;
      return rates;
    } catch (error) {
      console.error("getCurrencyRates failed:", error);

      expiresAt = Date.now() + FAILURE_RETRY_MS;

      return cached ?? fallbackRates();
    } finally {
      inflight = null;
    }
  })();

  return inflight;
}