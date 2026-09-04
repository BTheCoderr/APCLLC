import { NextResponse } from "next/server";
import sql from "@/utils/db";
import { guardAdminRequest } from "@/lib/admin-guard";

export async function GET(request: Request) {
  const blocked = guardAdminRequest(request);
  if (blocked) return blocked;

  try {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get("limit") || "50", 10);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const offset = (page - 1) * limit;

    const submissions = await sql`
      SELECT * FROM quote_submissions
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;

    const countResult = await sql`SELECT COUNT(*) FROM quote_submissions`;
    const total = parseInt(String(countResult[0]?.count ?? 0), 10);

    return NextResponse.json({
      submissions,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit) || 0,
      },
    });
  } catch {
    console.error("Error retrieving quote submissions");
    return NextResponse.json({ error: "Unable to retrieve submissions" }, { status: 500 });
  }
}
