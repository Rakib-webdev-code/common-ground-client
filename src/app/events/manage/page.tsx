
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { getMyEvents } from "@/lib/api";
import type { Event } from "@/lib/types/event";
import EventCard from "@/components/events/event-card";

function EventsSkeleton() {
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

            <div className="space-y-2">
              <div className="h-3 w-full animate-pulse rounded bg-muted" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
            </div>

            <div className="flex gap-3 border-t border-border pt-4">
              <div className="h-9 flex-1 animate-pulse rounded-lg bg-muted" />
              <div className="h-9 flex-1 animate-pulse rounded-lg bg-muted" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ManageEventsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingEventId, setDeletingEventId] = useState<string | null>(null);

  useEffect(() => {
    if (isPending) return;

    if (!session) {
      router.replace("/login?callbackURL=/events/manage");
      return;
    }

    let cancelled = false;

    const fetchMyEvents = async () => {
      try {
        const tokenResponse = await authClient.token();

        if (tokenResponse.error || !tokenResponse.data?.token) {
          throw new Error("Unable to get your authentication token.");
        }

        const myEvents = await getMyEvents(tokenResponse.data.token);

        if (!cancelled) {
          setEvents(myEvents);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load your events. Please try again.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void fetchMyEvents();

    return () => {
      cancelled = true;
    };
  }, [isPending, session, router, retryCount]);

  const handleDelete = async () => {
    if (!selectedEvent || isDeleting) return;

    const eventId = selectedEvent._id;

    try {
      setIsDeleting(true);
      setDeletingEventId(eventId);

      const tokenResponse = await authClient.token();

      if (tokenResponse.error || !tokenResponse.data?.token) {
        throw new Error("Unable to get your authentication token.");
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        throw new Error("API URL is not configured.");
      }

      const response = await fetch(
        `${apiUrl}/api/events/${eventId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${tokenResponse.data.token}`,
          },
        },
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to delete this event.");
      }

      setEvents((currentEvents) =>
        currentEvents.filter((event) => event._id !== eventId),
      );

      setSelectedEvent(null);
      toast.success("Event deleted successfully.");
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to delete event. Please try again.",
      );
    } finally {
      setIsDeleting(false);
      setDeletingEventId(null);
    }
  };

  if (isPending || !session) {
    return (
      <main className="mx-auto min-h-screen max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 space-y-3">
          <div className="h-9 w-56 animate-pulse rounded bg-muted" />
          <div className="h-4 w-80 max-w-full animate-pulse rounded bg-muted" />
        </div>

        <EventsSkeleton />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Your Dashboard
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Manage Events
            </h1>

            <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Manage the events you have created. Edit details or remove events
              whenever you need.
            </p>
          </div>

          <Link
            href="/events/create"
            className="inline-flex h-10 w-full items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
          >
            + Create New Event
          </Link>
        </div>

        {isLoading ? (
          <EventsSkeleton />
        ) : error ? (
          <section className="rounded-2xl border border-border bg-card px-6 py-16 text-center">
            <h2 className="mb-2 text-xl font-semibold text-foreground">
              Unable to Load Your Events
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
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-3xl">
              📅
            </div>

            <h2 className="mb-2 text-xl font-semibold text-foreground">
              No Events Created Yet
            </h2>

            <p className="mx-auto mb-6 max-w-md text-sm leading-6 text-muted-foreground">
              You haven&apos;t created any events yet. Start building your
              community by creating your first event.
            </p>

            <Link
              href="/events/create"
              className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Create Your First Event
            </Link>
          </section>
        ) : (
          <section>
            <div className="mb-6 flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-foreground">
                Your Created Events
              </h2>

              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                {events.length} Events
              </span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  showActions
                  onDelete={setSelectedEvent}
                  isDeleting={deletingEventId === event._id}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !isDeleting) {
              setSelectedEvent(null);
            }
          }}
        >
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
            aria-describedby="delete-dialog-description"
            className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-2xl">
              🗑️
            </div>

            <h2
              id="delete-dialog-title"
              className="text-xl font-semibold text-foreground"
            >
              Delete Event?
            </h2>

            <p
              id="delete-dialog-description"
              className="mt-3 text-sm leading-6 text-muted-foreground"
            >
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                {selectedEvent.title}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setSelectedEvent(null)}
                className="h-10 rounded-full border border-border px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDelete}
                className="h-10 rounded-full bg-destructive px-5 text-sm font-medium text-white transition-colors hover:bg-destructive/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
