# CariSponsorPadel

A modern web platform connecting padel court owners with potential sponsors in Indonesia.

## Features

- 🔍 Search and filter sponsors by location, category, and budget
- 💰 View detailed sponsor information including budget ranges and benefits
- 📝 Submit sponsorship inquiries directly through the platform
- 🔧 Admin dashboard for managing sponsors and viewing inquiries
- 🎨 Modern, welcoming design with teal/white color scheme

## Tech Stack

- **Frontend**: Vue.js 3 (Composition API)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (for admin features)

## Project Structure

```
carisponsorpadel/
├── src/
│   ├── components/
│   │   ├── SponsorCard.vue          # Individual sponsor card display
│   │   ├── ContactModal.vue         # Inquiry submission form
│   │   └── AdminDashboard.vue       # Admin panel for CRUD operations
│   ├── composables/
│   │   ├── useSponsors.js           # Sponsor data fetching logic
│   │   └── useInquiries.js          # Inquiry submission logic
│   ├── config/
│   │   ├── supabase.js              # Supabase client configuration
│   │   └── mockData.js              # Helper functions
│   ├── App.vue                      # Main application component
│   └── main.js                      # Application entry point
├── public/                          # Static assets
└── screenshots/                     # Application screenshots

```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### 1. Clone the Repository

```bash
git clone <repository-url>
cd carisponsorpadel
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**To get these credentials:**
1. Go to your [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Go to Settings → API
4. Copy the Project URL and anon/public key

### 4. Set Up Supabase Database

Run the following SQL in your Supabase SQL Editor:

#### Create Tables

```sql
-- Create sponsors table
CREATE TABLE public.sponsors (
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
  benefits TEXT[],
  website TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create inquiries table
CREATE TABLE public.inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sponsor_id UUID REFERENCES public.sponsors(id),
  sponsor_name TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  court_name TEXT NOT NULL,
  court_location TEXT NOT NULL,
  event_type TEXT,
  participants INTEGER,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to sponsors"
  ON public.sponsors FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert to inquiries"
  ON public.inquiries FOR INSERT
  WITH CHECK (true);

-- Create policies for admin access (requires authentication)
CREATE POLICY "Allow authenticated users to manage sponsors"
  ON public.sponsors FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to read inquiries"
  ON public.inquiries FOR SELECT
  USING (auth.role() = 'authenticated');
```

#### Add Sample Sponsor Data (Optional)

See `supabase-schema.sql` for sample sponsor data.

#### Update Sponsor Banner Images

```sql
-- Update sponsor logos with banner-style images
UPDATE public.sponsors SET logo = 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=400&fit=crop&q=80' WHERE name = 'Padel Pro Equipment';
UPDATE public.sponsors SET logo = 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&h=400&fit=crop&q=80' WHERE name = 'Aqua Minerals';
UPDATE public.sponsors SET logo = 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop&q=80' WHERE name = 'TechBank Indonesia';
UPDATE public.sponsors SET logo = 'https://images.unsplash.com/photo-1556906781-1a931f5bc7e4?w=800&h=400&fit=crop&q=80' WHERE name = 'SportWear Plus';
UPDATE public.sponsors SET logo = 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&h=400&fit=crop&q=80' WHERE name = 'Energy Plus Drink';
UPDATE public.sponsors SET logo = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop&q=80' WHERE name = 'Health First Insurance';
UPDATE public.sponsors SET logo = 'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=800&h=400&fit=crop&q=80' WHERE name = 'GoPadel Academy';
UPDATE public.sponsors SET logo = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop&q=80' WHERE name = 'Local Property Group';
```

### 5. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Usage

### For Court Owners (Public)

1. Browse available sponsors on the homepage
2. Use search and filters to find relevant sponsors:
   - Search by name, category, or description
   - Filter by location
   - Filter by category (Sports Equipment, Beverages, etc.)
   - Filter by budget range
3. Click "Contact Sponsor" to view details and submit an inquiry
4. Fill out the inquiry form with your event information

### For Admins

1. Click the "Admin" button in the top-right corner
2. **Manage Sponsors Tab**:
   - View all sponsors in a table
   - Add new sponsors with the "+ Add New Sponsor" button
   - Edit existing sponsors
   - Delete sponsors
3. **View Inquiries Tab**:
   - See all inquiry submissions
   - View inquiry status (new, contacted, converted, rejected)
   - Click "View" to see full inquiry details

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous/public key | Yes |

## Database Schema

### Sponsors Table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | TEXT | Sponsor company name |
| logo | TEXT | URL to banner image |
| category | TEXT | Business category |
| description | TEXT | Company description |
| min_budget | BIGINT | Minimum sponsorship budget (IDR) |
| max_budget | BIGINT | Maximum sponsorship budget (IDR) |
| location | TEXT | City location |
| province | TEXT | Province |
| contact_email | TEXT | Contact email |
| contact_phone | TEXT | Contact phone |
| benefits | TEXT[] | Array of benefits offered |
| website | TEXT | Company website |
| status | TEXT | active/inactive |
| created_at | TIMESTAMPTZ | Creation timestamp |

### Inquiries Table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| sponsor_id | UUID | Reference to sponsor |
| sponsor_name | TEXT | Sponsor name (denormalized) |
| name | TEXT | Court owner name |
| email | TEXT | Court owner email |
| phone | TEXT | Court owner phone |
| court_name | TEXT | Padel court name |
| court_location | TEXT | Court location |
| event_type | TEXT | Type of event |
| participants | INTEGER | Expected participants |
| message | TEXT | Inquiry message |
| status | TEXT | new/contacted/converted/rejected |
| created_at | TIMESTAMPTZ | Submission timestamp |

## Troubleshooting

### Sponsors not loading

1. Check your `.env` file has the correct Supabase credentials
2. Verify the sponsors table exists in Supabase
3. Check the browser console for error messages
4. Ensure RLS policies are correctly set up

### Cannot submit inquiries

1. Verify the inquiries table exists
2. Check the RLS policy allows public INSERT
3. Check browser console for errors

### Admin features not working

1. Ensure you're authenticated in Supabase
2. Verify RLS policies for authenticated users
3. Check that the admin policies are set up correctly

## License

This project is proprietary and confidential.

## Support

For issues or questions, please contact the development team.
