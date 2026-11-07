export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://aurix.fitnfine.in";

export const FESTIVAL = {
  name: "AURIX",
  fullName: "AURIX 2027 — FitNFine Anti-Drug Fitness Festival",
  tagline: "Fitness put into play.",
  mission: "Say no to drugs. Stronger people. Brighter tomorrow.",
  organizer: {
    name: "FitNFine Fitness Club",
    shortName: "FitNFine",
    locality: "Ernakulam",
    city: "Kochi",
    region: "Kerala",
    country: "IN",
    countryName: "India",
  },
  dates: {
    label: "Jan 8–10, 2027",
    shortLabel: "Jan 8–10",
    year: 2027,
    startIso: "2027-01-08T00:00:00+05:30",
    eventStartIso: "2027-01-08T06:00:00+05:30",
    eventEndIso: "2027-01-10T20:00:00+05:30",
  },
  helplines: [
    {
      number: "1933",
      name: "MANAS National Narcotics Helpline",
      note: "24×7 toll-free confidential support",
    },
    {
      number: "14416",
      name: "Tele-MANAS Mental Health Helpline",
      note: "24×7 toll-free mental health support in India",
    },
  ],
} as const;

export const DAYS = ["Jan 8", "Jan 9", "Jan 10"] as const;

export const DAY_ISO_DATES = [
  {
    dayIndex: 0,
    label: "Jan 8, 2027",
    startIso: "2027-01-08T06:00:00+05:30",
    endIso: "2027-01-08T20:00:00+05:30",
  },
  {
    dayIndex: 1,
    label: "Jan 9, 2027",
    startIso: "2027-01-09T07:00:00+05:30",
    endIso: "2027-01-09T20:00:00+05:30",
  },
  {
    dayIndex: 2,
    label: "Jan 10, 2027",
    startIso: "2027-01-10T08:00:00+05:30",
    endIso: "2027-01-10T20:00:00+05:30",
  },
] as const;

export const EVENTS = [
  {
    slug: "marathon",
    name: "Marathon",
    day: 0,
    background: "#b00909",
    image: "/marathon.webp",
    fallbackImage: "/marathon.png",
    width: 1672,
    height: 941,
    alt: "Runners racing along a curved track at sunrise for the AURIX Marathon in Ernakulam, Kochi",
    description:
      "Day 1 road and track endurance run at AURIX 2027 in Ernakulam, Kochi on January 8, 2027.",
    bring: "Running shoes, a water bottle and photo ID.",
    rules: [
      "Arrive early for check-in and bib collection.",
      "Wear your bib on the front at all times.",
      "Stay on the marked route. Shortcuts mean disqualification.",
    ],
  },
  {
    slug: "deadlift",
    name: "Deadlift",
    day: 0,
    background: "#1c0505",
    image: "/deadlift.webp",
    fallbackImage: "/deadlift.png",
    width: 1672,
    height: 941,
    alt: "Powerlifter setting up over a loaded barbell for the AURIX Deadlift competition in Ernakulam",
    description:
      "Day 1 raw strength deadlift competition with three judged attempts per lifter at AURIX 2027 in Ernakulam on January 8, 2027.",
    bring: "Flat-soled shoes, a towel and photo ID.",
    rules: [
      "Warm up in the warm-up area only.",
      "A lift counts when you stand tall, knees locked, bar under control.",
      "Judges’ calls are final. Three attempts per lifter.",
    ],
  },
  {
    slug: "under-20-football",
    name: "Under 20 football",
    day: 1,
    background: "#e8160f",
    image: "/football.webp",
    fallbackImage: "/football.png",
    width: 1672,
    height: 941,
    alt: "Youth footballers competing on turf for the AURIX Under-20 Football tournament in Kochi",
    description:
      "Day 2 Under-20 youth football tournament promoting clean sport and drug-free teamwork in Ernakulam, Kochi on January 9, 2027.",
    bring: "Boots, shin guards and photo ID showing your age.",
    rules: [
      "Every player must be under 20 on match day. Bring photo ID.",
      "Teams register before the event. Late teams forfeit.",
      "Fair play first. Fouls and dissent are punished with cards.",
    ],
  },
  {
    slug: "arm-wrestling",
    name: "Arm wrestling",
    day: 1,
    background: "#2a0707",
    image: "/arm-wrestling.webp",
    fallbackImage: "/arm-wrestling.png",
    width: 1672,
    height: 941,
    alt: "Two athletes locked in a referee-judged match at the AURIX Arm Wrestling championship",
    description:
      "Day 2 head-to-head table arm wrestling competition at AURIX 2027 in Ernakulam, Kochi on January 9, 2027.",
    bring: "A towel, a short-sleeve top and photo ID.",
    rules: [
      "Elbow stays on the pad and the free hand holds the peg.",
      "A match starts on the referee’s call. False starts get a warning.",
      "No slipping the grip, no lifting the elbow.",
    ],
  },
  {
    slug: "physique-competition",
    name: "Physique competition",
    day: 2,
    background: "#7d0505",
    image: "/physique.webp",
    fallbackImage: "/physique.png",
    width: 1448,
    height: 1086,
    alt: "Natural physique athletes posing onstage at the AURIX Physique Competition in Ernakulam, Kerala",
    description:
      "Day 3 drug-free bodybuilding and physique showcase judged on symmetry, conditioning, and stage presentation in Ernakulam on January 10, 2027.",
    bring: "Approved posing wear, a towel and photo ID.",
    rules: [
      "Compete in approved posing wear only.",
      "Follow the posing order the judges call.",
      "Judges score symmetry, conditioning and presentation.",
    ],
  },
] as const;

