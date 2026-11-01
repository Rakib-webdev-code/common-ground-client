
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarCheck, Compass } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { getJoinedEvents } from "@/lib/api";
import type { Event } from "@/lib/types/event";
import EventCard from "@/components/events/event-card";

function JoinedEventsSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-border bg-card"
        >
          <div className="aspect-[16/9] animate-pulse bg-muted" />

          <div className="space-y-4 p-5">
            <div className="h-4 w-24 animate-pulse rounded bg-muted" />
            <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-3 w-full animate-pulse rounded bg-muted" />
            <div className="h-9 w-full animate-pulse rounded-lg bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function JoinedEventsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (isPending) return;

    if (!session) {
      router.replace("/login?callbackURL=/events/joined");
      return;
    }

    let cancelled = false;

    const fetchJoinedEvents = async () => {
      try {
        const tokenResponse = await authClient.token();

        if (tokenResponse.error || !tokenResponse.data?.token) {
          throw new Error("Unable to get your authentication token.");
        }

        const joinedEvents = await getJoinedEvents(
          tokenResponse.data.token,
        );

        if (!cancelled) {
          setEvents(joinedEvents);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load your joined events. Please try again.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void fetchJoinedEvents();

    return () => {
      cancelled = true;
    };
  }, [isPending, session, router, retryCount]);

  if (isPending || !session) {
    return (
      <main className="mx-auto min-h-screen max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 space-y-3">
          <div className="h-9 w-56 animate-pulse rounded bg-muted" />
          <div className="h-4 w-80 max-w-full animate-pulse rounded bg-muted" />
        </div>

        <JoinedEventsSkeleton />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Your Community Activities
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Joined Events
          </h1>

          <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            Explore the events you have joined and stay connected with
            your community activities.
          </p>
        </div>

        {isLoading ? (
          <JoinedEventsSkeleton />
        ) : error ? (
          <section className="rounded-2xl border border-border bg-card px-6 py-16 text-center">
            <h2 className="mb-2 text-xl font-semibold text-foreground">
              Unable to Load Joined Events
            </h2>

            <p className="mx-auto mb-6 max-w-md text-sm text-muted-foreground">
              {error}
            </p>

            <button
              type="button"
              onClick={() => {
                setError(null);
                setIsLoading(true);
                setRetryCount((count) => count + 1);
              }}
              className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Try Again
            </button>
          </section>
        ) : events.length === 0 ? (
          <section className="rounded-2xl border border-border bg-card px-6 py-16 text-center sm:px-10">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CalendarCheck className="size-8" />
            </div>

            <h2 className="mb-2 text-xl font-semibold text-foreground">
              No Joined Events Yet
            </h2>

            <p className="mx-auto mb-6 max-w-md text-sm leading-6 text-muted-foreground">
              You haven&apos;t joined any events yet. Discover upcoming
              events and become part of your community.
            </p>

            <Link
              href="/events"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Compass className="size-4" />
              Explore Events
            </Link>
          </section>
        ) : (
          <section>
            <div className="mb-6 flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-foreground">
                Events You&apos;ve Joined
              </h2>

              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                {events.length} Events
              </span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
