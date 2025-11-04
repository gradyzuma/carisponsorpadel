-- CariSponsorPadel Database Schema
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor → New Query)

-- ============================================
-- 1. Create sponsors table
-- ============================================
CREATE TABLE IF NOT EXISTS public.sponsors (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    logo TEXT,
    category TEXT NOT NULL,
    description TEXT,
    min_budget BIGINT NOT NULL,
    max_budget BIGINT NOT NULL,
    location TEXT NOT NULL,
    province TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    contact_phone TEXT,
    benefits TEXT[] DEFAULT '{}',
    website TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. Create inquiries table
-- ============================================
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sponsor_id UUID REFERENCES public.sponsors(id) ON DELETE SET NULL,
    sponsor_name TEXT NOT NULL,

    -- Court owner details
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    court_name TEXT NOT NULL,
    court_location TEXT NOT NULL,

    -- Event details
    event_type TEXT,
    participants INTEGER,
    message TEXT NOT NULL,

    -- Status tracking
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'rejected')),

    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. Create updated_at trigger function
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to sponsors table
DROP TRIGGER IF EXISTS update_sponsors_updated_at ON public.sponsors;
CREATE TRIGGER update_sponsors_updated_at
    BEFORE UPDATE ON public.sponsors
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to inquiries table
DROP TRIGGER IF EXISTS update_inquiries_updated_at ON public.inquiries;
CREATE TRIGGER update_inquiries_updated_at
    BEFORE UPDATE ON public.inquiries
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 4. Enable Row Level Security (RLS)
-- ============================================
ALTER TABLE public.sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 5. Create RLS Policies
-- ============================================

-- Sponsors: Anyone can read active sponsors
DROP POLICY IF EXISTS "Public can view active sponsors" ON public.sponsors;
CREATE POLICY "Public can view active sponsors"
    ON public.sponsors
    FOR SELECT
    USING (status = 'active');

-- Sponsors: Authenticated users can insert/update/delete (for admin later)
DROP POLICY IF EXISTS "Authenticated users can manage sponsors" ON public.sponsors;
CREATE POLICY "Authenticated users can manage sponsors"
    ON public.sponsors
    FOR ALL
    USING (auth.role() = 'authenticated');

-- Inquiries: Anyone can insert (public can submit inquiries)
DROP POLICY IF EXISTS "Anyone can submit inquiries" ON public.inquiries;
CREATE POLICY "Anyone can submit inquiries"
    ON public.inquiries
    FOR INSERT
    WITH CHECK (true);

-- Inquiries: Only authenticated users can view (for admin dashboard later)
DROP POLICY IF EXISTS "Authenticated users can view inquiries" ON public.inquiries;
CREATE POLICY "Authenticated users can view inquiries"
    ON public.inquiries
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- ============================================
-- 6. Create indexes for better performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_sponsors_status ON public.sponsors(status);
CREATE INDEX IF NOT EXISTS idx_sponsors_location ON public.sponsors(location);
CREATE INDEX IF NOT EXISTS idx_sponsors_category ON public.sponsors(category);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_sponsor_id ON public.inquiries(sponsor_id);

-- ============================================
-- 7. Insert sample sponsors data
-- ============================================
INSERT INTO public.sponsors (name, logo, category, description, min_budget, max_budget, location, province, contact_email, contact_phone, benefits, website) VALUES
('Padel Pro Equipment', 'https://via.placeholder.com/150', 'Sports Equipment', 'Leading supplier of professional padel equipment and gear. We provide rackets, balls, and accessories for events.', 5000000, 20000000, 'Jakarta', 'DKI Jakarta', 'sponsor@padelpro.com', '+62 21 1234567', ARRAY['Equipment provision', 'Brand visibility', 'Social media promotion'], 'https://padelpro.com'),

('Aqua Minerals', 'https://via.placeholder.com/150', 'Beverages', 'Premium mineral water brand. We support healthy lifestyle events with hydration solutions.', 10000000, 50000000, 'Bandung', 'Jawa Barat', 'events@aquaminerals.com', '+62 22 9876543', ARRAY['Beverage supply', 'Banner placement', 'Prize contributions'], 'https://aquaminerals.com'),

('TechBank Indonesia', 'https://via.placeholder.com/150', 'Financial Services', 'Digital banking solutions for modern Indonesia. Supporting sports and community events nationwide.', 20000000, 100000000, 'Jakarta', 'DKI Jakarta', 'sponsorship@techbank.id', '+62 21 5555000', ARRAY['Cash prizes', 'Digital payment integration', 'Marketing support', 'Branded merchandise'], 'https://techbank.id'),

('SportWear Plus', 'https://via.placeholder.com/150', 'Apparel', 'Premium sports apparel manufacturer. Specializing in tennis and padel clothing.', 8000000, 30000000, 'Surabaya', 'Jawa Timur', 'partnerships@sportwearplus.com', '+62 31 7777888', ARRAY['Apparel for participants', 'Branded uniforms', 'Discount vouchers'], 'https://sportwearplus.com'),

('Energy Plus Drink', 'https://via.placeholder.com/150', 'Beverages', 'Leading energy drink brand for athletes. Fueling sports events across Indonesia.', 15000000, 60000000, 'Jakarta', 'DKI Jakarta', 'sports@energyplus.co.id', '+62 21 8888999', ARRAY['Product sampling', 'Event branding', 'Athlete endorsements'], 'https://energyplus.co.id'),

('Health First Insurance', 'https://via.placeholder.com/150', 'Insurance', 'Comprehensive health and sports insurance coverage. Protecting athletes and event organizers.', 12000000, 40000000, 'Bali', 'Bali', 'events@healthfirst.id', '+62 361 222333', ARRAY['Insurance coverage', 'Medical support', 'Safety equipment'], 'https://healthfirst.id'),

('GoPadel Academy', 'https://via.placeholder.com/150', 'Sports Training', 'Professional padel training academy. Providing coaching and tournament organization support.', 5000000, 25000000, 'Yogyakarta', 'DI Yogyakarta', 'info@gopadel.com', '+62 274 555666', ARRAY['Professional coaching', 'Tournament expertise', 'Training programs'], 'https://gopadel.com'),

('Local Property Group', 'https://via.placeholder.com/150', 'Real Estate', 'Premium property developer with focus on sports facilities. Building communities through sports.', 30000000, 150000000, 'Tangerang', 'Banten', 'marketing@localpropertygroup.com', '+62 21 4444555', ARRAY['Venue support', 'Large-scale branding', 'Long-term partnerships', 'Facility upgrades'], 'https://localpropertygroup.com')

ON CONFLICT DO NOTHING;

-- ============================================
-- Success message
-- ============================================
DO $$
BEGIN
    RAISE NOTICE 'Database schema created successfully!';
    RAISE NOTICE 'Tables created: sponsors, inquiries';
    RAISE NOTICE 'Sample sponsors inserted: 8 sponsors';
END $$;
