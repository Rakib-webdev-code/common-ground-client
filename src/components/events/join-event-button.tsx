
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

interface JoinEventButtonProps {
  eventId: string;
}

export default function JoinEventButton({
  eventId,
}: JoinEventButtonProps) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [isJoining, setIsJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);

  const handleJoin = async () => {
    if (isPending || isJoining || hasJoined) return;

    if (!session) {
      router.push(`/login?callbackURL=${encodeURIComponent(`/events/${eventId}`)}`);
      return;
    }

    try {
      setIsJoining(true);

      const tokenResponse = await authClient.token();

      if (tokenResponse.error || !tokenResponse.data?.token) {
        throw new Error("Unable to get your authentication token.");
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

      if (!apiUrl) {
        throw new Error("API URL is not configured.");
      }

      const response = await fetch(
        `${apiUrl.replace(/\/+$/, "")}/api/events/${eventId}/join`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${tokenResponse.data.token}`,
          },
        },
      );

      const result = await response.json();

      if (response.status === 409) {
        setHasJoined(true);
        toast.info("You have already joined this event.");
        return;
      }

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to join this event.");
      }

      setHasJoined(true);
      toast.success("You have successfully joined the event!");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to join event. Please try again.",
      );
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <Button
      className="w-full"
      onClick={handleJoin}
      disabled={isPending || isJoining || hasJoined}
    >
      {isPending
        ? "Checking..."
        : isJoining
          ? "Joining..."
          : hasJoined
            ? "Already Joined"
            : "Join Event"}
    </Button>
  );
}

