import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home — Your Private Feed",
  description:
    "Welcome to socPriv — the most private social network. Explore your feed, connect with friends, and share moments knowing your data is always yours.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Home — Your Private Feed | socPriv",
    description:
      "Welcome to socPriv — the most private social network. Your data, your rules.",
    url: "https://socpriv.com",
  },
  twitter: {
    title: "Home — Your Private Feed | socPriv",
    description:
      "Welcome to socPriv — the most private social network. Your data, your rules.",
  },
};

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        Homepage
      </main>
    </div>
  );
}
