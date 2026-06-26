import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ARMORY | Next-Gen AI Data Automation Platform",
  description: "Deploy custom enterprise agents and automate complex workflows. Matrix-driven pricing and scalable intelligence for growing businesses.",
  keywords: "AI automation, neural engine, enterprise agents, data automation, scalable workflows",
  authors: [{ name: "Hackathon Competitor" }],
  openGraph: {
    title: "ARMORY | AI Data Automation",
    description: "Scale your intelligence with our advanced neural engines today.",
    type: "website",
    url: "https://armory-ai.app",
    siteName: "ARMORY",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ARMORY Platform Dashboard Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ARMORY | AI Data Automation",
    description: "Scale your intelligence with our advanced neural engines today.",
    images: ["/assets/og-image.jpg"],
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
