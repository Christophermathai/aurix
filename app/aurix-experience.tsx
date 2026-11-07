"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import * as THREE from "three";

const DAYS = ["Jan 8", "Jan 9", "Jan 10"] as const;

const EVENTS = [
  {
    name: "Marathon",
    day: 0,
    background: "#b00909",
    image: "/marathon.webp",
    fallbackImage: "/marathon.png",
    bring: "Running shoes, a water bottle and photo ID.",
    rules: [
      "Arrive early for check-in and bib collection.",
      "Wear your bib on the front at all times.",
      "Stay on the marked route. Shortcuts mean disqualification.",
    ],
  },
  {
    name: "Deadlift",
    day: 0,
    background: "#1c0505",
    image: "/deadlift.webp",
    fallbackImage: "/deadlift.png",
    bring: "Flat-soled shoes, a towel and photo ID.",
    rules: [
      "Warm up in the warm-up area only.",
      "A lift counts when you stand tall, knees locked, bar under control.",
      "Judges’ calls are final. Three attempts per lifter.",
    ],
  },
  {
    name: "Under 20 football",
    day: 1,
    background: "#e8160f",
    image: "/football.webp",
    fallbackImage: "/football.png",
    bring: "Boots, shin guards and photo ID showing your age.",
    rules: [
      "Every player must be under 20 on match day. Bring photo ID.",
      "Teams register before the event. Late teams forfeit.",
      "Fair play first. Fouls and dissent are punished with cards.",
    ],
  },
  {
    name: "Arm wrestling",
    day: 1,
    background: "#2a0707",
    image: "/arm-wrestling.webp",
    fallbackImage: "/arm-wrestling.png",
    bring: "A towel, a short-sleeve top and photo ID.",
    rules: [
      "Elbow stays on the pad and the free hand holds the peg.",
      "A match starts on the referee’s call. False starts get a warning.",
      "No slipping the grip, no lifting the elbow.",
    ],
  },
  {
    name: "Physique competition",
    day: 2,
    background: "#7d0505",
    image: "/physique.webp",
    fallbackImage: "/physique.png",
    bring: "Approved posing wear, a towel and photo ID.",
    rules: [
      "Compete in approved posing wear only.",
      "Follow the posing order the judges call.",
      "Judges score symmetry, conditioning and presentation.",
    ],
  },
] as const;

const MORE_EVENTS = [
  "More events will be added before the festival.",
  "Registered participants hear first.",
  "Got an idea? Message us on WhatsApp.",
];

const FAQS = [
  {
    question: "Who can take part?",
    answer:
      "Anyone fit to take part, at their own level. Under 20 football is for players under 20 only.",
  },
  {
    question: "How do I register?",
    answer:
      "Choose your events in the form below and message us on WhatsApp. A full registration form is coming soon.",
  },
  { question: "What does it cost?", answer: "Entry details will be announced soon." },
  {
    question: "Can I enter more than one event?",
    answer:
      "Yes, as long as your events don’t clash. Check the schedule, then pick them all in the form.",
  },
  {
    question: "What should I bring?",
    answer:
      "Photo ID, a water bottle and kit for your event. Each event card lists what to bring.",
  },
  {
    question: "Can I come to watch?",
    answer: "Spectator details will be shared with the venue information.",
  },
  {
    question: "What counts as clean sport?",
    answer:
      "No banned substances and no shortcuts. Anyone found using them is out. AURIX is built around an anti-drug message.",
  },
  {
    question: "What are the prizes?",
    answer: "Exciting prizes for people who take part. Details will follow.",
  },
  { question: "Where is it?", answer: "Ernakulam. Venue details will follow." },
  {
    question: "I need help with drugs. Who can I call?",
    answer:
      "Call 1933, the national narcotics helpline (MANAS), or 14416 for mental health support. Both are toll-free.",
  },
];

const PRE_EVENT_RULES = [
  "Carry a valid photo ID.",
  "Register for every event you enter.",
  "Reach the venue 30 minutes before your event.",
  "Take part at your own fitness level, and only if you’re medically fit.",
  "Respect judges, volunteers and every competitor.",
  "Stay clean. Anyone found using banned substances is out.",
];

const WHY_WORDS =
  "AURIX is built on strength you earn. Drugs take your health, your future and the trust of your team. Here every rep, every mile and every match is clean.".split(
    " ",
  );

const CALENDAR_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=AURIX%20by%20FitNFine&dates=20270108/20270111&location=Ernakulam";

