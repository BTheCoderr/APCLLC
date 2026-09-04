import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import sql from '@/utils/db';
import { escapeHtml, htmlLines } from '@/lib/html';
import { displayServiceType, validateQuotePayload } from '@/lib/quote';
import { SITE } from '@/lib/site';

function extraRow(label: string, value?: string) {
  if (!value) return '';
  return `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`;
}

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const {
      name,
      email,
      phone,
      serviceType,
      pickupLocation,
      deliveryLocation,
      date,
      details,
      preferredContactMethod,
      pickupZip,
      deliveryZip,
      preferredTime,
      itemCategory,
      quantity,
      approximateWeight,
      dimensions,
      loadingAssistance,
      stairsAccess,
      urgency,
    } = data;

    if (validateQuotePayload(data)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const resend = getResend();
    if (!resend) {
      return NextResponse.json({ error: 'Email service is not configured' }, { status: 500 });
    }

    const serviceTypeDisplay = displayServiceType(serviceType);
    let dbOperationSuccessful = false;
    let submissionId = null;

    try {
      const result = await sql.safeQuery`
        INSERT INTO quote_submissions (
          name, email, phone, service_type, service_type_display,
          pickup_location, delivery_location, requested_date, details,
          created_at, status, email_status
        ) VALUES (
          ${name}, ${email}, ${phone}, ${serviceType},
          ${serviceTypeDisplay},
          ${pickupLocation}, ${deliveryLocation}, ${date || null}, ${details || null},
          ${new Date().toISOString()}, 'new', 'pending'
        )
        RETURNING id
      `;

      if (result && result[0] && result[0].id) {
        submissionId = result[0].id;
        dbOperationSuccessful = true;
      }
    } catch (dbError) {
      console.error('Database operation failed, continuing with email only:', dbError);
    }

    const extraHtml = [
      extraRow('Preferred contact method', preferredContactMethod),
      extraRow('Pickup ZIP', pickupZip),
      extraRow('Delivery ZIP', deliveryZip),
      extraRow('Preferred time', preferredTime),
      extraRow('Item category', itemCategory),
      extraRow('Quantity', quantity),
      extraRow('Approximate weight', approximateWeight),
      extraRow('Dimensions', dimensions),
      extraRow('Loading assistance', loadingAssistance),
      extraRow('Stairs or access', stairsAccess),
      extraRow('Urgency', urgency),
    ].join('');

    const adminEmailHtml = `
      <h2>New Quote Request</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Service Type:</strong> ${escapeHtml(serviceTypeDisplay)}</p>
      <p><strong>Pickup Location:</strong> ${escapeHtml(pickupLocation)}</p>
      <p><strong>Delivery Location:</strong> ${escapeHtml(deliveryLocation)}</p>
      <p><strong>Preferred Date:</strong> ${escapeHtml(date || 'Not specified')}</p>
      ${extraHtml}
      <p><strong>Additional Details:</strong></p>
      <p>${details ? htmlLines(String(details)) : 'None provided'}</p>
      <p><em>Note: ${dbOperationSuccessful ? 'This submission was saved to the database.' : 'This submission could NOT be saved to the database due to connection issues.'}</em></p>
    `;

    const userEmailHtml = `
      <h2>Thank you for your quote request!</h2>
      <p>Hello ${escapeHtml(name)},</p>
      <p>We've received your quote request for <strong>${escapeHtml(serviceTypeDisplay)}</strong> and will get back to you with availability and pricing.</p>
      <p>Here's a summary of your request for your records:</p>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Service Type:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(serviceTypeDisplay)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Pickup Location:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(pickupLocation)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Delivery Location:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(deliveryLocation)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Preferred Date:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(date || 'Not specified')}</td>
        </tr>
        ${details ? `
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Additional Details:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${htmlLines(String(details))}</td>
        </tr>
        ` : ''}
      </table>
      <p>If you need immediate assistance, please call us at ${SITE.phoneDisplay}.</p>
      <p>Best regards,<br>The APC LLC Team</p>
    `;

    try {
      const adminResult = await resend.emails.send({
        from: `APC LLC <${SITE.email}>`,
        to: SITE.email,
        subject: `Quote Request: ${serviceTypeDisplay}`,
        html: adminEmailHtml,
        replyTo: email,
      });

      const userResult = await resend.emails.send({
        from: `APC LLC <${SITE.email}>`,
        to: email,
        subject: `Your Quote Request - ${serviceTypeDisplay} - APC LLC`,
        html: userEmailHtml,
        replyTo: SITE.email,
      });

      if (dbOperationSuccessful && submissionId) {
        try {
          await sql.safeQuery`
            UPDATE quote_submissions
            SET
              email_status = 'sent',
              admin_email_id = ${adminResult.data?.id || null},
              user_email_id = ${userResult.data?.id || null}
            WHERE
              id = ${submissionId}
          `;
        } catch (updateError) {
          console.error('Error updating database with email status:', updateError);
        }
      }

      return NextResponse.json({
        success: true,
        data: {
          adminEmail: adminResult.data,
          userEmail: userResult.data,
          databaseSaved: dbOperationSuccessful,
        },
      });
    } catch (sendError: Error | unknown) {
      console.error('Error sending email via Resend:', sendError);
      const errorMessage = sendError instanceof Error ? sendError.message : 'Unknown error';
      return NextResponse.json(
        { error: `Failed to send email via Resend: ${errorMessage}` },
        { status: 500 }
      );
    }
  } catch (error: Error | unknown) {
    console.error('Unexpected error in quote form submission:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to process request: ${errorMessage}` },
      { status: 500 }
    );
  }
}
