import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Edit Event | Common Ground",
  description:
    "Update your community event details, including its title, description, category, location, date, and cover image.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Edit Event | Common Ground",
    description:
      "Manage and update your community event information on Common Ground.",
    siteName: "Common Ground",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Edit Event | Common Ground",
    description:
      "Update your community event information with Common Ground.",
  },
};

export default function EditEventLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}