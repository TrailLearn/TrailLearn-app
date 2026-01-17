-- Enable RLS on all tables
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Account" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Session" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "VerificationToken" ENABLE ROW LEVEL SECURITY;

-- Create policies for Service Role (Prisma/Backend) - FULL ACCESS
-- User Table
DROP POLICY IF EXISTS "Enable all for service_role" ON "User";
CREATE POLICY "Enable all for service_role" ON "User"
    FOR ALL
    TO service_role, postgres
    USING (true)
    WITH CHECK (true);

-- Account Table
DROP POLICY IF EXISTS "Enable all for service_role" ON "Account";
CREATE POLICY "Enable all for service_role" ON "Account"
    FOR ALL
    TO service_role, postgres
    USING (true)
    WITH CHECK (true);

-- Session Table
DROP POLICY IF EXISTS "Enable all for service_role" ON "Session";
CREATE POLICY "Enable all for service_role" ON "Session"
    FOR ALL
    TO service_role, postgres
    USING (true)
    WITH CHECK (true);

-- VerificationToken Table
DROP POLICY IF EXISTS "Enable all for service_role" ON "VerificationToken";
CREATE POLICY "Enable all for service_role" ON "VerificationToken"
    FOR ALL
    TO service_role, postgres
    USING (true)
    WITH CHECK (true);

-- Note: Implicitly DENY ALL for 'anon' and 'authenticated' (public access) 
-- because no policies exist for them.