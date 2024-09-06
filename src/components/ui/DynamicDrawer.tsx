"use client"
import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "./scroll-area"

interface IDynamicDrawerProps {
  children: React.ReactNode
  buttonLabel: string | React.ReactNode
  title: string
  className?: string
  boxClassName?: string
  buttonClassName?: string
  buttonSize?: "default" | "sm" | "lg" | "icon" | null | undefined
}

export function DynamicDrawer({ children, buttonLabel, title, className, boxClassName, buttonClassName, buttonSize }: IDynamicDrawerProps) {
  return (
    <div>
      <div className="">
        <Dialog>
          <DialogTrigger asChild>
            <Button size={buttonSize} className={`w-24 ${cn(buttonClassName)}`}>{buttonLabel} </Button>
          </DialogTrigger>
          <DialogContent aria-describedby={undefined} className={` sm:max-w-2xl max-w-[90vw] rounded-lg px-2 sm:px-4 text-secondary-foreground bg-card py-8 border-none ${cn(boxClassName)} ring-none`}>
            <DialogHeader>
              <DialogTitle className="text-terciary-foreground text-xl font-normal mb-4 px-6">
                {title}
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className={`max-h-[76vh] ${cn(className)} ring-none`}>{children}</ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}