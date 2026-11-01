
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CalendarPlus,
  Handshake,
  Users,
  TrendingUp,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { getDashboardStats } from "@/lib/api";
import type { DashboardStats } from "@/lib/api";

function DashboardSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-border bg-card p-6"
        >
          <div className="mb-5 flex items-center justify-between">
            <div className="size-11 animate-pulse rounded-xl bg-muted" />
            <div className="h-4 w-16 animate-pulse rounded bg-muted" />
          </div>
          <div className="mb-2 h-9 w-20 animate-pulse rounded bg-muted" />
          <div className="h-4 w-32 animate-pulse rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}

const statCards = [
  {
    key: "totalEvents",
    label: "Total Events",
    description: "Events created in the community",
    icon: CalendarDays,
  },
  {
    key: "upcomingEvents",
    label: "Upcoming Events",
    description: "Events waiting to happen",
    icon: CalendarPlus,
  },
  {
    key: "totalParticipants",
    label: "Unique Participants",
    description: "People who joined events",
    icon: Users,
  },
  {
    key: "myCreatedEvents",
    label: "My Created Events",
    description: "Events you organized",
    icon: TrendingUp,
  },
  {
    key: "myJoinedEvents",
    label: "My Joined Events",
    description: "Events you joined",
    icon: Handshake,
  },
] as const;

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (isPending) return;

    if (!session) {
      router.replace("/login?callbackURL=/dashboard");
      return;
    }

    let cancelled = false;

    const fetchDashboardStats = async () => {
      try {
        const tokenResponse = await authClient.token();

        if (tokenResponse.error || !tokenResponse.data?.token) {
          throw new Error("Unable to get your authentication token.");
        }

        const dashboardStats = await getDashboardStats(
          tokenResponse.data.token,
        );

        if (!cancelled) {
          setStats(dashboardStats);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load dashboard statistics.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void fetchDashboardStats();

    return () => {
      cancelled = true;
    };
  }, [isPending, session, router, retryCount]);

  if (isPending || !session) {
    return (
      <main className="mx-auto min-h-screen max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 space-y-3">
          <div className="h-4 w-32 animate-pulse rounded bg-muted" />
          <div className="h-9 w-64 animate-pulse rounded bg-muted" />
          <div className="h-4 w-80 max-w-full animate-pulse rounded bg-muted" />
        </div>
        <DashboardSkeleton />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-10 space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Community Impact
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Your Dashboard
          </h1>

          <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            See how our community is growing through shared events,
            participation, and meaningful connections.
          </p>
        </header>

        {isLoading ? (
          <DashboardSkeleton />
        ) : error ? (
          <section className="rounded-2xl border border-border bg-card px-6 py-16 text-center">
            <h2 className="mb-2 text-xl font-semibold text-foreground">
              Unable to Load Dashboard
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
        ) : stats ? (
          <>
            <section aria-label="Community statistics">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-foreground">
                  Community Overview
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  A snapshot of community activity and your contribution.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {statCards.map((card) => {
                  const Icon = card.icon;

                  return (
                    <article
                      key={card.key}
                      className="rounded-2xl border border-border bg-card p-6 transition-transform duration-200 hover:-translate-y-1"
                    >
                      <div className="mb-5 flex items-center justify-between">
                        <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <Icon aria-hidden="true" className="size-5" />
                        </div>

                        <span className="text-xs font-medium text-muted-foreground">
                          Live statistics
                        </span>
                      </div>

                      <p className="text-3xl font-bold tracking-tight text-foreground">
                        {stats[card.key].toLocaleString()}
                      </p>

                      <h3 className="mt-2 font-semibold text-foreground">
                        {card.label}
                      </h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {card.description}
                      </p>
                    </article>
                  );
                })}
              </div>
            </section>

            <section className="mt-10 rounded-2xl border border-border bg-card p-6 sm:p-8">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                  <p className="mb-2 text-sm font-semibold text-primary">
                    Make an Impact
                  </p>

                  <h2 className="text-2xl font-bold tracking-tight text-foreground">
                    Every small action matters.
                  </h2>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                    Create an event or join an existing one. Your participation
                    helps build a stronger community.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:min-w-44">
                  <Link
                    href="/events/create"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Create Event
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>

                  <Link
                    href="/events"
                    className="inline-flex h-10 items-center justify-center rounded-full border border-border px-5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                  >
                    Explore Events
                  </Link>
                </div>
              </div>
            </section>
          </>
        ) : null}
      </div>
    </main>
  );
}
