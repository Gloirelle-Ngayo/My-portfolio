import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/layout/Header";
import FlowbiteInit from "./flowbite-init";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio-NG",
  description: "Portfolio personnel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Header />
          <main className="container mx-auto px-4">
            {children}
          </main>
          <FlowbiteInit />
        </Providers>
      </body>
    </html>
  );
}
