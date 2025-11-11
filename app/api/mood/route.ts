import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { mood } = await req.json();
  const responseMessage = `You are feeling "${mood}". Remember to take care of yourself today!`;
  return NextResponse.json({ message: responseMessage });
}

// Optional: allow GET request for testing
export async function GET() {
  return NextResponse.json({ message: "Mood Tracker API is working! Send a POST request to log your mood." });
}
