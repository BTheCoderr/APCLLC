import { NextResponse } from 'next/server';
import sql from '@/utils/db';

// Simple admin auth middleware
const authenticate = (request: Request) => {
  // In a real app, use proper authentication with JWT or similar
  // For this demo, we'll use a simple API key check
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }
  
  const apiKey = authHeader.split(' ')[1];
  return apiKey === process.env.ADMIN_API_KEY || apiKey === 'apcllc2024adminapi';
};

export async function GET(request: Request) {
  try {
    // Check authentication
    if (!authenticate(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get query parameters
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const page = parseInt(url.searchParams.get('page') || '1');
    const offset = (page - 1) * limit;
    
    // Fetch submissions with pagination from PostgreSQL
    const submissions = await sql`
      SELECT * FROM quote_submissions
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
    
    // Count total rows for pagination
    const countResult = await sql`SELECT COUNT(*) FROM quote_submissions`;
    const total = parseInt(countResult[0].count);
    
    return NextResponse.json({
      submissions,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error: Error | unknown) {
    console.error('Error retrieving quote submissions:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to retrieve quote submissions: ${errorMessage}` },
      { status: 500 }
    );
  }
} 