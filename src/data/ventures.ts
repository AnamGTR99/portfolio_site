export interface Venture {
  slug: string;
  title: string;
  role: string;
  description: string;
  fullContent: string;
  status: "ongoing" | "completed";
  thumbnail: string;
  heroImage?: string;
  heroVideo?: string;
  images?: string[];
  brandLogos?: { src: string; name: string }[];
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
  {
    slug: "hugozbor",
    title: "HUGO ZBOR",
    role: "Talent Manager",
    description:
      "Managing a multi-disciplinary creative — building his brand, negotiating partnerships, and scaling his career.",
    fullContent: `HUGO ZBOR is a multi-disciplinary creative whose work spans content, music, and visual art. As his talent manager, the role covers everything from content strategy and brand partnerships to contract negotiation and audience growth.

In the creator economy, talent management is part agent, part strategist, part therapist. It requires understanding platform algorithms, brand deal structures, audience psychology, and the human side of creative work.

The technical skills from software engineering directly translate — building tools for analytics, automating outreach, and creating the digital infrastructure that lets talent focus on what they do best.`,
    status: "ongoing",
    thumbnail: "/images/ventures/hugozbor-logo.png",
    heroVideo: "/images/ventures/hugozbor-banner.mp4",
    brandLogos: [
      { src: "/images/brands/Converse-Logo.png", name: "CONVERSE" },
      { src: "/images/brands/BENECULTURE.webp", name: "BENECULTURE" },
      { src: "/images/brands/CONROY-US.webp", name: "CONROY US" },
      { src: "/images/brands/BLACK-_CLEAR_.png", name: "99CLOVER" },
      { src: "/images/brands/LOVENANGELS.png", name: "LOVENANGELS" },
      { src: "/images/brands/ULTRALIGHT-TEXT-LOGO.png", name: "ULTRALIGHT LONDON" },
      { src: "/images/brands/aformunseen.png", name: "A FORM UNSEEN" },
      { src: "/images/brands/omnee.png", name: "OMNEE WORLD" },
      { src: "/images/brands/pcmkr.png", name: "PEACEMAKER" },
    ],
    links: [
      { label: "Website", url: "https://hugozbor.com" },
      { label: "Instagram", url: "https://instagram.com/hugozbor" },
      { label: "Manager", url: "https://instagram.com/sheivault" },
    ],
    metrics: [
      { label: "Focus", value: "Multi-Disciplinary Creative" },
      { label: "Scope", value: "Brand Deals & Growth" },
      { label: "Collaborations", value: "45+" },
      { label: "Status", value: "Active" },
    ],
    year: 2025,
  },
];

export function getVentureBySlug(slug: string): Venture | undefined {
  return ventures.find((v) => v.slug === slug);
}
