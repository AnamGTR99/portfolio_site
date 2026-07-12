export interface Venture {
  slug: string;
  title: string;
  role: string;
  description: string;
  fullContent: string;
  status: "ongoing" | "completed" | "construction";
  thumbnail?: string;
  heroImage?: string;
  heroVideo?: string;
  images?: string[];
  brandLogos?: { src: string; name: string; scale?: number }[];
  roster?: {
    index: string;
    name: string;
    handle: string;
    url?: string;
    tags: string;
    photo: string;
  }[];
  links?: { label: string; url: string }[];
  metrics?: { label: string; value: string }[];
  year: number;
}

export const ventures: Venture[] = [
  {
    slug: "mana",
    title: "Mana",
    role: "Founder",
    description:
      "A talent management company for digital creators — brand partnerships, creative direction, and careers built to last.",
    fullContent: `Mana is a talent management company for digital creators — years of hands-on talent work, folded into a real brand. The name, the woven-knot mark, and the International Klein Blue world were built from scratch in-house: a company that looks the way it operates — deliberate, minimal, and impossible to mistake.

The model is simple: a small roster, managed properly. Brand partnerships, creative direction, content strategy, and the unglamorous infrastructure — contracts, invoicing, outreach pipelines — handled end to end so creators can focus entirely on the work. Engineering habits carry over: systems for everything, automation where it matters, taste where it counts.

Mana currently represents two creators and has closed 50+ brand collaborations across fashion, footwear, and design software — from global names like Converse and ASICS to the independent labels shaping the culture.`,
    status: "ongoing",
    thumbnail: "/images/ventures/mana/mana-mark.png",
    heroImage: "/images/ventures/mana/mana-hero.png",
    roster: [
      {
        index: "001",
        name: "Hugo Zbor",
        handle: "@hugozbor",
        url: "https://instagram.com/hugozbor",
        tags: "CREATIVE · DIRECTION · PRESENCE",
        photo: "/images/ventures/mana/hugo.jpg",
      },
      {
        index: "002",
        name: "By Kevin Chiang",
        handle: "@bykevinchiang",
        url: "https://instagram.com/bykevinchiang",
        tags: "UGC · ARCHITECTURE · DESIGN",
        photo: "/images/ventures/mana/kevin.jpg",
      },
    ],
    brandLogos: [
      { src: "/images/brands/Converse-Logo.png", name: "CONVERSE" },
      { src: "/images/brands/asics_logo_clean.png", name: "ASICS" },
      {
        src: "/images/brands/named_collective.png",
        name: "NAMED COLLECTIVE",
        scale: 1.7,
      },
      { src: "/images/brands/8illy.png", name: "8ILLY" },
      { src: "/images/brands/d5render.png", name: "D5 RENDER", scale: 1.4 },
      { src: "/images/brands/BENECULTURE.webp", name: "BENECULTURE" },
      { src: "/images/brands/CONROY-US.webp", name: "CONROY US" },
      { src: "/images/brands/BLACK-_CLEAR_.png", name: "99CLOVER" },
      { src: "/images/brands/LOVENANGELS.png", name: "LOVENANGELS" },
      {
        src: "/images/brands/ULTRALIGHT-TEXT-LOGO.png",
        name: "ULTRALIGHT LONDON",
      },
      { src: "/images/brands/aformunseen.png", name: "A FORM UNSEEN" },
      { src: "/images/brands/omnee.png", name: "OMNEE WORLD" },
      { src: "/images/brands/pcmkr.png", name: "PEACEMAKER" },
    ],
    links: [{ label: "Instagram", url: "https://instagram.com/manamgmt" }],
    metrics: [
      { label: "Focus", value: "Talent Management" },
      { label: "Roster", value: "2 Creators" },
      { label: "Collaborations", value: "50+" },
      { label: "Status", value: "Active" },
    ],
    year: 2026,
  },
  {
    slug: "anam-hotel",
    title: "The Anam Hotel Colombo",
    role: "Owner & Operator",
    description:
      "A boutique hotel in Colombo, Sri Lanka — blending modern hospitality with local culture and warmth.",
    fullContent: `The Anam Hotel Colombo is a boutique hospitality venture in the heart of Sri Lanka's capital. Born from a vision to create a space that feels both worldly and deeply local, the hotel combines contemporary design with Sri Lankan warmth.

From concept to operations, every detail has been hands-on — from interior design decisions and staff hiring to guest experience strategy and digital presence. The hotel represents the intersection of business acumen, design sensibility, and genuine care for the guest experience.

Running a hotel teaches you things software never will: reading people, managing chaos with grace, and understanding that the best systems are invisible to the people they serve.`,
    status: "ongoing",
    thumbnail: "/images/ventures/anam-hotel-logo.svg",
    heroImage: "/images/ventures/anam-hotel.jpg",
    links: [
      { label: "Website", url: "https://anamhostels.com/" },
      { label: "Instagram", url: "https://instagram.com/theanamlk" },
    ],
    metrics: [
      { label: "Location", value: "Colombo, Sri Lanka" },
      { label: "Type", value: "Boutique Hotel" },
      { label: "Opened", value: "January 2024" },
      { label: "Status", value: "Operational" },
    ],
    year: 2024,
  },
];

export function getVentureBySlug(slug: string): Venture | undefined {
  return ventures.find((v) => v.slug === slug);
}
