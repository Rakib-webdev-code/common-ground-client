
const EVENT_TIME_ZONE = "Asia/Dhaka";

function isValidDate(date: Date): boolean {
  return !Number.isNaN(date.getTime());
}

export function formatEventDate(dateString: string): string {
  const date = new Date(dateString);

  if (!isValidDate(date)) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en-US", {
    timeZone: EVENT_TIME_ZONE,
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function formatEventTime(dateString: string): string {
  const date = new Date(dateString);
  
  if (!isValidDate(date)) {
    return "Time unavailable";
  }

  return new Intl.DateTimeFormat("en-US", {
    timeZone: EVENT_TIME_ZONE,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}
