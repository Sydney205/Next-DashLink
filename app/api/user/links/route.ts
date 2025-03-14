import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import Link from "@/models/Link";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
  await connectDB();
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const { originalUrl } = await req.json();
  if (!originalUrl) {
    return NextResponse.json({ message: "Url is required" }, { status: 400 });
  }

  const shortId = nanoid(7);
  const newLink = await Link.create({
    shortId,
    originalUrl,
    user: session.user.id,
  });

  return NextResponse.json(
    { shortUrl: `${process.env.NEXTAUTH_URL}/${shortId}` },
    { status: 201 }
  );
}

export async function GET(req: NextRequest) {
  await connectDB();
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const links = await Link.find({ user: session.user.id });

  return NextResponse.json({ links }, { status: 200 });
}

