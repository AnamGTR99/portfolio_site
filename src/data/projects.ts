export type ProjectCategory =
  | "ai-native"
  | "web-app"
  | "mobile"
  | "client-website"
  | "passion-project";

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
}

export const projects: Project[] = [
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
    buildTime: "48 hours",
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
    award: "Healthcare Track Winner — MelbourneHack 2025",
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
    liveUrl: "https://devpost.com/software/speechmax",
    featured: true,
    year: 2025,
    award: "Submission — UniHack Australia 2026",
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
      "A published npm package providing cursor-reactive specular highlights with gaussian falloff, smooth 3D perspective tilt, animated conic rim lighting, inner refraction glow, and chromatic prismatic tinting. Full keyboard and screen-reader accessibility. The same glass components powering this portfolio site.",
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
      "Immersive digital universe merging music releases with e-commerce — 3D product visualization, Shopify integration, and Stripe payments. Co-developed for HUGOZBOR.",
    longDescription:
      "An interactive platform where music releases and physical/digital products are experienced together inside a 3D environment. Features multi-scene interactive environments, a music player, Shopify storefront integration, Stripe payments, Supabase auth and storage, and 3D GLB model rendering. Co-developed as commissioned client work through HUGOZBOR.",
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
      "Official website for HUGOZBOR talent management with custom API layer, analytics integration, and full branding suite.",
    techStack: ["JavaScript", "Vite", "Tailwind CSS"],
    categories: ["client-website"],
    thumbnail: "https://i.gyazo.com/4adf6a6ce1449314c0d5c0400a237867.gif",
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
