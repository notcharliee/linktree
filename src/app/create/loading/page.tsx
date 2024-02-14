"use client"

import { Spinner } from "~/components/spinner"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function LoadingPage ({ searchParams }: { searchParams: { username: string } }) {
  const router = useRouter()
  const [done, setDone] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`/${searchParams.username}`)

        if (res.ok) {
          setDone(true)
          return true
        } else {
          throw new Error("Profile not found.")
        }
      } catch (error) {
        throw error
      }
    }

    setTimeout(() => {
      fetchProfile().catch(error => {
        console.error('Error fetching profile:', error)
      })

      const interval = setInterval(() => {
        fetchProfile().catch(error => {
          console.error('Error fetching profile:', error)
          clearInterval(interval) // Clear interval on error
        })
      }, 3000)
  
      return () => {
        clearInterval(interval) // Clear interval on unmount
      }
    }, 2000)
  }, [searchParams.username])

  useEffect(() => {
    if (done) setTimeout(() => {
      router.push(`/${searchParams.username}`)
    }, 1000)
  }, [done, searchParams.username, router])

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center">
      {!done ? (
        <div className="animate-in slide-in-from-bottom-8 duration-500 text-center">
          <div className="flex items-center gap-4">
            <Spinner className="h-8 w-8" />
            <h1 className="text-4xl font-medium">
              building your profile
            </h1>
          </div>
          <p className="text-xl text-neutral-400 mt-2">
            this may take a few seconds
          </p>
        </div>
      ): (
        <div className="text-center">
          <div className="flex items-center gap-4">
            <span className="text-4xl">🎉</span>
            <h1 className="text-4xl font-medium">
              profile built!
            </h1>
          </div>
          <p className="text-xl text-neutral-400 mt-2">
            redirecting you now ...
          </p>
        </div>
      )}
    </main>
  )
}
