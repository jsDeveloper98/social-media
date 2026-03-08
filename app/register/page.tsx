import type { Metadata } from "next";
import { RegisterForm } from "@/components/register-form";

export const metadata: Metadata = {
  title: "Register",
  description:
    "Join socPriv — the world's most private social network. Create your free account with zero tracking, full encryption, and complete control over your data.",
  alternates: { canonical: "/register" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Register | socPriv",
    description:
      "Create your free account on the world's most private social network. Zero tracking. Full privacy.",
    url: "https://socpriv.com/register",
  },
  twitter: {
    title: "Register | socPriv",
    description:
      "Create your free account on the world's most private social network. Zero tracking. Full privacy.",
  },
};

export default function RegisterPage() {
  return <RegisterForm />;
}
