import { sql } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const todos = sqliteTable('todos', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  text: text('text').notNull(),
  isCompleted: integer('is_completed', { mode: 'boolean' }).default(false),
  position: integer('position').default(sql`0`).notNull(),
  date: text('date').default(sql`CURRENT_DATE`).notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
})
