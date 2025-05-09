import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize resend with API key
const resend = new Resend(process.env.RESEND_API_KEY || 're_gM2u71jT_GrykTSRkLunWLHuvtGcQTi7p');

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, phone, message } = data;

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create the email content
    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `;

    // Send email using Resend
    const result = await resend.emails.send({
      from: 'APC LLC <onboarding@resend.dev>', // You can use your verified domain if available
      to: 'info@apcllc.co',
      subject: `Contact Form Submission from ${name}`,
      html: emailHtml,
      replyTo: email
    });

    if (result.error) {
      return NextResponse.json(
        { error: result.error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (error) {
    console.error('Error in contact form submission:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 