import "~/styles/globals.css"

import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"

import { Toaster } from "~/components/sonner"

import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Linktree Clone",
  description:
    "Hello there! I made this site to learn how to work with MySQL, Drizzle ORM, and Planetscale DB.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} bg-primary`}
    >
      <body className="flex min-h-screen flex-col bg-primary leading-snug tracking-tighter duration-500">
        <Toaster />
        {children}
      </body>
    </html>
  )
}
