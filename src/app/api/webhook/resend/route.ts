import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const webhookData = await request.json();
    const type = typeof webhookData?.type === "string" ? webhookData.type : "unknown";
    console.log("Received Resend webhook event type:", type);
    return NextResponse.json({ success: true });
  } catch {
    console.error("Error handling webhook");
    return NextResponse.json({ error: "Failed to process webhook" }, { status: 500 });
  }
}
