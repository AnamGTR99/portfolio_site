import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ventures",
  description: "Mana and The Anam Hotel Colombo — what Anam builds outside of engineering.",
  alternates: { canonical: "/ventures" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
