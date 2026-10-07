"use client";

import Link from "next/link";
import { useState } from "react";
import { ActionButton } from "@/components/ui/Buttons";
import type { PublicQuote } from "@/lib/quotes/access";
import { formatMoney } from "@/lib/shipping-rates";

const statusStyles: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  reviewed: "bg-sky-100 text-sky-800",
  quoted: "bg-indigo-100 text-indigo-800",
  accepted: "bg-emerald-100 text-emerald-800",
  rejected: "bg-rose-100 text-rose-800",
};

function formatDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

type LookupResponse = {
  success: boolean;
  message?: string;
  quote?: PublicQuote;
};

export function QuoteLookupForm({
  initialReference = "",
}: {
  initialReference?: string;
}) {
  const [reference, setReference] = useState(initialReference);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [quote, setQuote] = useState<PublicQuote | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setError("");
    setQuote(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/quotes/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference: reference.trim(),
          email: email.trim(),
          phone: phone.trim(),
          accessToken: accessToken.trim(),
        }),
      });

      const data = (await response.json()) as LookupResponse;

      if (!response.ok || !data.success || !data.quote) {
        setError(
          data.message ??
            "We couldn't find a quote with those details.",
        );
        return;
      }

      setQuote(data.quote);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  if (quote) {
    return (
      <div className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-[0_20px_60px_rgba(28,25,23,0.06)] sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-stone-200 pb-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-stone-500">
              Your quote
            </p>
            <p className="mt-2 font-mono text-2xl font-semibold tracking-[-0.03em] text-stone-900">
              {quote.reference}
            </p>
          </div>

          <span
            className={`rounded-full px-4 py-1.5 text-xs font-medium capitalize ${statusStyles[quote.status] ?? "bg-stone-100 text-stone-700"}`}
          >
            {quote.status}
          </span>
        </div>

        <dl className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {[
            ["Route", `${quote.origin} → ${quote.destination}`],
            ["Method", quote.preferredMethod ?? "Not specified"],
            ["Shipment type", quote.shipmentType],
            ["Weight", `${quote.weight} kg`],
            ["Quantity", String(quote.quantity)],
            ["Dimensions", quote.dimensions || "Not provided"],
            ["Requested", formatDate(quote.createdAt)],
            ["Last updated", formatDate(quote.updatedAt)],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs uppercase tracking-[0.18em] text-stone-500">
                {label}
              </dt>
              <dd className="mt-1 text-sm text-stone-900">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 rounded-2xl border border-stone-200 bg-stone-50 p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-stone-500">
            Estimated price
          </p>

          {quote.estimate ? (
            <>
              <p className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-stone-900">
                {formatMoney(
                  quote.estimate.total,
                  quote.estimate.currency,
                )}
              </p>

              <p className="mt-1 text-sm font-medium text-stone-700">
                ≈ {formatMoney(quote.estimate.totalInNaira, "NGN")}
              </p>

              <p className="mt-3 border-t border-stone-200 pt-3 text-xs leading-5 text-stone-500">
                {quote.estimate.weightKg} kg ×{" "}
                {formatMoney(
                  quote.estimate.amountPerKg,
                  quote.estimate.currency,
                )}
                /kg · {quote.estimate.method}
              </p>

              <p className="mt-1 text-[11px] text-stone-400">
                1 {quote.estimate.currency} ={" "}
                {Math.round(quote.estimate.nairaPerUnit).toLocaleString("en-NG")}{" "}
                NGN · calculated at lookup time, not a final quote
              </p>
            </>
          ) : (
            <p className="mt-2 text-sm text-stone-600">
              We don&apos;t have a published rate for this route and
              method. Our team will confirm the price with you.
            </p>
          )}
        </div>

        <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-stone-500">
            Contact details
          </p>

          <dl className="mt-3 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {[
              ["Full name", quote.fullName],
              ["Email", quote.email],
              ["Phone", quote.phone],
              ["Company", quote.companyName || "—"],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs uppercase tracking-[0.18em] text-stone-500">
                  {label}
                </dt>
                <dd className="mt-1 break-words text-sm text-stone-900">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {quote.description ? (
          <div className="mt-6 rounded-2xl bg-stone-50 p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-stone-500">
              Shipment details
            </p>
            <p className="mt-2 text-sm leading-6 text-stone-700">
              {quote.description}
            </p>
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <ActionButton type="button" onClick={() => setQuote(null)}>
            Look up another quote
          </ActionButton>

          <Link
            href="/quote"
            className="text-sm text-stone-600 underline underline-offset-4 transition hover:text-stone-900"
          >
            Request another quote
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-[0_20px_60px_rgba(28,25,23,0.06)] sm:p-8"
    >
      <div className="grid gap-5">
        <div>
          <label
            htmlFor="reference"
            className="mb-2 block text-sm font-medium text-stone-700"
          >
            Quote reference
          </label>
          <input
            id="reference"
            required
            value={reference}
            onChange={(event) => setReference(event.target.value)}
            placeholder="EMQ-XXXX-XXXX"
            className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 font-mono text-stone-900 outline-none transition focus:border-stone-500"
          />
          <p className="mt-2 text-xs text-stone-500">
            Shown on your confirmation right after you submit a quote.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="lookup-email"
              className="mb-2 block text-sm font-medium text-stone-700"
            >
              Email
            </label>
            <input
              id="lookup-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-500"
            />
          </div>

          <div>
            <label
              htmlFor="lookup-phone"
              className="mb-2 block text-sm font-medium text-stone-700"
            >
              Phone
            </label>
            <input
              id="lookup-phone"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="+44 7944 036 116"
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-500"
            />
          </div>
        </div>

        <p className="text-xs text-stone-500">
          Enter the email address or the phone number you used on the
          quote request.
        </p>

        <details className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
          <summary className="cursor-pointer text-sm font-medium text-stone-700">
            Have your access token?
          </summary>
          <div className="mt-4">
            <label
              htmlFor="access-token"
              className="mb-2 block text-sm font-medium text-stone-700"
            >
              Access token
            </label>
            <input
              id="access-token"
              value={accessToken}
              onChange={(event) => setAccessToken(event.target.value)}
              placeholder="Paste the token from your confirmation"
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 font-mono text-sm text-stone-900 outline-none transition focus:border-stone-500"
            />
            <p className="mt-2 text-xs text-stone-500">
              Adding your token lets you view the quote even if
              you can&apos;t reach that email or number any more.
            </p>
          </div>
        </details>

        {error ? (
          <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </p>
        ) : null}

        <ActionButton type="submit" disabled={isLoading}>
          {isLoading ? "Looking up..." : "Find my quote"}
        </ActionButton>
      </div>
    </form>
  );
}