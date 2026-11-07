import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Schibsted_Grotesk } from "next/font/google";
import { FESTIVAL, SITE_URL } from "./festival-data";
import "./globals.css";

const displayFont = Big_Shoulders({
  variable: "--font-aurix-display",
  weight: ["800", "900"],
  subsets: ["latin"],
  display: "swap",
});

const bodyFont = Schibsted_Grotesk({
  variable: "--font-aurix-body",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#d10a0a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AURIX 2027 — Anti-Drug Fitness Festival in Kochi (Jan 8–10) | FitNFine",
    template: "%s | AURIX 2027 by FitNFine",
  },
  description:
    "Join AURIX 2027 by FitNFine Fitness Club in Ernakulam, Kochi (Jan 8–10, 2027). Compete in Marathon, Deadlift, Under-20 Football, Arm Wrestling & Physique. Say no to drugs.",
  applicationName: FESTIVAL.name,
  authors: [{ name: FESTIVAL.organizer.name, url: SITE_URL }],
  creator: FESTIVAL.organizer.name,
  publisher: FESTIVAL.organizer.name,
  category: "sports",
  keywords: [
    "AURIX",
    "AURIX 2027",
    "FitNFine Fitness Club",
    "fitness festival Kochi",
    "fitness festival Ernakulam",
    "sports festival Kerala 2027",
    "marathon Ernakulam January 2027",
    "deadlift competition Kochi",
    "under 20 football tournament Ernakulam",
    "arm wrestling competition Kerala",
    "physique competition Kochi 2027",
    "natural bodybuilding Kerala",
    "anti-drug fitness festival",
    "say no to drugs Kerala sports",
    "ലഹരി വിമുക്ത കേരളം",
    "ലഹരിക്കെതിരെ കായികം",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "AURIX — FitNFine Fitness Festival",
    title: "AURIX 2027 — Anti-Drug Fitness Festival in Kochi (Jan 8–10)",
    description:
      "Three days, five events, one stronger drug-free community. Marathon, Deadlift, U-20 Football, Arm Wrestling & Physique in Ernakulam, Jan 8–10, 2027.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AURIX 2027 — Anti-Drug Fitness Festival in Kochi (Jan 8–10)",
    description:
      "Three days, five events, one stronger drug-free community in Ernakulam, Kochi (Jan 8–10, 2027). Presented by FitNFine Fitness Club.",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
