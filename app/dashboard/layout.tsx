import type { Metadata } from "next";
import DashNavbar from "@/components/DashNavbar";

export const metadata: Metadata = {
  title: "DashLink - Dashboard",
  description: "A Fast and Reliable URL Shortener",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full h-max flex">
      <DashNavbar />
      {children}
    </section>
  );
}

