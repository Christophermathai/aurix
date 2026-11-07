import {
  DAY_ISO_DATES,
  EVENTS,
  FAQS,
  FESTIVAL,
  SITE_URL,
} from "./festival-data";

export function buildAurixJsonLd() {
  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;
  const webpageId = `${SITE_URL}/#webpage`;
  const festivalId = `${SITE_URL}/#festival`;
  const faqId = `${SITE_URL}/#faq`;

  const placeLocation = {
    "@type": "Place",
    name: `${FESTIVAL.organizer.locality}, ${FESTIVAL.organizer.city}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: FESTIVAL.organizer.locality,
      addressRegion: FESTIVAL.organizer.region,
      addressCountry: FESTIVAL.organizer.country,
    },
  };

  const subEvents = EVENTS.map((event) => {
    const dayDates = DAY_ISO_DATES[event.day];
    return {
      "@type": "SportsEvent",
      "@id": `${SITE_URL}/#event-${event.slug}`,
      name: `AURIX 2027 — ${event.name}`,
      description: `${event.description} Rules: ${event.rules.join(" ")} Bring: ${event.bring}`,
      startDate: dayDates.startIso,
      endDate: dayDates.endIso,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: placeLocation,
      image: [`${SITE_URL}${event.fallbackImage}`],
      organizer: {
        "@id": organizationId,
      },
      superEvent: {
        "@id": festivalId,
      },
      url: `${SITE_URL}/#events`,
    };
  });

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SportsOrganization",
        "@id": organizationId,
        name: FESTIVAL.organizer.name,
        alternateName: FESTIVAL.organizer.shortName,
        url: SITE_URL,
        logo: `${SITE_URL}/apple-icon`,
        address: {
          "@type": "PostalAddress",
          addressLocality: FESTIVAL.organizer.locality,
          addressRegion: FESTIVAL.organizer.region,
          addressCountry: FESTIVAL.organizer.country,
        },
        knowsAbout: [
          "Fitness Festival",
          "Marathon",
          "Powerlifting Deadlift",
          "Under-20 Football",
          "Arm Wrestling",
          "Natural Physique Competition",
          "Anti-Drug Youth Awareness",
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE_URL,
        name: FESTIVAL.fullName,
        alternateName: "AURIX by FitNFine",
        inLanguage: "en-IN",
        publisher: {
          "@id": organizationId,
        },
      },
      {
        "@type": "WebPage",
        "@id": webpageId,
        url: SITE_URL,
        name: "AURIX 2027 — Anti-Drug Fitness Festival in Kochi (Jan 8–10) | FitNFine",
        description:
          "Three-day anti-drug fitness festival by FitNFine Fitness Club in Ernakulam, Kochi, Kerala from January 8 to January 10, 2027. Events include Marathon, Deadlift, Under-20 Football, Arm Wrestling, and Physique Competition.",
        inLanguage: "en-IN",
        isPartOf: {
          "@id": websiteId,
        },
        about: {
          "@id": festivalId,
        },
        mainEntity: {
          "@id": festivalId,
        },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".hero-content", ".faq-list"],
        },
      },
      {
        "@type": "SportsEvent",
        "@id": festivalId,
        name: FESTIVAL.fullName,
        alternateName: "AURIX Fitness Festival 2027",
        description:
          "AURIX is a three-day anti-drug fitness festival in Ernakulam, Kochi, Kerala (January 8–10, 2027) presented by FitNFine Fitness Club. Featuring five competitions: Marathon, Deadlift, Under-20 Football, Arm Wrestling, and Physique Competition.",
        startDate: FESTIVAL.dates.eventStartIso,
        endDate: FESTIVAL.dates.eventEndIso,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: placeLocation,
        image: [
          `${SITE_URL}/opengraph-image`,
          `${SITE_URL}/marathon.png`,
          `${SITE_URL}/deadlift.png`,
          `${SITE_URL}/football.png`,
          `${SITE_URL}/arm-wrestling.png`,
          `${SITE_URL}/physique.png`,
        ],
        organizer: {
          "@id": organizationId,
        },
        url: SITE_URL,
        subEvent: subEvents,
      },
      {
        "@type": "FAQPage",
        "@id": faqId,
        url: `${SITE_URL}/#faq`,
        isPartOf: {
          "@id": webpageId,
        },
        mainEntity: FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };
}
