"use client"

import { cn } from "@/lib/utils";

interface ICatchedImage {
  src: string,
  className?: string,
  alt?: string
  scapeSrc: string
}

export function CatchedImage({ src, scapeSrc, className, alt }: ICatchedImage) {
  return (
    <img
      src={src}
      alt={alt}
      className={`${cn(className)}`}
      onError={(e) => { e.currentTarget.src = scapeSrc }}
    />
  )
}