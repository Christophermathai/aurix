import type { Metadata } from "next";
import AurixExperience from "./aurix-experience";

export const metadata: Metadata = {
  title: "AURIX — Fitness put into play",
  description:
    "Join AURIX, the FitNFine Fitness Club festival in Ernakulam, January 8–10, 2027. Three days, five events, and a message for a stronger, drug-free tomorrow.",
};

export default function Home() {
  return <AurixExperience />;
}
