import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClientProviders } from "@/components/ClientProviders";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CHAT BOLLA",
  description: "una fantastica chat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 py-10"
        )}
      >
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
