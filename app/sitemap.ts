import type { MetadataRoute } from "next";
import { SITE_URL } from "./festival-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = "2026-11-07T00:00:00.000Z";

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/llms.txt`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
