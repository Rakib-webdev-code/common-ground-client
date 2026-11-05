
import Link from "next/link";
import { ArrowRight, Mail, Send } from "lucide-react";

export default function NewsletterSection() {
  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">

        {/* Community Updates */}
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

        {/* Newsletter Subscribe */}
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-10 sm:px-12 sm:py-14">
          <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">

            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                <Send size={13} aria-hidden="true" />
                Newsletter
              </span>

              <h2 className="mt-5 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Stay in the Loop.
                <span className="block text-primary">
                  Stay Inspired.
                </span>
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
                Get updates about upcoming events, inspiring community
                stories, and opportunities to make a positive impact.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background p-5 sm:p-7">
              <h3 className="text-lg font-semibold text-foreground">
                Join Our Community
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Subscribe to receive community updates in your inbox.
              </p>

              <form className="mt-6 space-y-3">
                <label
                  htmlFor="newsletter-email"
                  className="block text-sm font-medium text-foreground"
                >
                  Email Address
                </label>

                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                />

                <button
                  type="button"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Subscribe
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </form>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                Stay connected. No backend subscription is configured.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
