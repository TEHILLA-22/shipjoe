"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ActionButton } from "@/components/ui/Buttons";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const contentType = response.headers.get("content-type") ?? "";

if (!contentType.includes("application/json")) {
  const body = await response.text();

  console.error("ADMIN LOGIN API ERROR", {
    status: response.status,
    statusText: response.statusText,
    contentType,
    body,
  });

  setError(
    `Server error (${response.status}). Check the terminal for the actual error.`,
  );

  return;
}

const result = await response.json();

      if (!response.ok) {
        setError(
          result.message || "Invalid login credentials.",
        );
        return;
      }

      router.replace("/admin/quotes");
      router.refresh();
    } catch (error) {
      console.error("Admin login failed:", error);

      setError(
        "Unable to connect to the server. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-950 px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-stone-500">
            EM Move Logistics
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-white">
            Admin portal
          </h1>

          <p className="mt-3 text-sm leading-6 text-stone-400">
            Sign in to manage quote requests and shipping
            enquiries.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[28px] border border-stone-800 bg-stone-900 p-6 shadow-2xl sm:p-8"
        >
          {error ? (
            <div
              role="alert"
              className="mb-6 rounded-2xl border border-red-900/60 bg-red-950/40 px-4 py-3 text-sm leading-6 text-red-300"
            >
              {error}
            </div>
          ) : null}

          <div className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-stone-300"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                disabled={isSubmitting}
                required
                className="w-full rounded-2xl border border-stone-700 bg-stone-950 px-4 py-3 text-white outline-none transition placeholder:text-stone-600 focus:border-stone-400 disabled:cursor-not-allowed disabled:opacity-60"
                placeholder="admin@shipjoe.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-stone-300"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                disabled={isSubmitting}
                required
                className="w-full rounded-2xl border border-stone-700 bg-stone-950 px-4 py-3 text-white outline-none transition placeholder:text-stone-600 focus:border-stone-400 disabled:cursor-not-allowed disabled:opacity-60"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div className="mt-7">
            <ActionButton
              type="submit"
              disabled={
                isSubmitting ||
                !email.trim() ||
                !password
              }
              className="w-full justify-center"
            >
              {isSubmitting
                ? "Signing in..."
                : "Sign in"}
            </ActionButton>
          </div>
        </form>
      </div>
    </main>
  );
}