import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

import { getRecentEvents } from "@/lib/api";
import EventCard from "@/components/events/event-card";

async function loadEvents() {
  try {
    const events = await getRecentEvents();
    return { events, hasError: false };
  } catch {
    return { events: [], hasError: true };
  }
}

function EventsLoading() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse overflow-hidden rounded-2xl border border-border bg-card"
        >
          <div className="aspect-[4/3] bg-muted" />
          <div className="space-y-3 p-5">
            <div className="h-5 w-3/4 rounded bg-muted" />
            <div className="h-4 w-full rounded bg-muted" />
            <div className="h-4 w-1/2 rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}

async function EventsContent() {
  const { events, hasError } = await loadEvents();

  if (hasError) {
    return (
      <div className="rounded-2xl border border-border bg-card px-6 py-12 text-center">
        <h3 className="text-lg font-semibold text-foreground">
          Unable to Load Events
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Please try again later.
        </p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
        <CalendarDays
          size={28}
          className="mx-auto text-primary"
          aria-hidden="true"
        />
        <h3 className="mt-5 text-lg font-semibold text-foreground">
          Events Are Coming Soon!
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-muted-foreground">
          We are getting ready to bring our community together. Check back
          soon to discover upcoming events.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
}

export default function UpcomingEventsSection() {
  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Make a Difference
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Upcoming Events
            </h2>
            <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">
              Discover meaningful events and find your next opportunity to
              make a positive impact.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            View All Events
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <Suspense fallback={<EventsLoading />}>
          <EventsContent />
        </Suspense>
      </div>
    </section>
  );
}