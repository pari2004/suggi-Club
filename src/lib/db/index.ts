import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL || '';

export const db = connectionString
  ? drizzle(neon(connectionString), { schema })
  : (null as unknown as ReturnType<typeof drizzle<typeof schema>>);

export function getDb() {
  if (!db) {
    throw new Error('DATABASE_URL is not set. Please configure your Neon PostgreSQL connection string.');
  }
  return db;
}

export * from './schema';
