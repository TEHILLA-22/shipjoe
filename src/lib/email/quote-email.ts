// src/lib/email/quote-email.ts

import type { Quote } from "@/lib/db/models";
import {
  formatMoney,
  formatRate,
  type FreightEstimate,
} from "@/lib/shipping-rates";
import { isEmailConfigured, sendEmail } from "@/lib/email/mailer";

export type QuoteEmailContent = {
  subject: string;
  html: string;
  text: string;
};

type PriceSummary = {
  label: string;
  total: string;
  secondary: string | null;
  rate: string | null;
};

function resolveSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return url.replace(/\/+$/, "");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatDate(iso: string): string {
  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) {
    return iso;
  }

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(date);
}

function buildPriceSummary(
  quote: Quote,
  estimate: FreightEstimate | null,
): PriceSummary | null {
  if (estimate) {
    return {
      label: "Estimated total",
      total: formatMoney(estimate.total, estimate.currency),
      secondary: estimate.totalInNaira
        ? `Approx. ${formatMoney(estimate.totalInNaira, "NGN")}`
        : null,
      rate: `${formatRate(estimate.amountPerKg)} ${estimate.currency}/kg × ${formatRate(estimate.weightKg)} kg`,
    };
  }

  if (quote.price) {
    return {
      label: "Quoted amount",
      total: formatMoney(quote.price, "NGN"),
      secondary: null,
      rate: null,
    };
  }

  return null;
}

function buildDetails(quote: Quote): Array<{ label: string; value: string }> {
  const details: Array<{ label: string; value: string }> = [
    { label: "Route", value: `${quote.origin} → ${quote.destination}` },
    { label: "Shipment type", value: quote.shipmentType },
  ];

  if (quote.preferredMethod) {
    details.push({ label: "Preferred method", value: quote.preferredMethod });
  }

  details.push({ label: "Weight", value: `${formatRate(quote.weight)} kg` });

  if (quote.dimensions) {
    details.push({ label: "Dimensions", value: quote.dimensions });
  }

  if (quote.quantity) {
    details.push({ label: "Quantity", value: String(quote.quantity) });
  }

  if (quote.description) {
    details.push({ label: "Description", value: quote.description });
  }

  if (quote.companyName) {
    details.push({ label: "Company", value: quote.companyName });
  }

  if (quote.notes) {
    details.push({ label: "Notes", value: quote.notes });
  }

  return details;
}

