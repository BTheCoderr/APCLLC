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

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'info@apcllc.com', // Updated email
        pass: process.env.EMAIL_PASS || 'your-app-password', // Replace with your app password
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
      from: `"APC LLC Website" <${process.env.EMAIL_USER || 'info@apcllc.com'}>`, // Updated email
      to: process.env.QUOTE_EMAIL || 'info@apcllc.com', // Updated email
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
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in quote form submission:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 