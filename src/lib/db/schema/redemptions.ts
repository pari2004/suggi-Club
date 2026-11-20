import { pgTable, uuid, varchar, text, timestamp, integer, pgEnum, uniqueIndex } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './users';
import { subscriptions } from './subscriptions';
import { cafes } from './cafes';
import { cafeMenuItems } from './menu';

export const redemptionStatusEnum = pgEnum('redemption_status_enum', [
  'PENDING',
  'COMPLETED',
  'FAILED',
  'EXPIRED'
]);

export const redemptionTokens = pgTable('redemption_tokens', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id),
  subscriptionId: uuid('subscription_id').notNull().references(() => subscriptions.id),
  cafeId: uuid('cafe_id').references(() => cafes.id), // optional constraint: customer can lock to cafe
  tokenHash: varchar('token_hash', { length: 255 }).notNull().unique(), // SHA-256 hash of random token
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(), // 60-90 seconds TTL
  consumedAt: timestamp('consumed_at', { withTimezone: true }),
  idempotencyKey: varchar('idempotency_key', { length: 150 }).unique(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  tokenHashIdx: uniqueIndex('redemption_token_hash_idx').on(table.tokenHash),
  idempotencyIdx: uniqueIndex('redemption_token_idempotency_idx').on(table.idempotencyKey),
}));

export const redemptions = pgTable('redemptions', {
  id: uuid('id').defaultRandom().primaryKey(),
  tokenId: uuid('token_id').notNull().references(() => redemptionTokens.id),
  userId: uuid('user_id').notNull().references(() => users.id),
  subscriptionId: uuid('subscription_id').notNull().references(() => subscriptions.id),
  cafeId: uuid('cafe_id').notNull().references(() => cafes.id),
  staffUserId: uuid('staff_user_id').notNull().references(() => users.id),
  menuItemId: uuid('menu_item_id').notNull().references(() => cafeMenuItems.id),
  payoutRatePaise: integer('payout_rate_paise').notNull(), // snapshot of cafe payout rate at time of redemption
  retailPricePaise: integer('retail_price_paise').notNull(), // snapshot of menu retail price
  status: redemptionStatusEnum('status').default('COMPLETED').notNull(),
  failureReason: text('failure_reason'),
  idempotencyKey: varchar('idempotency_key', { length: 150 }).unique(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const redemptionsRelations = relations(redemptions, ({ one }) => ({
  user: one(users, {
    fields: [redemptions.userId],
    references: [users.id],
  }),
  subscription: one(subscriptions, {
    fields: [redemptions.subscriptionId],
    references: [subscriptions.id],
  }),
  cafe: one(cafes, {
    fields: [redemptions.cafeId],
    references: [cafes.id],
  }),
  menuItem: one(cafeMenuItems, {
    fields: [redemptions.menuItemId],
    references: [cafeMenuItems.id],
  }),
}));
