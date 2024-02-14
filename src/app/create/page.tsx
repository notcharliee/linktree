"use client"

import crypto from "crypto"

import Link from "next/link"
import { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"

import {
  CheckCircledIcon,
  CopyIcon,
} from "@radix-ui/react-icons"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/form"
import { Input } from "~/components/input"
import { Label } from "~/components/label"
import { ColourPicker } from "~/components/picker"
import { Spinner } from "~/components/spinner"
import { DraggableLink } from "./_components/draggable-link"
import { toast } from "sonner"

import { createProfile } from "~/actions/profile"

import {
  DndContext,
  closestCorners,
  useSensors,
  useSensor,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable"
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers"

// Form schema
const formSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters.")
    .max(32, "Username must be shorter than 32 characters."),
  bio: z
    .string()
    .max(100, "Bio must be shorter than 100 characters.")
    .optional(),
  email: z
    .string()
    .max(255, "Email must be shorter than 255 characters.")
    .email("This is not a valid email.")
    .optional(),
  primaryColour: z.string().length(7, "Must be a valid hex code."),
  secondaryColour: z.string().length(7, "Must be a valid hex code."),
  accentColour: z.string().length(7, "Must be a valid hex code."),
  links: z.array(
    z.object({
      name: z.string().max(32, "Name must be shorter than 32 characters."),
      href: z.string().max(255, "Url must be shorter than 255 characters."),
    }),
  ),
})

