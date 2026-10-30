"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function getDisplayName(
  name: string | null | undefined,
  email: string | null | undefined,
) {
  const trimmedName = name?.trim();
  if (trimmedName) return trimmedName;

  const emailName = email?.split("@")[0]?.trim();
  return emailName || "Account";
}

export function getInitials(displayName: string) {
  const parts = displayName.split(/\s+/).filter(Boolean);

  if (parts.length === 0) return "CG";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

type UserAvatarProps = {
  name: string;
  image?: string | null;
  className?: string;
};

export function UserAvatar({ name, image, className }: UserAvatarProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const imageUrl = image?.trim();

  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-sage/25 text-brand-cream",
        className,
      )}
    >
      {imageUrl && !imageFailed ? (
        // eslint-disable-next-line @next/next/no-img-element -- user-provided avatar URLs can come from any provider.
        <img
          src={imageUrl}
          alt=""
          className="size-full object-cover"
          referrerPolicy="no-referrer"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <span className="font-heading text-sm font-semibold tracking-wide">
          {getInitials(name)}
        </span>
      )}
    </span>
  );
}
