-- Apply Row Level Security Policies for Users Table
-- This file is applied separately from Prisma migrations because
-- RLS policies require Supabase's auth schema which isn't available
-- in Prisma's shadow database during migration validation

-- Enable Row Level Security
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Initial DROP to restart policies
DROP POLICY IF EXISTS "Users can view own data" ON "users";
DROP POLICY IF EXISTS "Users can update own data" ON "users";
DROP POLICY IF EXISTS "Users can insert own data" ON "users";

-- RLS Policies
CREATE POLICY "Users can view own data" ON "users" 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON "users" 
  FOR UPDATE 
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own data" ON "users" 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Grant permissions to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;
GRANT ALL ON TABLE "users" TO authenticated;
GRANT ALL ON TABLE "users" TO service_role;
