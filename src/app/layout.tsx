import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { BiCard, BiMenu } from "react-icons/bi";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SideMenu from "@/components/ui/SideMenu";
import { NavItemsProps } from "@/types";
import { BsCardChecklist } from "react-icons/bs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Metropole 4",
  description: "Developed By Marcelo Vieira",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
