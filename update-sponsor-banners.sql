-- Update sponsor banners with padel-themed banner images
-- Run this in Supabase SQL Editor

-- Padel Pro Equipment - Padel rackets and equipment
UPDATE public.sponsors SET logo = 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=400&fit=crop&q=80' WHERE name = 'Padel Pro Equipment';

-- Aqua Minerals - Water bottles / hydration
UPDATE public.sponsors SET logo = 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&h=400&fit=crop&q=80' WHERE name = 'Aqua Minerals';

-- TechBank Indonesia - Modern banking / finance tech
UPDATE public.sponsors SET logo = 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop&q=80' WHERE name = 'TechBank Indonesia';

-- SportWear Plus - Sports apparel / athletic wear
UPDATE public.sponsors SET logo = 'https://images.unsplash.com/photo-1556906781-1a931f5bc7e4?w=800&h=400&fit=crop&q=80' WHERE name = 'SportWear Plus';

-- Energy Plus Drink - Energy drinks / sports drinks
UPDATE public.sponsors SET logo = 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&h=400&fit=crop&q=80' WHERE name = 'Energy Plus Drink';

-- Health First Insurance - Health and wellness
UPDATE public.sponsors SET logo = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop&q=80' WHERE name = 'Health First Insurance';

-- GoPadel Academy - Padel court / training
UPDATE public.sponsors SET logo = 'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=800&h=400&fit=crop&q=80' WHERE name = 'GoPadel Academy';

-- Local Property Group - Modern buildings / real estate
UPDATE public.sponsors SET logo = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop&q=80' WHERE name = 'Local Property Group';

-- Verify updates
SELECT name, LEFT(logo, 50) as logo_preview FROM public.sponsors ORDER BY name;
