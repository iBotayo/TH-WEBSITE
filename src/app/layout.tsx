import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { organizationJsonLd } from "@/lib/seo";
import "@/styles/globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thinkinghead.ng"),
  title: {
    default: "ThinkingHead — AI-Powered Research, Strategy & Engineering | Nigeria",
    template: "%s | ThinkingHead",
  },
  description:
    "We turn complex challenges into working systems. AI-powered research, strategy and digital transformation from Kaduna, Nigeria.",
  authors: [{ name: "ThinkingHead Nigeria Limited" }],
  creator: "ThinkingHead Nigeria Limited",
  publisher: "ThinkingHead Nigeria Limited",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://thinkinghead.ng",
    siteName: "ThinkingHead Nigeria Limited",
    title: "ThinkingHead — AI-Powered Research, Strategy & Engineering | Nigeria",
    description:
      "We turn complex challenges into working systems. AI-powered research, strategy and digital transformation from Kaduna, Nigeria.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#2E6B5C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

