import iphone from "~/../public/iphone.png"

import Link from "next/link"
import Image from "next/image"

export default async function Page() {
  return (
    <>
      <main className="flex flex-col gap-20 px-14 py-16 max-md:items-center sm:h-[calc(100vh-5rem)] sm:flex-row sm:gap-12 md:gap-16 md:py-24 lg:justify-between lg:px-24">
        <div className="flex h-full flex-col justify-center gap-8 md:gap-12">
          <h1 className="w-min text-[2.5rem] font-black tracking-[-2px] *:inline-block *:pr-0.5 sm:text-6xl sm:tracking-[-4px] lg:text-7xl xl:text-8xl">
            <span className="animate-hue-rotate bg-gradient-to-r from-lime-300 to-green-500 bg-clip-text text-transparent">
              linktree
            </span>
            <span>charliee.dev</span>
          </h1>
          <p className="max-w-xl text-xl font-medium md:text-2xl md:font-semibold lg:text-3xl">
            Hello there! I made this site to learn how to work with MySQL, Drizzle
            ORM, and Planetscale DB. Press the button below to try it out!
          </p>
          <Link
            href={"/create"}
            className="grid h-14 w-full place-items-center rounded-full border text-xl font-medium shadow-[4px_4px_0px_0px] duration-300 active:translate-x-1 active:translate-y-1 active:shadow-none sm:w-64"
          >
            Create profile
          </Link>
        </div>
        <Image
          src={iphone}
          alt="iPhone preview"
          className="animate-hue-rotate object-contain object-right"
          priority
        />
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
    </>
  )
}