type MotionState = {
  y: number;
  velocity: number;
  mouseX: number;
  mouseY: number;
};

function dayCalendarUrl(day: number, eventNames: string[]) {
  const startDay = 8 + day;
  const endDay = startDay + 1;
  const startStr = String(startDay).padStart(2, "0");
  const endStr = String(endDay).padStart(2, "0");
  const title = encodeURIComponent(
    `AURIX Day ${day + 1}: ${eventNames.join(", ")}`,
  );
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=202701${startStr}/202701${endStr}&location=Ernakulam`;
}

export default function AurixExperience() {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [pledged, setPledged] = useState(false);
  const [toast, setToast] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);
  const motionRef = useRef<MotionState>({
    y: 0,
    velocity: 0,
    mouseX: 0,
    mouseY: 0,
  });

  const selectedDays = useMemo(
    () =>
      [...new Set(
        EVENTS.filter((event) => selectedEvents.includes(event.name)).map(
          (event) => DAYS[event.day],
        ),
      )],
    [selectedEvents],
  );

  const registrationUrl = useMemo(() => {
    const greeting = name.trim()
      ? `I am ${name.trim()} and I`
      : "I";
    const eventList = selectedEvents.length
      ? ` Events: ${selectedEvents.join(", ")}.`
      : "";
    const message = `Hi FitNFine, ${greeting} want to register for AURIX (Jan 8–10, Ernakulam).${eventList}`;
    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  }, [name, selectedEvents]);

  useEffect(() => {
    const start = new Date("2027-01-08T00:00:00+05:30").getTime();
    const updateCountdown = () => setCountdown(Math.max(0, start - Date.now()));
    updateCountdown();
    const timer = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const smoothContent = content;
    const stackSection = content.querySelector<HTMLElement>(".stack-section");
    const stackStage = content.querySelector<HTMLElement>(".stack-stage");
    const cards = Array.from(
      content.querySelectorAll<HTMLElement>(".stack-card"),
    );
    const cardElements = cards.map((card) => ({
      card,
      inner: card.querySelector<HTMLElement>(".stack-card-inner"),
      shade: card.querySelector<HTMLElement>(".card-shade"),
    }));
    const ambientSection =
      content.querySelector<HTMLElement>(".ambassador-section");
    const ambientStage =
      content.querySelector<HTMLElement>(".ambassador-stage");
    const ambientTrack =
      content.querySelector<HTMLElement>(".ambassador-track");
    const heroContent = content.querySelector<HTMLElement>(".hero-content");
    const marqueeTrack =
      content.querySelector<HTMLElement>(".marquee-track");
    const whyWords = Array.from(
      content.querySelectorAll<HTMLElement>(".why-copy span"),
    );
    const stickyCta = document.querySelector<HTMLElement>(".sticky-cta");
    const progressBar = document.querySelector<HTMLElement>(".scroll-progress");
    const cursor = document.querySelector<HTMLElement>(".custom-cursor");
    const viewport = { width: window.innerWidth, height: window.innerHeight };
    const pointer = { targetX: 0, targetY: 0, x: 0, y: 0 };
    const cursorPosition = { x: 0, y: 0 };
    let renderedY = window.scrollY;
    let maxScroll = 0;
    let stackTop = 0;
    let ambientTop = 0;
    let ambientTravel = 0;
    let cachedJoinTop = 0;
    let cachedWhyTop = 0;
    let cachedWhyHeight = 0;
    let frame = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const clamp = (value: number, min: number, max: number) =>
      Math.max(min, Math.min(max, value));
    const ease = (value: number) => value * value * (3 - 2 * value);
    const documentTop = (element: HTMLElement) => {
      let top = 0;
      let current: HTMLElement | null = element;
      while (current && current !== smoothContent) {
        top += current.offsetTop;
        current = current.offsetParent as HTMLElement | null;
      }
      return top;
    };

    const measure = () => {
      viewport.width = window.innerWidth;
      viewport.height = window.innerHeight;
      if (stackSection && stackStage) {
        stackSection.style.height = `${cards.length * viewport.height}px`;
        stackTop = documentTop(stackSection);
      }
      if (ambientSection && ambientStage && ambientTrack) {
        ambientTravel = Math.max(
          0,
          ambientTrack.scrollWidth - viewport.width + 40,
        );
        ambientSection.style.height = `${viewport.height + ambientTravel}px`;
        ambientTop = documentTop(ambientSection);
      }
      const joinEl = document.getElementById("join");
      if (joinEl) {
        cachedJoinTop = documentTop(joinEl);
      }
      const whyEl = content.querySelector<HTMLElement>(".why-copy");
      if (whyEl) {
        cachedWhyTop = documentTop(whyEl);
        cachedWhyHeight = whyEl.offsetHeight;
      }
      const height = smoothContent.scrollHeight;
      document.body.style.height = `${height}px`;
      maxScroll = Math.max(0, height - viewport.height);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer.targetX = (event.clientX / viewport.width) * 2 - 1;
      pointer.targetY = (event.clientY / viewport.height) * 2 - 1;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      document.documentElement.classList.add("mouse-pointer");
      const target = event.target;
      const element = target instanceof Element ? target : null;
      const hoveredButton = element?.closest<HTMLElement>(".button");
      if (hoveredButton) {
        const bounds = hoveredButton.getBoundingClientRect();
        hoveredButton.style.translate = `${(event.clientX - bounds.left - bounds.width / 2) * 0.2}px ${(event.clientY - bounds.top - bounds.height / 2) * 0.3}px`;
      }
      if (cursor) {
        cursor.style.opacity = "1";
        cursor.classList.toggle(
          "is-large",
          Boolean(element?.closest("a, button, summary, .event-pick, .stack-card")),
        );
      }
    };

    const onPointerOut = (event: PointerEvent) => {
      const target = event.target;
      const relatedTarget = event.relatedTarget;
      const departingButton =
        target instanceof Element ? target.closest<HTMLElement>(".button") : null;
      const enteringButton =
        relatedTarget instanceof Element
          ? relatedTarget.closest<HTMLElement>(".button")
          : null;
      if (departingButton && departingButton !== enteringButton) {
        departingButton.style.translate = "";
      }
      if (!event.relatedTarget) {
        document.documentElement.classList.remove("mouse-pointer");
        if (cursor) cursor.style.opacity = "0";
      }
    };

    const onAnchorClick = (event: globalThis.MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href")?.slice(1);
      const destination = id ? document.getElementById(id) : null;
      if (id === "top" || destination) {
        event.preventDefault();
        const destinationTop = destination ? documentTop(destination) : 0;
        window.scrollTo({ top: destinationTop, behavior: "auto" });
      }
    };

    const animateScroll = () => {
      const targetY =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      renderedY += (targetY - renderedY) * (reducedMotion.matches ? 1 : 0.085);
      if (Math.abs(targetY - renderedY) < 0.08) renderedY = targetY;
      const velocity = targetY - renderedY;
      currentMouseX += (pointer.targetX - currentMouseX) * 0.06;
      currentMouseY += (pointer.targetY - currentMouseY) * 0.06;
      motionRef.current = {
        y: renderedY,
        velocity: reducedMotion.matches ? 0 : velocity,
        mouseX: currentMouseX,
        mouseY: currentMouseY,
      };

      const skew = reducedMotion.matches
        ? 0
        : clamp(velocity * 0.012, -1.5, 1.5);
      smoothContent.style.transform = `translate3d(0, ${-renderedY.toFixed(2)}px, 0) skewY(${skew.toFixed(3)}deg)`;
      if (progressBar) {
        progressBar.style.transform = `scaleX(${clamp(renderedY / Math.max(1, maxScroll), 0, 1)})`;
      }
      stickyCta?.classList.toggle(
        "is-visible",
        renderedY > viewport.height * 0.9 &&
          (!cachedJoinTop ||
            cachedJoinTop - renderedY > viewport.height * 0.4),
      );
      if (stickyCta) {
        stickyCta.tabIndex = stickyCta.classList.contains("is-visible") ? 0 : -1;
      }

      if (heroContent) {
        const heroProgress = clamp(renderedY / viewport.height, 0, 1);
        heroContent.style.transform = `translate3d(0, ${renderedY * 0.3}px, 0) scale(${1 - 0.12 * heroProgress})`;
        heroContent.style.opacity = `${1 - 0.85 * heroProgress}`;
      }
      if (marqueeTrack) {
        marqueeTrack.style.transform = `translate3d(${-renderedY * 0.35}px, 0, 0)`;
      }

      if (stackSection && stackStage) {
        const stackProgress = clamp(
          renderedY - stackTop,
          0,
          cards.length * viewport.height - viewport.height,
        );
        stackStage.style.transform = `translate3d(0, ${stackProgress}px, 0)`;
        const activeCard = stackProgress / viewport.height;
        cardElements.forEach(({ card, inner, shade }, index) => {
          const enter = clamp(activeCard - index + 1, 0, 1);
          const depth = clamp(activeCard - index, 0, 3);
          const isVisible = enter > 0 && depth < 3;

          if (!isVisible) {
            if (card.style.visibility !== "hidden") {
              card.style.visibility = "hidden";
            }
            return;
          }
          if (card.style.visibility !== "visible") {
            card.style.visibility = "visible";
          }

          const retreat = 1 - ease(enter);

          card.style.transform = `translate3d(0, ${retreat * 100 - depth * 2.5}%, 0) scale(${1 - 0.045 * depth}) rotateX(${
            reducedMotion.matches
              ? 0
              : Math.min(depth, 1) * 4 - currentMouseY * 2
          }deg) rotateY(${reducedMotion.matches ? 0 : currentMouseX * 3}deg)`;

          if (inner) {
            const textEnter = clamp((enter - 0.6) / 0.4, 0, 1);
            const textEase = ease(textEnter);
            const textRecede = 1 - ease(clamp((depth - 0.45) / 0.4, 0, 1));
            const textOpacity = textEase * textRecede;
            const yOffset = reducedMotion.matches
              ? 0
              : (1 - textEase) * 32 - retreat * 14;

            inner.style.transform = `translate3d(0, ${yOffset.toFixed(2)}px, 0)`;
            inner.style.opacity = textOpacity.toFixed(3);
          }
          if (shade) {
            shade.style.opacity = `${clamp(depth * 0.4, 0, 0.7)}`;
          }
        });
      }

      if (ambientSection && ambientStage && ambientTrack) {
        const travel = clamp(renderedY - ambientTop, 0, ambientTravel);
        ambientStage.style.transform = `translate3d(0, ${travel}px, 0)`;
        ambientTrack.style.transform = `translate3d(${-travel}px, 0, 0)`;
      }

      if (whyWords.length && cachedWhyHeight > 0) {
        const top = cachedWhyTop - renderedY;
        const progress = clamp(
          ((viewport.height * 0.85 - top) /
            (viewport.height * 0.5 + cachedWhyHeight)) *
            whyWords.length *
            1.15,
          0,
          whyWords.length,
        );
        whyWords.forEach((word, index) => {
          word.classList.toggle("is-lit", index < progress);
        });
      }

      if (cursor) {
        cursorPosition.x += (pointer.x - cursorPosition.x) * 0.18;
        cursorPosition.y += (pointer.y - cursorPosition.y) * 0.18;
        cursor.style.transform = `translate3d(${cursorPosition.x}px, ${cursorPosition.y}px, 0)`;
      }
      frame = requestAnimationFrame(animateScroll);
    };

    const headingObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.25 },
    );
    if (!reducedMotion.matches) {
      content
        .querySelectorAll(".section-heading h2, .prize-panel h2, .join-copy h2")
        .forEach((heading) => {
          heading.classList.add("scroll-reveal");
          headingObserver.observe(heading);
        });
    }

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(smoothContent);
    window.addEventListener("resize", measure);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerout", onPointerOut);
    document.addEventListener("click", onAnchorClick);
    frame = requestAnimationFrame(animateScroll);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      headingObserver.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("click", onAnchorClick);
      document
        .querySelectorAll<HTMLElement>(".button")
        .forEach((button) => (button.style.translate = ""));
      document.body.style.height = "";
      smoothContent.style.transform = "";
      document.documentElement.classList.remove("mouse-pointer");
    };
  }, []);

  useEffect(() => {
    const canvas = document.querySelector<HTMLCanvasElement>(".aurix-webgl");
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
    } catch (error) {
      console.warn("AURIX background could not initialize WebGL.", error);
      canvas.hidden = true;
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 50);
    camera.position.z = 5;
    const uniforms: Record<string, THREE.IUniform> = {
      uT: { value: 0 },
      uV: { value: 0 },
      uS: { value: 0 },
      uR: { value: new THREE.Vector2(1, 1) },
      uM: { value: new THREE.Vector2(0.7, 0.8) },
    };
    const fragmentShader = `
      uniform float uT;
      uniform float uV;
      uniform float uS;
      uniform vec2 uR;
      uniform vec2 uM;
      varying vec2 vUv;
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
          mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
          f.y
        );
      }
      float fbm(vec2 p) {
        float amplitude = 0.5;
        float value = 0.0;
        for (int i = 0; i < 4; i++) {
          value += amplitude * noise(p);
          p *= 2.02;
          amplitude *= 0.5;
        }
        return value;
      }
      void main() {
        vec2 p = vUv * vec2(uR.x / uR.y, 1.0) * 2.2;
        p.y += uS * 0.0007;
        float time = uT * 0.05;
        vec2 q = vec2(
          fbm(p + time + uV * 0.4),
          fbm(p + vec2(5.2, 1.3) - time)
        );
        float field = fbm(p + (1.6 + uV) * q);
        vec3 color = mix(
          vec3(0.56, 0.02, 0.02),
          vec3(0.82, 0.04, 0.04),
          smoothstep(0.2, 0.7, field)
        );
        color = mix(color, vec3(0.93, 0.11, 0.08), smoothstep(0.5, 0.9, q.x) * 0.65);
        color += vec3(0.22, 0.04, 0.02) *
          (1.0 - smoothstep(0.0, 0.4, distance(vUv, uM)));
        gl_FragColor = vec4(color, 0.25);
      }
    `;
    const background = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({
        uniforms,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        vertexShader:
          "varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 1.0, 1.0); }",
        fragmentShader,
      }),
    );
    background.frustumCulled = false;
    background.renderOrder = -1;
    scene.add(background);

    const particleCount = 300;
    const particles = Array.from({ length: particleCount }, () => ({
      x: (Math.random() - 0.5) * 20,
      y: Math.random() * 12,
      z: -7 + Math.random() * 9,
    }));
    const positions = new Float32Array(particleCount * 6);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    const streaks = new THREE.LineSegments(
      geometry,
      new THREE.LineBasicMaterial({
        color: 0xf2ede4,
        transparent: true,
        opacity: 0.46,
        depthTest: false,
      }),
    );
    streaks.frustumCulled = false;
    streaks.renderOrder = 1;
    scene.add(streaks);

    const resolution = uniforms.uR.value as THREE.Vector2;
    const mouse = uniforms.uM.value as THREE.Vector2;
    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height, false);
      resolution.set(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();

    let animationFrame = 0;
    const start = performance.now();
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const renderFrame = (now: number) => {
      const state = motionRef.current;
      const elapsed =
        ((now - start) / 1000) * (reducedMotion.matches ? 0.1 : 1);
      uniforms.uT.value = elapsed;
      uniforms.uS.value = state.y;
      uniforms.uV.value = Math.min(2, Math.abs(state.velocity) / 60);
      mouse.set((state.mouseX + 1) / 2, (1 - state.mouseY) / 2);

      const direction = state.velocity > 0 ? 1 : -1;
      const velocity = Math.min(Math.abs(state.velocity), 300);
      particles.forEach((particle, index) => {
        const depth = (particle.z + 7) / 9;
        const y = (((particle.y - state.y * 0.0045 * (0.3 + depth)) % 12) + 12) % 12 - 6;
        const x = particle.x + Math.sin(elapsed * 0.5 + particle.y) * 0.2;
        const length = 0.05 + velocity * 0.004 * (0.3 + depth);
        const offset = index * 6;
        positions[offset] = x;
        positions[offset + 1] = y;
        positions[offset + 2] = particle.z;
        positions[offset + 3] = x;
        positions[offset + 4] = y - direction * length;
        positions[offset + 5] = particle.z;
      });
      geometry.attributes.position.needsUpdate = true;

      camera.position.x = reducedMotion.matches ? 0 : state.mouseX * 0.5;
      camera.position.y = reducedMotion.matches ? 0 : -state.mouseY * 0.3;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(renderFrame);
    };

    window.addEventListener("resize", resize);
    animationFrame = requestAnimationFrame(renderFrame);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      geometry.dispose();
      streaks.material.dispose();
      background.geometry.dispose();
      (background.material as THREE.Material).dispose();
      renderer.dispose();
    };
  }, []);

  function toggleEvent(eventName: string) {
    setSelectedEvents((current) =>
      current.includes(eventName)
        ? current.filter((event) => event !== eventName)
        : [...current, eventName],
    );
  }

  function handleRegistrationClick(
    event: ReactMouseEvent<HTMLAnchorElement>,
  ) {
    if (selectedEvents.length > 0) return;
    event.preventDefault();
    setToast("Pick at least one event first.");
    document.getElementById("event-picks")?.classList.add("shake");
    window.setTimeout(
      () => document.getElementById("event-picks")?.classList.remove("shake"),
      450,
    );
  }

  function handlePledge() {
    const nextPledgeState = !pledged;
    setPledged(nextPledgeState);
    if (nextPledgeState) {
      setToast("Pledge taken. Stay clean.");
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const button = document.querySelector(".pledge-row .button");
      if (!button) return;
      const bounds = button.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      for (let index = 0; index < 28; index += 1) {
        const piece = document.createElement("i");
        piece.className = "confetti-piece";
        piece.style.left = `${centerX}px`;
        piece.style.top = `${centerY}px`;
        piece.style.backgroundColor =
          index % 3 === 0 ? "#d10a0a" : "#f2ede4";
        document.body.appendChild(piece);
        const angle = Math.random() * Math.PI * 2;
        const distance = 80 + Math.random() * 150;
        const animation = piece.animate(
          [
            { transform: "translate(0, 0) rotate(0)", opacity: 1 },
            {
              transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance + 60}px) rotate(${Math.random() * 540}deg)`,
              opacity: 0,
            },
          ],
          {
            duration: 900 + Math.random() * 500,
            easing: "cubic-bezier(.1,.7,.3,1)",
          },
        );
        animation.onfinish = () => piece.remove();
      }
    }
  }

  async function shareAurix() {
    const shareData = {
      title: "AURIX by FitNFine",
      text: "AURIX, Jan 8–10 in Ernakulam. Fitness put into play. Say no to drugs.",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
        setToast("Unable to share right now. Copy the link from your address bar.");
      }
      return;
    }

    if (!navigator.clipboard) {
      setToast("Copy the link from your address bar to share AURIX.");
      return;
    }

    try {
      await navigator.clipboard.writeText(shareData.url);
      setToast("Link copied.");
    } catch {
      setToast("Unable to copy the link. Copy it from your address bar instead.");
    }
  }

  const timeParts =
    countdown === null
      ? null
      : [
          { label: "days", value: Math.floor(countdown / 86_400_000) },
          { label: "hrs", value: Math.floor(countdown / 3_600_000) % 24 },
          { label: "min", value: Math.floor(countdown / 60_000) % 60 },
          { label: "sec", value: Math.floor(countdown / 1000) % 60 },
        ];

  return (
    <main className="aurix-page relative isolate min-h-screen bg-aurix-red text-aurix-bone">
      <div className="ambient-backdrop" aria-hidden="true" />
      <canvas className="aurix-webgl" aria-hidden="true" />
      <div className="scroll-progress" aria-hidden="true" />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="FitNFine fitness club">
          FITNFINE
          <small>Fitness club</small>
        </a>
        <a className="button button-solid button-small" href="#join">
          Registration coming soon
        </a>
      </header>
      <a
        className="button button-solid sticky-cta"
        href="#join"
        tabIndex={-1}
      >
        Registration coming soon
      </a>
      <div className="custom-cursor" aria-hidden="true" />

      <div className="smooth-content" ref={contentRef}>
        <section className="hero" id="top">
        <h1 className="hero-mark" aria-label="AURIX">
          AURIX
        </h1>
        <div className="hero-content">
          <p className="eyebrow">FitNFine presents</p>
          <h2>Fitness put into play.</h2>
          <p className="hero-date">Jan 8–10 in Ernakulam</p>
          <p className="hero-description">
            Come as you are, leave stronger. Three days, five events, one
            stronger community.
          </p>
          <div className="countdown" role="timer" aria-label="Countdown to AURIX">
            {countdown === 0 ? (
              <p className="countdown-live">AURIX is live</p>
            ) : (
              timeParts?.map((part) => (
                <div className="countdown-unit" key={part.label}>
                  {String(part.value).padStart(2, "0")}
                  <small>{part.label}</small>
                </div>
              ))
            )}
          </div>
          <div className="button-row">
            <a className="button button-solid" href="#join">
              Claim your spot
            </a>
            <a className="button" href="#schedule">
              See the schedule
            </a>
          </div>
        </div>
        <span className="hero-index" aria-hidden="true">
          01 / 03
        </span>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 3 }, (_, index) => (
            <span key={index}>
              Fitness put into play. &nbsp; Say no to drugs. &nbsp; Stronger
              people. Brighter tomorrow. &nbsp;—
            </span>
          ))}
        </div>
      </div>

      <section className="section section-padded" id="schedule">
        <div className="section-heading">
          <p className="eyebrow">The festival</p>
          <h2>
            Three days.
            <br />
            Five events.
          </h2>
        </div>
        <div className="days-grid">
          {DAYS.map((day, index) => {
            const eventNames: string[] = EVENTS.filter(
              (event) => event.day === index,
            ).map((event) => event.name);
            if (index === 2) eventNames.push("And many more");
            return (
              <article className="day-card" key={day}>
                <p className="day-number">0{index + 1}</p>
                <h3>{day}</h3>
                <ul>
                  {eventNames.map((eventName) => (
                    <li key={eventName}>{eventName}</li>
                  ))}
                </ul>
                <a
                  className="text-link"
                  href={dayCalendarUrl(index, eventNames)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Add day {index + 1} to calendar <span aria-hidden="true">↗</span>
                </a>
              </article>
            );
          })}
        </div>
        <p className="section-note">
          Timings and venue details will be announced soon. Register to hear
          first.
        </p>
      </section>

      <section className="section section-padded event-section" id="events">
        <div className="section-heading">
          <p className="eyebrow">Find your event</p>
          <h2>Show us what you’ve got.</h2>
        </div>
      </section>
      <section className="stack-section" aria-label="Festival events">
        <div className="stack-stage">
          {EVENTS.map((event) => (
            <article
              className="stack-card"
              key={event.name}
              style={{ backgroundColor: event.background }}
            >
              <div className="stack-card-media" aria-hidden="true">
                <picture>
                  <source type="image/webp" srcSet={event.image} />
                  <img
                    src={event.fallbackImage}
                    alt=""
                    className="stack-card-image"
                    loading="eager"
                    decoding="async"
                  />
                </picture>
                <div className="stack-card-overlay" />
              </div>
              <div className="stack-card-inner">
                <h2>{event.name}</h2>
                <div className="stack-card-info">
                  <span className="event-chip">
                    Day {event.day + 1}, {DAYS[event.day]}
                  </span>
                  <h3>Basic rules</h3>
                  <ul>
                    {event.rules.map((rule) => (
                      <li key={rule}>{rule}</li>
                    ))}
                  </ul>
                  <p className="bring-note">
                    <strong>Bring</strong> {event.bring}
                  </p>
                </div>
              </div>
              <div className="card-shade" aria-hidden="true" />
            </article>
          ))}
          <article className="stack-card stack-card-more">
            <div className="stack-card-inner">
              <h2>And many more</h2>
              <div className="stack-card-info">
                <span className="event-chip">To be announced</span>
                <h3>Stay tuned</h3>
                <ul>
                  {MORE_EVENTS.map((event) => (
                    <li key={event}>{event}</li>
                  ))}
                </ul>
                <p className="bring-note">
                  <strong>Updates</strong> will come through WhatsApp.
                </p>
              </div>
            </div>
            <div className="card-shade" aria-hidden="true" />
          </article>
        </div>
      </section>

      <section className="section section-padded two-column-section" id="rules">
        <div className="prize-panel">
          <p className="eyebrow">Good sport gets rewarded</p>
          <h2>Win exciting prizes</h2>
          <p>Just by taking part. Prize details will be announced soon.</p>
          <ul className="prize-tiers">
            <li>
              Winners <span>Top prizes in every event</span>
            </li>
            <li>
              Podium finishers <span>Details to follow</span>
            </li>
            <li>
              Everyone who takes part <span>Details to follow</span>
            </li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">A few things to know</p>
          <h3 className="subheading">Before you come</h3>
          <ol className="rules-list">
            {PRE_EVENT_RULES.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-padded how-section" id="how">
        <div className="section-heading">
          <p className="eyebrow">Three steps to game day</p>
          <h2>How to join</h2>
        </div>
        <ol className="steps-grid">
          <li>
            <span className="step-number">01</span>
            <h3>Pick your events</h3>
            <p>
              Choose one or more in the form below. Check the schedule so your
              days don’t clash.
            </p>
          </li>
          <li>
            <span className="step-number">02</span>
            <h3>Register on WhatsApp</h3>
            <p>
              Your choices are filled in for you. A full registration form is
              coming soon.
            </p>
          </li>
          <li>
            <span className="step-number">03</span>
            <h3>Show up clean</h3>
            <p>
              Bring photo ID and arrive 30 minutes early on Jan 8–10.
            </p>
          </li>
        </ol>
      </section>

      <section className="section section-padded dark-section" id="why">
        <div className="section-heading">
          <p className="eyebrow">Strength is a choice</p>
          <h2>Why we say no</h2>
        </div>
        <p className="why-copy">
          {WHY_WORDS.map((word, index) => (
            <span key={`${word}-${index}`}>{word} </span>
          ))}
        </p>
        <div className="pledge-row">
          <button
            className={`button button-solid${pledged ? " is-pledged" : ""}`}
            type="button"
            aria-pressed={pledged}
            onClick={handlePledge}
          >
            {pledged ? "You’ve pledged. Stay clean." : "Take the pledge"}
          </button>
          {pledged && (
            <a
              className="button"
              href={`https://wa.me/?text=${encodeURIComponent("I took the AURIX pledge: I say no to drugs. Join me at AURIX, Jan 8–10 in Ernakulam.")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Share your pledge
            </a>
          )}
        </div>
        <div className="help-panel">
          <h3>Need help or want to talk?</h3>
          <div className="helpline-grid">
            <a href="tel:1933">
              <strong>1933</strong>
              National Narcotics Helpline (MANAS). Toll-free, confidential,
              24x7.
            </a>
            <a href="tel:14416">
              <strong>14416</strong>
              Tele-MANAS. Toll-free mental health support.
            </a>
          </div>
        </div>
      </section>

      <section className="section section-padded dark-section ambassador-section">
        <p className="eyebrow">The AURIX state of mind</p>
        <div className="ambassador-stage">
          <div className="ambassador-track">
            {[
              "Strength is built, never bought.",
              "Clean wins feel different.",
              "Show up. Stay clean. Lift each other.",
            ].map((quote) => (
              <blockquote className="ambassador-card" key={quote}>
                <q>{quote}</q>
                <footer>
                  <strong>Ambassador name</strong>
                  <br />
                  Role to be announced. Draft quote.
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-padded dark-section faq-section" id="faq">
        <div className="section-heading">
          <p className="eyebrow">Everything else</p>
          <h2>Good to know</h2>
        </div>
        <div className="faq-list">
          {FAQS.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section section-padded join-section" id="join">
        <div className="join-copy">
          <p className="eyebrow">Your move</p>
          <h2>
            Be there.
            <br />
            Jan 8–10.
          </h2>
          <p>
            Pick what you want to enter. We’ll open WhatsApp with your choices
            filled in, so you only have to hit send. A full registration form is
            coming soon.
          </p>
        </div>
        <div className="registration-form">
          <label className="name-field" htmlFor="participant-name">
            Your name
            <input
              id="participant-name"
              type="text"
              autoComplete="name"
              placeholder="Full name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <fieldset className="event-picks" id="event-picks">
            <legend>Choose your events</legend>
            {EVENTS.map((event) => (
              <label className="event-pick" key={event.name}>
                <input
                  type="checkbox"
                  value={event.name}
                  checked={selectedEvents.includes(event.name)}
                  onChange={() => toggleEvent(event.name)}
                />
                <span>{event.name}</span>
              </label>
            ))}
          </fieldset>
          <p className="selection-summary" aria-live="polite">
            {selectedEvents.length
              ? `${selectedEvents.length} event${selectedEvents.length > 1 ? "s" : ""} selected, on ${selectedDays.join(" and ")}.`
              : "Pick at least one event."}
          </p>
          <div className="button-row registration-actions">
            <a
              className="button button-solid"
              href={registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleRegistrationClick}
            >
              {selectedEvents.length
                ? `Register for ${selectedEvents.length} event${selectedEvents.length > 1 ? "s" : ""}`
                : "Register on WhatsApp"}
            </a>
            <a
              className="button"
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Add to calendar
            </a>
            <button className="button" type="button" onClick={shareAurix}>
              Share AURIX
            </button>
          </div>
          <p className="holo-line">
            Say no to drugs. Stronger people. Brighter tomorrow.
          </p>
        </div>
      </section>

      <footer className="site-footer">
        <div>
          <strong>AURIX</strong>
          <br />
          Jan 8–10, Ernakulam
          <br />
          Presented by FitNFine Fitness Club
        </div>
        <div>
          <strong>Questions?</strong>
          <br />
          Message us on WhatsApp from the register section.
        </div>
        <div>
          <a href="#top">Back to top ↑</a>
          <br />© 2026 FitNFine Fitness Club. AURIX is an anti-drug fitness
          festival.
        </div>
      </footer>
      </div>

      <div className={`toast${toast ? " is-visible" : ""}`} role="status">
        {toast}
      </div>
    </main>
  );
}
