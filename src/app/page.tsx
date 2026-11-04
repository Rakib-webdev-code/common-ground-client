
import type { Metadata } from "next";

import FeaturesSection from "@/components/home/features-section";
import GallerySection from "@/components/home/gallery-section";
import HeroSection from "@/components/home/hero-section";
import NewsletterSection from "@/components/home/newsletter-section";
import UpcomingEventsSection from "@/components/home/upcoming-events-section";

export const metadata: Metadata = {
  title: "Common Ground | Build Stronger Communities",
  description:
    "Discover local community events, connect with people, volunteer, and make a positive impact. Create and join events with Common Ground.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Common Ground | Build Stronger Communities",
    description:
      "Small actions. Stronger communities. Discover and join meaningful community events with Common Ground.",
    url: "https://common-ground-client.vercel.app",
    siteName: "Common Ground",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Common Ground | Build Stronger Communities",
    description:
      "Discover local community events and make a positive impact with Common Ground.",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <UpcomingEventsSection />
      <GallerySection />
      <NewsletterSection />
    </>
  );
}
