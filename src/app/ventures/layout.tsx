import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ventures",
  description: "Mana and The Anam Hotels in Wellawatte and Maradana, Colombo — what Anam builds outside of engineering.",
  alternates: { canonical: "/ventures" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
