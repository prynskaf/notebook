import { NextResponse, NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import dbConnect from "@/libs/dbConnect";
import User from "@/models/User";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers: corsHeaders }
    );
  }

  await dbConnect();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "User ID is required" },
      { status: 400, headers: corsHeaders }
    );
  }

  const user = await User.findOne({ clerkUserId: id });
  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404, headers: corsHeaders }
    );
  }

  return NextResponse.json(user, { status: 200, headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers: corsHeaders }
    );
  }

  const { email, name, subscriptionPlan } = await request.json();

  if (!email || !name) {
    return NextResponse.json(
      { error: "Email and name are required" },
      { status: 400, headers: corsHeaders }
    );
  }

  await dbConnect();

  const user = await User.create({
    clerkUserId: userId,
    email,
    name,
    subscriptionPlan,
  });

  return NextResponse.json(user, { status: 201, headers: corsHeaders });
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}
