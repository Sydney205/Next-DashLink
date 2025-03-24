import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import DashNavbar from "@/components/Dashboard/DashNavbar";
import DashSidebar from "@/components/Dashboard/DashSidebar";

export const metadata: Metadata = {
  title: "DashLink - Dashboard",
  description: "A Fast and Reliable URL Shortener",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <DashNavbar />
      <section className="w-full h-max flex justify-start items-center gap-4 mt-24 border-2 border-black">
        <div className="fixed top-10 left-0 bg-pink-400 w-[20%] h-full">
          <DashSidebar />
        </div>
        
        <div className="w-[70%] absolute right-0 w-[70%] h-max">
          {children}
        </div>
      </section>
    </SessionProvider>
  );
}

