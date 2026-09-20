"use client";

import { useState } from "react";

export function TrackingForm() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="rounded-[32px] border border-stone-200 bg-white p-6 sm:p-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="tracking-number" className="mb-2 block text-sm font-medium text-stone-700">
            Tracking number
          </label>
          <input
            id="tracking-number"
            value={trackingNumber}
            onChange={(event) => setTrackingNumber(event.target.value)}
            placeholder="Enter tracking number"
            className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-500"
          />
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-stone-50 transition hover:bg-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2"
        >
          Track shipment
        </button>
      </form>

      <div className="mt-8 rounded-3xl border border-dashed border-stone-300 bg-stone-50 p-6 text-sm text-stone-600">
        {submitted ? (
          <>
            <p className="font-medium text-stone-900">Tracking status is not available yet.</p>
            <p className="mt-2">This placeholder is ready to be replaced by a real shipment tracking API when the backend is connected.</p>
          </>
        ) : (
          <>
            <p className="font-medium text-stone-900">Track your shipment</p>
            <p className="mt-2">Enter a tracking number to check status once the live tracking backend is connected.</p>
          </>
        )}
      </div>
    </div>
  );
}
