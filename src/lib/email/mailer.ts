// src/lib/email/mailer.ts
//
// Dependency-free transactional email sender.
// Sends over HTTPS (Resend-compatible API by default), which works in both
// Node and serverless/edge runtimes without an SMTP library.

export type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

const DEFAULT_ENDPOINT = "https://api.resend.com/emails";

export function isEmailConfigured(): boolean {
  return Boolean(process.env.EMAIL_API_KEY && process.env.EMAIL_FROM);
}

export async function sendEmail(input: SendEmailInput): Promise<unknown> {
  const apiKey = process.env.EMAIL_API_KEY;
  const from = process.env.EMAIL_FROM;
  const replyTo = process.env.EMAIL_REPLY_TO;
  const endpoint = process.env.EMAIL_API_URL || DEFAULT_ENDPOINT;

  if (!apiKey || !from) {
    console.warn(
      "[email] Skipped sending: EMAIL_API_KEY and EMAIL_FROM must be set.",
    );
    return;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [input.to],
      ...(replyTo ? { reply_to: replyTo } : {}),
      subject: input.subject,
      html: input.html,
      text: input.text,
    }),
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      `Email provider responded ${response.status}: ${JSON.stringify(
        payload,
      ).slice(0, 500)}`,
    );
  }

  return payload;
}
