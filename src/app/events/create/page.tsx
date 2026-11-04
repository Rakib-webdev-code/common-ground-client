
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  CalendarDays,
  ImagePlus,
  MapPin,
  Sparkles,
  Users,
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

export default function CreateEventPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login?callbackURL=/events/create");
    }
  }, [isPending, session, router]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
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

  const onSubmit = async (values: EventFormValues) => {
    try {
      setIsSubmitting(true);

      // Get JWT from Better Auth
      const tokenResponse = await authClient.token();

      if (tokenResponse.error || !tokenResponse.data?.token) {
        throw new Error("Authentication failed. Please log in again.");
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        throw new Error("API URL is not configured.");
      }

      // Send event data to Express backend
      const response = await fetch(`${apiUrl}/api/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenResponse.data.token}`,
        },
        body: JSON.stringify({
          ...values,
          eventDate: new Date(values.eventDate).toISOString(),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to create event.");
      }

      toast.success("Your event has been created successfully!");

      // Redirect to Upcoming Events after successful creation
      router.push("/events");
      router.refresh();
    } catch (error) {
      console.error("Create event error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending || !session) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Checking your authentication...
        </p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-muted/20 px-4 py-5 sm:px-6 lg:py-7">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <div className="grid items-start gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Left Information Panel */}
          <div className="space-y-5 lg:sticky lg:top-20">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
                <Sparkles size={14} />
                Make Something Meaningful
              </div>

              <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
                Bring Your
                <span className="block text-primary">Community</span>
                Together.
              </h1>

              <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                Every great change starts with one small action. Create an
                event, invite people, and make a positive impact together.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-card p-5">
              <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Users size={21} />
              </div>

              <h2 className="text-lg font-semibold text-foreground">
                Stronger Together
              </h2>

              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                Connect with people who care about the same things. Your event
                could be the beginning of something wonderful.
              </p>

              <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                <div className="flex -space-x-2">
                  {["A", "B", "C"].map((letter) => (
                    <div
                      key={letter}
                      className="flex size-8 items-center justify-center rounded-full border-2 border-card bg-primary/15 text-xs font-bold text-primary"
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Small actions. Stronger communities.
                </p>
              </div>
            </div>
          </div>

          {/* Event Form */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="border-b border-border px-5 py-4 sm:px-6">
              <p className="text-xs font-semibold tracking-wider text-primary">
                EVENT DETAILS
              </p>
              <h2 className="mt-1 text-xl font-bold text-foreground">
                Create Your Event
              </h2>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Fill in the details below to share your event with the
                community.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-4 p-5 sm:p-6"
            >
              {/* Basic Information */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    Basic Information
                  </h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Give your event a name and describe its purpose.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g. Community Food Donation"
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
                    placeholder="What is your event about? Tell people why they should join..."
                    rows={3}
                    className="min-h-20 resize-none rounded-lg bg-background text-sm leading-6"
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
              </div>

              <div className="border-t border-border" />

              {/* Event Image */}
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <ImagePlus size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      Event Cover Image
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Add an image that represents your event.
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
                  <p className="text-xs text-muted-foreground">
                    Use a valid public image URL.
                  </p>
                </div>
              </div>

              <div className="border-t border-border" />

              {/* Date and Location */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    When & Where
                  </h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Help participants know when and where to join.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="location">
                    <MapPin size={14} className="mr-1 inline" />
                    Event Location *
                  </Label>
                  <Input
                    id="location"
                    placeholder="e.g. Dhaka, Bangladesh"
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
                  <p className="text-xs text-muted-foreground">
                    Choose a future date and time.
                  </p>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-10 w-full rounded-lg text-sm font-semibold"
                >
                  {isSubmitting
                    ? "Creating Event..."
                    : "Create Community Event"}
                  {!isSubmitting && <Sparkles size={15} className="ml-2" />}
                </Button>

                <p className="mt-2 text-center text-xs leading-5 text-muted-foreground">
                  By creating this event, you agree to keep your community
                  welcoming and respectful.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
