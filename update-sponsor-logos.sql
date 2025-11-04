-- Update sponsor logos with better images
-- Run this in Supabase SQL Editor

UPDATE public.sponsors SET logo = 'https://ui-avatars.com/api/?name=Padel+Pro+Equipment&size=200&background=00FF41&color=000&bold=true&format=svg' WHERE name = 'Padel Pro Equipment';

UPDATE public.sponsors SET logo = 'https://ui-avatars.com/api/?name=Aqua+Minerals&size=200&background=00A8E8&color=fff&bold=true&format=svg' WHERE name = 'Aqua Minerals';

UPDATE public.sponsors SET logo = 'https://ui-avatars.com/api/?name=TechBank+Indonesia&size=200&background=6C63FF&color=fff&bold=true&format=svg' WHERE name = 'TechBank Indonesia';

UPDATE public.sponsors SET logo = 'https://ui-avatars.com/api/?name=SportWear+Plus&size=200&background=FF6B35&color=fff&bold=true&format=svg' WHERE name = 'SportWear Plus';

UPDATE public.sponsors SET logo = 'https://ui-avatars.com/api/?name=Energy+Plus&size=200&background=FFC914&color=000&bold=true&format=svg' WHERE name = 'Energy Plus Drink';

UPDATE public.sponsors SET logo = 'https://ui-avatars.com/api/?name=Health+First&size=200&background=FF1744&color=fff&bold=true&format=svg' WHERE name = 'Health First Insurance';

UPDATE public.sponsors SET logo = 'https://ui-avatars.com/api/?name=GoPadel&size=200&background=00FF41&color=000&bold=true&format=svg' WHERE name = 'GoPadel Academy';

UPDATE public.sponsors SET logo = 'https://ui-avatars.com/api/?name=Local+Property&size=200&background=424242&color=00FF41&bold=true&format=svg' WHERE name = 'Local Property Group';

-- Verify updates
SELECT name, logo FROM public.sponsors ORDER BY name;
