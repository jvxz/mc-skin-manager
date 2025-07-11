import { integer, pgTable, text } from 'drizzle-orm/pg-core'

// export const usersTable = pgTable('users', {
//   email: varchar({ length: 255 }).notNull().unique(),
//   id: integer().primaryKey().generatedAlwaysAsIdentity(),
//   name: varchar({ length: 255 }).notNull(),
// })

export const skinsTable = pgTable('skins', {
  base64: text().notNull(),
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  // name: varchar({ length: 255 }).notNull(),
  // userId: integer().references(() => usersTable.id),
})
