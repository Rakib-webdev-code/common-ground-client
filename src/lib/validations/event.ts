
import { z } from "zod";

export const eventSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Event title is required."),

  description: z
    .string()
    .trim()
    .min(1, "Event description is required."),

  eventType: z
    .string()
    .trim()
    .min(1, "Please select an event category."),

  thumbnail: z
    .string()
    .trim()
    .url("Please provide a valid image URL.")
    .refine((value) => {
      const protocol = new URL(value).protocol;
      return protocol === "http:" || protocol === "https:";
    }, "Only HTTP and HTTPS image URLs are allowed."),

  location: z
    .string()
    .trim()
    .min(1, "Event location is required."),

  eventDate: z
    .string()
    .min(1, "Event date and time are required.")
    .refine((value) => {
      const date = new Date(value);
      return !Number.isNaN(date.getTime());
    }, "Please provide a valid event date.")
    .refine((value) => {
      return new Date(value) > new Date();
    }, "Event date must be in the future."),
});

export type EventFormValues = z.infer<typeof eventSchema>;
