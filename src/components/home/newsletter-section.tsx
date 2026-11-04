
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export default function NewsletterSection() {
  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-primary/5 px-6 py-12 sm:px-12 sm:py-16">
          <div className="relative mx-auto max-w-2xl text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Mail size={26} aria-hidden="true" />
            </div>

            <span className="mt-6 block text-sm font-semibold uppercase tracking-wider text-primary">
              Stay Connected
            </span>

            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Good Things Start With{" "}
              <span className="text-primary">You.</span>
            </h2>

            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Discover upcoming community events, meaningful
              opportunities, and stories of positive change.
              Find your next opportunity to make a difference.
            </p>

            <Link
              href="/events"
              className="mx-auto mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Explore Upcoming Events
              <ArrowRight size={16} aria-hidden="true" />
            </Link>

            <p className="mt-5 text-xs text-muted-foreground">
              Small actions. Stronger communities. Be part of the change.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
