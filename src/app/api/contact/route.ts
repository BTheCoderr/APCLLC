import { NextResponse } from "next/server";
import { Resend } from "resend";
import sql from "@/utils/db";
import { escapeHtml, htmlLines } from "@/lib/html";
import { SITE } from "@/lib/site";
import { getClientIp } from "@/lib/admin-auth";
import { rateLimit } from "@/lib/rate-limit";
import {
  isDuplicateSubmission,
  PUBLIC_FORM_ERROR,
  submissionFingerprint,
} from "@/lib/form-guard";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limited = rateLimit(`contact:${ip}`, 8, 10 * 60 * 1000);
    if (!limited.ok) {
      return NextResponse.json(
        { error: "Too many messages. Please wait a few minutes or call APC." },
        { status: 429 }
      );
    }

    const data = await request.json();
    const { name, email, phone, message } = data;

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const fingerprint = submissionFingerprint({ email, phone, message });
    if (isDuplicateSubmission(fingerprint)) {
      return NextResponse.json({ success: true, databaseSaved: false, duplicate: true });
    }

    const resend = getResend();
    if (!resend) {
      return NextResponse.json({ error: PUBLIC_FORM_ERROR }, { status: 500 });
    }

    let dbOperationSuccessful = false;
    let submissionId: unknown = null;

    try {
      const result = await sql.safeQuery`
        INSERT INTO contact_submissions (
          name, email, phone, message, created_at, status, email_status
        ) VALUES (
          ${name}, ${email}, ${phone}, ${message}, ${new Date().toISOString()}, 'new', 'pending'
        )
        RETURNING id
      `;

      if (result && result[0] && result[0].id) {
        submissionId = result[0].id;
        dbOperationSuccessful = true;
      }
    } catch {
      console.error("Database operation failed, continuing with email only");
    }

    const adminEmailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Message:</strong></p>
      <p>${htmlLines(String(message))}</p>
      <p><em>Note: ${dbOperationSuccessful ? "This submission was saved to the database." : "This submission could NOT be saved to the database due to connection issues."}</em></p>
    `;

    const userEmailHtml = `
      <h2>Thank you for contacting APC LLC!</h2>
      <p>Hello ${escapeHtml(name)},</p>
      <p>We've received your message and will get back to you as soon as possible.</p>
      <p>Here's a copy of your message for your records:</p>
      <blockquote style="border-left: 4px solid #ccc; padding-left: 15px; margin-left: 0; color: #555;">
        ${htmlLines(String(message))}
      </blockquote>
      <p>If you need immediate assistance, please call us at ${SITE.phoneDisplay}.</p>
      <p>Best regards,<br>The APC LLC Team</p>
    `;

    try {
      const adminResult = await resend.emails.send({
        from: `APC LLC <${SITE.email}>`,
        to: SITE.email,
        subject: `Contact Form Submission from ${name}`,
        html: adminEmailHtml,
        replyTo: email,
      });

      const userResult = await resend.emails.send({
        from: `APC LLC <${SITE.email}>`,
        to: email,
        subject: "We've received your message - APC LLC",
        html: userEmailHtml,
        replyTo: SITE.email,
      });

      if (dbOperationSuccessful && submissionId) {
        try {
          await sql.safeQuery`
            UPDATE contact_submissions
            SET
              email_status = 'sent',
              admin_email_id = ${adminResult.data?.id || null},
              user_email_id = ${userResult.data?.id || null}
            WHERE
              id = ${submissionId}
          `;
        } catch {
          console.error("Error updating database with email status");
        }
      }

      return NextResponse.json({
        success: true,
        databaseSaved: dbOperationSuccessful,
      });
    } catch {
      console.error("Error sending contact email via Resend");
      return NextResponse.json({ error: PUBLIC_FORM_ERROR }, { status: 500 });
    }
  } catch {
    console.error("Unexpected error in contact form submission");
    return NextResponse.json({ error: PUBLIC_FORM_ERROR }, { status: 500 });
  }
}
