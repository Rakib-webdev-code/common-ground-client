import FeaturesSection from "@/components/home/features-section";
import GallerySection from "@/components/home/gallery-section";
import HeroSection from "@/components/home/hero-section";
import NewsletterSection from "@/components/home/newsletter-section";
import UpcomingEventsSection from "@/components/home/upcoming-events-section";

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