import type { Metadata } from "next";
import { Big_Shoulders, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";

const displayFont = Big_Shoulders({
  variable: "--font-aurix-display",
  weight: ["800", "900"],
  subsets: ["latin"],
});

const bodyFont = Schibsted_Grotesk({
  variable: "--font-aurix-body",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AURIX — Fitness put into play",
  description: "A fitness festival by FitNFine Fitness Club in Ernakulam.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
