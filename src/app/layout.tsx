import type { Metadata } from "next";
import { Geist, Geist_Mono, Chakra_Petch } from "next/font/google";
import "./globals.css";
import CyberBackgroundLoader from "@/components/three/CyberBackgroundLoader";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import IntroProvider from "@/components/intro/IntroProvider";
import SmoothScroll from "@/components/motion/SmoothScroll";
import CustomCursor from "@/components/motion/CustomCursor";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const chakra = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Anam — AI Engineer, Talent Manager & Hotelier",
    template: "%s | Anam",
  },
  description:
    "Portfolio of Sheik Anam Milfer — AI Engineer, Talent Manager and Hotelier.",
  openGraph: {
    title: "Anam — AI Engineer, Talent Manager & Hotelier",
    description:
      "Portfolio of Sheik Anam Milfer — AI Engineer, Talent Manager and Hotelier.",
    type: "website",
    url: "https://anam.info",
    images: [
      {
        url: "https://anam.info/og-image.png",
        width: 1200,
        height: 630,
        alt: "Anam — AI Engineer at Eleno",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anam — AI Engineer, Talent Manager & Hotelier",
    description:
      "Portfolio of Sheik Anam Milfer — AI Engineer, Talent Manager and Hotelier.",
    images: ["https://anam.info/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${geistMono.variable} ${chakra.variable} ${geist.className} antialiased`}
      >
        <SmoothScroll />
        <CustomCursor />
        <CyberBackgroundLoader />
        <IntroProvider>
          <div style={{ position: "relative", zIndex: 10 }}>
            <Navigation />
            {children}
            <Footer />
          </div>
        </IntroProvider>
        <div className="grain-overlay" aria-hidden />
        <div className="vignette-overlay" aria-hidden />
        <div className="scanlines-overlay" aria-hidden />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
