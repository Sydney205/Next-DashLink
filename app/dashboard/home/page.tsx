"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import DashLinkForm from "@/components/DashLinkForm"

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <p>Loading...</p>;

  if (!session) {
    router.push("/auth/signin");
    return null;
  }

  return (
    <div>
      <h1>Welcome, {session.user.email}!</h1>
      <button onClick={() => signOut()}>Logout</button>

      <DashLinkForm />
    </div>
  );
}

