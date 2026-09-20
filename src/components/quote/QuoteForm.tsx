"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ActionButton } from "@/components/ui/Buttons";
import { validateQuoteForm, type QuoteFormData } from "@/lib/quote-validation";

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

const steps = ["Route", "Shipment", "Contact", "Details", "Review"] as const;

export function QuoteForm() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<QuoteFormData>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentPercentage = ((step + 1) / steps.length) * 100;

  const formIsValid = useMemo(() => Object.keys(validateQuoteForm(values)).length === 0, [values]);

  function updateField(field: keyof QuoteFormData, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function nextStep() {
    const validationErrors = validateQuoteForm(values);
    const stepErrors = Object.fromEntries(
      Object.entries(validationErrors).filter(([key]) => {
        if (step === 0) return ["origin", "destination"].includes(key);
        if (step === 1) return ["shipmentType", "weight", "dimensions", "quantity"].includes(key) || key === "description";
        if (step === 2) return ["fullName", "email", "phone"].includes(key);
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
    if (step > 0) setStep((prev) => prev - 1);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validateQuoteForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    alert("Quote request prepared. Connect a backend endpoint to submit this form.");
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">Shipping from</label>
              <select
                value={values.origin}
                onChange={(event) => updateField("origin", event.target.value)}
                className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-500"
              >
                <option value="">Select origin</option>
                <option value="Nigeria">Nigeria</option>
                <option value="United Kingdom">United Kingdom</option>
              </select>
              {errors.origin ? <p className="mt-2 text-xs text-red-600">{errors.origin}</p> : null}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">Shipping to</label>
              <select
                value={values.destination}
                onChange={(event) => updateField("destination", event.target.value)}
                className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-500"
              >
                <option value="">Select destination</option>
                <option value="Nigeria">Nigeria</option>
                <option value="United Kingdom">United Kingdom</option>
              </select>
              {errors.destination ? <p className="mt-2 text-xs text-red-600">{errors.destination}</p> : null}
            </div>
          </div>
        );
      case 1:
        return (
          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-stone-700">Shipment type</label>
              <select
                value={values.shipmentType}
                onChange={(event) => updateField("shipmentType", event.target.value)}
                className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-500"
              >
                <option value="">Select type</option>
                <option value="Parcel">Parcel</option>
                <option value="Personal effects">Personal effects</option>
                <option value="Commercial cargo">Commercial cargo</option>
                <option value="Other">Other</option>
              </select>
              {errors.shipmentType ? <p className="mt-2 text-xs text-red-600">{errors.shipmentType}</p> : null}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">Weight (kg)</label>
              <input type="number" value={values.weight} onChange={(event) => updateField("weight", event.target.value)} className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-500" placeholder="20" />
              {errors.weight ? <p className="mt-2 text-xs text-red-600">{errors.weight}</p> : null}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">Dimensions (L x W x H)</label>
              <input value={values.dimensions} onChange={(event) => updateField("dimensions", event.target.value)} className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-500" placeholder="60 x 40 x 40" />
              {errors.dimensions ? <p className="mt-2 text-xs text-red-600">{errors.dimensions}</p> : null}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">Quantity</label>
              <input type="number" value={values.quantity} onChange={(event) => updateField("quantity", event.target.value)} className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-500" placeholder="2" />
              {errors.quantity ? <p className="mt-2 text-xs text-red-600">{errors.quantity}</p> : null}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">Preferred method</label>
              <select value={values.preferredMethod} onChange={(event) => updateField("preferredMethod", event.target.value)} className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-500">
                <option value="">Select method</option>
                <option value="Air Freight">Air Freight</option>
                <option value="Sea Freight">Sea Freight</option>
                <option value="Standard freight">Standard freight</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-stone-700">Description</label>
              <textarea value={values.description} onChange={(event) => updateField("description", event.target.value)} className="min-h-[110px] w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-500" placeholder="Describe the shipment" />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">Full name</label>
              <input value={values.fullName} onChange={(event) => updateField("fullName", event.target.value)} className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-500" placeholder="Jane Doe" />
              {errors.fullName ? <p className="mt-2 text-xs text-red-600">{errors.fullName}</p> : null}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">Company name</label>
              <input value={values.companyName} onChange={(event) => updateField("companyName", event.target.value)} className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-500" placeholder="Optional" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">Email</label>
              <input type="email" value={values.email} onChange={(event) => updateField("email", event.target.value)} className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-500" placeholder="name@example.com" />
              {errors.email ? <p className="mt-2 text-xs text-red-600">{errors.email}</p> : null}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">Phone number</label>
              <input value={values.phone} onChange={(event) => updateField("phone", event.target.value)} className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-500" placeholder="+44 20 0000 0000" />
              {errors.phone ? <p className="mt-2 text-xs text-red-600">{errors.phone}</p> : null}
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <label className="mb-2 block text-sm font-medium text-stone-700">Additional notes</label>
            <textarea value={values.notes} onChange={(event) => updateField("notes", event.target.value)} className="min-h-[140px] w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-500" placeholder="Tell us anything important about the shipment" />
          </div>
        );
      default:
        return (
          <div className="space-y-4 rounded-3xl border border-stone-200 bg-stone-50 p-5">
            <Image src="/images/Order Confirmed.svg" alt="Animated order confirmation illustration" width={500} height={500} className="mx-auto h-36 w-auto" />
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Route</p>
                <p className="mt-2 text-lg font-medium text-stone-900">{values.origin || "Not selected"} → {values.destination || "Not selected"}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Shipment</p>
                <p className="mt-2 text-lg font-medium text-stone-900">{values.shipmentType || "Not selected"}</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Contact</p>
                <p className="mt-2 text-lg font-medium text-stone-900">{values.fullName || "Not provided"}</p>
                <p className="text-sm text-stone-600">{values.email || "No email supplied"}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Notes</p>
                <p className="mt-2 text-lg font-medium text-stone-900">{values.notes ? values.notes : "No additional notes"}</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-[0_20px_60px_rgba(28,25,23,0.06)] sm:p-8">
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
          <span>Quote</span>
          <span>{step + 1} / {steps.length}</span>
        </div>
        <div className="h-2 rounded-full bg-stone-200">
          <div className="h-full rounded-full bg-stone-900 transition-all duration-300" style={{ width: `${currentPercentage}%` }} />
        </div>
      </div>

      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Step {step + 1}</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-stone-900">{steps[step]}</h3>
      </div>

      {renderStep()}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
        <div>
          {step > 0 ? (
            <ActionButton type="button" className="!bg-stone-100 !text-stone-900 !border-stone-300" onClick={prevStep}>
              Back
            </ActionButton>
          ) : null}
        </div>
        <div className="flex gap-3">
          {step < steps.length - 1 ? (
            <ActionButton type="button" onClick={nextStep}>Continue</ActionButton>
          ) : (
            <ActionButton type="submit" className={formIsValid ? "" : "opacity-60"} disabled={!formIsValid}>Request a quote</ActionButton>
          )}
        </div>
      </div>
    </form>
  );
}
