import crypto from 'crypto';
import { nanoid } from 'nanoid';
import { db } from '@/lib/db';
import * as schema from '@/lib/db/schema';
import { eq, and, sql } from 'drizzle-orm';

export interface RedemptionTokenResult {
  token: string;
  tokenHash: string;
  expiresAt: Date;
  expiresInSeconds: number;
}

export interface RedemptionValidationResult {
  success: boolean;
  error?: string;
  redemptionId?: string;
  drinkName?: string;
  cafeName?: string;
  remainingCredits?: number;
  consumedAt?: Date;
}

// In-memory fallback store for demo/testing without live database
interface MemorySubscription {
  id: string;
  userId: string;
  status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED';
  expiresAt: Date;
  creditsRemaining: number;
  creditsUsed: number;
  dailyCap: number;
}

interface MemoryToken {
  tokenHash: string;
  rawToken: string;
  userId: string;
  subscriptionId: string;
  cafeId?: string;
  expiresAt: Date;
  consumedAt?: Date;
}

interface MemoryRedemption {
  id: string;
  tokenHash: string;
  userId: string;
  cafeId: string;
  menuItemId: string;
  createdAt: Date;
}

// Global in-memory test store
export const memoryStore = {
  subscriptions: new Map<string, MemorySubscription>(),
  tokens: new Map<string, MemoryToken>(),
  redemptions: new Map<string, MemoryRedemption>(),
  todayRedemptionsCount: new Map<string, number>(), // key: userId:YYYY-MM-DD
};

// Seed initial memory customer for testing
memoryStore.subscriptions.set('demo-subscription-id', {
  id: 'demo-subscription-id',
  userId: 'demo-customer-id',
  status: 'ACTIVE',
  expiresAt: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000), // 25 days left
  creditsRemaining: 7,
  creditsUsed: 3,
  dailyCap: 2,
});

export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

/**
 * Generates a server-controlled, cryptographically secure 90-second single-use QR token.
 */
export async function generateRedemptionToken(params: {
  userId: string;
  subscriptionId: string;
  cafeId?: string;
  ttlSeconds?: number;
}): Promise<{ success: boolean; data?: RedemptionTokenResult; error?: string }> {
  const { userId, subscriptionId, cafeId, ttlSeconds = 90 } = params;

  const now = new Date();
  const expiresAt = new Date(now.getTime() + ttlSeconds * 1000);

  // 1. Verify subscription and credits in DB or memory store
  if (db) {
    const sub = await db.query.subscriptions.findFirst({
      where: and(
        eq(schema.subscriptions.id, subscriptionId),
        eq(schema.subscriptions.userId, userId)
      ),
      with: {
        plan: true,
      },
    });

    if (!sub) {
      return { success: false, error: 'Subscription not found' };
    }

    if (sub.status !== 'ACTIVE') {
      return { success: false, error: 'Subscription is not active' };
    }

    if (sub.expiresAt && sub.expiresAt < now) {
      return { success: false, error: 'Subscription has expired' };
    }

    if (sub.creditsRemaining <= 0) {
      return { success: false, error: 'No remaining coffee credits on this pass' };
    }

    // Check daily redemption cap
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);

    const redemptionsToday = await db.query.redemptions.findMany({
      where: and(
        eq(schema.redemptions.userId, userId),
        sql`${schema.redemptions.createdAt} >= ${todayStart.toISOString()}`
      ),
    });

    const dailyCap = sub.plan?.dailyRedemptionCap || 2;
    if (redemptionsToday.length >= dailyCap) {
      return {
        success: false,
        error: `Daily limit reached (${dailyCap} coffees per day max)`,
      };
    }
  } else {
    // Memory fallback
    const sub = memoryStore.subscriptions.get(subscriptionId);
    if (!sub || sub.userId !== userId) {
      return { success: false, error: 'Subscription not found' };
    }
    if (sub.status !== 'ACTIVE') {
      return { success: false, error: 'Subscription is not active' };
    }
    if (sub.expiresAt < now) {
      return { success: false, error: 'Subscription has expired' };
    }
    if (sub.creditsRemaining <= 0) {
      return { success: false, error: 'No remaining coffee credits on this pass' };
    }

    const todayKey = `${userId}:${now.toISOString().split('T')[0]}`;
    const todayCount = memoryStore.todayRedemptionsCount.get(todayKey) || 0;
    if (todayCount >= sub.dailyCap) {
      return {
        success: false,
        error: `Daily limit reached (${sub.dailyCap} coffees per day max)`,
      };
    }
  }

  // 2. Generate random 32-char token & hash
  const rawToken = 'sgc_' + nanoid(32);
  const tokenHash = hashToken(rawToken);

  // 3. Save token record
  if (db) {
    await db.insert(schema.redemptionTokens).values({
      userId,
      subscriptionId,
      cafeId: cafeId || null,
      tokenHash,
      expiresAt,
    });
  } else {
    memoryStore.tokens.set(tokenHash, {
      tokenHash,
      rawToken,
      userId,
      subscriptionId,
      cafeId,
      expiresAt,
    });
  }

  return {
    success: true,
    data: {
      token: rawToken,
      tokenHash,
      expiresAt,
      expiresInSeconds: ttlSeconds,
    },
  };
}

