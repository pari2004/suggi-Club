import { pgTable, uuid, varchar, text, timestamp, boolean, integer, jsonb, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './users';
import { subscriptions } from './subscriptions';

export const paymentStatusEnum = pgEnum('payment_status_enum', [
  'PENDING',
  'SUCCESS',
  'FAILED',
  'REFUNDED',
  'PARTIALLY_REFUNDED'
]);

export const refundStatusEnum = pgEnum('refund_status_enum', [
  'REQUESTED',
  'APPROVED',
  'PROCESSED',
  'REJECTED'
]);

export const payments = pgTable('payments', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id),
  subscriptionId: uuid('subscription_id').references(() => subscriptions.id),
  amountPaise: integer('amount_paise').notNull(),
  currency: varchar('currency', { length: 10 }).default('INR').notNull(),
  provider: varchar('provider', { length: 50 }).default('RAZORPAY').notNull(),
  providerOrderId: varchar('provider_order_id', { length: 150 }).unique(),
  providerPaymentId: varchar('provider_payment_id', { length: 150 }).unique(),
  providerSignature: varchar('provider_signature', { length: 255 }),
  status: paymentStatusEnum('status').default('PENDING').notNull(),
  paymentMethod: varchar('payment_method', { length: 50 }), // UPI, CARD, NETBANKING
  receipt: varchar('receipt', { length: 100 }).unique(),
  errorMessage: text('error_message'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const paymentWebhooks = pgTable('payment_webhooks', {
  id: uuid('id').defaultRandom().primaryKey(),
  eventId: varchar('event_id', { length: 150 }).notNull().unique(),
  provider: varchar('provider', { length: 50 }).default('RAZORPAY').notNull(),
  eventType: varchar('event_type', { length: 100 }).notNull(),
  payload: jsonb('payload').notNull(),
  isProcessed: boolean('is_processed').default(false).notNull(),
  processedAt: timestamp('processed_at', { withTimezone: true }),
  error: text('error'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const refunds = pgTable('refunds', {
  id: uuid('id').defaultRandom().primaryKey(),
  paymentId: uuid('payment_id').notNull().references(() => payments.id),
  userId: uuid('user_id').notNull().references(() => users.id),
  amountPaise: integer('amount_paise').notNull(),
  reason: text('reason').notNull(),
  status: refundStatusEnum('status').default('REQUESTED').notNull(),
  providerRefundId: varchar('provider_refund_id', { length: 150 }),
  reviewedBy: uuid('reviewed_by').references(() => users.id),
  reviewedAt: timestamp('reviewed_at', { withTimezone: true }),
  rejectionReason: text('rejection_reason'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const paymentsRelations = relations(payments, ({ one, many }) => ({
  user: one(users, {
    fields: [payments.userId],
    references: [users.id],
  }),
  subscription: one(subscriptions, {
    fields: [payments.subscriptionId],
    references: [subscriptions.id],
  }),
  refunds: many(refunds),
}));
