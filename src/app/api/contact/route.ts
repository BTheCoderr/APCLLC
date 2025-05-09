import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import sql from '@/utils/db';

// Initialize resend with API key
const resendApiKey = process.env.RESEND_API_KEY || 're_QQwPHVih_BPqM2kAD4LZ7xEGyuPequ6bA';
const resend = new Resend(resendApiKey);

export async function POST(request: Request) {
  try {
    console.log('Contact form API route called');
    console.log('Using Resend API key:', resendApiKey.substring(0, 5) + '...');
    
    const data = await request.json();
    const { name, email, phone, message } = data;

    console.log('Received contact form data:', { name, email, phone, messageLength: message?.length });

    // Validate required fields
    if (!name || !email || !phone || !message) {
      console.error('Missing required fields in contact form submission');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Database operation - silently continue if it fails
    let dbOperationSuccessful = false;
    let submissionId = null;
    
    try {
      console.log('Attempting to save to database');
      // Use safeQuery to prevent errors from crashing the app
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
        console.log('Saved to database successfully, ID:', submissionId);
      } else {
        console.log('Database operation completed but no ID returned');
      }
    } catch (dbError) {
      console.error('Database operation failed, continuing with email only:', dbError);
      // Continue processing even if DB save fails
    }

    // Create the email content for admin notification
    const adminEmailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <p><em>Note: ${dbOperationSuccessful ? 'This submission was saved to the database.' : 'This submission could NOT be saved to the database due to connection issues.'}</em></p>
    `;

    // Create confirmation email to the user
    const userEmailHtml = `
      <h2>Thank you for contacting APC LLC!</h2>
      <p>Hello ${name},</p>
      <p>We've received your message and will get back to you as soon as possible.</p>
      <p>Here's a copy of your message for your records:</p>
      <blockquote style="border-left: 4px solid #ccc; padding-left: 15px; margin-left: 0; color: #555;">
        ${message.replace(/\n/g, '<br>')}
      </blockquote>
      <p>If you need immediate assistance, please call us at (401) 602-4943.</p>
      <p>Best regards,<br>The APC LLC Team</p>
    `;

    // Email handling in a try-catch to prevent failures
    try {
      // Send admin notification email
      console.log('Attempting to send admin notification email via Resend');
      const adminResult = await resend.emails.send({
        from: 'APC LLC <info@apcllc.co>', // Using your verified email address
        to: 'info@apcllc.co',
        subject: `Contact Form Submission from ${name}`,
        html: adminEmailHtml,
        replyTo: email
      });

      console.log('Admin email Resend API response:', adminResult);

      // Send confirmation email to user
      console.log('Attempting to send user confirmation email via Resend');
      
      // Use your verified email as the from address
      const userResult = await resend.emails.send({
        from: 'APC LLC <info@apcllc.co>', // Using your verified email address
        to: email, // Send to the customer
        subject: "We've received your message - APC LLC",
        html: userEmailHtml,
        replyTo: 'info@apcllc.co'
      });

      console.log('User email Resend API response:', userResult);

      // Only update database if initial save was successful
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
          console.log('Database updated with email status');
        } catch (updateError) {
          console.error('Error updating database with email status:', updateError);
        }
      }

      return NextResponse.json({ 
        success: true, 
        data: { 
          adminEmail: adminResult.data, 
          userEmail: userResult.data, 
          databaseSaved: dbOperationSuccessful 
        } 
      });
    } catch (sendError: any) {
      console.error('Error sending email via Resend:', sendError);
      return NextResponse.json(
        { error: `Failed to send email via Resend: ${sendError.message}` },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Unexpected error in contact form submission:', error);
    return NextResponse.json(
      { error: `Failed to process request: ${error.message}` },
      { status: 500 }
    );
  }
} 