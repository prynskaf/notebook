import { NextResponse, NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import dbConnect from "@/libs/dbConnect";
import Note from "@/models/Note";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = getAuth(request);
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();

  const note = await Note.findById(params.id);
  if (!note)
    return NextResponse.json({ error: "Note not found" }, { status: 404 });

  return NextResponse.json(note, { status: 200 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = getAuth(request);
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, content, codeSample } = await request.json();

  await dbConnect();

  const note = await Note.findByIdAndUpdate(
    params.id,
    { title, content, codeSample, updatedAt: Date.now() },
    { new: true }
  );

  if (!note)
    return NextResponse.json({ error: "Note not found" }, { status: 404 });

  return NextResponse.json(note, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = getAuth(request);
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();

  const note = await Note.findByIdAndDelete(params.id);
  if (!note)
    return NextResponse.json({ error: "Note not found" }, { status: 404 });

  return NextResponse.json({}, { status: 204 });
}
