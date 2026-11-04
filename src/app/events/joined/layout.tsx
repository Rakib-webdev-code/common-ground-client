import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Joined Events | Common Ground",
  description:
    "View the community events you have joined, keep track of your activities, and stay connected with your community.",
  alternates: {
    canonical: "/events/joined",
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Joined Events | Common Ground",
    description:
      "Explore the events you have joined and stay connected with your community.",
    url: "https://common-ground-client.vercel.app/events/joined",
    siteName: "Common Ground",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Joined Events | Common Ground",
    description:
      "Keep track of the community events you have joined.",
  },
};

export default function JoinedEventsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}