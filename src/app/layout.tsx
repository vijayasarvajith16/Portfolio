import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter, JetBrains_Mono, Montserrat, Space_Grotesk } from "next/font/google";
import { profile } from "@/data/portfolio";
import MotionProvider from "@/components/MotionProvider";
import SmoothScroll from "@/components/SmoothScroll";
import { siteUrl } from "@/lib/site";
import "./globals.css";

// Section titles
const display = Barlow_Condensed({ subsets: ["latin"], weight: "700", variable: "--font-barlow" });
// Hero name
const name = Montserrat({ subsets: ["latin"], weight: "800", variable: "--font-montserrat" });
// Project and card titles
const heading = Space_Grotesk({ subsets: ["latin"], weight: "600", variable: "--font-space-grotesk" });
// Body text (variable font, so medium and semibold UI labels render true weights)
const body = Inter({ subsets: ["latin"], variable: "--font-inter" });
// Contact details
const mono = JetBrains_Mono({ subsets: ["latin"], weight: "400", variable: "--font-jetbrains" });

// The share image comes from opengraph-image.tsx; metadataBase makes its URL absolute.
export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title: profile.name,
  description: profile.summary,
  authors: [{ name: profile.name, url: profile.github }],
  openGraph: {
    type: "website",
    title: profile.name,
    description: profile.summary,
    siteName: profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title: profile.name,
    description: profile.summary,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0d14",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${name.variable} ${heading.variable} ${body.variable} ${mono.variable} antialiased`}
    >
      <body className="min-h-svh">
        <SmoothScroll />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
