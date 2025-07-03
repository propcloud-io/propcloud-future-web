
-- Drop the existing RLS policy on leads table
DROP POLICY IF EXISTS "Allow full access to leads" ON leads;

-- Disable Row Level Security on the leads table
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;

-- Also disable RLS on other tables for consistent access
DROP POLICY IF EXISTS "Allow full access to job_applications" ON job_applications;
ALTER TABLE job_applications DISABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow full access to properties" ON properties;
ALTER TABLE properties DISABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow full access to reports" ON reports;
ALTER TABLE reports DISABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow full access to conversations" ON conversations;
ALTER TABLE conversations DISABLE ROW LEVEL SECURITY;
