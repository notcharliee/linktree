"use server"

import { randomUUID } from "crypto"

import { generatePassphrase } from "~/lib/crypto/generate-passphrase"
import { users as usersSchema, profiles as profilesSchema, links as linksSchema } from "~/lib/schema"
import { db } from "~/lib/db"


interface CreateProfileParams {
  username: string,
  email?: string | undefined,
  bio?: string | undefined,
  primaryColour: string,
  secondaryColour: string,
  accentColour: string,
  links: {
    name: string,
    href: string,
  }[],
}

export const createProfile = async (params: CreateProfileParams) => {
  const user = {
    id: randomUUID(),
    username: params.username,
    passphrase: generatePassphrase(),
    email: params.email,
  }

  const profile = {
    userId: user.id,
    bio: params.bio,
    primaryColour: params.primaryColour,
    secondaryColour: params.secondaryColour,
    accentColour: params.accentColour,
  }

  const links = params.links.map((link, index) => ({
    id: randomUUID(),
    userId: user.id,
    position: index,
    ...link,
  }))

  await db.insert(usersSchema).values(user)
  await db.insert(profilesSchema).values(profile)
  if (links.length) await db.insert(linksSchema).values(links)

  return {
    ...user,
    profile,
    links,
  }
}