'use client'

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import "./globals.css";
import { Theme } from "@radix-ui/themes";
import Navbar from "./NavBar";
import Modal from "react-modal";
import { useEffect } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  return (
    <html lang="en">
      <body className={inter.variable}>
        <Theme>
          <Navbar />
          <main className="flex-1 px-5">{children}</main> {/* Page content */}
        </Theme>
      </body>
    </html>
  );
}
