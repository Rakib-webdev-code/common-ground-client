
"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";

interface EventDetailImageProps {
  src?: string | null;
  alt: string;
}

export default function EventDetailImage({
  src,
  alt,
}: EventDetailImageProps) {
  const [hasError, setHasError] = useState(false);

  const imageSrc = src?.trim();

  const isValidUrl = (value: string) => {
    try {
      const url = new URL(value);
      return url.protocol === "https:" || url.protocol === "http:";
    } catch {
      return false;
    }
  };

  if (!imageSrc || !isValidUrl(imageSrc) || hasError) {
    return (
      <div
        role="img"
        aria-label={`${alt} — Image unavailable`}
        className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-muted to-primary/5"
      >
        <div className="flex size-20 items-center justify-center rounded-3xl border border-primary/15 bg-background/70 text-primary shadow-sm">
          <ImageOff className="size-9" strokeWidth={1.5} />
        </div>

        <p className="mt-5 text-sm font-semibold text-foreground">
          Image Unavailable
        </p>

        <p className="mt-1 text-xs text-muted-foreground">
          This event image cannot be displayed.
        </p>
      </div>
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      priority
      sizes="(max-width: 1024px) 100vw, 800px"
      className="object-cover"
      onError={() => setHasError(true)}
    />
  );
}
