import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Sheik Anam Milfer — AI engineer, hotelier and talent manager based in Melbourne.",
  alternates: { canonical: "/about" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
