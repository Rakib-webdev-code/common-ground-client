import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Manage Events | Common Ground",
  description:
    "Manage the community events you have created. View your events, update event details, and manage your community activities.",
  alternates: {
    canonical: "/events/manage",
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Manage Events | Common Ground",
    description:
      "View and manage the community events you have created with Common Ground.",
    url: "https://common-ground-client.vercel.app/events/manage",
    siteName: "Common Ground",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Manage Events | Common Ground",
    description:
      "Manage your created community events with Common Ground.",
  },
};

export default function ManageEventsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}