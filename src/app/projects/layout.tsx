import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "AI-native apps, hackathon wins, client work and passion projects.",
  alternates: { canonical: "/projects" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
