export interface Venture {
  slug: string;
  title: string;
  role: string;
  description: string;
  fullContent: string;
  status: "ongoing" | "completed";
  thumbnail: string;
  images?: string[];
  links?: { label: string; url: string }[];
  metrics?: { label: string; value: string }[];
  year: number;
}

export const ventures: Venture[] = [
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
    thumbnail: "/images/ventures/anam-hotel.jpg",
    links: [],
    metrics: [
      { label: "Location", value: "Colombo, Sri Lanka" },
      { label: "Type", value: "Boutique Hotel" },
      { label: "Status", value: "Operational" },
    ],
    year: 2023,
  },
  {
    slug: "hugozbor",
    title: "HUGOZBOR Talent Management",
    role: "Talent Manager",
    description:
      "Managing digital talent — building brands, negotiating partnerships, and scaling creator careers.",
    fullContent: `HUGOZBOR is a talent management operation focused on digital creators and emerging artists. The role spans everything from content strategy and brand partnerships to contract negotiation and audience growth.

In the creator economy, talent management is part agent, part strategist, part therapist. It requires understanding platform algorithms, brand deal structures, audience psychology, and the human side of creative work.

The technical skills from software engineering directly translate — building tools for analytics, automating outreach, and creating the digital infrastructure that lets talent focus on what they do best.`,
    status: "ongoing",
    thumbnail: "/images/ventures/hugozbor.jpg",
    links: [{ label: "HUGOZBOR Website", url: "https://hugozbor.com" }],
    metrics: [
      { label: "Focus", value: "Digital Creators" },
      { label: "Scope", value: "Brand Deals & Growth" },
      { label: "Status", value: "Active" },
    ],
    year: 2024,
  },
];

export function getVentureBySlug(slug: string): Venture | undefined {
  return ventures.find((v) => v.slug === slug);
}
