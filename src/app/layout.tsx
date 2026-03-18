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
    default: "Anam — AI Engineer at InLogic",
    template: "%s | Anam",
  },
  description:
    "Portfolio of Sheik Anam Milfer — AI Engineer at InLogic. Projects, ventures, and everything in between.",
  openGraph: {
    title: "Anam — AI Engineer at InLogic",
    description:
      "Portfolio of Sheik Anam Milfer — AI Engineer at InLogic. Projects, ventures, and everything in between.",
    type: "website",
    url: "https://anam.info",
    images: [
      {
        url: "https://anam.info/og-image.png",
        width: 1200,
        height: 630,
        alt: "Anam — AI Engineer at InLogic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anam — AI Engineer at InLogic",
    description:
      "Portfolio of Sheik Anam Milfer — AI Engineer at InLogic.",
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
