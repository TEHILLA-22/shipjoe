export const FALLBACK_NGN_PER_GBP = 1850;
export const FALLBACK_NGN_PER_EUR = 2350;

export type LiveRates = {
  ngnPerGbp: number;
  ngnPerEur: number;
  updatedAt?: string;
  live?: boolean;
};