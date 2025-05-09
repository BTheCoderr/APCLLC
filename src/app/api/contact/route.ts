import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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

    // Create a test account on Ethereal for development/testing
    // In production, you'd use your own SMTP credentials
    const testAccount = await nodemailer.createTestAccount();

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    // Setup email data
    const mailOptions = {
      from: `"APC LLC Website" <${testAccount.user}>`,
      to: email, // Send to the submitter's email (for testing)
      replyTo: email,
      subject: `Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        
        Message:
        ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    // This URL is only used in development with ethereal email
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    return NextResponse.json({ 
      success: true,
      previewUrl: nodemailer.getTestMessageUrl(info)
    });
  } catch (error) {
    console.error('Error in contact form submission:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 