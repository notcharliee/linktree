"use client"

import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => (
  <Sonner
    className="toaster group"
    toastOptions={{
      classNames: {
        toast:
          "group toast group-[.toaster]:bg-primary group-[.toaster]:text-secondary group-[.toaster]:border group-[.toaster]:border-secondary group-[.toaster]:shadow-lg group-[.toaster]:shadow-secondary/25",
        description: "group-[.toast]:text-neutral-400",
        actionButton:
          "group-[.toast]:bg-primary border border-secondary rounded-xl group-[.toast]:text-secondary",
        cancelButton:
          "group-[.toast]:bg-primary border border-secondary rounded-xl group-[.toast]:text-secondary",
      },
    }}
    {...props}
  />
)

export { Toaster }
