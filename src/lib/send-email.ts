import type { Resend } from "resend";

type EmailPayload = Parameters<Resend["emails"]["send"]>[0];

export async function sendEmail(resend: Resend, payload: EmailPayload): Promise<string> {
  const result = await resend.emails.send(payload);
  if (result.error || !result.data?.id) {
    throw new Error(`Resend rejected email: ${result.error?.name || "missing message ID"}`);
  }
  return result.data.id;
}
