import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Upcoming Events | Common Ground",
  description:
    "Discover upcoming community events, search by title, explore categories, and find meaningful ways to connect and make a positive impact.",
  alternates: {
    canonical: "/events",
  },
  openGraph: {
    title: "Upcoming Events | Common Ground",
    description:
      "Explore upcoming community events and find meaningful ways to participate, connect, and make a difference.",
    url: "https://common-ground-client.vercel.app/events",
    siteName: "Common Ground",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Upcoming Events | Common Ground",
    description:
      "Explore upcoming community events and discover ways to make a positive impact.",
  },
};

export default function EventsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