export function buildQuoteEmail(
  quote: Quote,
  estimate: FreightEstimate | null,
): QuoteEmailContent {
  const viewUrl = `${resolveSiteUrl()}/view-quote?ref=${encodeURIComponent(
    quote.reference,
  )}`;
  const details = buildDetails(quote);
  const price = buildPriceSummary(quote, estimate);

  const textLines: string[] = [
    "EM BRIDGE LOGISTICS",
    "Your quote request has been received.",
    "",
    `Hello ${quote.fullName},`,
    "",
    "Thank you for your quote request. Here is a summary of the items you submitted.",
    "",
    `Reference: ${quote.reference}`,
    `Status: ${quote.status}`,
    `Date: ${formatDate(quote.createdAt)}`,
    "",
    "Shipment details",
    ...details.map((item) => `${item.label}: ${item.value}`),
  ];

  if (price) {
    textLines.push("", "Price");
    if (price.rate) {
      textLines.push(`Rate: ${price.rate}`);
    }
    textLines.push(`${price.label}: ${price.total}`);
    if (price.secondary) {
      textLines.push(price.secondary);
    }
  }

  textLines.push(
    "",
    "View the latest status of your quote:",
    viewUrl,
    "",
    "If any of these details look wrong, simply reply to this email.",
    "",
    "EM Bridge Logistics",
  );

  const detailRows = details
    .map(
      (item) => `
            <tr>
              <td style="padding:8px 0;color:#78716c;font-size:14px;vertical-align:top;">${escapeHtml(
                item.label,
              )}</td>
              <td style="padding:8px 0;color:#1c1917;font-size:14px;font-weight:600;text-align:right;">${escapeHtml(
                item.value,
              )}</td>
            </tr>`,
    )
    .join("");

  const priceBlock = price
    ? `
        <div style="margin-top:24px;border:1px solid #e7e5e4;border-radius:16px;background:#fafaf9;padding:20px;">
          <p style="margin:0;color:#78716c;font-size:12px;text-transform:uppercase;letter-spacing:0.12em;">${escapeHtml(
            price.label,
          )}</p>
          <p style="margin:8px 0 0;color:#1c1917;font-size:28px;font-weight:700;">${escapeHtml(
            price.total,
          )}</p>
          ${
            price.secondary
              ? `<p style="margin:4px 0 0;color:#57534e;font-size:14px;">${escapeHtml(
                  price.secondary,
                )}</p>`
              : ""
          }
          ${
            price.rate
              ? `<p style="margin:12px 0 0;color:#78716c;font-size:13px;">Rate: ${escapeHtml(
                  price.rate,
                )}</p>`
              : ""
          }
        </div>`
    : "";

  const html = `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f5f5f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
    <div style="max-width:600px;margin:0 auto;padding:32px 16px;">
      <div style="background:#0c0a09;border-radius:20px 20px 0 0;padding:24px 28px;">
        <p style="margin:0;color:#ffffff;font-size:16px;font-weight:700;letter-spacing:0.14em;">EM BRIDGE LOGISTICS</p>
      </div>
      <div style="background:#ffffff;border-radius:0 0 20px 20px;padding:28px;">
        <h1 style="margin:0 0 8px;color:#1c1917;font-size:22px;">Your quote request has been received</h1>
        <p style="margin:0 0 20px;color:#57534e;font-size:15px;line-height:1.6;">Hello ${escapeHtml(
          quote.fullName,
        )}, thank you for your quote request. Here is a summary of the items you submitted.</p>

        <table style="width:100%;border-collapse:collapse;border-top:1px solid #e7e5e4;">
          <tr>
            <td style="padding:8px 0;color:#78716c;font-size:14px;">Reference</td>
            <td style="padding:8px 0;color:#1c1917;font-size:14px;font-weight:600;text-align:right;">${escapeHtml(
              quote.reference,
            )}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#78716c;font-size:14px;">Status</td>
            <td style="padding:8px 0;color:#1c1917;font-size:14px;font-weight:600;text-align:right;">${escapeHtml(
              quote.status,
            )}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#78716c;font-size:14px;">Date</td>
            <td style="padding:8px 0;color:#1c1917;font-size:14px;font-weight:600;text-align:right;">${escapeHtml(
              formatDate(quote.createdAt),
            )}</td>
          </tr>
          ${detailRows}
        </table>

        ${priceBlock}

        <div style="margin-top:28px;">
          <a href="${escapeHtml(
            viewUrl,
          )}" style="display:inline-block;background:#0c0a09;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 22px;border-radius:999px;">View your quote</a>
        </div>

        <p style="margin:24px 0 0;color:#78716c;font-size:13px;line-height:1.6;">If any of these details look wrong, simply reply to this email and our team will help.</p>
      </div>
      <p style="margin:16px 0 0;color:#a8a29e;font-size:12px;text-align:center;">EM Bridge Logistics — Nigeria ↔ UK ↔ Europe</p>
    </div>
  </body>
</html>`;

  return {
    subject: `Your EM Bridge Logistics quote ${quote.reference}`,
    html,
    text: textLines.join("\n"),
  };
}

export async function sendQuoteConfirmation(
  quote: Quote,
  estimate: FreightEstimate | null,
): Promise<void> {
  if (!isEmailConfigured()) {
    console.warn(
      "[email] Skipped quote confirmation: EMAIL_API_KEY or EMAIL_FROM is missing. If you just edited .env, restart the dev server (Next only reads .env at startup).",
    );
    return;
  }

  try {
    const content = buildQuoteEmail(quote, estimate);
    await sendEmail({ to: quote.email, ...content });
    console.log(
      `[email] Quote confirmation sent for ${quote.reference} to ${quote.email}`,
    );
  } catch (error) {
    console.error(
      `[email] Failed to send quote confirmation for ${quote.reference}:`,
      error,
    );
  }
}
