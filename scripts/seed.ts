import bcrypt from 'bcryptjs';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../src/lib/db/schema';

async function seed() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('❌ Error: DATABASE_URL is not set.');
    process.exit(1);
  }

  console.log('🌱 Starting SUGGI CLUB database seed...');
  const db = drizzle(neon(connectionString), { schema });

  // 1. Seed City (Bengaluru)
  console.log('Inserting Bengaluru city...');
  const [bengaluru] = await db
    .insert(schema.cities)
    .values({
      name: 'Bengaluru',
      slug: 'bengaluru',
      state: 'Karnataka',
      country: 'India',
      isActive: true,
    })
    .onConflictDoNothing()
    .returning();

  const cityId = bengaluru?.id || (await db.query.cities.findFirst())!.id;

  // 2. Hash passwords
  const adminPass = await bcrypt.hash('Admin@123', 10);
  const staffPass = await bcrypt.hash('Staff@123', 10);
  const customerPass = await bcrypt.hash('Customer@123', 10);

  // 3. Seed Users
  console.log('Inserting seed users...');
  const [adminUser] = await db
    .insert(schema.users)
    .values({
      name: 'SUGGI Admin',
      email: 'admin@suggiglobal.com',
      phone: '+919876543210',
      passwordHash: adminPass,
      isEmailVerified: true,
      isActive: true,
    })
    .onConflictDoNothing()
    .returning();

  const [opsAdmin] = await db
    .insert(schema.users)
    .values({
      name: 'Operations Lead',
      email: 'ops@suggiglobal.com',
      phone: '+919876543211',
      passwordHash: adminPass,
      isEmailVerified: true,
      isActive: true,
    })
    .onConflictDoNothing()
    .returning();

  const [financeAdmin] = await db
    .insert(schema.users)
    .values({
      name: 'Finance Manager',
      email: 'finance@suggiglobal.com',
      phone: '+919876543212',
      passwordHash: adminPass,
      isEmailVerified: true,
      isActive: true,
    })
    .onConflictDoNothing()
    .returning();

  const [maverickOwner] = await db
    .insert(schema.users)
    .values({
      name: 'Ashish D',
      email: 'owner@maverickcoffee.com',
      phone: '+919845012345',
      passwordHash: staffPass,
      isEmailVerified: true,
      isActive: true,
    })
    .onConflictDoNothing()
    .returning();

  const [maverickStaff] = await db
    .insert(schema.users)
    .values({
      name: 'Rohan (Barista)',
      email: 'barista@maverickcoffee.com',
      phone: '+919845054321',
      passwordHash: staffPass,
      isEmailVerified: true,
      isActive: true,
    })
    .onConflictDoNothing()
    .returning();

  const [customerUser] = await db
    .insert(schema.users)
    .values({
      name: 'Rahul Sharma',
      email: 'rahul.customer@gmail.com',
      phone: '+919988776655',
      passwordHash: customerPass,
      isEmailVerified: true,
      isActive: true,
    })
    .onConflictDoNothing()
    .returning();

  // Assign roles
  if (adminUser) {
    await db.insert(schema.userRoles).values({ userId: adminUser.id, role: 'SUPER_ADMIN' });
  }
  if (opsAdmin) {
    await db.insert(schema.userRoles).values({ userId: opsAdmin.id, role: 'OPERATIONS_ADMIN' });
  }
  if (financeAdmin) {
    await db.insert(schema.userRoles).values({ userId: financeAdmin.id, role: 'FINANCE_ADMIN' });
  }
  if (maverickOwner) {
    await db.insert(schema.userRoles).values({ userId: maverickOwner.id, role: 'CAFE_OWNER' });
  }
  if (maverickStaff) {
    await db.insert(schema.userRoles).values({ userId: maverickStaff.id, role: 'CAFE_STAFF' });
  }
  if (customerUser) {
    await db.insert(schema.userRoles).values({ userId: customerUser.id, role: 'CUSTOMER' });
  }

  // 4. Seed Subscription Plans
  console.log('Inserting subscription plans...');
  await db
    .insert(schema.subscriptionPlans)
    .values([
      {
        name: 'Weekly Explorer',
        slug: 'weekly-explorer',
        description: 'Perfect for visitors, travellers or a week of cafe hopping across Bengaluru.',
        pricePaise: 24900, // ₹249
        validityDays: 7,
        creditsCount: 3,
        dailyRedemptionCap: 2,
        isPremiumTier: false,
        features: ['3 Specialty Coffee Redemptions', '7 Days Validity', 'Valid at all Approved Cafes', 'Standard Menu Items', 'Mobile QR Pass'],
        sortOrder: 1,
      },
      {
        name: 'Coffee 10',
        slug: 'coffee-10',
        description: 'Our most popular mid-tier plan for everyday coffee lovers and hybrid professionals.',
        pricePaise: 69900, // ₹699
        validityDays: 30,
        creditsCount: 10,
        dailyRedemptionCap: 2,
        isPremiumTier: false,
        features: ['10 Specialty Coffee Redemptions', '30 Days Validity', 'Save over 40% on retail cafe prices', 'Standard Menu Items', 'Exclusive Partner Perks'],
        sortOrder: 2,
      },
      {
        name: 'Coffee 15',
        slug: 'coffee-15',
        description: 'For passionate cafe regulars and remote workers who want coffee every weekday.',
        pricePaise: 99900, // ₹999
        validityDays: 30,
        creditsCount: 15,
        dailyRedemptionCap: 2,
        isPremiumTier: false,
        features: ['15 Specialty Coffee Redemptions', '30 Days Validity', 'Maximum value at ~₹66/cup', 'Standard Menu Items', 'Weekend Roastery Events Invites'],
        sortOrder: 3,
      },
      {
        name: 'Premium Club',
        slug: 'premium-club',
        description: 'Full unconstrained access to single-origin pourovers, manual brews and signature drinks.',
        pricePaise: 149900, // ₹1,499
        validityDays: 30,
        creditsCount: 15,
        dailyRedemptionCap: 3,
        isPremiumTier: true,
        features: ['15 Premium Specialty Redemptions', 'Single Origin & Manual Brews included', 'Priority cafe seating where available', '30 Days Validity', 'Exclusive cupping sessions'],
        sortOrder: 4,
      },
    ])
    .onConflictDoNothing();

  console.log('✅ Seed data completed successfully!');
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
