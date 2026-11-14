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
    title: "The Anam Hotel · Wellawatte",
    role: "Owner & Operator",
    description:
      "The first Anam hotel — seven rooms in Wellawatte, Colombo, blending modern hospitality with local culture and warmth.",
    fullContent: `The Anam Hotel · Wellawatte is the first Anam hotel: seven ensuite rooms in Wellawatte, Colombo, Sri Lanka. Born from a vision to create a space that feels both worldly and deeply local, the hotel combines contemporary design with Sri Lankan warmth.

From concept to operations, every detail has been hands-on — from interior design decisions and staff hiring to guest experience strategy and digital presence. The hotel represents the intersection of business acumen, design sensibility, and genuine care for the guest experience.

Running a hotel teaches you things software never will: reading people, managing chaos with grace, and understanding that the best systems are invisible to the people they serve.`,
    status: "ongoing",
    thumbnail: "/images/ventures/anam-hotel-logo.svg",
    heroImage: "/images/ventures/anam-hotel.jpg",
    links: [
      { label: "Website", url: "https://theanamhotel.com/" },
      { label: "Instagram", url: "https://instagram.com/theanamlk" },
    ],
    metrics: [
      { label: "Location", value: "Wellawatte, Colombo" },
      { label: "Rooms", value: "7 Ensuite" },
      { label: "Opened", value: "January 2024" },
      { label: "Status", value: "Operational" },
    ],
    year: 2024,
  },
  {
    slug: "anam-hotel-maradana",
    title: "The Anam Hotel · Maradana",
    role: "Owner & Operator",
    description:
      "The second Anam hotel — four rooms in Maradana, Colombo, with a courtyard and a rooftop terrace. Opened November 2026.",
    fullContent: `The Anam Hotel · Maradana is hotel number two: four ensuite rooms in Maradana, Colombo, with a courtyard and a rooftop terrace. It opened in November 2026.

The plan was to open the second hotel within three months of the first. It took three years. This one was built alongside everything else — the margins from running Mana went straight into it. Profit from a service business, re-invested into something longer term that doesn't depend on clients. Not another service to sell. An asset.

Two hotels under one name changes the job. The first taught me how to run a property; the second is about running the same standard twice — the same brand, the same house rules, the same care — from Melbourne, with systems doing the watching.`,
    status: "ongoing",
    thumbnail: "/images/ventures/anam-hotel-logo.svg",
    heroImage: "/images/ventures/anam-hotel-maradana.jpg",
    links: [
      { label: "Website", url: "https://theanamhotel.com/" },
      { label: "Instagram", url: "https://instagram.com/theanamlk" },
    ],
    metrics: [
      { label: "Location", value: "Maradana, Colombo" },
      { label: "Rooms", value: "4 Ensuite" },
      { label: "Opened", value: "November 2026" },
      { label: "Status", value: "Operational" },
    ],
    year: 2026,
  },
];

export function getVentureBySlug(slug: string): Venture | undefined {
  return ventures.find((v) => v.slug === slug);
}
