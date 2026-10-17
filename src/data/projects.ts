export type ProjectCategory =
  | "ai-native"
  | "eleno-build"
  | "mana-systems"
  | "web-app"
  | "mobile"
  | "client-website"
  | "passion-project";

export const categoryLabels: Record<string, string> = {
  "ai-native": "AI-Native",
  "eleno-build": "Eleno Build",
  "mana-systems": "Mana Systems",
  "web-app": "Web App",
  mobile: "Mobile",
  "client-website": "Client Website",
  "passion-project": "Passion Project",
};

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  categories: ProjectCategory[];
  thumbnail: string;
  images?: string[];
  demoVideo?: string;
  youtubeId?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  year: number;
  award?: string;
  badge?: string;
  buildTime?: string;
  role?: string;
  purpose?: string;
  nda?: boolean;
  logoThumb?: boolean;
}

export const projects: Project[] = [
  {
    slug: "stamped",
    title: "Stamped",
    description:
      "Chrome extension that sits beside any YouTube video, summarises it from the transcript, answers questions about it, and turns every timestamp into a link that jumps the player.",
    longDescription:
      "Stamped opens as a panel in YouTube's right column. It reads the video's transcript inside the browser, streams back a tight summary — an \"In short\" line, three bullets and up to five key moments — and pins those moments as dots on the player's progress bar. You can chat with the video, and every [m:ss] in an answer is a button that jumps straight there. The backend is a small Node service on a VPS with SQLite caching and a one-at-a-time Claude queue; transcripts are read client-side because YouTube blocks datacenter IPs. Accounts, payments and a Chrome Web Store listing are built in for launch.",
    techStack: [
      "JavaScript",
      "Chrome Extension (MV3)",
      "Node.js",
      "SQLite",
      "Claude",
      "Playwright",
      "Nginx",
    ],
    categories: ["ai-native", "passion-project"],
    thumbnail: "/images/projects/stamped.jpg",
    demoVideo: "/videos/projects/stamped.mp4",
    featured: true,
    year: 2026,
    badge: "Chrome Extension",
    role: "Solo",
    purpose: "Product",
  },
  {
    slug: "enquiry-automation",
    title: "Enquiry Automation System",
    description:
      "Automated buyer-enquiry engine for a real-estate agency — detects every new enquiry, sends a personalised AI reply within minutes, follows up on a schedule, and logs it all back to the CRM.",
    longDescription:
      "Built at Eleno for a real-estate agency (client under NDA). The system watches agents' inboxes through Microsoft 365 webhooks and polls the agency's CRM, classifies and routes each enquiry, drafts a personalised reply with GPT-4o and sends it from the agent's own mailbox. It runs a business-day-aware follow-up cadence (weekends and public holidays skipped), parses buyers' questionnaire replies into structured CRM fields, handles SMS and voice routing with opt-outs, sends post-inspection forms and auction reminders, and writes every touchpoint back to the CRM. Ten scheduled jobs, PII retention, rate limiting and tests — Dockerised FastAPI, deployed to a cloud VPS and taken from sandbox to live.",
    techStack: [
      "Python",
      "FastAPI",
      "OpenAI GPT-4o",
      "Microsoft Graph",
      "Twilio",
      "Supabase",
      "PostgreSQL",
      "Docker",
      "APScheduler",
    ],
    categories: ["eleno-build", "ai-native"],
    thumbnail: "/images/eleno-logo.png",
    logoThumb: true,
    nda: true,
    featured: true,
    year: 2026,
    badge: "Eleno Build · NDA",
    buildTime: "4 months",
    role: "Lead Engineer",
    purpose: "Eleno Build",
  },
  {
    slug: "investor-relations-platform",
    title: "Investor Relations Platform",
    description:
      "Custom investor-relations platform for a fund manager — investors, funds, deals and capital positions in one system, with live two-way sync between the CRM and email marketing.",
    longDescription:
      "Built at Eleno with a two-person team for a fund manager (client under NDA). It replaced spreadsheets and disconnected tools with one platform: investor profiles with holdings, interaction timelines and organisation hierarchies; funds and deals with tranches; a capital-position drill-down from fund to deal to investor; registry imports with reconciliation; and reporting. The 16-table schema uses an append-only capital-events ledger for compliance and a separate inter-fund flows table so funds under management are never double-counted. Alongside it, a live sync service links the CRM boards and the email platform both ways — flag changes, unsubscribes and per-recipient campaign engagement land on each contact's timeline within seconds.",
    techStack: [
      "TypeScript",
      "Next.js",
      "Turborepo",
      "Supabase",
      "Prisma",
      "Monday.com API",
      "Mailchimp API",
      "Tailwind CSS",
      "shadcn/ui",
    ],
    categories: ["eleno-build", "web-app"],
    thumbnail: "/images/eleno-logo.png",
    logoThumb: true,
    nda: true,
    featured: true,
    year: 2026,
    badge: "Eleno Build · NDA",
    role: "Full-stack Engineer",
    purpose: "Eleno Build",
  },
  {
    slug: "mana-os",
    title: "MANA OS",
    description:
      "The operating system behind Mana, my creator talent agency — one app for every deal, deadline, invoice and client email across the roster, synced from the commission sheets and inboxes.",
    longDescription:
      "MANA OS runs the agency day to day. Today ranks what's owed: client emails waiting more than 24 hours, deadlines in the next 48, money to chase and quotes to confirm. Deals is a river from talking to quoted, signed, in production, delivered-unpaid and paid, colour-coded per creator. Score tracks closed value, commission and weekly targets against the goals staircase, and Money follows every invoice. Deal data syncs from each creator's commission sheet through Apps Script four times a day and an inbox notifier checks every 10 minutes, so the app is always current and never sends anything on its own. It carries the full deal flow for creators like Hugo Zbor; a private creator portal piloting with Hugo is next. Client names and figures are blurred in the screenshots.",
    techStack: [
      "Python",
      "SQLite",
      "JavaScript",
      "Google Apps Script",
      "IMAP",
      "Nginx",
      "DigitalOcean",
    ],
    categories: ["mana-systems", "web-app"],
    thumbnail: "/images/projects/mana/mana-deals.jpg",
    images: ["/images/projects/mana/mana-today.jpg"],
    featured: true,
    year: 2026,
    badge: "Live — Daily Use",
    role: "Solo",
    purpose: "Mana",
  },
  {
    slug: "mana-reply",
    title: "Mana Reply",
    description:
      "AI reply agent for the agency inbox — reads the whole email thread, the deal notes and the commission sheet, then saves a ready-to-send draft in Gmail, in my voice.",
    longDescription:
      "From any client email on the Today feed I tap Reply and type one line of intent. Claude Opus reads the full Gmail thread, the vault notes for that deal and the creator's commission-sheet row, and saves a draft inside the same Gmail thread — it has no send tool, so a human always presses send. Shorter, Warmer and Redo rewrite the draft in place. A Telegram bot pushes a \"reply owed\" card the moment a client email lands. A rules file holds the house voice and bans invented figures (anything unknown becomes a [PLACEHOLDER]), email text is treated as data rather than instructions, and a monitor re-checks thread summaries every 10 minutes. Client details in the screenshot are blurred.",
    techStack: [
      "Python",
      "Claude Opus",
      "Claude Code (headless)",
      "Gmail / IMAP",
      "Telegram Bot API",
      "SQLite",
      "Nginx",
    ],
    categories: ["mana-systems", "ai-native"],
    thumbnail: "/images/projects/mana/mana-today.jpg",
    featured: true,
    year: 2026,
    badge: "Live — Daily Use",
    role: "Solo",
    purpose: "Mana",
  },
  {
    slug: "mana-agent-fleet",
    title: "Mana Agent Fleet",
    description:
      "The outreach engine and AI agents that run a talent agency's pipeline — creator scraping, contact discovery, a 7,599-contact outreach CRM, inbox screening and a 24/7 Telegram assistant for each creator.",
    longDescription:
      "A fleet of services on one small VPS. Scrapers pulled 1,800+ creator profiles and thousands of brand contacts, enriched through a contact-finding waterfall (Hunter, Tomba, Prospeo and a free parallel site scraper). The outreach CRM tracks every contact, send, reply and follow-up across lanes with per-lane ICP scoring, and a Screener agent scans five inboxes every two minutes for bounces and out-of-office replies. Hugo and Kevin each have their own Telegram assistant: Claude, running headless, answers their questions about deals, money and deadlines read-only from the vault, the deal mirror and their inbox, and escalates anything that needs action to me with a numbered flag. A morning brief bot posts the day's plan at 07:30. One hard lesson baked in: Gmail API sends tripped spam filters after 759 emails, so sending moved to plain SMTP.",
    techStack: [
      "Python",
      "SQLite",
      "Claude",
      "Gemini",
      "Telegram Bot API",
      "Apify",
      "systemd",
      "Nginx",
    ],
    categories: ["mana-systems", "ai-native"],
    thumbnail: "/images/projects/mana/mana-outreach.jpg",
    featured: true,
    year: 2026,
    badge: "Live on VPS",
    role: "Solo",
    purpose: "Mana",
  },
  {
    slug: "dive",
    title: "Dive",
    description:
      "Spatial canvas for branching AI conversations — fork discussions, maintain context, and explore knowledge non-linearly. Solves context collapse in AI workflows.",
    longDescription:
      "Dive is a cognitive augmentation tool that transforms documents and web pages into branching chat trees. Instead of linear AI chat, you create concept anchors from any text, start AI conversations from them, and fork responses to explore multiple reasoning paths — all while maintaining full context inheritance. Built in 72 hours at FoundersHack Melbourne 2025 with Team NUU.",
    techStack: [
      "TypeScript",
      "Next.js",
      "React",
      "Convex",
      "ReactFlow",
      "OpenAI GPT-4o",
      "Tailwind CSS",
      "shadcn/ui",
    ],
    categories: ["ai-native", "web-app"],
    thumbnail: "/images/projects/dive.jpg",
    demoVideo: "/videos/projects/dive.mp4",
    liveUrl: "https://www.youtube.com/watch?v=w22c15X_1BA",
    githubUrl: "https://github.com/nathan-luo/dive-web",
    featured: true,
    year: 2025,
    award: "3rd Place — FoundersHack Melbourne 2025",
    buildTime: "72 hours",
    role: "Backend Lead",
    purpose: "Hackathon",
  },
  {
    slug: "medpal",
    title: "MedPal AI",
    description:
      "Mobile app that scans medication labels and translates medical jargon into plain language using AI. Includes dose tracking, smart reminders, and a medication library.",
    longDescription:
      "MedPal addresses medication literacy and adherence challenges. Patients scan a prescription label via camera and the AI instantly translates complex medical terminology into clear, understandable language. Features a senior-friendly interface with dose tracking and smart reminders. Built at MelbourneHack 2025.",
    techStack: [
      "TypeScript",
      "React Native",
      "Expo",
      "Google Cloud Vision",
      "Google Gemini AI",
    ],
    categories: ["ai-native", "mobile"],
    thumbnail: "/images/projects/medpal.png",
    demoVideo: "/videos/projects/medpal.mp4",
    liveUrl: "https://devpost.com/software/medpal-q87jmd",
    githubUrl: "https://github.com/AnamGTR99/medpal_ai",
    featured: true,
    year: 2025,
    award: "1st Place — MelbourneHack 2025",
    buildTime: "48 hours",
    role: "Team Lead & Full-stack",
    purpose: "Hackathon",
  },
  {
    slug: "speechmax",
    title: "SpeechMax",
    description:
      "AI-powered speech coaching app that analyzes public speaking across clarity, confidence, pacing, expression, and composure using browser-based computer vision and audio analysis.",
    longDescription:
      "SpeechMax analyzes five speaking dimensions through real-time browser-based ML processing. Users complete a 30-second assessment generating an animated radar chart, then engage with five gamified mini-games targeting their weaknesses: Filler Ninja, Eye Lock, Pace Racer, Pitch Surfer, and Stage Presence. An AI coach named Mike provides personalized feedback via in-app chat. Built in 48 hours at UNIHACK 2026.",
    techStack: [
      "TypeScript",
      "React",
      "Vite",
      "MediaPipe",
      "Google Gemini",
      "Supabase",
      "Framer Motion",
      "Tailwind CSS",
    ],
    categories: ["ai-native", "web-app"],
    thumbnail: "/images/projects/SpeechMax.jpg",
    youtubeId: "BV84L0RxuVo",
    liveUrl: "https://speechmax-theta.vercel.app/",
    featured: true,
    year: 2026,
    award: "Top 5 — UNIHACK ANZ 2026 (183 Teams)",
    buildTime: "48 hours",
    role: "Team Lead",
    purpose: "Hackathon",
  },
  {
    slug: "airtable-clone",
    title: "Airtable Clone",
    description:
      "High-performance Airtable clone handling 1 million rows with sub-25s bulk insertion, virtualized scrolling, and keyboard-driven spreadsheet navigation.",
    longDescription:
      "A full-featured spreadsheet application built on the T3 Stack. Features cursor-based pagination with virtualized infinite scroll for 1M+ rows, Airtable-style keyboard navigation, JSONB-based flexible column schema, and saved views with persistent filter/sort configurations. Separated read path (serverless) from write path (dedicated worker) for scale.",
    techStack: [
      "TypeScript",
      "Next.js",
      "tRPC",
      "PostgreSQL",
      "Prisma",
      "TanStack Table",
      "Zustand",
      "Tailwind CSS",
    ],
    categories: ["web-app"],
    thumbnail: "/images/projects/airtable_clone.jpg",
    githubUrl: "https://github.com/AnamGTR99/anam-lyra-airtable",
    featured: true,
    year: 2025,
    buildTime: "9 days",
    role: "Solo Full-stack",
    purpose: "Client Work",
  },
  {
    slug: "liquid-glass",
    title: "React Liquid Glass",
    description:
      "Open-source React component library with iOS 26-inspired liquid glass effects. Published on npm with zero dependencies beyond React.",
    longDescription:
      "A published npm package providing cursor-reactive specular highlights with gaussian falloff, smooth 3D perspective tilt, animated conic rim lighting, inner refraction glow, and chromatic prismatic tinting. Full keyboard and screen-reader accessibility.",
    techStack: ["TypeScript", "React"],
    categories: ["passion-project"],
    thumbnail: "/images/projects/liquid-glass.png",
    demoVideo: "/videos/projects/liquid-glass.mp4",
    liveUrl: "https://www.npmjs.com/package/anam-react-liquid-glass",
    githubUrl: "https://github.com/AnamGTR99/anam-react-liquid-glass",
    featured: true,
    year: 2025,
    badge: "Published on npm",
    buildTime: "2–3 days",
    role: "Solo",
    purpose: "Open-source",
  },
  {
    slug: "yunmakai",
    title: "Yunmakai",
    description:
      "Immersive digital universe merging music releases with e-commerce — 3D product visualization, Shopify integration, and Stripe payments. Co-developed for Hugo Zbor.",
    longDescription:
      "An interactive platform where music releases and physical/digital products are experienced together inside a 3D environment. Features multi-scene interactive environments, a music player, Shopify storefront integration, Stripe payments, Supabase auth and storage, and 3D GLB model rendering. Co-developed as commissioned client work for Hugo Zbor.",
    techStack: [
      "TypeScript",
      "Next.js",
      "Supabase",
      "Shopify API",
      "Stripe",
      "Zustand",
      "model-viewer",
      "Tailwind CSS",
    ],
    categories: ["web-app", "client-website"],
    thumbnail: "/images/projects/yunmakai.svg",
    githubUrl: "https://github.com/AnamGTR99/ym_website",
    featured: false,
    year: 2025,
    badge: "Commissioned Work",
    buildTime: "2+ months",
    role: "Full-stack Co-developer",
    purpose: "Client Work",
  },
  {
    slug: "pokemon-ai",
    title: "PokeAI Scanner",
    description:
      "Mobile app that uses AI-powered OCR to scan physical Pokemon cards via camera, identify them, and display real-time market pricing across card grades.",
    techStack: [
      "TypeScript",
      "React Native",
      "Expo",
      "Google Cloud Vision",
      "React Native Reanimated",
    ],
    categories: ["ai-native", "mobile", "passion-project"],
    thumbnail: "/images/projects/pokeai_thumbnail.jpg",
    demoVideo: "/videos/projects/pokeai_scanner.mp4",
    liveUrl: "https://www.youtube.com/shorts/3uaLCT03-T8",
    githubUrl: "https://github.com/AnamGTR99/pokemon_ai",
    featured: false,
    year: 2025,
    buildTime: "3–4 days",
    role: "Solo",
    purpose: "Passion Project",
  },
  {
    slug: "ai-anime-companion",
    title: "AI Anime Companion",
    description:
      "Interactive 3D anime avatar with real-time voice calling, lip-sync, and emotional expression changes driven by conversation sentiment. Multi-model AI support.",
    techStack: [
      "TypeScript",
      "React",
      "Three.js",
      "VRM",
      "ElevenLabs",
      "OpenAI",
      "Tailwind CSS",
    ],
    categories: ["ai-native", "web-app", "passion-project"],
    thumbnail: "/images/projects/ai-anime-companion.png",
    demoVideo: "/videos/projects/ai-girlfriend.mp4",
    githubUrl: "https://github.com/AnamGTR99/ai_anime_girl",
    featured: false,
    year: 2025,
    buildTime: "1–2 days",
    role: "Solo",
    purpose: "Technical Exploration",
  },
  {
    slug: "puff",
    title: "Puff",
    description:
      "Cross-platform mobile app for tracking vaping habits with custom SVG charts, spring-based animated counters, and interactive daily/weekly/monthly analytics.",
    techStack: [
      "TypeScript",
      "React Native",
      "Expo",
      "React Native Reanimated",
      "React Native SVG",
    ],
    categories: ["mobile", "passion-project"],
    thumbnail: "/images/projects/puff_thumbnail.png",
    demoVideo: "/videos/projects/puff.mp4",
    githubUrl: "https://github.com/AnamGTR99/vape_app_tracker",
    featured: false,
    year: 2025,
    buildTime: "1–2 days",
    role: "Solo",
    purpose: "Passion Project",
  },
  {
    slug: "hugozbor-website",
    title: "HUGOZBOR Website",
    description:
      "Official website for creator Hugo Zbor, with a custom API layer, analytics integration, and full branding suite.",
    techStack: ["JavaScript", "Vite", "Tailwind CSS"],
    categories: ["client-website"],
    thumbnail: "/images/ventures/hugozbor-logo.png",
    liveUrl: "https://www.hugozbor.com",
    featured: false,
    year: 2025,
    badge: "Commissioned Work",
    buildTime: "1–2 weeks",
    role: "Co-developer",
    purpose: "Client Work",
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((p) => p.categories.includes(category));
}
