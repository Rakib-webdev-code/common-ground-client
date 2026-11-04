
import Link from "next/link";
import { ArrowLeft, ArrowRight, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-20 sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-2xl text-center">
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-lg shadow-primary/5">
          <Compass size={32} strokeWidth={1.6} aria-hidden="true" />
        </div>

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
          Page not found
        </p>

        <h1 className="font-heading text-7xl font-bold tracking-tight text-foreground sm:text-8xl">
          404
        </h1>

        <h2 className="mt-5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Looks like you&apos;re off the map.
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
          The page you&apos;re looking for may have been moved, removed, or
          doesn&apos;t exist. Let&apos;s help you find your way back to the
          community.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Home
          </Link>

          <Link
            href="/events"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Explore Events
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <p className="mt-12 text-xs text-muted-foreground">
          Common Ground · Small actions. Stronger communities.
        </p>
      </div>
    </section>
  );
}
