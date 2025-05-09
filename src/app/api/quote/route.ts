import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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
      details 
    } = data;

    // Validate required fields
    if (!name || !email || !phone || !serviceType || !pickupLocation || !deliveryLocation) {
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

    // Service type mapping for readability
    const serviceTypeMapping: Record<string, string> = {
      residentialMoving: 'Residential Moving',
      cargoTransport: 'Cargo Van Freight Transport',
      junkRemoval: 'Junk Removal & Hauling',
      retailDelivery: 'Small Business & Retail Deliveries',
      localPickup: 'Local Pickup & Drop-Off'
    };

    // Setup email data
    const mailOptions = {
      from: `"APC LLC Website" <${testAccount.user}>`,
      to: email, // Send to the submitter's email (for testing)
      replyTo: email,
      subject: `Quote Request: ${serviceTypeMapping[serviceType] || serviceType}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Service Type: ${serviceTypeMapping[serviceType] || serviceType}
        Pickup Location: ${pickupLocation}
        Delivery Location: ${deliveryLocation}
        Preferred Date: ${date || 'Not specified'}
        
        Additional Details:
        ${details || 'None provided'}
      `,
      html: `
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
    console.error('Error in quote form submission:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 