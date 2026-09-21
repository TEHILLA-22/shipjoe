"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Quote = {
  id: number;
  origin: string;
  destination: string;
  shipmentType: string;
  weight: number;
  quantity: number;
  fullName: string;
  email: string;
  phone: string;
  status: string;
  createdAt: string;
};

type QuotesResponse = {
  success: boolean;
  data?: Quote[];
  items?: Quote[];
  total?: number;
  currentPage?: number;
  totalPages?: number;
  message?: string;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function statusClass(status: string) {
  switch (status) {
    case "pending":
      return "bg-amber-100 text-amber-800";

    case "reviewed":
      return "bg-blue-100 text-blue-800";

    case "quoted":
      return "bg-violet-100 text-violet-800";

    case "accepted":
      return "bg-emerald-100 text-emerald-800";

    case "rejected":
      return "bg-red-100 text-red-800";

    default:
      return "bg-stone-100 text-stone-700";
  }
}

export default function AdminQuotesPage() {
  const router = useRouter();

  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadQuotes = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/quotes?page=${page}&limit=20`,
        {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        },
      );

      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }

      const result: QuotesResponse =
        await response.json();

      if (!response.ok) {
        setError(
          result.message ||
            "Unable to retrieve quotes.",
        );
        return;
      }

      const records = result.items ?? result.data ?? [];

      setQuotes(records);
      setTotalPages(result.totalPages ?? 1);
    } catch (error) {
      console.error(
        "Loading admin quotes failed:",
        error,
      );

      setError(
        "Unable to connect to the quote service.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [page, router]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    void loadQuotes();
  }, [loadQuotes]);

  return (
    <main className="min-h-screen bg-stone-100">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-stone-500">
              Ship Joe
            </p>

            <h1 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-stone-900">
              Quote requests
            </h1>
          </div>

          <button
            type="button"
            onClick={async () => {
              await fetch("/api/admin/logout", {
                method: "POST",
              });

              router.replace("/admin/login");
            }}
            className="rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
          >
            Sign out
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {error ? (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <div className="overflow-hidden rounded-[28px] border border-stone-200 bg-white shadow-sm">
          <div className="border-b border-stone-200 px-6 py-5">
            <p className="text-sm text-stone-500">
              Review incoming customer quote requests.
            </p>
          </div>

          {isLoading ? (
            <div className="px-6 py-16 text-center text-sm text-stone-500">
              Loading quote requests...
            </div>
          ) : quotes.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="text-lg font-medium text-stone-900">
                No quote requests yet.
              </p>

              <p className="mt-2 text-sm text-stone-500">
                New requests submitted through the quote
                form will appear here.
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-left">
                  <thead className="border-b border-stone-200 bg-stone-50">
                    <tr>
                      <th className="px-6 py-4 text-xs font-medium uppercase tracking-[0.15em] text-stone-500">
                        Customer
                      </th>

                      <th className="px-6 py-4 text-xs font-medium uppercase tracking-[0.15em] text-stone-500">
                        Route
                      </th>

                      <th className="px-6 py-4 text-xs font-medium uppercase tracking-[0.15em] text-stone-500">
                        Shipment
                      </th>

                      <th className="px-6 py-4 text-xs font-medium uppercase tracking-[0.15em] text-stone-500">
                        Status
                      </th>

                      <th className="px-6 py-4 text-xs font-medium uppercase tracking-[0.15em] text-stone-500">
                        Submitted
                      </th>

                      <th className="px-6 py-4" />
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-stone-200">
                    {quotes.map((quote) => (
                      <tr
                        key={quote.id}
                        className="transition hover:bg-stone-50"
                      >
                        <td className="px-6 py-5">
                          <p className="font-medium text-stone-900">
                            {quote.fullName}
                          </p>

                          <p className="mt-1 text-sm text-stone-500">
                            {quote.email}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <p className="text-sm font-medium text-stone-900">
                            {quote.origin}
                          </p>

                          <p className="my-1 text-xs text-stone-400">
                            ↓
                          </p>

                          <p className="text-sm text-stone-600">
                            {quote.destination}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <p className="text-sm font-medium text-stone-900">
                            {quote.shipmentType}
                          </p>

                          <p className="mt-1 text-xs text-stone-500">
                            {quote.weight} kg ·{" "}
                            {quote.quantity} item
                            {quote.quantity === 1
                              ? ""
                              : "s"}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${statusClass(
                              quote.status,
                            )}`}
                          >
                            {quote.status}
                          </span>
                        </td>

                        <td className="px-6 py-5 text-sm text-stone-500">
                          {formatDate(quote.createdAt)}
                        </td>

                        <td className="px-6 py-5 text-right">
                          <Link
                            href={`/admin/quotes/${quote.id}`}
                            className="text-sm font-medium text-stone-900 hover:underline"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between border-t border-stone-200 px-6 py-4">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() =>
                    setPage((current) =>
                      Math.max(current - 1, 1),
                    )
                  }
                  className="rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                <span className="text-sm text-stone-500">
                  Page {page} of {totalPages}
                </span>

                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() =>
                    setPage((current) =>
                      Math.min(
                        current + 1,
                        totalPages,
                      ),
                    )
                  }
                  className="rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}