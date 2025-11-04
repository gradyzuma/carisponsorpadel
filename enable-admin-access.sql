-- Enable admin access to sponsors table
-- Run this in Supabase SQL Editor to allow managing sponsors

-- Drop existing restrictive policy
DROP POLICY IF EXISTS "Authenticated users can manage sponsors" ON public.sponsors;

-- Create new policy allowing public write access (for now - add auth later)
CREATE POLICY "Public can insert sponsors"
    ON public.sponsors
    FOR INSERT
    TO public
    WITH CHECK (true);

CREATE POLICY "Public can update sponsors"
    ON public.sponsors
    FOR UPDATE
    TO public
    USING (true);

CREATE POLICY "Public can delete sponsors"
    ON public.sponsors
    FOR DELETE
    TO public
    USING (true);

-- NOTE: For production, you should:
-- 1. Set up Supabase Auth
-- 2. Replace "TO public" with "TO authenticated"
-- 3. Add user role checks: WHERE auth.uid() = user_id

SELECT 'Admin access enabled! You can now create/update/delete sponsors.' AS message;
