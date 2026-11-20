import { pgTable, uuid, varchar, text, timestamp, boolean, integer, jsonb, pgEnum } from 'drizzle-orm/pg-core';
import { users } from './users';

export const ticketStatusEnum = pgEnum('ticket_status_enum', [
  'OPEN',
  'IN_PROGRESS',
  'RESOLVED',
  'CLOSED'
]);

export const ticketPriorityEnum = pgEnum('ticket_priority_enum', [
  'LOW',
  'MEDIUM',
  'HIGH',
  'URGENT'
]);

export const coupons = pgTable('coupons', {
  id: uuid('id').defaultRandom().primaryKey(),
  code: varchar('code', { length: 50 }).notNull().unique(),
  discountType: varchar('discount_type', { length: 20 }).default('PERCENT').notNull(), // PERCENT, FIXED_AMOUNT
  discountValue: integer('discount_value').notNull(), // e.g. 15 for 15%, or 10000 for ₹100
  maxDiscountPaise: integer('max_discount_paise'), // cap on percentage discounts
  minOrderPaise: integer('min_order_paise').default(0).notNull(),
  usageLimit: integer('usage_limit'),
  usageCount: integer('usage_count').default(0).notNull(),
  validFrom: timestamp('valid_from', { withTimezone: true }).defaultNow().notNull(),
  validUntil: timestamp('valid_until', { withTimezone: true }).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const referrals = pgTable('referrals', {
  id: uuid('id').defaultRandom().primaryKey(),
  referrerUserId: uuid('referrer_user_id').notNull().references(() => users.id),
  refereeUserId: uuid('referee_user_id').notNull().references(() => users.id),
  referralCode: varchar('referral_code', { length: 50 }).notNull(),
  bonusCreditsAwarded: integer('bonus_credits_awarded').default(1).notNull(),
  isRewarded: boolean('is_rewarded').default(false).notNull(),
  rewardedAt: timestamp('rewarded_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const supportTickets = pgTable('support_tickets', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id),
  ticketNumber: varchar('ticket_number', { length: 50 }).notNull().unique(),
  subject: varchar('subject', { length: 255 }).notNull(),
  message: text('message').notNull(),
  status: ticketStatusEnum('status').default('OPEN').notNull(),
  priority: ticketPriorityEnum('priority').default('MEDIUM').notNull(),
  category: varchar('category', { length: 100 }).default('GENERAL').notNull(), // REDEMPTION, SUBSCRIPTION, PAYMENT, CAFE, GENERAL
  assignedTo: uuid('assigned_to').references(() => users.id),
  resolvedAt: timestamp('resolved_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const notifications = pgTable('notifications', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  message: text('message').notNull(),
  type: varchar('type', { length: 50 }).default('INFO').notNull(), // REDEMPTION, EXPIRY, PAYMENT, SYSTEM
  link: text('link'),
  isRead: boolean('is_read').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id),
  action: varchar('action', { length: 150 }).notNull(), // CAFE_APPROVED, SUBSCRIPTION_CANCELLED, REDEMPTION_FORCE_VOID, etc.
  entityType: varchar('entity_type', { length: 100 }).notNull(), // cafe, subscription, payment, redemption
  entityId: varchar('entity_id', { length: 100 }).notNull(),
  ipAddress: varchar('ip_address', { length: 50 }),
  userAgent: text('user_agent'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
