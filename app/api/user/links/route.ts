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

  // Get data from request
  const { originalUrl, title, desc } = await req.json();
  if (!originalUrl) {
    return NextResponse.json({ message: "Url is required" }, { status: 400 });
  }

  // Generate short URL
  const shortId = nanoid(7);
  const newLink = await Link.create({
    title, 
    desc, 
    shortId,
    originalUrl,
    user: session.user.id,
  });

  return NextResponse.json(
    { 
      shortUrl: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/${shortId}`,
      title,
      desc
    },
    { status: 201 }
  );
}

export async function GET(req: NextRequest) {
  await connectDB();
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const links = await Link.find({ user: session.user.id }).select("title desc shortId originalUrl");

  return NextResponse.json({ links }, { status: 200 });
}

export async function PATCH(req: NextRequest) {
  await connectDB();
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const { shortId, title, desc, originalUrl, newShortId } = await req.json();

  if (!shortId) {
    return NextResponse.json({ message: "ShortId is required" }, { status: 400 });
  }

  // Prepare the update object only with provided values
  const updateData: Record<string, any> = {};
  if (title) updateData.title = title;
  if (desc) updateData.desc = desc;
  if (originalUrl) updateData.originalUrl = originalUrl;

  // If user wants to update the shortId, check if it already exists
  if (newShortId) {
    const existingLink = await Link.findOne({ shortId: newShortId });
    if (existingLink) {
      return NextResponse.json({ message: "Short ID already in use" }, { status: 400 });
    }
    updateData.shortId = newShortId;
  }

  const updatedLink = await Link.findOneAndUpdate(
    { shortId, user: session.user.id }, // Ensure the user owns the link
    updateData, // Apply only provided fields
    { new: true }
  );

  if (!updatedLink) {
    return NextResponse.json({ message: "Link not found or unauthorized" }, { status: 404 });
  }

  return NextResponse.json({ message: "Link updated successfully", link: updatedLink });
}


export async function DELETE(req: NextRequest) {
  await connectDB();
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const { shortId } = await req.json();

  if (!shortId) {
    return NextResponse.json({ message: "ShortId is required" }, { status: 400 });
  }

  const deletedLink = await Link.findOneAndDelete({ shortId, user: session.user.id });

  if (!deletedLink) {
    return NextResponse.json({ message: "Link not found or unauthorized" }, { status: 404 });
  }

  return NextResponse.json({ message: "Link deleted successfully" });
}