export const MORE_EVENTS = [
  "More events will be added before the festival.",
  "Registered participants hear first.",
  "Got an idea? Message us on WhatsApp.",
] as const;

export const FAQS = [
  {
    question: "Who can take part?",
    answer:
      "Anyone medically fit can take part in AURIX 2027 at their own fitness level. The Under 20 football tournament on January 9 is strictly for players under 20 years old on match day with valid photo ID.",
  },
  {
    question: "How do I register?",
    answer:
      "Select your events in the registration section on this page and send the pre-filled WhatsApp message to FitNFine Fitness Club. Full online registration opens soon ahead of January 8–10, 2027.",
  },
  {
    question: "What does it cost?",
    answer:
      "Entry fee and category registration details for AURIX 2027 will be announced soon by FitNFine Fitness Club.",
  },
  {
    question: "Can I enter more than one event?",
    answer:
      "Yes, participants can enter multiple events across January 8, 9, and 10, 2027 as long as schedules do not clash. Marathon and Deadlift are on Day 1 (Jan 8), Under 20 Football and Arm Wrestling on Day 2 (Jan 9), and Physique Competition on Day 3 (Jan 10).",
  },
  {
    question: "What should I bring?",
    answer:
      "Bring a valid government photo ID, a water bottle, and the event-specific kit listed on your event card (such as running shoes, flat-soled lifting shoes, football boots and shin guards, or approved posing wear).",
  },
  {
    question: "Can I come to watch?",
    answer:
      "Yes, spectators are welcome at AURIX 2027 in Ernakulam, Kochi. Venue gates and spectator pass details will be shared when the venue is announced.",
  },
  {
    question: "What counts as clean sport?",
    answer:
      "Clean sport at AURIX means competing 100% drug-free with no banned substances or shortcuts. Anyone found using prohibited substances is immediately disqualified. AURIX is an anti-drug fitness festival by FitNFine Fitness Club.",
  },
  {
    question: "What are the prizes?",
    answer:
      "AURIX awards top prizes to event winners, podium finishers, and every clean participant who completes their event. Full prize pool details will be announced soon.",
  },
  {
    question: "Where is it?",
    answer:
      "AURIX 2027 takes place in Ernakulam (Kochi), Kerala, India from January 8 to January 10, 2027. Exact venue coordinates will be shared with registered participants.",
  },
  {
    question: "I need help with drugs. Who can I call?",
    answer:
      "Call 1933 for the MANAS National Narcotics Helpline or 14416 for the Tele-MANAS Mental Health Helpline. Both are 24×7, confidential, and toll-free across India.",
  },
] as const;

export const PRE_EVENT_RULES = [
  "Carry a valid photo ID.",
  "Register for every event you enter.",
  "Reach the venue 30 minutes before your event.",
  "Take part at your own fitness level, and only if you’re medically fit.",
  "Respect judges, volunteers and every competitor.",
  "Stay clean. Anyone found using banned substances is out.",
] as const;

export const WHY_WORDS =
  "AURIX is built on strength you earn. Drugs take your health, your future and the trust of your team. Here every rep, every mile and every match is clean.".split(
    " ",
  );

export const CALENDAR_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=AURIX%20by%20FitNFine&dates=20270108/20270111&location=Ernakulam";

export function dayCalendarUrl(day: number, eventNames: string[]) {
  const startDay = 8 + day;
  const endDay = startDay + 1;
  const startStr = String(startDay).padStart(2, "0");
  const endStr = String(endDay).padStart(2, "0");
  const title = encodeURIComponent(
    `AURIX Day ${day + 1}: ${eventNames.join(", ")}`,
  );
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=202701${startStr}/202701${endStr}&location=Ernakulam`;
}
