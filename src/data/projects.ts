export type ProjectCategory = "web-app" | "mobile" | "ai" | "website" | "other";

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  category: ProjectCategory;
  thumbnail: string;
  images?: string[];
  demoVideo?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  year: number;
  award?: string;
}

export const projects: Project[] = [
  {
    slug: "ai-lease-processing",
    title: "AI-Powered Lease Processing",
    description:
      "Enterprise document automation system that processes lease agreements and generates tenant welcome packs using AI.",
    longDescription:
      "A full-stack application that leverages AI to automate the processing of lease documents. Upload a lease PDF, and the system extracts key terms, tenant information, and generates a comprehensive welcome pack. Built for property management companies to streamline onboarding.",
    techStack: [
      "TypeScript",
      "React",
      "Node.js",
      "OpenAI",
      "Tailwind CSS",
      "Framer Motion",
    ],
    category: "ai",
    thumbnail: "/images/projects/ai-lease-processing.png",
    demoVideo: "/videos/projects/ai-lease-processing.mp4",
    githubUrl:
      "https://github.com/AnamGTR99/AI-Powered-Lease-Processing-Tenant-Welcome-Pack-Generator",
    featured: true,
    year: 2025,
  },
  {
    slug: "airtable-clone",
    title: "Airtable Clone",
    description:
      "A fully functional Airtable clone with real-time data tables, filtering, sorting, and column management.",
    techStack: ["TypeScript", "React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    category: "web-app",
    thumbnail: "/images/projects/airtable-clone.png",
    demoVideo: "/videos/projects/airtable-clone.mp4",
    githubUrl: "https://github.com/AnamGTR99/airtable-clone",
    featured: true,
    year: 2025,
  },
  {
    slug: "pokemon-ai",
    title: "Pokemon AI",
    description:
      "OCR-powered Pokemon card scanner that identifies cards and scrapes real-time market prices.",
    techStack: ["TypeScript", "React", "Tesseract.js", "Web Scraping", "Node.js"],
    category: "ai",
    thumbnail: "/images/projects/pokemon-ai.png",
    demoVideo: "/videos/projects/pokemon-ai.mp4",
    githubUrl: "https://github.com/AnamGTR99/pokemon_ai",
    featured: true,
    year: 2025,
  },
  {
    slug: "ai-anime-girl",
    title: "AI Anime Girlfriend",
    description:
      "Conversational AI character powered by Gemini with Elevenlabs voice synthesis for real-time voice responses.",
    techStack: ["TypeScript", "React", "Gemini API", "Elevenlabs", "Node.js"],
    category: "ai",
    thumbnail: "/images/projects/ai-anime-girl.png",
    demoVideo: "/videos/projects/ai-anime-girl.mp4",
    githubUrl: "https://github.com/AnamGTR99/ai_anime_girl",
    featured: false,
    year: 2025,
  },
  {
    slug: "vape-tracker",
    title: "Vape Tracker App",
    description:
      "Mobile application for tracking usage with stats, charts, and historical data visualization.",
    techStack: ["TypeScript", "React Native", "Expo", "Chart.js"],
    category: "mobile",
    thumbnail: "/images/projects/vape-tracker.png",
    demoVideo: "/videos/projects/vape-tracker.mp4",
    githubUrl: "https://github.com/AnamGTR99/vape_app_tracker",
    featured: false,
    year: 2025,
  },
  {
    slug: "lyra-airtable",
    title: "Lyra Job Application Tracker",
    description:
      "Airtable-style application for managing job applications with status tracking and notes.",
    techStack: ["TypeScript", "React", "Node.js", "Tailwind CSS"],
    category: "web-app",
    thumbnail: "/images/projects/lyra-airtable.png",
    demoVideo: "/videos/projects/lyra-airtable.mp4",
    githubUrl: "https://github.com/AnamGTR99/anam-lyra-airtable",
    featured: false,
    year: 2025,
  },
  {
    slug: "hugozbor-website",
    title: "HUGOZBOR Website",
    description:
      "Portfolio website for HUGOZBOR talent management, showcasing artist profiles and content.",
    techStack: ["JavaScript", "HTML", "CSS"],
    category: "website",
    thumbnail: "/images/projects/hugozbor.png",
    demoVideo: "/videos/projects/hugozbor.mp4",
    liveUrl: "https://hugozbor.com",
    githubUrl: "https://github.com/AnamGTR99/hz_website",
    featured: false,
    year: 2024,
  },
  {
    slug: "lux-vestra",
    title: "Lux Vestra Website",
    description:
      "Commissioned company website with polished visual design and smooth interactions.",
    techStack: ["HTML", "CSS", "JavaScript"],
    category: "website",
    thumbnail: "/images/projects/lux-vestra.png",
    demoVideo: "/videos/projects/lux-vestra.mp4",
    githubUrl: "https://github.com/AnamGTR99/lux_vestra_website",
    featured: false,
    year: 2024,
  },
  {
    slug: "startuplink",
    title: "StartupLink Website",
    description:
      "Website for the University of Melbourne's startup society, connecting student entrepreneurs.",
    techStack: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
    category: "website",
    thumbnail: "/images/projects/startuplink.png",
    demoVideo: "/videos/projects/startuplink.mp4",
    githubUrl: "https://github.com/AnamGTR99/startuplink_website",
    featured: false,
    year: 2024,
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((p) => p.category === category);
}
