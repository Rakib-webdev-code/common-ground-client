import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "My Profile | Common Ground",
  description:
    "View and manage your Common Ground account profile, personal information, and profile photo.",
  alternates: {
    canonical: "/profile",
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "My Profile | Common Ground",
    description:
      "Manage your personal information and account profile on Common Ground.",
    url: "https://common-ground-client.vercel.app/profile",
    siteName: "Common Ground",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "My Profile | Common Ground",
    description:
      "View and manage your Common Ground account profile.",
  },
};

export default function ProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}