"use client";

// Next
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter()
  
  const links: [number, string, string][] = [
    [1, "Home", "#home"],
    [2, "About", "#about"],
    [3, "Contact", "#contact"],
  ];

  const linksMap = links.map(
    ([index, title, route]) =>
      typeof route === "string" && (
        <a 
          href={route} 
          key={index} 
          className="hover:text-green-500" 
        >
          {title}
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
      className="bg-inherit top-0 fixed w-full flex justify-between items-center min-h-[10vh] p-2 px-8 z-50 shadow-xl left-0"
    >
      <div className="w-max flex justify-center items-center gap-12">
        <h4 className="font-extrabold">
          Dash<span className="text-green-600">Link</span>
        </h4>
        
        <div className="flex gap-4">
          {linksMap}
        </div>
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

