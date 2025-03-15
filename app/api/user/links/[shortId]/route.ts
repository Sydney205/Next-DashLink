import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import Link from "@/models/Link";

export async function GET(req: NextRequest, { params }: { params: { shortId: string } }) {
  await connectDB();
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const { shortId } = params;

  const link = await Link.findOne({ shortId, user: session.user.id });

  if (!link) {
    return NextResponse.json({ message: "Link not found" }, { status: 404 });
  }

  return NextResponse.json({ link }, { status: 200 });
}

