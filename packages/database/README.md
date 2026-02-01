# Database Package

Prisma-based database layer for the application with Supabase integration.

## Available Scripts

### Development

```bash
# Run all migrations and apply RLS policies (recommended for first-time setup)
pnpm db:setup

# Run migrations only
pnpm db:migrate:dev

# Apply RLS policies only
pnpm db:apply:rls

# Generate Prisma Client
pnpm db:generate
```

### Production

```bash
# Deploy migrations to production
pnpm db:migrate:deploy
```

### Utilities

```bash
# Open Prisma Studio (database GUI)
pnpm db:studio

# Push schema changes without migrations (dev only)
pnpm db:push
```

## First-Time Setup

1. Ensure local Supabase is running:
   ```bash
   npx supabase start
   ```

2. Set up database with migrations and RLS:
   ```bash
   pnpm --filter @repo/database db:setup
   ```

3. Verify connection:
   ```bash
   pnpm --filter @repo/database exec tsx src/test-connection.ts
   ```

## Architecture Notes

### RLS Policies Separation

RLS policies are kept in `prisma/apply-rls.sql` and applied separately from Prisma migrations because:

- Prisma's shadow database doesn't include Supabase's `auth` schema
- RLS policies use `auth.uid()` which requires the auth schema
- Separating concerns allows clean migration validation

**When to apply RLS:**
- After running migrations: `pnpm db:apply:rls`
- Automatically via: `pnpm db:setup`

### PrismaClient Singleton

The package exports a singleton `prisma` instance to prevent connection pool exhaustion:

```typescript
import { prisma } from '@repo/database';

// Use in your app
const users = await prisma.user.findMany();
```

## Schema Conventions

- **Database:** snake_case (e.g., `created_at`)
- **TypeScript:** camelCase (e.g., `createdAt`)
- **Mapping:** Handled via `@map()` in schema.prisma

## Troubleshooting

### Migration conflicts
If you see "migration was modified after it was applied":
```bash
pnpm db:migrate:reset --force
pnpm db:apply:rls
```

### RLS policies already exist
This is normal if running `db:apply:rls` multiple times. The policies are idempotent in production but will error in dev. You can ignore this or drop/recreate the database.

### Connection issues
Ensure `.env` file exists with:
```
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres
```
