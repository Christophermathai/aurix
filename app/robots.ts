import type { MetadataRoute } from "next";
import { SITE_URL } from "./festival-data";

export default function robots(): MetadataRoute.Robots {
  const disallowPaths = ["/AURIX*.html", "/*.html"];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowPaths,
      },
      {
        userAgent: [
          "OAI-SearchBot",
          "GPTBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "Claude-Web",
          "Google-Extended",
          "Applebot-Extended",
        ],
        allow: ["/", "/llms.txt"],
        disallow: disallowPaths,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
