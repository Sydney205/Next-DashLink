"use client";

import { SessionProvider } from "next-auth/react";
import DashboardSidebar from "@/components/DashboardSidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <section className="w-full h-max">
        <DashboardSidebar />
        {children}
      </section>
    </SessionProvider>
  );
}

