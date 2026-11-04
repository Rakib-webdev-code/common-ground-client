
"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Common Ground application error:", error);
  }, [error]);

  return (
    <section className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-20 sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-destructive/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-2xl text-center">
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/10 text-destructive">
          <AlertTriangle
            size={32}
            strokeWidth={1.7}
            aria-hidden="true"
          />
        </div>

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-destructive">
          Something went wrong
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          We hit an unexpected problem.
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
          Something didn&apos;t work as expected. You can try loading this
          page again or return to the Common Ground homepage.
        </p>

        {error.digest && (
          <p className="mt-4 text-xs text-muted-foreground">
            Error reference: {error.digest}
          </p>
        )}

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <RefreshCw size={16} aria-hidden="true" />
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Home
          </Link>
        </div>

        <p className="mt-12 text-xs text-muted-foreground">
          Common Ground · Small actions. Stronger communities.
        </p>
      </div>
    </section>
  );
}
