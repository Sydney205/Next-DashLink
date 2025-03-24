"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function DashSidebar() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/auth/signin");
  //   }
  // }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;

  // Ensure session exists before accessing user properties
  if (!session || !session.user) return null;
  
  const routes: [number, string, string][] = [
    [1, "Home", "home"],
    [2, "Create Link", "new"],
  ];

  const routesMap = routes.map(
    ([index, title, route]) =>
      typeof route === "string" && (
        <a 
          href={`dashboard/${route}`} 
          key={index} 
          className="w-full border-b border-green-600 p-2 text-left hover:bg-green-600 hover:text-white transition-all" 
        >
          <span>{title}</span>
        </a>
      )
  );
  
  return (
    <>
      <div className="w-full h-full flex flex-col justify-between bg-white dark:bg-stone-900">
        <div className="flex flex-col">
          {routesMap}
        </div>

        <div className="flex flex-col justify-center items-start">
          <p>{session.user.email}</p>
          <button onClick={() => signOut()}>Logout</button>
        </div>
      </div>
    </>
  )
}
