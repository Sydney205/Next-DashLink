import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import Link from "@/models/Link";

interface ShortUrlPageProps {
  params: Promise<{ shortId: string }>; 
}

export default async function ShortUrlPage({ params }: ShortUrlPageProps) {
  const { shortId } = await params; 

  await connectDB();
  const link = await Link.findOne({ shortId });

  if (!link) {
    return <h1>404 - URL Not Found</h1>;
  }

  redirect(link.originalUrl);
}

