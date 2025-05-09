import { NextResponse } from 'next/server';

// This is the webhook handler for Resend email status events
export async function POST(request: Request) {
  try {
    // Get the webhook data from Resend
    const webhookData = await request.json();
    
    // Log the event data
    console.log('Received Resend webhook event:', webhookData);
    
    // Here you would typically:
    // 1. Verify the webhook signature (if Resend provides one)
    // 2. Process different event types (delivered, opened, clicked, etc.)
    // 3. Update your database records accordingly
    
    const { type, data } = webhookData;
    
    switch (type) {
      case 'email.delivered':
        console.log(`Email delivered to ${data.to}`);
        // Update database to mark email as delivered
        break;
        
      case 'email.opened':
        console.log(`Email opened by ${data.to}`);
        // Update database to mark email as opened
        break;
        
      case 'email.clicked':
        console.log(`Email link clicked by ${data.to}`);
        // Update database to track click activity
        break;
        
      // Handle other event types
      default:
        console.log(`Unhandled event type: ${type}`);
    }
    
    // Return a success response
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error processing Resend webhook:', error);
    return NextResponse.json(
      { error: `Failed to process webhook: ${error.message}` },
      { status: 500 }
    );
  }
} 