"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import DashLinkForm from "@/components/DashLinkForm";

export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;

  // Ensure session exists before accessing user properties
  if (!session || !session.user) return null;

  return (
    <div>
      <h1>Welcome, {session.user.email}!</h1>
      <button onClick={() => signOut()}>Logout</button>

      <DashLinkForm />
    </div>
  );
}

