// src/app/api/email/test/route.ts
//
// Dev-only diagnostic: hit /api/email/test?to=you@example.com to trigger a
// real send and see the provider's raw response. Disabled in production.

import { NextRequest, NextResponse } from "next/server";
import { isEmailConfigured, sendEmail } from "@/lib/email/mailer";
import { buildQuoteEmail } from "@/lib/email/quote-email";
import type { Quote } from "@/lib/db/models";

export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available." }, { status: 404 });
  }

  const to = new URL(request.url).searchParams.get("to");

  if (!to) {
    return NextResponse.json(
      { error: "Add ?to=you@example.com to the URL." },
      { status: 400 },
    );
  }

  if (!isEmailConfigured()) {
    return NextResponse.json(
      {
        configured: false,
        from: process.env.EMAIL_FROM ?? null,
        hasApiKey: Boolean(process.env.EMAIL_API_KEY),
        message:
          "EMAIL_API_KEY / EMAIL_FROM missing. Restart the dev server after editing .env.",
      },
      { status: 400 },
    );
  }

  const now = new Date().toISOString();

  const sample: Quote = {
    origin: "Nigeria",
    destination: "United Kingdom",
    shipmentType: "Commercial cargo",
    weight: 25.5,
    dimensions: "120x80x90 cm",
    quantity: 3,
    price: 398117,
    description: "Sample shipment for email delivery test.",
    preferredMethod: "Sea Freight",
    fullName: "Email Test",
    email: to,
    phone: "0000000000",
    companyName: "EM Bridge Logistics",
    notes: "Sent from /api/email/test",
    reference: "EMQ-TEST-0001",
    accessTokenHash: "x".repeat(64),
    status: "pending",
    createdAt: now,
    updatedAt: now,
  };

  try {
    const content = buildQuoteEmail(sample, null);
    const result = await sendEmail({ to, ...content });

    return NextResponse.json({
      configured: true,
      from: process.env.EMAIL_FROM,
      ok: true,
      provider: result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        configured: true,
        from: process.env.EMAIL_FROM,
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 502 },
    );
  }
}
