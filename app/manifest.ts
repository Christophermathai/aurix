import type { MetadataRoute } from "next";
import { FESTIVAL } from "./festival-data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: FESTIVAL.fullName,
    short_name: FESTIVAL.name,
    description:
      "AURIX 2027 — Three-day anti-drug fitness festival by FitNFine Fitness Club in Ernakulam, Kochi (Jan 8–10, 2027).",
    start_url: "/",
    display: "standalone",
    background_color: "#1c0505",
    theme_color: "#d10a0a",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
