import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RootLayoutClient } from "./root-layout-client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KHB Dashboard",
  description: "Modern ve kullanıcı dostu yönetim platformu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <RootLayoutClient inter={inter}>{children}</RootLayoutClient>;
}
