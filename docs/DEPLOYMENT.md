# SUGGI CLUB — Zero-Cost-First Production & Deployment Guide

## 1. Executive Summary & Brand Architecture

- **Parent Brand**: SUGGI GLOBAL ([suggiglobal.com](https://suggiglobal.com))
- **Product Name**: SUGGI CLUB
- **Target Domain**: [club.suggiglobal.com](https://club.suggiglobal.com)
- **Launch City**: Bengaluru, Karnataka, India
- **Core Product**: Specialty coffee subscription PWA connecting subscribers, partner cafes, and operations.

> [!IMPORTANT]
> **Existing SUGGI GLOBAL Preservation**:
> This platform runs as an independent application under the `club.suggiglobal.com` subdomain. The primary website `suggiglobal.com` and its DNS apex records remain completely untouched.

---

## 2. Infrastructure & Free-Tier Services

| Layer | Service | Free Tier Limits | What Stops Working When Limits Are Reached |
|---|---|---|---|
| **Source Control** | GitHub Free | Unlimited public/private repos | Nothing for normal usage |
| **Application Hosting** | Netlify Free / Vercel Free | 100 GB bandwidth / mo, 300 build minutes / mo | Deployments pause until next billing cycle; app remains cached |
| **Database** | Neon Serverless PostgreSQL | 0.5 GB storage, 1 compute project | Writes fail if 0.5 GB is exceeded. Compute auto-suspends after 5 min inactivity (wakes up in ~1-2 sec) |
| **Payments** | Razorpay (Test Mode) | Test API keys free, unlimited sandbox transactions | Only test mode transactions can be simulated |
| **PWA & Assets** | Local Next.js Service Worker | Infinite client-side storage | Falls back cleanly to network |

---

## 3. Local Development Setup

### Prerequisites
- Node.js 20+ installed
- pnpm or npm

### Quick Start
```bash
# 1. Clone or navigate to the repository
cd "d:\suggi club"

# 2. Verify environment file
cp .env.example .env.local

# 3. Compile TypeScript
node .\node_modules\typescript\bin\tsc --noEmit

# 4. Run automated test suite (Unit & Integration)
node .\node_modules\vitest\vitest.mjs run

# 5. Start development server
node .\node_modules\next\dist\bin\next dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 4. Database Setup & Migrations (Neon PostgreSQL)

### Step 1: Create Free Neon Project
1. Go to [neon.tech](https://neon.tech) and sign up for a free account.
2. Create a new project: `suggi-club-production`.
3. Select region: `ap-southeast-1` (Singapore) or closest to India.
4. Copy the connection string provided by Neon:
   ```env
   DATABASE_URL=postgresql://neondb_owner:password@ep-cool-fog-12345.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
   ```

### Step 2: Run Drizzle Migrations
```bash
# Generate SQL migration if schema changed
node .\node_modules\drizzle-kit\bin.cjs generate

# Push migrations directly to Neon database
node .\node_modules\drizzle-kit\bin.cjs migrate
```

### Step 3: Run Seed Script
```bash
# Inserts Bengaluru city, test plans, admin, and cafe partners
npx tsx scripts/seed.ts
```

---

## 5. Subdomain DNS Setup (`club.suggiglobal.com`)

To route `club.suggiglobal.com` without disturbing `suggiglobal.com`:

1. Open your DNS provider for `suggiglobal.com` (Cloudflare, GoDaddy, Namecheap, etc.).
2. Add a new **CNAME record**:
   - **Type**: `CNAME`
   - **Name / Host**: `club`
   - **Target / Value**: `<your-site-name>.netlify.app` (or `cname.vercel-dns.com` if using Vercel)
   - **TTL**: Auto / 3600
3. **DO NOT** edit or remove the `@` apex record, `www` record, or existing MX / email records.
4. Netlify / Vercel will automatically provision a free Let's Encrypt SSL/TLS certificate for `club.suggiglobal.com`.

---

## 6. Netlify Deployment Instructions

1. Link your GitHub repository to Netlify.
2. Set Build Settings:
   - **Base directory**: `.`
   - **Build command**: `pnpm run build` (or `npm run build`)
   - **Publish directory**: `.next`
3. Add Environment Variables in Netlify Dashboard:
   - `DATABASE_URL`: Your Neon PostgreSQL connection string
   - `AUTH_SECRET`: A 32-character random string (e.g. `openssl rand -base64 32`)
   - `NEXT_PUBLIC_APP_URL`: `https://club.suggiglobal.com`
4. Deploy!

---

## 7. Database Backup & Disaster Recovery

### Manual Backup (CLI)
```bash
# Dump complete schema and table data to compressed SQL file
pg_dump "$DATABASE_URL" -F c -b -v -f "./backups/suggi_backup_$(date +%Y%m%d).dump"
```

### Restore from Backup
```bash
pg_restore -v -d "$DATABASE_URL" "./backups/suggi_backup_20261120.dump"
```

### Neon Instant Branching (Zero-Cost Snapshots)
Neon supports instant copy-on-write branches. Before running major schema alterations:
1. In Neon dashboard, click **Branches** → **Create Branch**.
2. Name it `pre-migration-snapshot`.
3. If any migration fails, you can switch back to this branch in under 5 seconds.

---

## 8. Pilot Readiness Checklist

- [x] Strict tenant isolation for cafes.
- [x] Server-controlled, 90-second single-use QR tokens.
- [x] Atomic concurrency locks preventing double spending.
- [x] Integer paise financial precision.
- [x] Role-based access control (`SUPER_ADMIN`, `CAFE_OWNER`, `CAFE_STAFF`, `CUSTOMER`).
- [x] PWA manifest and service worker caching static assets only.
- [x] Offline fallback screen.
- [x] Automated test suite passing with Vitest.
