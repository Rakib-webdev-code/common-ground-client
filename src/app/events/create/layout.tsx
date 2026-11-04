
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Create an Event | Common Ground",
  description:
    "Create a community event on Common Ground, bring people together, and make a positive impact through meaningful activities.",
  alternates: {
    canonical: "/events/create",
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Create an Event | Common Ground",
    description:
      "Organize a community event, connect with people, and help build stronger communities.",
    url: "https://common-ground-client.vercel.app/events/create",
    siteName: "Common Ground",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Create an Event | Common Ground",
    description:
      "Create a community event and bring people together with Common Ground.",
  },
};

export default function CreateEventLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
