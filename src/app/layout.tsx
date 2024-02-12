import "~/styles/globals.css"

import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"

import { Toaster } from "~/components/sonner"

import { type Metadata } from "next"
import Link from "next/link"

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
      <body className="flex min-h-screen flex-col bg-primary leading-snug tracking-tighter sm:overflow-hidden">
        <Toaster />
        <main className="min-h-[calc(100vh-5rem)] overflow-auto">
          {children}
        </main>
        <footer className="flex h-20 w-screen items-center justify-between self-end border border-t-secondary px-14 lg:px-24">
          <p className="w-full text-center leading-loose sm:text-base md:text-left">
            Built by{" "}
            <Link
              href={"https://charliee.dev"}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              notcharliee
            </Link>
            . The source code is available on{" "}
            <Link
              href={"/redirect/github"}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </Link>
            .
          </p>
        </footer>
      </body>
    </html>
  )
}
