
"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  CalendarDays,
  ImagePlus,
  MapPin,
  Save,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { eventSchema, type EventFormValues } from "@/lib/validations/event";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  "Community Service",
  "Environment",
  "Education",
  "Charity",
  "Health",
  "Sports",
  "Workshop",
  "Other",
];

function toDateTimeLocal(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const localDate = new Date(
    date.getTime() - date.getTimezoneOffset() * 60_000,
  );

  return localDate.toISOString().slice(0, 16);
}

function EditEventPageContent() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const eventId = params.id;

  const { data: session, isPending } = authClient.useSession();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      eventType: "",
      thumbnail: "",
      location: "",
      eventDate: "",
    },
  });

  useEffect(() => {
    if (isPending) return;

    if (!session) {
      router.replace(`/login?callbackURL=/events/manage/edit/${eventId}`);
    }
  }, [isPending, session, router, eventId]);

  useEffect(() => {
    if (isPending || !session || !eventId) return;

    let cancelled = false;

    const fetchEvent = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

        if (!apiUrl) {
          throw new Error("API URL is not configured.");
        }

        const response = await fetch(
          `${apiUrl.replace(/\/+$/, "")}/api/events/${eventId}`,
          {
            method: "GET",
            cache: "no-store",
          },
        );

        const result = await response.json();

        if (!response.ok || !result.success || !result.data) {
          throw new Error(result.message || "Failed to load event details.");
        }

        const event = result.data;

        if (!cancelled) {
          reset({
            title: event.title,
            description: event.description,
            eventType: event.eventType,
            thumbnail: event.thumbnail,
            location: event.location,
            eventDate: toDateTimeLocal(event.eventDate),
          });
        }
      } catch (error) {
        if (!cancelled) {
          setLoadError(
            error instanceof Error
              ? error.message
              : "Unable to load this event.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void fetchEvent();

    return () => {
      cancelled = true;
    };
  }, [isPending, session, eventId, reset]);

  const onSubmit = async (values: EventFormValues) => {
    try {
      setIsSubmitting(true);

      const tokenResponse = await authClient.token();

      if (tokenResponse.error || !tokenResponse.data?.token) {
        throw new Error("Authentication failed. Please log in again.");
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

      if (!apiUrl) {
        throw new Error("API URL is not configured.");
      }

      const response = await fetch(
        `${apiUrl.replace(/\/+$/, "")}/api/events/${eventId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenResponse.data.token}`,
          },
          body: JSON.stringify({
            ...values,
            eventDate: new Date(values.eventDate).toISOString(),
          }),
        },
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to update event.");
      }

      toast.success("Event updated successfully!");

      router.push("/events/manage");
      router.refresh();
    } catch (error) {
      console.error("Update event error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending || !session || isLoading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="w-full max-w-xl space-y-4">
          <div className="h-8 w-56 animate-pulse rounded bg-muted" />
          <div className="h-64 animate-pulse rounded-2xl bg-muted" />
        </div>
      </main>
    );
  }

  if (loadError) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4">
        <section className="w-full max-w-lg rounded-2xl border border-border bg-card p-8 text-center">
          <h1 className="text-xl font-semibold text-foreground">
            Unable to Load Event
          </h1>

          <p className="mt-3 text-sm text-muted-foreground">
            {loadError}
          </p>

          <Link
            href="/events/manage"
            className="mt-6 inline-flex h-10 items-center justify-center rounded-full border border-border px-5 text-sm font-medium hover:bg-accent"
          >
            Back to Manage Events
          </Link>
        </section>
      </main>
    );
  }

  return (
    <section className="min-h-screen bg-muted/20 px-4 py-5 sm:px-6 lg:py-7">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/events/manage"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft size={16} />
          Back to Manage Events
        </Link>

        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="border-b border-border px-5 py-5 sm:px-7">
            <p className="text-xs font-semibold tracking-wider text-primary">
              EVENT MANAGEMENT
            </p>

            <h1 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
              Edit Your Event
            </h1>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Update your event information and share the latest details with
              your community.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5 p-5 sm:p-7"
          >
            <div className="space-y-1.5">
              <Label htmlFor="title">Event Title *</Label>
              <Input
                id="title"
                placeholder="Event title"
                className="h-10 rounded-lg bg-background"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-xs text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description">Event Description *</Label>
              <Textarea
                id="description"
                rows={4}
                className="min-h-24 resize-none rounded-lg bg-background text-sm leading-6"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-xs text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="eventType">Event Category *</Label>
              <Controller
                name="eventType"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="eventType"
                      className="h-10 w-full rounded-lg bg-background"
                    >
                      <SelectValue placeholder="Choose a category" />
                    </SelectTrigger>

                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.eventType && (
                <p className="text-xs text-destructive">
                  {errors.eventType.message}
                </p>
              )}
            </div>

            <div className="border-t border-border" />

            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <ImagePlus size={18} />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-foreground">
                    Event Cover Image
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Update your event image URL.
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="thumbnail">Image URL *</Label>
                <Input
                  id="thumbnail"
                  type="url"
                  placeholder="https://example.com/event-image.jpg"
                  className="h-10 rounded-lg bg-background"
                  {...register("thumbnail")}
                />
                {errors.thumbnail && (
                  <p className="text-xs text-destructive">
                    {errors.thumbnail.message}
                  </p>
                )}
              </div>
            </div>

            <div className="border-t border-border" />

            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-foreground">
                When & Where
              </h2>

              <div className="space-y-1.5">
                <Label htmlFor="location">
                  <MapPin size={14} className="mr-1 inline" />
                  Event Location *
                </Label>
                <Input
                  id="location"
                  placeholder="Event location"
                  className="h-10 rounded-lg bg-background"
                  {...register("location")}
                />
                {errors.location && (
                  <p className="text-xs text-destructive">
                    {errors.location.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="eventDate">
                  <CalendarDays size={14} className="mr-1 inline" />
                  Event Date & Time *
                </Label>
                <Input
                  id="eventDate"
                  type="datetime-local"
                  className="h-10 rounded-lg bg-background"
                  {...register("eventDate")}
                />
                {errors.eventDate && (
                  <p className="text-xs text-destructive">
                    {errors.eventDate.message}
                  </p>
                )}
              </div>
            </div>

            <div className="border-t border-border pt-5">
              <div className="flex flex-col-reverse gap-3 sm:flex-row">
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 flex-1 rounded-lg"
                  disabled={isSubmitting}
                  onClick={() => router.push("/events/manage")}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-11 flex-1 rounded-lg font-semibold"
                >
                  {isSubmitting ? (
                    "Saving Changes..."
                  ) : (
                    <>
                      <Save size={16} className="mr-2" />
                      Save Changes
                      <Sparkles size={15} className="ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function EditEventLoading() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-xl animate-pulse space-y-4">
        <div className="h-8 w-56 rounded bg-muted" />
        <div className="h-64 rounded-2xl bg-muted" />
      </div>
    </main>
  );
}

export default function EditEventPage() {
  return (
    <Suspense fallback={<EditEventLoading />}>
      <EditEventPageContent />
    </Suspense>
  );
}
