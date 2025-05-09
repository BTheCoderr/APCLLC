import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import sql from '@/utils/db';

// Initialize resend with API key
const resendApiKey = process.env.RESEND_API_KEY || 're_QQwPHVih_BPqM2kAD4LZ7xEGyuPequ6bA';
const resend = new Resend(resendApiKey);

export async function POST(request: Request) {
  try {
    console.log('Quote form API route called');
    console.log('Using Resend API key:', resendApiKey.substring(0, 5) + '...');
    
    const data = await request.json();
    const { 
      name, 
      email, 
      phone, 
      serviceType, 
      pickupLocation, 
      deliveryLocation, 
      date, 
      details 
    } = data;

    console.log('Received quote form data:', { 
      name, 
      email, 
      phone, 
      serviceType,
      pickupLocation,
      deliveryLocation,
      date,
      detailsLength: details?.length
    });

    // Validate required fields
    if (!name || !email || !phone || !serviceType || !pickupLocation || !deliveryLocation) {
      console.error('Missing required fields in quote form submission');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Service type mapping for readability
    const serviceTypeMapping: Record<string, string> = {
      residentialMoving: 'Residential Moving',
      cargoTransport: 'Cargo Van Freight Transport',
      junkRemoval: 'Junk Removal & Hauling',
      retailDelivery: 'Small Business & Retail Deliveries',
      localPickup: 'Local Pickup & Drop-Off'
    };

    // Database operation - silently continue if it fails
    let dbOperationSuccessful = false;
    let submissionId = null;
    
    try {
      console.log('Attempting to save to database');
      // Use safeQuery to prevent errors from crashing the app
      const result = await sql.safeQuery`
        INSERT INTO quote_submissions (
          name, email, phone, service_type, service_type_display, 
          pickup_location, delivery_location, requested_date, details,
          created_at, status, email_status
        ) VALUES (
          ${name}, ${email}, ${phone}, ${serviceType}, 
          ${serviceTypeMapping[serviceType] || serviceType},
          ${pickupLocation}, ${deliveryLocation}, ${date || null}, ${details || null},
          ${new Date().toISOString()}, 'new', 'pending'
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
      <h2>New Quote Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Service Type:</strong> ${serviceTypeMapping[serviceType] || serviceType}</p>
      <p><strong>Pickup Location:</strong> ${pickupLocation}</p>
      <p><strong>Delivery Location:</strong> ${deliveryLocation}</p>
      <p><strong>Preferred Date:</strong> ${date || 'Not specified'}</p>
      <p><strong>Additional Details:</strong></p>
      <p>${details ? details.replace(/\n/g, '<br>') : 'None provided'}</p>
      <p><em>Note: ${dbOperationSuccessful ? 'This submission was saved to the database.' : 'This submission could NOT be saved to the database due to connection issues.'}</em></p>
    `;

    // Create confirmation email to the user
    const userEmailHtml = `
      <h2>Thank you for your quote request!</h2>
      <p>Hello ${name},</p>
      <p>We've received your quote request for <strong>${serviceTypeMapping[serviceType] || serviceType}</strong> and will get back to you as soon as possible.</p>
      <p>Here's a summary of your request for your records:</p>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Service Type:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${serviceTypeMapping[serviceType] || serviceType}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Pickup Location:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${pickupLocation}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Delivery Location:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${deliveryLocation}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Preferred Date:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${date || 'Not specified'}</td>
        </tr>
        ${details ? `
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Additional Details:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${details.replace(/\n/g, '<br>')}</td>
        </tr>
        ` : ''}
      </table>
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
        subject: `Quote Request: ${serviceTypeMapping[serviceType] || serviceType}`,
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
        subject: `Your Quote Request - ${serviceTypeMapping[serviceType] || serviceType} - APC LLC`,
        html: userEmailHtml,
        replyTo: 'info@apcllc.co'
      });

      console.log('User email Resend API response:', userResult);

      // Only update database if initial save was successful
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
    console.error('Unexpected error in quote form submission:', error);
    return NextResponse.json(
      { error: `Failed to process request: ${error.message}` },
      { status: 500 }
    );
  }
} 