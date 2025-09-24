-- Fix RLS policies for pricing table to allow admin access
-- Drop the restrictive policy
DROP POLICY IF EXISTS "Enable all access for authenticated users only" ON public.pricing;

-- Create a more permissive policy for admin operations
-- This allows all operations for now, but in production you might want to restrict this further
CREATE POLICY "Enable all access for admin operations" ON public.pricing FOR ALL USING (TRUE);

-- Alternative: If you want to keep some restrictions, you can use:
-- CREATE POLICY "Enable all access for admin operations" ON public.pricing FOR ALL USING (
--   auth.role() = 'authenticated' OR 
--   auth.role() = 'service_role' OR
--   auth.role() = 'anon'
-- );
