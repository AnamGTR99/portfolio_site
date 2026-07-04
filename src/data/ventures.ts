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
  links?: { label: string; url: string }[];
  metrics?: { label: string; value: string }[];
  year: number;
}

export const ventures: Venture[] = [
  {
    slug: "mana-group",
    title: "Mana Group",
    role: "Founder",
    description: "Something is being built.",
    fullContent: `Mana Group is in construction.`,
    status: "construction",
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
