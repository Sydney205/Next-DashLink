import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DashLink",
  description: "A Fast and Reliable URL Shortener",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="font-[Geist] bg-white text-black dark:bg-stone-500 dark:text-white p-4 w-full min-h-screen antialiased"
      >
        {children}
      </body>
    </html>
  );
}
