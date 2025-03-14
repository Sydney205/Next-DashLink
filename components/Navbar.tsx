"use client";

// React
import { 
  useState, 
  useEffect, 
  useRef 
} from "react";

// Next
import Image from "next/image";
import { useRouter } from "next/navigation";


// Framer motion
// import { motion } from "framer-motion";

// libs
// import { slideDown } from "@/lib/motion";

export default function Navbar() {
  const router = useRouter()
  
  const links: [number, string, string][] = [
    [1, "Skills", "#skills"],
    [2, "Project", "#projects"],
    [3, "Contact", "#contact"],
  ];

  const linksMap = links.map(
    ([index, title, route]) =>
      typeof route === "string" && (
        <a 
          href={route} 
          key={index} 
          className="border border-transparent rounded-full hover:border-white border-neutral-800 p-[2px] px-4 transition-all duration-200" 
          onClick={() => {setIsScrollingDown(false)}}
        >
          <span>{title}</span>
        </a>
      )
  );

  const signInRouter = (path: string, isSignin: boolean) => {
    if (typeof path !== 'string') {
      console.error("Invalid path passed", path)
      path = '/' // fallback to the home route
    }
    const fullPath = `${path}?isLoggingIn=${isSignin}`;

    router.push(fullPath);
  }

  return (
    <nav      
      className="bg-inherit top-0 fixed w-full flex justify-between items-center min-h-[10vh] p-2 z-50 shadow-xl left-0"
    >
      <div>
        <h4
          className="font-extrabold"
        >
          Dash<span className="text-green-600">Link</span>
        
          {/*<div className="flex justify-center items-center gap-2 text-lg">
            {linksMap}
          </div>*/}
        </h4>
      </div>
      
      {/* Desktop navigation links and btns */}
      <div className="hidden md:flex gap-4">  
        <div className="flex gap-4">
          <button
            className="primary-green-btn"
            onClick={() => signInRouter("/auth/signin", false)}
          >
            Get started
          </button>

          
          <button
            className="secondary-green-btn"
            onClick={() => signInRouter("/auth/signin", true)} 
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}

            // onClick={() => signInRouter("/auth/signin", true)} 

