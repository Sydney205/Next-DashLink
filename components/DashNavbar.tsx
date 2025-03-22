"use client";

// Next
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashNavbar() {
  const router = useRouter()

  return (
    <nav      
      className="bg-inherit top-0 fixed w-full flex justify-between items-center min-h-[10vh] p-2 z-50 shadow-xl left-0"
    >
      <div className="w-max flex justify-center items-center gap-12">
        <h4 className="font-extrabold cursor-pointer" onClick={() => router.push("/")}>
          Dash<span className="text-green-600">Link</span>
        </h4>
      </div>
      
      {/* Desktop navigation links and btns */}
      <div className="hidden md:flex gap-4">  
        <button
          className="secondary-green-btn"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    </nav>
  );
}

