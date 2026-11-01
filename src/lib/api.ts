
import type { ApiError, ApiSuccess, Event } from "@/lib/types/event";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isEvent(value: unknown): value is Event {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value._id === "string" &&
    typeof value.title === "string" &&
    typeof value.description === "string" &&
    typeof value.eventType === "string" &&
    typeof value.thumbnail === "string" &&
    typeof value.location === "string" &&
    typeof value.eventDate === "string" &&
    typeof value.creatorId === "string" &&
    typeof value.creatorEmail === "string" &&
    (value.creatorName === undefined ||
      typeof value.creatorName === "string") &&
    typeof value.createdAt === "string" &&
    typeof value.updatedAt === "string"
  );
}

export async function getRecentEvents(): Promise<Event[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (!apiUrl) {
    throw new Error("API URL is not configured.");
  }

  let response: Response;

  try {
    response = await fetch(
      `${apiUrl.replace(/\/+$/, "")}/api/events/recent`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      },
    );
  } catch {
    throw new Error(
      "Unable to connect to the events server. Please try again later.",
    );
  }

  let result: unknown;

  try {
    result = await response.json();
  } catch {
    throw new Error("The events server returned an invalid response.");
  }

  if (!response.ok) {
    const errorMessage =
      isRecord(result) && typeof result.message === "string"
        ? result.message
        : "Failed to fetch upcoming events.";

    const apiError: ApiError = {
      success: false,
      message: errorMessage,
    };

    throw new Error(
      `Request failed (${response.status}): ${apiError.message}`,
    );
  }

  if (
    !isRecord(result) ||
    result.success !== true ||
    !Array.isArray(result.data)
  ) {
    throw new Error("The events server returned an unexpected response.");
  }

  const apiResponse: ApiSuccess<unknown[]> = {
    success: true,
    data: result.data,
  };

  if (!apiResponse.data.every(isEvent)) {
    throw new Error("The events server returned invalid event data.");
  }

  return apiResponse.data;
}

export async function getEvents(): Promise<Event[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (!apiUrl) {
    throw new Error("API URL is not configured.");
  }

  let response: Response;

  try {
    response = await fetch(
      `${apiUrl.replace(/\/+$/, "")}/api/events`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      },
    );
  } catch {
    throw new Error(
      "Unable to connect to the events server. Please try again later.",
    );
  }

  let result: unknown;

  try {
    result = await response.json();
  } catch {
    throw new Error("The events server returned an invalid response.");
  }

  if (!response.ok) {
    const message =
      isRecord(result) && typeof result.message === "string"
        ? result.message
        : "Failed to fetch upcoming events.";

    throw new Error(`Request failed (${response.status}): ${message}`);
  }

  if (
    !isRecord(result) ||
    result.success !== true ||
    !Array.isArray(result.data)
  ) {
    throw new Error("The events server returned an unexpected response.");
  }

  if (!result.data.every(isEvent)) {
    throw new Error("The events server returned invalid event data.");
  }

  return result.data;
}

export async function getMyEvents(token: string): Promise<Event[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (!apiUrl) {
    throw new Error("API URL is not configured.");
  }

  if (!token.trim()) {
    throw new Error("Authentication token is required.");
  }

  let response: Response;

  try {
    response = await fetch(
      `${apiUrl.replace(/\/+$/, "")}/api/events/my-events`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      },
    );
  } catch {
    throw new Error(
      "Unable to connect to the events server. Please try again later.",
    );
  }

  let result: unknown;

  try {
    result = await response.json();
  } catch {
    throw new Error("The events server returned an invalid response.");
  }

  if (!response.ok) {
    const message =
      isRecord(result) && typeof result.message === "string"
        ? result.message
        : "Failed to fetch your events.";

    throw new Error(`Request failed (${response.status}): ${message}`);
  }

  if (
    !isRecord(result) ||
    result.success !== true ||
    !Array.isArray(result.data)
  ) {
    throw new Error("The events server returned an unexpected response.");
  }

  if (!result.data.every(isEvent)) {
    throw new Error("The events server returned invalid event data.");
  }

  return result.data;
}

export async function getJoinedEvents(token: string): Promise<Event[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (!apiUrl) {
    throw new Error("API URL is not configured.");
  }

  if (!token.trim()) {
    throw new Error("Authentication token is required.");
  }

  let response: Response;

  try {
    response = await fetch(
      `${apiUrl.replace(/\/+$/, "")}/api/events/joined`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      },
    );
  } catch {
    throw new Error(
      "Unable to connect to the events server. Please try again later.",
    );
  }

  let result: unknown;

  try {
    result = await response.json();
  } catch {
    throw new Error("The events server returned an invalid response.");
  }

  if (!response.ok) {
    const message =
      isRecord(result) && typeof result.message === "string"
        ? result.message
        : "Failed to fetch your joined events.";

    throw new Error(`Request failed (${response.status}): ${message}`);
  }

  if (
    !isRecord(result) ||
    result.success !== true ||
    !Array.isArray(result.data)
  ) {
    throw new Error("The events server returned an unexpected response.");
  }

  if (!result.data.every(isEvent)) {
    throw new Error("The events server returned invalid event data.");
  }

  return result.data;
}

export async function getEventById(id: string): Promise<Event> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (!apiUrl) {
    throw new Error("API URL is not configured.");
  }

  if (!id.trim()) {
    throw new Error("Event ID is required.");
  }

  let response: Response;

  try {
    response = await fetch(
      `${apiUrl.replace(/\/+$/, "")}/api/events/${encodeURIComponent(id)}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      },
    );
  } catch {
    throw new Error(
      "Unable to connect to the events server. Please try again later.",
    );
  }

  let result: unknown;

  try {
    result = await response.json();
  } catch {
    throw new Error("The events server returned an invalid response.");
  }

  if (!response.ok) {
    const errorMessage =
      isRecord(result) && typeof result.message === "string"
        ? result.message
        : "Failed to fetch event details.";

    const apiError: ApiError = {
      success: false,
      message: errorMessage,
    };

    throw new Error(
      `Request failed (${response.status}): ${apiError.message}`,
    );
  }

  if (
    !isRecord(result) ||
    result.success !== true ||
    !isEvent(result.data)
  ) {
    throw new Error("The events server returned invalid event data.");
  }

  const apiResponse: ApiSuccess<Event> = {
    success: true,
    data: result.data,
  };

  return apiResponse.data;
}
