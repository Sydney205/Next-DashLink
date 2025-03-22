import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import DashNavbar from "@/components/DashNavbar";
import DashboardSidebar from "@/components/DashboardSidebar";

export const metadata: Metadata = {
  title: "DashLink - Dashboard",
  description: "A Fast and Reliable URL Shortener",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <section className="w-full h-max flex">
        <DashNavbar />
        <DashboardSidebar />
        {children}
      </section>
    </SessionProvider>
  );
}