// Page content
export default function CreateProfile() {
  const [loading, setLoading] = useState([ false, false ])
  const [passphrase, setPassphrase] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      bio: undefined,
      email: undefined,
      primaryColour: "#ffffff",
      secondaryColour: "#09090b",
      accentColour: "#ffffff",
      links: [],
    },
  })

  const fieldArray = useFieldArray({
    control: form.control,
    name: "links",
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if ((await fetch(`/${values.username}`)).ok) {
        console.log("❌ Username is unavailable.")

        return form.setError("username", {
          message: "Username is already in use.",
        })
      }
    } catch {
      console.log("✅ Username is available.")
    }

    document.body.querySelector("main")!.style.opacity = "0"
    console.log("💫 Loading state active.")

    setTimeout(() => {
      setLoading([true, false])

      createProfile(values).then(user => {
        setPassphrase(user.passphrase)
        setTimeout(() => setLoading([false, true]), 1000)
      }).catch(error => { throw error })
    }, 500)
  }


  const modifiers = [
    restrictToVerticalAxis,
    restrictToParentElement,
  ]

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over?.id) {
      const activeIndex = (active.data.current?.sortable as { index?: number })?.index
      const overIndex = (over.data.current?.sortable as { index?: number })?.index
      
      console.log({ activeIndex, overIndex })

      if (activeIndex !== undefined && overIndex !== undefined) {
        fieldArray.move(activeIndex, overIndex)
      }
    }
  }

  const user = form.watch()

  if (loading[1] === false && loading[0] === true) return <PrimaryLoadingState />
  if (loading[0] === false && loading[1] === true) return <SecondaryLoadingState passphrase={passphrase} username={user.username} />
  if (loading.every(v => v === false)) return (
    <main className="sm:h-screen flex flex-col items-center sm:flex-row sm:overflow-hidden duration-300">
      {/* Form */}
      <div className="h-full w-full mx-auto sm:overflow-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full p-14 pt-20 mx-auto max-w-3xl space-y-8"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username *</FormLabel>
                  <FormControl>
                    <Input placeholder="meow" {...field} />
                  </FormControl>
                  <FormDescription>Your public display name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`Hello, my name is ${user.username?.length ? user.username : "meow"}`}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>A short bio about yourself.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gravatar</FormLabel>
                  <FormControl>
                    <Input placeholder="meow@example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    The email associated with your Gravatar account.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                <DndContext
                  collisionDetection={closestCorners}
                  modifiers={modifiers}
                  sensors={sensors}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={fieldArray.fields}
                    strategy={verticalListSortingStrategy}
                  >
                    {fieldArray.fields.map((link, index) => (
                      <DraggableLink
                        id={link.id}
                        index={index}
                        key={index}
                        control={form.control}
                        fieldArray={fieldArray}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
              </div>
              {!user.links.length && (
                <div className="flex flex-col gap-2">
                  <Label>Social Links</Label>
                  <p className="text-[0.8rem] text-neutral-400">
                    Add a social link to your profile.
                  </p>
                </div>
              )}
              <button
                type="button"
                className="flex h-9 self-start items-center rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => fieldArray.append({ name: "", href: "" })}
              >
                Add Link
              </button>
            </div>
            <div className="grid w-full grid-cols-1 gap-8 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <FormField
                control={form.control}
                name="primaryColour"
                render={() => (
                  <FormItem>
                    <FormLabel>Primary Colour</FormLabel>
                    <FormControl>
                      <ColourPicker
                        value={user.primaryColour}
                        onChange={(value) =>
                          form.setValue("primaryColour", value)
                        }
                      />
                    </FormControl>
                    <FormDescription>Primary profile colour.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="secondaryColour"
                render={() => (
                  <FormItem>
                    <FormLabel>Secondary Colour</FormLabel>
                    <FormControl>
                      <ColourPicker
                        value={user.secondaryColour}
                        onChange={(value) =>
                          form.setValue("secondaryColour", value)
                        }
                      />
                    </FormControl>
                    <FormDescription>Secondary profile colour.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="accentColour"
                render={() => (
                  <FormItem>
                    <FormLabel>Accent Colour</FormLabel>
                    <FormControl>
                      <ColourPicker
                        value={user.accentColour}
                        onChange={(value) =>
                          form.setValue("accentColour", value)
                        }
                      />
                    </FormControl>
                    <FormDescription>Accent profile colour.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <button
                type="submit"
                className="flex h-9 items-center rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Create Profile
              </button>
              <p className="text-[0.8rem] text-neutral-400">A passphrase will be generated for you.</p>
            </div>
          </form>
        </Form>
      </div>
      {/* Separator */}
      <div className="h-px sm:h-full w-full sm:w-px border-t sm:border-t-0 sm:border-l" />
      {/* Preview */}
      <div
        className="h-full w-full max-w-md bg-[var(--primary)] sm:overflow-auto"
        style={
          {
            "--primary": user.primaryColour ?? "#FFFFFF",
            "--secondary": user.secondaryColour ?? "#09090B",
            "--accent": user.accentColour ?? "#FFFFFF",
          } as React.CSSProperties
        }
      >
        <div className="w-full max-w-md flex flex-col gap-12 p-14 pt-20">
          <div className="flex flex-col items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={(user.email
                ? "https://www.gravatar.com/avatar/" +
                  crypto
                    .createHash("md5")
                    .update(user.email.toLowerCase().trim())
                    .digest("hex") +
                  "?s=256"
                : "/default_avatar.png"
              )}
              alt={"User Avatar"}
              className="h-32 w-32 rounded-full border border-[var(--secondary)] sm:h-40 sm:w-40"
            />
            <span className="break-all pt-6 text-center text-2xl font-bold text-[var(--secondary)]">
              @
              {user.username?.length
                ? user.username.replaceAll(" ", "_").substring(0, 31)
                : "username"}
            </span>
            <span className="break-words pt-1 text-center text-xl font-medium text-[var(--secondary)]">
              {user.bio?.substring(0, 99)}
            </span>
          </div>
          <div className="flex flex-col gap-6">
            {user.links.map((link, index) => (
              <button
                key={index}
                className="grid h-14 w-full place-items-center rounded-full border border-[var(--secondary)] bg-[var(--accent)] text-xl font-medium shadow-[4px_4px_0px_0px_var(--secondary)] duration-300 active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}


const PrimaryLoadingState = () => (
  <main className="min-h-screen w-full flex flex-col items-center justify-center">
    <div className="animate-in fade-in-0 zoom-in-75 slide-in-from-bottom-8 duration-500 ease-out text-center">
      <div className="flex items-center gap-3">
        <Spinner className="h-8 w-8" />
        <h1 className="text-4xl font-medium leading-none">
          creating your profile
        </h1>
      </div>
      <p className="text-xl text-neutral-400 mt-2">
        this may take a few seconds
      </p>
    </div>
  </main>
)

const SecondaryLoadingState = (props: { passphrase: string, username: string }) => {
  const handleClick = async () => {
    toast.success("Copied to clipboard.")
    await navigator.clipboard.writeText(props.passphrase)
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-14">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-3">
          <CheckCircledIcon className="h-8 w-8 mt-auto hidden sm:block" />
          <h1 className="text-4xl text-center font-medium leading-none">
            profile created
          </h1>
        </div>
        <p className="text-xl text-center text-neutral-400 mt-2">
          copy the passphrase below and keep it somewhere safe
        </p>
        <div className="w-full flex gap-2.5 mt-8">
          <Input value={props.passphrase} className="w-full font-mono truncate" readOnly />
          <button className="h-9 min-w-9 rounded-md border" onClick={handleClick}>
            <CopyIcon className="h-4 w-4 m-auto" />
          </button>
        </div>
        <Link href={`/${props.username}`} className="text-sm text-center text-neutral-400 underline underline-offset-4 mt-4">
          click here to go to your page
        </Link>
      </div>
    </main>
  )  
}