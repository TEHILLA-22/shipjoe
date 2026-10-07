"use client";

import { useEffect, useState } from "react";
import type { LiveRates } from "@/lib/rates-config";
import {
  FALLBACK_NGN_PER_EUR,
  FALLBACK_NGN_PER_GBP,
} from "@/lib/rates-config";

type RatesResponse = {
  success?: boolean;
  ngnPerGbp?: number;
  ngnPerEur?: number;
  updatedAt?: string;
  live?: boolean;
};

export const DEFAULT_RATES: LiveRates = {
  ngnPerGbp: FALLBACK_NGN_PER_GBP,
  ngnPerEur: FALLBACK_NGN_PER_EUR,
  live: false,
};

export function useCurrencyRates() {
  const [rates, setRates] = useState<LiveRates>(DEFAULT_RATES);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch("/api/rates");
        const data = (await response.json()) as RatesResponse;

        if (cancelled) return;

        if (
          response.ok &&
          data.success &&
          typeof data.ngnPerGbp === "number" &&
          data.ngnPerGbp > 0
        ) {
          setRates({
            ngnPerGbp: data.ngnPerGbp,
            ngnPerEur:
              typeof data.ngnPerEur === "number" && data.ngnPerEur > 0
                ? data.ngnPerEur
                : FALLBACK_NGN_PER_EUR,
            updatedAt: data.updatedAt,
            live: data.live === true,
          });
        }
      } catch {
        if (!cancelled) {
          setRates(DEFAULT_RATES);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { rates, isLoading };
}