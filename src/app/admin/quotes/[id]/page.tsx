"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

type Quote = {
  id: number;
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
};

export default function AdminQuoteDetailPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id;

  const [quote, setQuote] = useState<Quote | null>(
    null,
  );

  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadQuote = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/quotes/${id}`,
        {
          credentials: "include",
          cache: "no-store",
        },
      );

      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }

      const result = await response.json();

      if (!response.ok) {
        setError(
          result.message ||
            "Unable to retrieve this quote.",
        );
        return;
      }

      setQuote(result.quote);
      setStatus(result.quote.status);
    } catch (error) {
      console.error(
        "Loading quote failed:",
        error,
      );

      setError(
        "Unable to connect to the quote service.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [id, router]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadQuote();
  }, [loadQuote]);

  async function updateStatus() {
    if (!quote || isSaving) return;

    setIsSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `/api/quotes/${quote.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            status,
          }),
        },
      );

      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }

      const result = await response.json();

      if (!response.ok) {
        setError(
          result.message ||
            "Unable to update the quote.",
        );
        return;
      }

      setQuote(result.quote);
      setStatus(result.quote.status);
      setSuccess("Quote status updated successfully.");
    } catch (error) {
      console.error(
        "Updating quote failed:",
        error,
      );

      setError(
        "Unable to connect to the quote service.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-100">
        <p className="text-sm text-stone-500">
          Loading quote...
        </p>
      </main>
    );
  }

  if (!quote) {
    return (
      <main className="min-h-screen bg-stone-100 px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/admin/quotes"
            className="text-sm font-medium text-stone-600 hover:text-stone-900"
          >
            ← Back to quotes
          </Link>

          <div className="mt-8 rounded-[28px] border border-stone-200 bg-white p-8">
            <h1 className="text-2xl font-semibold text-stone-900">
              Quote not found
            </h1>

            <p className="mt-2 text-sm text-stone-500">
              {error ||
                "This quote may have been removed or does not exist."}
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-100">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-5">
          <Link
            href="/admin/quotes"
            className="text-sm font-medium text-stone-500 hover:text-stone-900"
          >
            ← Back to quotes
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-8">
        {error ? (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {success ? (
          <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {success}
          </div>
        ) : null}

        <div className="mb-8">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-stone-500">
            Quote #{quote.id}
          </p>

          <h1 className="mt-2 text-4xl font-semibold tracking-[-0.05em] text-stone-900">
            {quote.fullName}
          </h1>

          <p className="mt-2 text-sm text-stone-500">
            Submitted{" "}
            {new Intl.DateTimeFormat("en-GB", {
              dateStyle: "long",
              timeStyle: "short",
            }).format(new Date(quote.createdAt))}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            <section className="rounded-[28px] border border-stone-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-stone-900">
                Route
              </h2>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Info
                  label="Origin"
                  value={quote.origin}
                />

                <Info
                  label="Destination"
                  value={quote.destination}
                />

                <Info
                  label="Shipment type"
                  value={quote.shipmentType}
                />

                <Info
                  label="Preferred method"
                  value={
                    quote.preferredMethod ||
                    "Not specified"
                  }
                />
              </div>
            </section>

            <section className="rounded-[28px] border border-stone-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-stone-900">
                Shipment
              </h2>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Info
                  label="Weight"
                  value={`${quote.weight} kg`}
                />

                <Info
                  label="Quantity"
                  value={String(quote.quantity)}
                />

                <Info
                  label="Dimensions"
                  value={quote.dimensions}
                />
              </div>

              <div className="mt-6">
                <Info
                  label="Description"
                  value={
                    quote.description ||
                    "No description provided."
                  }
                />
              </div>

              <div className="mt-6">
                <Info
                  label="Additional notes"
                  value={
                    quote.notes ||
                    "No additional notes."
                  }
                />
              </div>
            </section>

            <section className="rounded-[28px] border border-stone-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-stone-900">
                Customer
              </h2>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Info
                  label="Full name"
                  value={quote.fullName}
                />

                <Info
                  label="Company"
                  value={
                    quote.companyName ||
                    "Not provided"
                  }
                />

                <Info
                  label="Email"
                  value={quote.email}
                />

                <Info
                  label="Phone"
                  value={quote.phone}
                />
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-[28px] border border-stone-200 bg-white p-6">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
              Quote status
            </p>

            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value)
              }
              disabled={isSaving}
              className="mt-4 w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none focus:border-stone-500"
            >
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="quoted">Quoted</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>

            <button
              type="button"
              onClick={updateStatus}
              disabled={
                isSaving ||
                status === quote.status
              }
              className="mt-3 w-full rounded-2xl bg-stone-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving
                ? "Saving..."
                : "Save status"}
            </button>

            <div className="mt-6 border-t border-stone-200 pt-6">
              <Info
                label="Created"
                value={new Intl.DateTimeFormat(
                  "en-GB",
                  {
                    dateStyle: "medium",
                    timeStyle: "short",
                  },
                ).format(
                  new Date(quote.createdAt),
                )}
              />

              <div className="mt-5">
                <Info
                  label="Last updated"
                  value={new Intl.DateTimeFormat(
                    "en-GB",
                    {
                      dateStyle: "medium",
                      timeStyle: "short",
                    },
                  ).format(
                    new Date(quote.updatedAt),
                  )}
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.15em] text-stone-400">
        {label}
      </p>

      <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-stone-800">
        {value}
      </p>
    </div>
  );
}