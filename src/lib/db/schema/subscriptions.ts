import { pgTable, uuid, varchar, text, timestamp, boolean, integer, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './users';

export const subscriptionStatusEnum = pgEnum('subscription_status_enum', [
  'ACTIVE',
  'EXPIRED',
  'CANCELLED',
  'PAUSED',
  'PENDING_PAYMENT'
]);

export const creditTransactionTypeEnum = pgEnum('credit_transaction_type_enum', [
  'ALLOCATION',
  'REDEMPTION',
  'REFUND',
  'EXPIRY',
  'ADJUSTMENT'
]);

export const subscriptionPlans = pgTable('subscription_plans', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 100 }).notNull(), // Weekly Explorer, Coffee 10, Coffee 15, Premium Club
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  description: text('description').notNull(),
  pricePaise: integer('price_paise').notNull(), // ₹249 = 24900, ₹699 = 69900, etc.
  validityDays: integer('validity_days').notNull(), // 7 or 30 days
  creditsCount: integer('credits_count').notNull(), // 3, 10, 15
  dailyRedemptionCap: integer('daily_redemption_cap').default(2).notNull(), // e.g. 2 cups per day max
  isPremiumTier: boolean('is_premium_tier').default(false).notNull(),
  features: text('features').array(),
  isActive: boolean('is_active').default(true).notNull(),
  sortOrder: integer('sort_order').default(0).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id),
  planId: uuid('plan_id').notNull().references(() => subscriptionPlans.id),
  status: subscriptionStatusEnum('status').default('PENDING_PAYMENT').notNull(),
  startsAt: timestamp('starts_at', { withTimezone: true }),
  expiresAt: timestamp('expires_at', { withTimezone: true }),
  creditsTotal: integer('credits_total').notNull(),
  creditsRemaining: integer('credits_remaining').notNull(),
  creditsUsed: integer('credits_used').default(0).notNull(),
  cancelledAt: timestamp('cancelled_at', { withTimezone: true }),
  cancellationReason: text('cancellation_reason'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const creditTransactions = pgTable('credit_transactions', {
  id: uuid('id').defaultRandom().primaryKey(),
  subscriptionId: uuid('subscription_id').notNull().references(() => subscriptions.id),
  userId: uuid('user_id').notNull().references(() => users.id),
  type: creditTransactionTypeEnum('type').notNull(),
  amount: integer('amount').notNull(), // -1 for redemption, +10 for allocation, etc.
  balanceAfter: integer('balance_after').notNull(),
  referenceId: varchar('reference_id', { length: 255 }), // redemption_id or payment_id
  description: text('description'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const subscriptionsRelations = relations(subscriptions, ({ one, many }) => ({
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
  plan: one(subscriptionPlans, {
    fields: [subscriptions.planId],
    references: [subscriptionPlans.id],
  }),
  creditTransactions: many(creditTransactions),
}));
