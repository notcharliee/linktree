"use client"

import crypto from "crypto"

import Image from "next/image"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { ColourPicker } from "~/components/picker"

import { toast } from "sonner"

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
  primaryColour: z.string().length(7, "Must be a valid hex code.").optional(),
  secondaryColour: z.string().length(7, "Must be a valid hex code.").optional(),
  accentColour: z.string().length(7, "Must be a valid hex code.").optional(),
  links: z.array(
    z.object({
      name: z.string().max(32, "Name must be shorter than 32 characters."),
      href: z.string().max(255, "Url must be shorter than 255 characters."),
    }),
  ),
})

export default function CreateProfile() {
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    toast("Profile created!", {
      description: (
        <pre className="mt-2 w-full whitespace-pre-wrap rounded border p-2 font-mono text-xs">
          <code>{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })
  }

  const user = form.watch()

  const avatar = user.email
    ? "https://www.gravatar.com/avatar/" +
      crypto
        .createHash("md5")
        .update(user.email.toLowerCase().trim())
        .digest("hex") +
      "?s=256"
    : "/default_avatar.png"

  return (
    <div className="flex h-full flex-col items-center sm:h-[calc(100vh-5rem)] sm:flex-row">
      <div className="mx-auto h-full w-full px-14 py-16 sm:overflow-auto md:py-24 lg:px-24">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto h-full w-full max-w-xl space-y-8"
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
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <FormField
                control={form.control}
                name="primaryColour"
                render={() => (
                  <FormItem>
                    <FormLabel>Primary Colour</FormLabel>
                    <FormControl>
                      <ColourPicker
                        value={user.primaryColour!}
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
                        value={user.secondaryColour!}
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
                        value={user.accentColour!}
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
            <button
              type="submit"
              className="flex h-9 items-center rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Create Profile
            </button>
          </form>
        </Form>
      </div>
      <div className="h-px w-full border-t sm:hidden" />
      <div
        className="h-full w-full max-w-md bg-[var(--primary)] sm:overflow-auto sm:border-l"
        style={
          {
            "--primary": user.primaryColour ?? "#FFFFFF",
            "--secondary": user.secondaryColour ?? "#09090B",
            "--accent": user.accentColour ?? "#FFFFFF",
          } as React.CSSProperties
        }
      >
        <div className="flex w-full max-w-md flex-col gap-12 p-14 pt-20">
          <div className="flex flex-col items-center">
            <Image
              src={avatar}
              alt={avatar}
              width={160}
              height={160}
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
              <a
                key={index}
                href={link.href}
                className="grid h-14 w-full place-items-center rounded-full border border-[var(--secondary)] bg-[var(--accent)] text-xl font-medium shadow-[4px_4px_0px_0px_var(--secondary)] duration-300 active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