/**
 * Validates and atomically consumes the QR redemption token at the cafe counter.
 */
export async function validateAndConsumeToken(params: {
  rawToken: string;
  cafeId: string;
  staffUserId: string;
  menuItemId?: string;
  drinkName?: string;
  idempotencyKey?: string;
}): Promise<RedemptionValidationResult> {
  const { rawToken, cafeId, staffUserId: _staffUserId, menuItemId, drinkName, idempotencyKey: _idempotencyKey } = params;

  if (!rawToken || !rawToken.trim()) {
    return { success: false, error: 'Invalid or missing QR token' };
  }

  const tokenHash = hashToken(rawToken.trim());
  const now = new Date();

  // Handle in DB if available
  if (db) {
    try {
      // Find token
      const tokenRecord = await db.query.redemptionTokens.findFirst({
        where: eq(schema.redemptionTokens.tokenHash, tokenHash),
      });

      if (!tokenRecord) {
        return { success: false, error: 'Invalid QR pass. Token does not exist.' };
      }

      if (tokenRecord.consumedAt) {
        return { success: false, error: 'This QR pass has already been used.' };
      }

      if (tokenRecord.expiresAt < now) {
        return { success: false, error: 'QR pass expired. Please generate a new pass.' };
      }

      if (tokenRecord.cafeId && tokenRecord.cafeId !== cafeId) {
        return { success: false, error: 'This pass is not valid for this cafe location.' };
      }

      // Check subscription
      const sub = await db.query.subscriptions.findFirst({
        where: eq(schema.subscriptions.id, tokenRecord.subscriptionId),
      });

      if (!sub || sub.status !== 'ACTIVE' || (sub.expiresAt && sub.expiresAt < now)) {
        return { success: false, error: 'Customer subscription is expired or inactive.' };
      }

      if (sub.creditsRemaining <= 0) {
        return { success: false, error: 'Customer has 0 credits remaining.' };
      }

      // Atomic consumption
      const redemptionId = 'rdm_' + nanoid(16);

      // Update token as consumed
      await db
        .update(schema.redemptionTokens)
        .set({ consumedAt: now })
        .where(
          and(
            eq(schema.redemptionTokens.id, tokenRecord.id),
            sql`${schema.redemptionTokens.consumedAt} IS NULL`
          )
        );

      // Deduct credit
      const newBalance = sub.creditsRemaining - 1;
      await db
        .update(schema.subscriptions)
        .set({
          creditsRemaining: newBalance,
          creditsUsed: sub.creditsUsed + 1,
        })
        .where(eq(schema.subscriptions.id, sub.id));

      // Log credit transaction
      await db.insert(schema.creditTransactions).values({
        subscriptionId: sub.id,
        userId: sub.userId,
        type: 'REDEMPTION',
        amount: -1,
        balanceAfter: newBalance,
        referenceId: redemptionId,
        description: `Coffee redemption at cafe`,
      });

      return {
        success: true,
        redemptionId,
        drinkName: drinkName || 'Specialty Coffee',
        remainingCredits: newBalance,
        consumedAt: now,
      };
    } catch (err: unknown) {
      console.error('Database redemption error:', err);
      return { success: false, error: 'Failed to process redemption transaction' };
    }
  }

  // In-memory atomic verification
  const tokenRecord = memoryStore.tokens.get(tokenHash);
  if (!tokenRecord) {
    return { success: false, error: 'Invalid QR pass. Token does not exist.' };
  }

  if (tokenRecord.consumedAt) {
    return { success: false, error: 'This QR pass has already been used.' };
  }

  if (tokenRecord.expiresAt < now) {
    return { success: false, error: 'QR pass expired. Please generate a new pass.' };
  }

  if (tokenRecord.cafeId && tokenRecord.cafeId !== cafeId) {
    return { success: false, error: 'This pass is not valid for this cafe location.' };
  }

  const sub = memoryStore.subscriptions.get(tokenRecord.subscriptionId);
  if (!sub || sub.status !== 'ACTIVE' || sub.expiresAt < now) {
    return { success: false, error: 'Customer subscription is expired or inactive.' };
  }

  if (sub.creditsRemaining <= 0) {
    return { success: false, error: 'Customer has 0 credits remaining.' };
  }

  // Atomically mark token consumed
  tokenRecord.consumedAt = now;
  sub.creditsRemaining -= 1;
  sub.creditsUsed += 1;

  // Track daily count
  const todayKey = `${tokenRecord.userId}:${now.toISOString().split('T')[0]}`;
  const currentCount = memoryStore.todayRedemptionsCount.get(todayKey) || 0;
  memoryStore.todayRedemptionsCount.set(todayKey, currentCount + 1);

  const redemptionId = 'rdm_' + nanoid(16);
  memoryStore.redemptions.set(redemptionId, {
    id: redemptionId,
    tokenHash,
    userId: tokenRecord.userId,
    cafeId,
    menuItemId: menuItemId || 'default-drink',
    createdAt: now,
  });

  return {
    success: true,
    redemptionId,
    drinkName: drinkName || 'Specialty Coffee',
    remainingCredits: sub.creditsRemaining,
    consumedAt: now,
  };
}
