import AurixExperience from "./aurix-experience";
import { buildAurixJsonLd } from "./structured-data";

export default function Home() {
  const jsonLd = buildAurixJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <AurixExperience />
    </>
  );
}
