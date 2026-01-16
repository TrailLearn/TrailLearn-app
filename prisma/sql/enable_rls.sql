-- Enable Row Level Security on sensitive tables
-- This ensures that by default, no one can access these tables via the Data API
-- unless they are using the service_role key (which Prisma does) or specific policies.

-- 1. Enable RLS
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Account" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Session" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Post" ENABLE ROW LEVEL SECURITY;
-- Add VerificationToken if deemed sensitive, though often public-ish for token exchange
ALTER TABLE "VerificationToken" ENABLE ROW LEVEL SECURITY;

-- 2. Create Policies for Service Role (Backend Access)
-- The 'postgres' role or 'service_role' typically bypasses RLS, but explicit policies allow
-- control if we ever switch the connection user.
-- For Supabase, the 'service_role' user has bypass RLS attribute by default, but
-- it is good practice to be explicit if using a non-superuser connection in future.

-- Policy: Service Role has Full Access
CREATE POLICY "Service Role Full Access User" ON "User"
  AS PERMISSIVE FOR ALL
  TO service_role, postgres
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service Role Full Access Account" ON "Account"
  AS PERMISSIVE FOR ALL
  TO service_role, postgres
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service Role Full Access Session" ON "Session"
  AS PERMISSIVE FOR ALL
  TO service_role, postgres
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service Role Full Access Post" ON "Post"
  AS PERMISSIVE FOR ALL
  TO service_role, postgres
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service Role Full Access VerificationToken" ON "VerificationToken"
  AS PERMISSIVE FOR ALL
  TO service_role, postgres
  USING (true)
  WITH CHECK (true);

-- 3. Default Deny for Public/Anon (Implicit by enabling RLS without other policies)
-- No policies added for 'public' or 'anon' roles means they cannot SELECT/INSERT/UPDATE/DELETE.
