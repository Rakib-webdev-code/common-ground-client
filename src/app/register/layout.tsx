import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Create Account | Common Ground",
  description:
    "Join Common Ground to discover local community events, connect with people, participate in meaningful activities, and make a positive impact.",
  alternates: {
    canonical: "/register",
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Create Account | Common Ground",
    description:
      "Join a community that cares. Discover local initiatives and help build stronger communities with Common Ground.",
    url: "https://common-ground-client.vercel.app/register",
    siteName: "Common Ground",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Create Account | Common Ground",
    description:
      "Join Common Ground and start making a difference in your community.",
  },
};

export default function RegisterLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}