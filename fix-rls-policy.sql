-- Fix RLS policy for inquiries table
-- Run this in Supabase SQL Editor

-- Drop existing policy
DROP POLICY IF EXISTS "Anyone can submit inquiries" ON public.inquiries;

-- Recreate with correct permissions
CREATE POLICY "Anyone can submit inquiries"
    ON public.inquiries
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Verify policy was created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'inquiries';
