import { NextResponse, NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

import User from "@/models/User";
import dbConnect from "@/libs/dbConnect";

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id)
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });

  const user = await User.findById(id);
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json(user, { status: 200 });
}

export async function POST(request: NextRequest) {
  const { userId } = getAuth(request);
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();

  // Get user details from Clerk
  const { email, name } = await request.json();

  if (!email || !name) {
    return NextResponse.json(
      { error: "Email and name are required" },
      { status: 400 }
    );
  }

  // Check if the user already exists in the database
  let user = await User.findOne({ email });

  if (user) {
    return NextResponse.json(user, { status: 200 });
  }

  // If user doesn't exist, create a new user
  user = new User({
    email,
    name,
    subscriptionPlan: "free", // Default subscription plan
    subscriptionExpiresAt: null,
  });

  await user.save();

  return NextResponse.json(user, { status: 201 });
}
