
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import type { Event } from "@/lib/types/event";
import { formatEventDate, formatEventTime } from "@/lib/format";

interface EventCardProps {
  event: Event;
  showActions?: boolean;
  onDelete?: (event: Event) => void;
  isDeleting?: boolean;
}

export default function EventCard({
  event,
  showActions = false,
  onDelete,
  isDeleting = false,
}: EventCardProps) {
  const [imageError, setImageError] = useState(false);
  const hasThumbnail =
    typeof event.thumbnail === "string" &&
    event.thumbnail.trim().length > 0 &&
    !imageError;

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:-translate-y-1 hover:border-primary/40">
      <Link
        href={`/events/${event._id}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={`View event: ${event.title}`}
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          {hasThumbnail ? (
            <Image
              src={event.thumbnail}
              alt={event.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div
              className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary/10 via-muted to-primary/5 text-muted-foreground"
              role="img"
              aria-label="Event image unavailable"
            >
              <span className="text-3xl" aria-hidden="true">
                Image
              </span>
              <span className="text-sm font-medium">
                Image unavailable
              </span>
            </div>
          )}
        </div>

        <div className="space-y-4 p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {event.eventType}
            </span>

            <span className="text-xs text-muted-foreground">
              {formatEventDate(event.eventDate)}
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="line-clamp-1 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
              {event.title}
            </h3>

            <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
              {event.description}
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-border pt-4 text-sm">
            <span className="flex min-w-0 items-center gap-2 text-muted-foreground">
              <span aria-hidden="true">📍</span>
              <span className="truncate">{event.location}</span>
            </span>

            <span className="shrink-0 font-medium text-foreground">
              {formatEventTime(event.eventDate)}
            </span>
          </div>

          {!showActions && (
            <div className="flex items-center justify-between text-sm font-semibold text-primary">
              <span>View Event</span>
              <span aria-hidden="true">→</span>
            </div>
          )}
        </div>
      </Link>

      {showActions && (
        <div className="flex gap-3 border-t border-border px-5 py-4">
          <Link
            href={`/events/manage/edit/${event._id}`}
            className="flex-1 rounded-full border border-border px-4 py-2 text-center text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Edit
          </Link>

          <button
            type="button"
            disabled={isDeleting}
            onClick={() => onDelete?.(event)}
            className="flex-1 rounded-full border border-destructive/40 px-4 py-2 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      )}
    </article>
  );
}
