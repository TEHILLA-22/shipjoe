"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ActionButton } from "@/components/ui/Buttons";
import {
  validateQuoteForm,
  CORE_ROUTES,
  EU_ROUTES,
  availableMethods,
  isEuCountry,
  type FreightMethod,
  type QuoteFormData,
} from "@/lib/quote-validation";
import {
  calculateEstimate,
  formatMoney,
} from "@/lib/shipping-rates";
import { useCurrencyRates } from "@/hooks/useCurrencyRates";

const initialValues: QuoteFormData = {
  origin: "",
  destination: "",
  shipmentType: "",
  weight: "",
  dimensions: "",
  quantity: "",
  description: "",
  preferredMethod: "",
  fullName: "",
  email: "",
  phone: "",
  companyName: "",
  notes: "",
};

const steps = [
  "Route",
  "Shipment",
  "Contact",
  "Details",
  "Review",
] as const;

type SubmissionResult = {
  quoteId?: number;
  reference?: string;
  accessToken?: string;
  message?: string;
};

function RouteOptions({ 
  blocked, 
  disableEurope = false 
}: { 
  blocked: string;
  disableEurope?: boolean;
}) {
  return (
    <>
      {CORE_ROUTES.map((route) => (
        <option key={route} value={route} disabled={route === blocked}>
          {route}
        </option>
      ))}
      <optgroup label="Europe (EU)">
        {EU_ROUTES.map((route) => (
          <option 
            key={route} 
            value={route} 
            disabled={route === blocked || disableEurope}
          >
            {route}
          </option>
        ))}
      </optgroup>
    </>
  );
}

