import { NextResponse, NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import dbConnect from "@/libs/dbConnect";
import Note from "@/models/Note";

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();

  const notes = await Note.find({ user: userId });
  return NextResponse.json(notes, { status: 200 });
}

export async function POST(request: NextRequest) {
  const { userId } = getAuth(request);
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, content, codeSample } = await request.json();

  await dbConnect();

  const note = await Note.create({
    title,
    content,
    codeSample,
    user: userId,
  });

  return NextResponse.json(note, { status: 201 });
}
