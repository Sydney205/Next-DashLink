"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function DashSidebar() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;
  if (!session || !session.user) return null;

  const routes: [number, string, string][] = [
    [1, "Home", ""],
    [2, "Create Link", "new"],
  ];

  return (
    <div className="w-full h-[90%] flex flex-col justify-between">
      <div className="flex flex-col">
        {routes.map(([index, title, route]) => (
          <a
            href={`${baseUrl}/dashboard/${route}`}
            key={index}
            className="w-full border-b border-green-400 p-2 text-left hover:bg-green-400 hover:text-white transition-all"
          >
            <span>{title}</span>
          </a>
        ))}
      </div>

      <div className="flex flex-col justify-center items-start">
        <p>{session.user.email}</p>
        <button onClick={() => signOut()}>Logout</button>
      </div>
    </div>
  );
}

