import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/Components/Header";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Burak Emre Küpçüoğlu | Fullstack Developer Portfolio",
  description:
    "Welcome to the portfolio of Burak Emre Küpçüoğlu, a fullstack developer based in Ankara, Turkey. Explore projects, skills, and experience in web development, including work with Next.js, Supabase, Node.js, and more.",
  keywords: [
    "Burak Emre Küpçüoğlu",
    "Fullstack Developer",
    "Web Developer",
    "Next.js",
    "Supabase",
    "Node.js",
    "React",
    "Frontend Developer",
    "Backend Developer",
    "Portfolio",
  ],
  authors: [{ name: "Burak Emre Küpçüoğlu" }],
  creator: "Burak Emre Küpçüoğlu",
  metadataBase: new URL("https://emrekupcuoglu.com/"),
  openGraph: {
    title: "Burak Emre Küpçüoğlu | Fullstack Developer Portfolio",
    description:
      "Welcome to the portfolio of Burak Emre Küpçüoğlu, a fullstack developer based in Ankara, Turkey. Explore projects, skills, and experience in web development, including work with Next.js, Supabase, Node.js, and more.",
    url: "https://emrekupcuoglu.com/",
    images: [
      {
        url: "/open-graph.png",
        secureUrl: "/open-graph.png",
        width: 1200,
        height: 630,
        alt: "Preview image for Burak Emre Küpçüoğlu's Portfolio",
      },
    ],
    type: "website",
    siteName: "Burak Emre Küpçüoğlu Portfolio",
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
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen w-full flex-col antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
