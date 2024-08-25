import { NextResponse, NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import dbConnect from "@/libs/dbConnect";
import Note from "@/models/Note";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);
  if (!userId)
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers: corsHeaders }
    );

  await dbConnect();

  const notes = await Note.find({ user: userId });
  return NextResponse.json(notes, { status: 200, headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  const { userId } = getAuth(request);
  if (!userId)
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers: corsHeaders }
    );

  const { title, content, codeSample } = await request.json();

  await dbConnect();

  try {
    const note = await Note.create({
      title,
      content,
      codeSample,
      user: userId, // Store userId directly as a string
    });

    return NextResponse.json(note, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error("Error creating note:", error);
    return NextResponse.json(
      { error: "Failed to create note." },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}
