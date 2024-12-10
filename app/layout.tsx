import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import "./globals.css";
import { Theme, ThemePanel } from "@radix-ui/themes";
import Navbar from "./NavBar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "My App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Theme accentColor="sky">
          <Navbar />
          <main className="flex-1 p-5">{children}</main> {/* Page content */}
          <ThemePanel />
        </Theme>
      </body>
    </html>
  );
}
