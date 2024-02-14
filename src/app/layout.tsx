import "~/styles/globals.css"

import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"

import { Toaster } from "~/components/sonner"

import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Linktree Clone",
  description: "Hello there! I made this site to learn how to work with MySQL, Drizzle ORM, and Planetscale DB.",
  metadataBase: new URL("https://linktree.charliee.dev"),
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://linktree.charliee.dev",
    title: "Linktree Clone",
    description: "Hello there! I made this site to learn how to work with MySQL, Drizzle ORM, and Planetscale DB.",
    siteName: "Linktree Clone",
    images: [
      {
        url: "https://linktree.charliee.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "Linktree Clone",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Linktree Clone",
    description: "Hello there! I made this site to learn how to work with MySQL, Drizzle ORM, and Planetscale DB.",
    images: ["https://linktree.charliee.dev/og-image.png"],
    creator: "@notchxrliee",
  },
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
      <body className="flex min-h-screen flex-col bg-primary leading-snug tracking-tighter">
        <Toaster />
        {children}
      </body>
    </html>
  )
}
