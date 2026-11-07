import {
  CALENDAR_URL,
  DAYS,
  DAY_ISO_DATES,
  EVENTS,
  FAQS,
  FESTIVAL,
  MORE_EVENTS,
  PRE_EVENT_RULES,
  SITE_URL,
} from "../festival-data";

export function GET() {
  const scheduleLines = DAYS.map((dayLabel, dayIndex) => {
    const dayEvents: string[] = EVENTS.filter((event) => event.day === dayIndex).map(
      (event) => event.name,
    );
    if (dayIndex === 2) {
      dayEvents.push("More events to be announced");
    }
    const iso = DAY_ISO_DATES[dayIndex];
    return `- **Day ${dayIndex + 1} (${dayLabel}, 2027 | ${iso.startIso} – ${iso.endIso}):** ${dayEvents.join(", ")}`;
  }).join("\n");

  const eventSections = EVENTS.map(
    (event) =>
      `### ${event.name} (Day ${event.day + 1} — ${DAYS[event.day]}, 2027)
- **Summary:** ${event.description}
- **What to bring:** ${event.bring}
- **Rules:**
${event.rules.map((rule) => `  - ${rule}`).join("\n")}`,
  ).join("\n\n");

  const faqSections = FAQS.map(
    (faq) => `### ${faq.question}\n${faq.answer}`,
  ).join("\n\n");

  const helplineLines = FESTIVAL.helplines
    .map((h) => `- **${h.name} (${h.number}):** ${h.note}`)
    .join("\n");

  const markdown = `# ${FESTIVAL.fullName}

> ${FESTIVAL.name} is a three-day anti-drug fitness festival presented by ${FESTIVAL.organizer.name} in ${FESTIVAL.organizer.locality} (${FESTIVAL.organizer.city}), ${FESTIVAL.organizer.region}, ${FESTIVAL.organizer.countryName} from January 8 to January 10, 2027. It features five core athletic competitions — Marathon, Deadlift, Under-20 Football, Arm Wrestling, and Physique Competition — built around a clean-sport, drug-free community message: "${FESTIVAL.mission}"

## Key Festival Facts
- **Event Name:** ${FESTIVAL.name} (${FESTIVAL.fullName})
- **Tagline:** ${FESTIVAL.tagline}
- **Dates:** January 8, 9, and 10, 2027 (${FESTIVAL.dates.eventStartIso} to ${FESTIVAL.dates.eventEndIso})
- **Location:** ${FESTIVAL.organizer.locality}, ${FESTIVAL.organizer.city}, ${FESTIVAL.organizer.region}, ${FESTIVAL.organizer.countryName}
- **Organizer:** ${FESTIVAL.organizer.name}
- **Core Cause:** Anti-drug youth and community fitness movement (${FESTIVAL.mission})
- **Official Website:** ${SITE_URL}
- **Google Calendar Link:** ${CALENDAR_URL}

## 3-Day Festival Schedule (Jan 8–10, 2027)
${scheduleLines}

## Event Categories & Official Rules

${eventSections}

### Additional Events
${MORE_EVENTS.map((item) => `- ${item}`).join("\n")}

## Pre-Event Participant Checklist
${PRE_EVENT_RULES.map((rule, idx) => `${idx + 1}. ${rule}`).join("\n")}

## Frequently Asked Questions (AEO Reference)

${faqSections}

## Confidential Anti-Drug & Mental Health Helplines (India)
${helplineLines}
`;

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
