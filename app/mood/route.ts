import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { mood } = await req.json();

  // Simple response for now
  const responseMessage = `You are feeling "${mood}". Remember to take care of yourself today!`;

  return NextResponse.json({ message: responseMessage });
}
