
"use client";

import { useEffect, useMemo, useState } from "react";
import EventCard from "@/components/events/event-card";
import { getEvents } from "@/lib/api";
import type { Event } from "@/lib/types/event";

type SortOption = "earliest" | "latest";

const categories = [
  "All Categories",
  "Community Service",
  "Environment",
  "Education",
  "Charity",
  "Health",
  "Sports",
  "Workshop",
  "Other",
];

function EventsSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse overflow-hidden rounded-2xl border border-border bg-card"
        >
          <div className="aspect-[16/9] bg-muted" />
          <div className="space-y-4 p-5">
            <div className="h-4 w-24 rounded bg-muted" />
            <div className="h-6 w-3/4 rounded bg-muted" />
            <div className="h-4 w-full rounded bg-muted" />
            <div className="h-4 w-2/3 rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [sort, setSort] = useState<SortOption>("earliest");

  useEffect(() => {
    let isMounted = true;

    async function loadEvents() {
      try {
        setIsLoading(true);
        setError("");

        const data = await getEvents();
        if (isMounted) {
          setEvents(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load events. Please try again.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredEvents = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return events
      .filter((event) => {
        const matchesSearch =
          event.title.toLowerCase().includes(normalizedSearch);

        const matchesCategory =
          category === "All Categories" ||
          event.eventType === category;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        const dateA = new Date(a.eventDate).getTime();
        const dateB = new Date(b.eventDate).getTime();

        return sort === "earliest"
          ? dateA - dateB
          : dateB - dateA;
      });
  }, [events, search, category, sort]);

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 space-y-3 text-center">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Discover & Participate
          </span>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Upcoming Events
          </h1>

          <p className="mx-auto max-w-2xl text-muted-foreground">
            Discover meaningful events, connect with your community,
            and be part of something positive.
          </p>
        </div>

        <div className="mb-8 grid gap-4 rounded-2xl border border-border bg-card p-4 sm:grid-cols-2 lg:grid-cols-[1fr_220px_180px]">
          <div>
            <label
              htmlFor="event-search"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Search Events
            </label>

            <input
              id="event-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by event title..."
              className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
            />
          </div>

          <div>
            <label
              htmlFor="event-category"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Category
            </label>

            <select
              id="event-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="event-sort"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Sort By
            </label>

            <select
              id="event-sort"
              value={sort}
              onChange={(event) =>
                setSort(event.target.value as SortOption)
              }
              className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
            >
              <option value="earliest">Earliest First</option>
              <option value="latest">Latest First</option>
            </select>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-foreground">
            Explore Events
          </h2>

          {!isLoading && !error && (
            <p className="text-sm text-muted-foreground">
              {filteredEvents.length}{" "}
              {filteredEvents.length === 1 ? "event" : "events"} found
            </p>
          )}
        </div>

        {isLoading ? (
          <EventsSkeleton />
        ) : error ? (
          <div
            role="alert"
            className="rounded-2xl border border-destructive/30 bg-destructive/5 px-6 py-12 text-center"
          >
            <h3 className="text-lg font-semibold text-foreground">
              Unable to Load Events
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {error}
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Try Again
            </button>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card px-6 py-16 text-center">
            <h3 className="text-lg font-semibold text-foreground">
              No Events Found
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {events.length === 0
                ? "There are no upcoming events right now. Please check back soon."
                : "Try changing your search or category filter."}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
