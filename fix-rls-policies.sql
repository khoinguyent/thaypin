-- Fix RLS policies for admin authentication
-- This script will allow the service role to access admin_users table

-- First, let's check current policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'admin_users';

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can view own profile" ON admin_users;
DROP POLICY IF EXISTS "Users can update own profile" ON admin_users;

-- Option 1: Disable RLS completely for admin_users (Recommended for admin auth)
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Option 2: If you want to keep RLS enabled, create permissive policies
-- Uncomment the lines below if you prefer Option 2

/*
-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role to access all admin_users data
CREATE POLICY "Service role access" ON admin_users
  FOR ALL USING (true);

-- Policy: Allow authenticated users to read admin_users (for admin panel)
CREATE POLICY "Authenticated users can read admin_users" ON admin_users
  FOR SELECT USING (true);

-- Policy: Allow service role to update admin_users
CREATE POLICY "Service role can update admin_users" ON admin_users
  FOR UPDATE USING (true);
*/

-- Verify the admin user exists and has correct password hash
SELECT 
  id, 
  username, 
  email, 
  full_name, 
  role, 
  is_active,
  LENGTH(password_hash) as hash_length,
  password_hash
FROM admin_users 
WHERE username = 'admin';

-- If no admin user exists, insert one
INSERT INTO admin_users (username, password_hash, email, full_name, role, is_active) 
VALUES (
  'admin', 
  '$2b$10$G9Il8Lq2W1pjQU0EcUFsk.B4ocB6MOLW.GjXGmkiJqHXKt3l1ossa', 
  'admin@thaypin.vn', 
  'Administrator', 
  'admin',
  true
) ON CONFLICT (username) 
DO UPDATE SET 
  password_hash = EXCLUDED.password_hash,
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- Final verification
SELECT 
  'RLS Status' as check_type,
  CASE 
    WHEN relrowsecurity THEN 'ENABLED' 
    ELSE 'DISABLED' 
  END as status
FROM pg_class 
WHERE relname = 'admin_users';

SELECT 
  'Admin User' as check_type,
  username,
  CASE 
    WHEN is_active THEN 'ACTIVE' 
    ELSE 'INACTIVE' 
  END as status,
  LENGTH(password_hash) as hash_length
FROM admin_users 
WHERE username = 'admin';
