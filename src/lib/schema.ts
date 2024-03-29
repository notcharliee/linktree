import { mysqlTable, varchar, timestamp, int } from "drizzle-orm/mysql-core"
import { relations } from "drizzle-orm"

export const users = mysqlTable("users", {
  id: varchar("id", { length: 36 }).unique().primaryKey(),
  username: varchar("username", { length: 32 }).unique().notNull(),
  passphrase: varchar("passphrase", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
})

export const profiles = mysqlTable("profiles", {
  userId: varchar("user_id", { length: 36 }).unique().primaryKey(),
  bio: varchar("bio", { length: 100 }),
  primaryColour: varchar("primary_colour", { length: 7 }).notNull(),
  secondaryColour: varchar("secondary_colour", { length: 7 }).notNull(),
  accentColour: varchar("accent_colour", { length: 7 }).notNull(),
})

export const links = mysqlTable("links", {
  id: varchar("id", { length: 36 }).unique().primaryKey(),
  userId: varchar("user_id", { length: 36 }).notNull(),
  name: varchar("name", { length: 32 }).notNull(),
  href: varchar("href", { length: 255 }).notNull(),
  position: int("position").notNull(),
})

export const userRelations = relations(users, ({ one }) => ({
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.userId],
  }),
}))

export const profileRelations = relations(profiles, ({ many }) => ({
  links: many(links),
}))

export const linkRelations = relations(links, ({ one }) => ({
  profile: one(profiles, {
    fields: [links.userId],
    references: [profiles.userId],
  }),
}))
