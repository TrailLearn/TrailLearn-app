-- Enable RLS on BusinessRule
ALTER TABLE "BusinessRule" ENABLE ROW LEVEL SECURITY;

-- Policy: Authenticated users can read rules
DROP POLICY IF EXISTS "Enable read for authenticated users" ON "BusinessRule";
CREATE POLICY "Enable read for authenticated users" ON "BusinessRule"
    FOR SELECT
    TO authenticated
    USING (true);

-- Policy: Service role (backend) has full access
DROP POLICY IF EXISTS "Enable all for service_role" ON "BusinessRule";
CREATE POLICY "Enable all for service_role" ON "BusinessRule"
    FOR ALL
    TO service_role, postgres
    USING (true)
    WITH CHECK (true);
