import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import AuroraBackground from "@/components/background/AuroraBackground";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import IntroProvider from "@/components/intro/IntroProvider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
      <body className={`${geist.variable} ${geist.className} antialiased`}>
        <IntroProvider>
          <AuroraBackground>
            <Navigation />
            {children}
            <Footer />
          </AuroraBackground>
        </IntroProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
