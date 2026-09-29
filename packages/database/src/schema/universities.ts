import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';

export const universities = pgTable('universities', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  city: text('city').notNull(),
  country: text('country').notNull(),
  status: text('status', { enum: ['Verified', 'Pending review'] }).default('Pending review'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const memberships = pgTable('memberships', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  universityId: uuid('university_id').references(() => universities.id).notNull(),
  role: text('role', { enum: ['Admin', 'Researcher', 'Viewer'] }).default('Viewer'),
});
