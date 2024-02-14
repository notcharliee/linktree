import crypto from "crypto"

import { notFound } from "next/navigation"

import { db } from "~/lib/db"

export default async function Profile({
  params,
}: {
  params: { slug: string }
}) {
  const user = await db.query.users.findFirst({
    where: (fields, operators) => operators.eq(fields.username, params.slug),
    with: {
      profile: {
        with: {
          links: true,
        },
      },
    },
  })

  if (!user) notFound()

  const avatarURL = user.email
    ? "https://www.gravatar.com/avatar/" +
      crypto
        .createHash("md5")
        .update(user.email.toLowerCase().trim())
        .digest("hex") +
      "?s=256"
    : "/default_avatar.png"

  const avatar =
    "data:image/png;base64," +
    btoa(
      String.fromCharCode(
        ...new Uint8Array(await (await fetch(avatarURL)).arrayBuffer()),
      ),
    )

  return (
    <main
      className="min-h-screen bg-[var(--primary)] tracking-tighter"
      style={
        {
          "--primary": user.profile.primaryColour ?? "#FFFFFF",
          "--secondary": user.profile.secondaryColour ?? "#09090B",
          "--accent": user.profile.accentColour ?? "#FFFFFF",
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto flex w-full max-w-md flex-col gap-12 p-14 pt-20">
        <div className="flex flex-col items-center text-[var(--secondary)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatar}
            alt={"User Avatar"}
            className="h-32 w-32 rounded-full border border-[var(--secondary)] sm:h-40 sm:w-40"
          />
          <span className="pt-6 text-2xl font-bold">@{user.username}</span>
          <span className="pt-1 text-center text-xl font-medium">
            {user.profile.bio}
          </span>
        </div>
        <div className="flex flex-col gap-6">
          {user.profile.links
            .sort((a, b) => a.position - b.position)
            .map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="grid h-14 w-full place-items-center rounded-full border border-[var(--secondary)] bg-[var(--accent)] text-xl font-medium shadow-[4px_4px_0px_0px_var(--secondary)] duration-300 active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                {link.name}
              </a>
            ))}
        </div>
      </div>
    </main>
  )
}
