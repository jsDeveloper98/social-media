import type { Metadata } from "next";
import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to your socPriv account — the most private social network. Your data is encrypted and never shared.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Login | socPriv",
    description: "Sign in securely to your private socPriv account.",
    url: "https://socpriv.com/login",
  },
  twitter: {
    title: "Login | socPriv",
    description: "Sign in securely to your private socPriv account.",
  },
};

export default function LoginPage() {
  return <LoginForm />;
}
