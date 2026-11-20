import { pgTable, uuid, varchar, text, timestamp, boolean, integer, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { cafes } from './cafes';

export const drinkTierEnum = pgEnum('drink_tier_enum', [
  'STANDARD',
  'PREMIUM'
]);

export const cafeMenuItems = pgTable('cafe_menu_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  cafeId: uuid('cafe_id').notNull().references(() => cafes.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  category: varchar('category', { length: 100 }).notNull(), // Hot Brew, Cold Brew, Espresso, Speciality
  pricePaise: integer('price_paise').notNull(), // Cafe's retail menu price in paise
  tier: drinkTierEnum('tier').default('STANDARD').notNull(),
  isEligibleForSubscription: boolean('is_eligible_for_subscription').default(true).notNull(),
  isAvailable: boolean('is_available').default(true).notNull(),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const cafeMenuItemsRelations = relations(cafeMenuItems, ({ one }) => ({
  cafe: one(cafes, {
    fields: [cafeMenuItems.cafeId],
    references: [cafes.id],
  }),
}));
