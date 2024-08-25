import { NextResponse, NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import dbConnect from "@/libs/dbConnect";
import Note from "@/models/Note";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers: corsHeaders }
    );
  }

  await dbConnect();

  const note = await Note.findById(params.id);
  if (!note) {
    return NextResponse.json(
      { error: "Note not found" },
      { status: 404, headers: corsHeaders }
    );
  }

  return NextResponse.json(note, { status: 200, headers: corsHeaders });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers: corsHeaders }
    );
  }

  const { title, content, codeSample } = await request.json();

  if (!title || !content) {
    return NextResponse.json(
      { error: "Title and content are required" },
      { status: 400, headers: corsHeaders }
    );
  }

  await dbConnect();

  const note = await Note.findByIdAndUpdate(
    params.id,
    { title, content, codeSample, updatedAt: Date.now() },
    { new: true }
  );

  if (!note) {
    return NextResponse.json(
      { error: "Note not found" },
      { status: 404, headers: corsHeaders }
    );
  }

  return NextResponse.json(note, { status: 200, headers: corsHeaders });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers: corsHeaders }
    );
  }

  await dbConnect();

  const note = await Note.findByIdAndDelete(params.id);
  if (!note) {
    return NextResponse.json(
      { error: "Note not found" },
      { status: 404, headers: corsHeaders }
    );
  }

  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}
