import { pgTable, uuid, varchar, text, timestamp, boolean, numeric, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './users';

export const cafeStatusEnum = pgEnum('cafe_status_enum', [
  'PENDING_REVIEW',
  'APPROVED',
  'REJECTED',
  'SUSPENDED'
]);

export const staffRoleEnum = pgEnum('staff_role_enum', [
  'OWNER',
  'MANAGER',
  'BARISTA'
]);

export const cities = pgTable('cities', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  state: varchar('state', { length: 100 }).notNull(),
  country: varchar('country', { length: 100 }).default('India').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const cafes = pgTable('cafes', {
  id: uuid('id').defaultRandom().primaryKey(),
  cityId: uuid('city_id').notNull().references(() => cities.id),
  ownerId: uuid('owner_id').notNull().references(() => users.id),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  neighborhood: varchar('neighborhood', { length: 150 }).notNull(),
  address: text('address').notNull(),
  postalCode: varchar('postal_code', { length: 20 }),
  latitude: numeric('latitude', { precision: 10, scale: 7 }),
  longitude: numeric('longitude', { precision: 10, scale: 7 }),
  phone: varchar('phone', { length: 30 }),
  email: varchar('email', { length: 255 }),
  gstin: varchar('gstin', { length: 30 }),
  fssaiNumber: varchar('fssai_number', { length: 30 }),
  coverImageUrl: text('cover_image_url'),
  logoUrl: text('logo_url'),
  galleryUrls: text('gallery_urls').array(),
  openingHours: text('opening_hours'), // JSON or structured formatted string
  amenities: text('amenities').array(), // e.g. ['WiFi', 'Outdoor Seating', 'Pet Friendly']
  status: cafeStatusEnum('status').default('PENDING_REVIEW').notNull(),
  rejectionReason: text('rejection_reason'),
  isFeatured: boolean('is_featured').default(false).notNull(),
  bankAccountHolder: varchar('bank_account_holder', { length: 255 }),
  bankAccountNumber: varchar('bank_account_number', { length: 100 }),
  bankIfscCode: varchar('bank_ifsc_code', { length: 30 }),
  bankName: varchar('bank_name', { length: 255 }),
  agreementAcceptedAt: timestamp('agreement_accepted_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const cafeStaff = pgTable('cafe_staff', {
  id: uuid('id').defaultRandom().primaryKey(),
  cafeId: uuid('cafe_id').notNull().references(() => cafes.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  staffRole: staffRoleEnum('staff_role').default('BARISTA').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const cafeDocuments = pgTable('cafe_documents', {
  id: uuid('id').defaultRandom().primaryKey(),
  cafeId: uuid('cafe_id').notNull().references(() => cafes.id, { onDelete: 'cascade' }),
  documentType: varchar('document_type', { length: 100 }).notNull(), // FSSAI, GST, Bank Cheque, Menu
  fileUrl: text('file_url').notNull(),
  isVerified: boolean('is_verified').default(false).notNull(),
  verifiedAt: timestamp('verified_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const cafesRelations = relations(cafes, ({ one, many }) => ({
  city: one(cities, {
    fields: [cafes.cityId],
    references: [cities.id],
  }),
  owner: one(users, {
    fields: [cafes.ownerId],
    references: [users.id],
  }),
  staff: many(cafeStaff),
  documents: many(cafeDocuments),
}));

export const cafeStaffRelations = relations(cafeStaff, ({ one }) => ({
  cafe: one(cafes, {
    fields: [cafeStaff.cafeId],
    references: [cafes.id],
  }),
  user: one(users, {
    fields: [cafeStaff.userId],
    references: [users.id],
  }),
}));

