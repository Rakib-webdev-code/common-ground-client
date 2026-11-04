import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Sign In | Common Ground",
  description:
    "Sign in to your Common Ground account to discover community events, connect with people, and continue making a positive impact.",
  alternates: {
    canonical: "/login",
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Sign In | Common Ground",
    description:
      "Sign in to Common Ground and stay connected with your community.",
    url: "https://common-ground-client.vercel.app/login",
    siteName: "Common Ground",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sign In | Common Ground",
    description:
      "Sign in to Common Ground and continue making a difference.",
  },
};

export default function LoginLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}