
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  UserRound,
  Users,
} from "lucide-react";

import { getEventById } from "@/lib/api";
import { formatEventDate, formatEventTime } from "@/lib/format";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface EventDetailsPageProps {
  params: Promise<{ id: string }>;
}

function EventDetailsLoading() {
  return (
    <main className="container mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center px-4">
      <div className="w-full max-w-md space-y-4">
        <div className="h-5 w-40 animate-pulse rounded bg-muted" />
        <div className="aspect-[16/9] animate-pulse rounded-2xl bg-muted" />
        <div className="h-8 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-4 w-full animate-pulse rounded bg-muted" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />

        <p className="text-center text-sm text-muted-foreground">
          Loading event details...
        </p>
      </div>
    </main>
  );
}

async function EventDetailsContent({
  params,
}: EventDetailsPageProps) {
  const { id } = await params;

  let event;

  try {
    event = await getEventById(id);
  } catch (error) {
    if (error instanceof Error && error.message.includes("(404)")) {
      notFound();
    }

    return (
      <main className="container mx-auto max-w-5xl px-4 py-16">
        <Card>
          <CardContent className="py-10 text-center">
            <h1 className="text-xl font-semibold">
              Unable to Load Event
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              {error instanceof Error
                ? error.message
                : "Something went wrong. Please try again."}
            </p>

            <Link
              href="/events"
              className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <ArrowLeft className="mr-2 size-4" />
              Back to Events
            </Link>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <Link
        href="/events"
        className="mb-6 inline-flex h-10 items-center justify-center rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        <ArrowLeft className="mr-2 size-4" />
        Back to Events
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border bg-muted">
            <Image
              src={event.thumbnail}
              alt={event.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover"
            />
          </div>

          <div className="mt-7">
            <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {event.eventType}
            </span>

            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {event.title}
            </h1>

            <p className="mt-6 whitespace-pre-line text-sm leading-7 text-muted-foreground sm:text-base">
              {event.description}
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Card>
              <CardContent className="flex items-center gap-3 p-4">
                <div className="rounded-xl bg-primary/10 p-3 text-primary">
                  <CalendarDays className="size-5" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Event Date
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {formatEventDate(event.eventDate)}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-3 p-4">
                <div className="rounded-xl bg-primary/10 p-3 text-primary">
                  <Clock3 className="size-5" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Event Time
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {formatEventTime(event.eventDate)}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="sm:col-span-2">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="rounded-xl bg-primary/10 p-3 text-primary">
                  <MapPin className="size-5" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Event Location
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {event.location}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <aside>
          <Card className="lg:sticky lg:top-24">
            <CardHeader>
              <CardTitle>Join This Event</CardTitle>
              <CardDescription>
                Be part of the community and make a difference together.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-3 text-primary">
                  <UserRound className="size-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">
                    Organized by
                  </p>
                  <p className="truncate text-sm font-semibold">
                    {event.creatorName || "Community Organizer"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-3 text-primary">
                  <Users className="size-5" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Event Type
                  </p>
                  <p className="text-sm font-semibold">
                    Community Event
                  </p>
                </div>
              </div>

              <div className="border-t pt-5">
                <Button className="w-full" disabled>
                  Join Event
                </Button>

                <p className="mt-2 text-center text-xs text-muted-foreground">
                  Event registration will be available soon.
                </p>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </main>
  );
}

export default function EventDetailsPage({
  params,
}: EventDetailsPageProps) {
  return (
    <Suspense fallback={<EventDetailsLoading />}>
      <EventDetailsContent params={params} />
    </Suspense>
  );
}
