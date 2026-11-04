
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Community Dashboard | Common Ground",
  description:
    "Explore community impact, event activity, unique participants, and your contributions to Common Ground.",
  alternates: {
    canonical: "/dashboard",
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Community Dashboard | Common Ground",
    description:
      "See community event activity and track your contributions on Common Ground.",
    url: "https://common-ground-client.vercel.app/dashboard",
    siteName: "Common Ground",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Community Dashboard | Common Ground",
    description:
      "See community activity and your contributions on Common Ground.",
  },
};

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