export function QuoteForm() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<QuoteFormData>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedQuote, setSubmittedQuote] =
    useState<SubmissionResult | null>(null);

  const currentPercentage = ((step + 1) / steps.length) * 100;

  const { rates, isLoading: ratesLoading } = useCurrencyRates();

  const methodOptions = availableMethods(values.destination);
  const destinationIsEurope = isEuCountry(values.destination);
  const originIsUK = values.origin === "United Kingdom";

  const estimate = useMemo(() => {
    const weightKg = Number(values.weight);

    if (!Number.isFinite(weightKg) || weightKg <= 0) {
      return null;
    }

    return calculateEstimate(
      values.origin,
      values.destination,
      values.preferredMethod,
      weightKg,
      rates,
    );
  }, [
    values.origin,
    values.destination,
    values.preferredMethod,
    values.weight,
    rates,
  ]);

  const awaitingRateSelection =
    !estimate &&
    values.origin &&
    values.destination &&
    values.preferredMethod &&
    Number(values.weight) > 0;

  const formIsValid = useMemo(
    () => Object.keys(validateQuoteForm(values)).length === 0,
    [values],
  );

  function updateField(field: keyof QuoteFormData, value: string) {
    setValues((prev) => {
      const next = { ...prev, [field]: value };

      if (field === "origin" && next.destination === value) {
        next.destination = "";
      }

      // If origin is changed to UK and destination is EU, clear destination
      if (field === "origin" && value === "United Kingdom" && isEuCountry(next.destination)) {
        next.destination = "";
      }

      if (field === "destination" && next.origin === value) {
        next.origin = "";
      }

      if (
        next.preferredMethod &&
        !availableMethods(next.destination).includes(
          next.preferredMethod as FreightMethod,
        )
      ) {
        next.preferredMethod = "";
      }

      return next;
    });

    setErrors((prev) => {
      const next = { ...prev };

      delete next[field];
      delete next.form;

      return next;
    });
  }

  function nextStep() {
    if (isSubmitting) return;

    const validationErrors = validateQuoteForm(values);

    const stepErrors = Object.fromEntries(
      Object.entries(validationErrors).filter(([key]) => {
        if (step === 0) {
          return ["origin", "destination"].includes(key);
        }

        if (step === 1) {
          return [
            "shipmentType",
            "weight",
            "dimensions",
            "quantity",
            "description",
          ].includes(key);
        }

        if (step === 2) {
          return ["fullName", "email", "phone"].includes(key);
        }

        if (step === 3) {
          return ["notes"].includes(key);
        }

        return false;
      }),
    );

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
    }
  }

  function prevStep() {
    if (isSubmitting) return;

    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (isSubmitting) return;

    const validationErrors = validateQuoteForm(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      const firstErrorField = Object.keys(validationErrors)[0];

      if (
        ["origin", "destination"].includes(firstErrorField)
      ) {
        setStep(0);
      } else if (
        [
          "shipmentType",
          "weight",
          "dimensions",
          "quantity",
          "description",
          "preferredMethod",
        ].includes(firstErrorField)
      ) {
        setStep(1);
      } else if (
        ["fullName", "email", "phone", "companyName"].includes(
          firstErrorField,
        )
      ) {
        setStep(2);
      } else {
        setStep(3);
      }

      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      let result: SubmissionResult = {};

      try {
        result = await response.json();
      } catch {
        result = {};
      }

      if (!response.ok) {
        setErrors({
          form:
            result.message ||
            "Something went wrong while submitting your quote.",
        });

        return;
      }

      setSubmittedQuote({
        quoteId: result.quoteId,
        reference: result.reference,
        accessToken: result.accessToken,
        message:
          result.message ||
          "Your quote request has been submitted successfully.",
      });
    } catch (error) {
      console.error("Quote submission failed:", error);

      setErrors({
        form:
          "We couldn't connect to EM Move Logistics. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function startAnotherQuote() {
    setValues(initialValues);
    setErrors({});
    setSubmittedQuote(null);
    setStep(0);
  }

  if (submittedQuote) {
    return (
      <div className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-[0_20px_60px_rgba(28,25,23,0.06)] sm:p-8">
        <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
          <Image
            src="/images/Order Confirmed.svg"
            alt="Quote request submitted"
            width={500}
            height={500}
            className="mb-6 h-44 w-auto"
          />

          <p className="text-xs font-medium uppercase tracking-[0.22em] text-stone-500">
            Request received
          </p>

          <h3 className="mt-3 max-w-xl text-3xl font-semibold tracking-[-0.05em] text-stone-900 sm:text-4xl">
            Your quote request is on its way.
          </h3>

          <p className="mt-4 max-w-lg text-base leading-7 text-stone-600">
            {submittedQuote.message}
          </p>

          {submittedQuote.reference ? (
            <div className="mt-6 w-full max-w-sm rounded-2xl border border-stone-200 bg-stone-50 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                Quote reference
              </p>

              <p className="mt-1 font-mono text-lg font-semibold text-stone-900">
                {submittedQuote.reference}
              </p>

              <p className="mt-3 text-xs leading-5 text-stone-500">
                Save this reference. You can use it with your email or
                phone number to check your quote status at any time.
              </p>
            </div>
          ) : null}

          <p className="mt-6 max-w-md text-sm leading-6 text-stone-500">
            Our team will review the shipment details and contact you using
            the information you provided.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {submittedQuote.reference ? (
              <Link
                href={`/view-quote?ref=${encodeURIComponent(
                  submittedQuote.reference,
                )}`}
                className="inline-flex items-center rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-stone-700"
              >
                View this quote
              </Link>
            ) : null}

            <ActionButton type="button" onClick={startAnotherQuote}>
              Request another quote
            </ActionButton>
          </div>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="origin"
                className="mb-2 block text-sm font-medium text-stone-700"
              >
                Shipping from
              </label>

              <select
                id="origin"
                value={values.origin}
                onChange={(event) =>
                  updateField("origin", event.target.value)
                }
                disabled={isSubmitting}
                className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select origin</option>
                <RouteOptions blocked={values.destination} />
              </select>

              {errors.origin ? (
                <p className="mt-2 text-xs text-red-600">
                  {errors.origin}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="destination"
                className="mb-2 block text-sm font-medium text-stone-700"
              >
                Shipping to
              </label>

              <select
                id="destination"
                value={values.destination}
                onChange={(event) =>
                  updateField("destination", event.target.value)
                }
                disabled={isSubmitting}
                className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select destination</option>
                <RouteOptions blocked={values.origin} disableEurope={originIsUK} />
              </select>

              {errors.destination ? (
                <p className="mt-2 text-xs text-red-600">
                  {errors.destination}
                </p>
              ) : null}

              {originIsUK ? (
                <p className="mt-2 text-xs text-stone-500">
                  We don't ship to Europe from the United Kingdom.
                </p>
              ) : null}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label
                htmlFor="shipmentType"
                className="mb-2 block text-sm font-medium text-stone-700"
              >
                Shipment type
              </label>

              <select
                id="shipmentType"
                value={values.shipmentType}
                onChange={(event) =>
                  updateField(
                    "shipmentType",
                    event.target.value,
                  )
                }
                disabled={isSubmitting}
                className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select type</option>
                <option value="Parcel">Parcel</option>
                <option value="Personal effects">
                  Personal effects
                </option>
                <option value="Commercial cargo">
                  Commercial cargo
                </option>
                <option value="Other">Other</option>
              </select>

              {errors.shipmentType ? (
                <p className="mt-2 text-xs text-red-600">
                  {errors.shipmentType}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="weight"
                className="mb-2 block text-sm font-medium text-stone-700"
              >
                Weight (kg)
              </label>

              <input
                id="weight"
                type="number"
                min="0"
                step="0.01"
                value={values.weight}
                onChange={(event) =>
                  updateField("weight", event.target.value)
                }
                disabled={isSubmitting}
                className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-500 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="20"
              />

              {errors.weight ? (
                <p className="mt-2 text-xs text-red-600">
                  {errors.weight}
                </p>
              ) : null}
            </div>

            <div className="md:col-span-2">
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium text-stone-700">
                    Estimated shipping cost
                  </p>

                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                      rates.live
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-stone-200 text-stone-600"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        rates.live ? "bg-emerald-500" : "bg-stone-400"
                      }`}
                    />
                    {ratesLoading
                      ? "Loading rates..."
                      : rates.live
                        ? "Live exchange rate"
                        : "Fallback rate"}
                  </span>
                </div>

                {estimate ? (
                  <>
                    <p className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-stone-900">
                      {formatMoney(
                        estimate.total,
                        estimate.currency,
                      )}
                    </p>

                    <p className="mt-1.5 text-sm font-medium text-stone-700">
                      ≈{" "}
                      {formatMoney(
                        estimate.totalInNaira,
                        "NGN",
                      )}
                    </p>

                    <p className="mt-3 border-t border-stone-200 pt-3 text-xs leading-5 text-stone-500">
                      {estimate.weightKg} kg ×{" "}
                      {formatMoney(
                        estimate.amountPerKg,
                        estimate.currency,
                      )}
                      /kg
                      {estimate.nairaPerKg
                        ? ` (₦${estimate.nairaPerKg.toLocaleString("en-NG")}/kg)`
                        : ""}{" "}
                      · {estimate.method} · {estimate.destination}
                    </p>

                    <p className="mt-1 text-[11px] text-stone-400">
                      1 {estimate.currency === "EUR" ? "EUR" : "GBP"} ={" "}
                      {Math.round(estimate.nairaPerUnit).toLocaleString("en-NG")} NGN
                      {rates.updatedAt
                        ? ` · updated ${new Date(rates.updatedAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}`
                        : ""}
                    </p>
                  </>
                ) : awaitingRateSelection ? (
                  <p className="mt-2 text-sm text-stone-600">
                    We don&apos;t have a published rate for this
                    route and method. Send the request and we&apos;ll
                    come back with a quote.
                  </p>
                ) : (
                  <p className="mt-2 text-sm text-stone-600">
                    Choose a route, method and weight to see an
                    instant estimate.
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="dimensions"
                className="mb-2 block text-sm font-medium text-stone-700"
              >
                Dimensions (L x W x H)
              </label>

              <input
                id="dimensions"
                value={values.dimensions}
                onChange={(event) =>
                  updateField(
                    "dimensions",
                    event.target.value,
                  )
                }
                disabled={isSubmitting}
                className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-500 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="60 x 40 x 40"
              />

              {errors.dimensions ? (
                <p className="mt-2 text-xs text-red-600">
                  {errors.dimensions}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="quantity"
                className="mb-2 block text-sm font-medium text-stone-700"
              >
                Quantity
              </label>

              <input
                id="quantity"
                type="number"
                min="1"
                step="1"
                value={values.quantity}
                onChange={(event) =>
                  updateField(
                    "quantity",
                    event.target.value,
                  )
                }
                disabled={isSubmitting}
                className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-500 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="2"
              />

              {errors.quantity ? (
                <p className="mt-2 text-xs text-red-600">
                  {errors.quantity}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="preferredMethod"
                className="mb-2 block text-sm font-medium text-stone-700"
              >
                Preferred method
              </label>

              <select
                id="preferredMethod"
                value={values.preferredMethod}
                onChange={(event) =>
                  updateField(
                    "preferredMethod",
                    event.target.value,
                  )
                }
                disabled={isSubmitting}
                className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select method</option>
                {methodOptions.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>

              {destinationIsEurope ? (
                <p className="mt-2 text-xs text-stone-500">
                  Europe is served by sea freight only, so air and
                  standard freight are unavailable for this destination.
                </p>
              ) : null}

              {errors.preferredMethod ? (
                <p className="mt-2 text-xs text-red-600">
                  {errors.preferredMethod}
                </p>
              ) : null}
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-stone-700"
              >
                Description
              </label>

              <textarea
                id="description"
                value={values.description}
                onChange={(event) =>
                  updateField(
                    "description",
                    event.target.value,
                  )
                }
                disabled={isSubmitting}
                className="min-h-[110px] w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-500 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Describe the shipment"
              />

              {errors.description ? (
                <p className="mt-2 text-xs text-red-600">
                  {errors.description}
                </p>
              ) : null}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-medium text-stone-700"
              >
                Full name
              </label>

              <input
                id="fullName"
                value={values.fullName}
                onChange={(event) =>
                  updateField(
                    "fullName",
                    event.target.value,
                  )
                }
                disabled={isSubmitting}
                autoComplete="name"
                className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-500 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Jane Doe"
              />

              {errors.fullName ? (
                <p className="mt-2 text-xs text-red-600">
                  {errors.fullName}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="companyName"
                className="mb-2 block text-sm font-medium text-stone-700"
              >
                Company name
              </label>

              <input
                id="companyName"
                value={values.companyName}
                onChange={(event) =>
                  updateField(
                    "companyName",
                    event.target.value,
                  )
                }
                disabled={isSubmitting}
                autoComplete="organization"
                className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-500 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Optional"
              />

              {errors.companyName ? (
                <p className="mt-2 text-xs text-red-600">
                  {errors.companyName}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-stone-700"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={values.email}
                onChange={(event) =>
                  updateField("email", event.target.value)
                }
                disabled={isSubmitting}
                autoComplete="email"
                className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-500 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="name@example.com"
              />

              {errors.email ? (
                <p className="mt-2 text-xs text-red-600">
                  {errors.email}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-stone-700"
              >
                Phone number
              </label>

              <input
                id="phone"
                type="tel"
                value={values.phone}
                onChange={(event) =>
                  updateField("phone", event.target.value)
                }
                disabled={isSubmitting}
                autoComplete="tel"
                className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-500 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="+44 20 0000 0000"
              />

              {errors.phone ? (
                <p className="mt-2 text-xs text-red-600">
                  {errors.phone}
                </p>
              ) : null}
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <label
              htmlFor="notes"
              className="mb-2 block text-sm font-medium text-stone-700"
            >
              Additional notes
            </label>

            <textarea
              id="notes"
              value={values.notes}
              onChange={(event) =>
                updateField("notes", event.target.value)
              }
              disabled={isSubmitting}
              className="min-h-[140px] w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-500 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Tell us anything important about the shipment"
            />

            {errors.notes ? (
              <p className="mt-2 text-xs text-red-600">
                {errors.notes}
              </p>
            ) : null}
          </div>
        );

      default:
        return (
          <div className="space-y-4 rounded-3xl border border-stone-200 bg-stone-50 p-5">
            <Image
              src="/images/Order Confirmed.svg"
              alt="Order confirmation illustration"
              width={500}
              height={500}
              className="mx-auto h-36 w-auto"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
                  Route
                </p>

                <p className="mt-2 text-lg font-medium text-stone-900">
                  {values.origin || "Not selected"} →{" "}
                  {values.destination || "Not selected"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
                  Shipment
                </p>

                <p className="mt-2 text-lg font-medium text-stone-900">
                  {values.shipmentType || "Not selected"}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
                  Contact
                </p>

                <p className="mt-2 text-lg font-medium text-stone-900">
                  {values.fullName || "Not provided"}
                </p>

                <p className="text-sm text-stone-600">
                  {values.email || "No email supplied"}
                </p>

                <p className="text-sm text-stone-600">
                  {values.phone || "No phone supplied"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
                  Shipment details
                </p>

                <p className="mt-2 text-sm text-stone-700">
                  <span className="font-medium">Weight:</span>{" "}
                  {values.weight || "Not provided"} kg
                </p>

                <p className="text-sm text-stone-700">
                  <span className="font-medium">Quantity:</span>{" "}
                  {values.quantity || "Not provided"}
                </p>

                <p className="text-sm text-stone-700">
                  <span className="font-medium">Method:</span>{" "}
                  {values.preferredMethod || "Not specified"}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
                Notes
              </p>

              <p className="mt-2 text-sm leading-6 text-stone-700">
                {values.notes || "No additional notes"}
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-[0_20px_60px_rgba(28,25,23,0.06)] sm:p-8"
    >
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
          <span>Quote</span>

          <span>
            {step + 1} / {steps.length}
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-stone-200">
          <div
            className="h-full rounded-full bg-stone-900 transition-all duration-300"
            style={{
              width: `${currentPercentage}%`,
            }}
          />
        </div>
      </div>

      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
          Step {step + 1}
        </p>

        <h3 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-stone-900">
          {steps[step]}
        </h3>
      </div>

      {errors.form ? (
        <div
          role="alert"
          className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
        >
          {errors.form}
        </div>
      ) : null}

      {renderStep()}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
        <div>
          {step > 0 ? (
            <ActionButton
              type="button"
              className="!border-stone-300 !bg-stone-100 !text-stone-900"
              onClick={prevStep}
              disabled={isSubmitting}
            >
              Back
            </ActionButton>
          ) : null}
        </div>

        <div className="flex gap-3">
          {step < steps.length - 1 ? (
            <ActionButton
              type="button"
              onClick={nextStep}
              disabled={isSubmitting}
            >
              Continue
            </ActionButton>
          ) : (
            <ActionButton
              type="submit"
              disabled={!formIsValid || isSubmitting}
              className={
                !formIsValid || isSubmitting
                  ? "opacity-60"
                  : ""
              }
            >
              {isSubmitting
                ? "Submitting request..."
                : "Request a quote"}
            </ActionButton>
          )}
        </div>
      </div>
    </form>
  );
}
