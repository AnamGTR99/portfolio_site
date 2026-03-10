import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import AuroraBackground from "@/components/background/AuroraBackground";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Anam — Software Engineer, Hotelier, Talent Manager",
    template: "%s | Anam",
  },
  description:
    "Portfolio of Anam — software engineering, hospitality, and talent management.",
  openGraph: {
    title: "Anam — Software Engineer, Hotelier, Talent Manager",
    description:
      "Portfolio of Anam — software engineering, hospitality, and talent management.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} antialiased`}>
        <AuroraBackground>{children}</AuroraBackground>
      </body>
    </html>
  );
}
