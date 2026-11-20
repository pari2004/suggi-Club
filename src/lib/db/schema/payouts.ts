import { pgTable, uuid, varchar, text, timestamp, boolean, integer, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { cafes } from './cafes';
import { users } from './users';

export const payoutStatusEnum = pgEnum('payout_status_enum', [
  'PENDING',
  'PROCESSING',
  'PAID',
  'FAILED'
]);

export const cafePayoutRates = pgTable('cafe_payout_rates', {
  id: uuid('id').defaultRandom().primaryKey(),
  cafeId: uuid('cafe_id').notNull().references(() => cafes.id, { onDelete: 'cascade' }),
  standardRatePaise: integer('standard_rate_paise').default(5000).notNull(), // ₹50.00 standard redemption
  premiumRatePaise: integer('premium_rate_paise').default(8000).notNull(), // ₹80.00 premium redemption
  effectiveFrom: timestamp('effective_from', { withTimezone: true }).defaultNow().notNull(),
  effectiveTo: timestamp('effective_to', { withTimezone: true }),
  isActive: boolean('is_active').default(true).notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const partnerPayouts = pgTable('partner_payouts', {
  id: uuid('id').defaultRandom().primaryKey(),
  cafeId: uuid('cafe_id').notNull().references(() => cafes.id),
  periodStart: timestamp('period_start', { withTimezone: true }).notNull(),
  periodEnd: timestamp('period_end', { withTimezone: true }).notNull(),
  totalRedemptions: integer('total_redemptions').notNull(),
  totalAmountPaise: integer('total_amount_paise').notNull(),
  status: payoutStatusEnum('status').default('PENDING').notNull(),
  bankReference: varchar('bank_reference', { length: 150 }),
  processedAt: timestamp('processed_at', { withTimezone: true }),
  processedBy: uuid('processed_by').references(() => users.id),
  notes: text('notes'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const payoutItems = pgTable('payout_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  payoutId: uuid('payout_id').notNull().references(() => partnerPayouts.id, { onDelete: 'cascade' }),
  redemptionId: uuid('redemption_id').notNull(), // reference to redemptions table
  amountPaise: integer('amount_paise').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const partnerPayoutsRelations = relations(partnerPayouts, ({ one, many }) => ({
  cafe: one(cafes, {
    fields: [partnerPayouts.cafeId],
    references: [cafes.id],
  }),
  items: many(payoutItems),
}));
