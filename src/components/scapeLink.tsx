"use client"
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface IScapeLinkProps {
  children: ReactNode,
  href: string
  className?: string
}

export function ScapeLink({ children, href, className }: IScapeLinkProps) {

  const router = useRouter()
  return <button type="button" className={cn(className)} onClick={() => router.push(href)}>
    {children}
  </button>
}