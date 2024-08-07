import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClientProviders } from "@/components/ClientProviders";
import "./globals.css";
import { cn } from "@/lib/utils";
import Head from "next/head";

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
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </Head>
      <body
        className={cn(
          inter.className,
          "flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 md:py-10"
        )}
      >
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
