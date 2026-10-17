import type { Metadata } from "next";
import { ventures, getVentureBySlug } from "@/data/ventures";

// Only known slugs exist — anything else is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return ventures.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const venture = getVentureBySlug((await params).slug);
  if (!venture) return {};
  return {
    title: venture.title,
    description: venture.description,
    alternates: { canonical: `/ventures/${venture.slug}` },
    openGraph: {
      title: venture.title,
      description: venture.description,
      images: [venture.heroImage ?? "/og-image.png"],
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
