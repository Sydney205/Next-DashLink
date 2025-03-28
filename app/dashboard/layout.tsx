import type { Metadata } from "next";
import SessionProviderWrapper from "@/components/Dashboard/SessionProviderWrapper";
import DashNavbar from "@/components/Dashboard/DashNavbar";
import DashSidebar from "@/components/Dashboard/DashSidebar";

export const metadata: Metadata = {
  title: "DashLink - Dashboard",
  description: "A Fast and Reliable URL Shortener",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProviderWrapper>
      <div className="w-full min-h-screen flex flex-col">
        {/* Navbar */}
        <DashNavbar />

        <div className="flex flex-1 mt-16">
          {/* Sidebar */}
          <aside className="w-[20%] min-w-[250px] h-screen p-4 fixed left-0 top-16">
            <DashSidebar />
          </aside>

          {/* Main Content */}
          <main className="flex-1 ml-[20%] p-6 grow">
            {children}
          </main>
        </div>
      </div>
    </SessionProviderWrapper>
  );
}

