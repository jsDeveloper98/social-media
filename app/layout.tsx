import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeToggle } from "@/components/theme-toggle";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // ── Site identity ──────────────────────────────────────────────
  title: {
    default: "socPriv — The Most Private Social Network",
    template: "%s | socPriv",
  },
  description:
    "socPriv is the world's most private social media platform. Share moments, connect with friends, and join communities — with full control over your data and zero tracking.",
  keywords: [
    "socPriv",
    "private social media",
    "secure social network",
    "privacy-first social app",
    "no tracking social media",
    "encrypted social network",
    "private messaging",
    "social media privacy",
    "connect with friends privately",
    "secure community",
    "data privacy",
  ],
  authors: [{ name: "socPriv Team" }],
  creator: "socPriv",

  // ── Canonical & robots ─────────────────────────────────────────
  metadataBase: new URL("https://socpriv.com"),
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },

  // ── Open Graph ─────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://socpriv.com",
    siteName: "socPriv",
    title: "socPriv — The Most Private Social Network",
    description:
      "socPriv is the world's most private social media platform. Share moments and connect with friends — with full control over your data and zero tracking.",
    // images: [
    //   {
    //     url: "/og-image.png",
    //     width: 1200,
    //     height: 630,
    //     alt: "socPriv — Private Social Network",
    //   },
    // ],
  },

  // ── Twitter card ───────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: "@socpriv",
    creator: "@socpriv",
    title: "socPriv — The Most Private Social Network",
    description:
      "socPriv is the world's most private social media platform. Zero tracking. Full privacy. Connect freely.",
    // images: ["/og-image.png"],
  },

  // ── Icons ──────────────────────────────────────────────────────
  icons: {
    icon: [{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }],
    // apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100`}
      >
        <Providers>
          <ThemeToggle />
          {children}
        </Providers>
      </body>
    </html>
  );
}
