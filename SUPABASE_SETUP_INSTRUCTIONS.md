# Supabase Setup Instructions

Your website is now configured to use Supabase! Follow these final steps to complete the setup.

## What's Already Done ✅

- ✅ Supabase client installed
- ✅ Environment variables configured with your credentials
- ✅ Code updated to fetch sponsors from Supabase
- ✅ Code updated to save inquiries to Supabase
- ✅ Database schema SQL file created

## Final Step: Create Database Tables

You need to run the SQL schema in your Supabase dashboard to create the necessary tables.

### Step-by-Step Instructions:

1. **Open your Supabase project**
   - Go to [supabase.com/dashboard](https://supabase.com/dashboard)
   - Select your `carisponsorpadel` project

2. **Open the SQL Editor**
   - Click on **SQL Editor** in the left sidebar
   - Click **New Query**

3. **Copy the SQL schema**
   - Open the file `supabase-schema.sql` in this project
   - Copy ALL the contents (Ctrl+A, Ctrl+C)

4. **Paste and run the SQL**
   - Paste the SQL into the Supabase SQL Editor
   - Click **Run** (or press Ctrl+Enter)
   - Wait for the success message

5. **Verify the tables were created**
   - Click on **Table Editor** in the left sidebar
   - You should see two new tables:
     - `sponsors` (with 8 sample sponsors)
     - `inquiries` (empty, ready for submissions)

## What This Does

The SQL script will:
- ✅ Create `sponsors` table to store sponsor information
- ✅ Create `inquiries` table to store contact form submissions
- ✅ Set up Row Level Security (RLS) policies for data protection
- ✅ Insert 8 sample sponsors to test with
- ✅ Create indexes for better performance
- ✅ Set up automatic timestamp updates

## Testing Your Setup

Once you've run the SQL:

1. **Refresh your website** at http://localhost:3000
2. **You should see 8 sponsors** loaded from Supabase (instead of mock data)
3. **Click "Contact Sponsor"** on any card
4. **Fill out and submit the form**
5. **Check Supabase Table Editor** → `inquiries` table
6. **You should see your submission!**

## Troubleshooting

### No sponsors showing?
- Check browser console for errors
- Verify the SQL ran successfully in Supabase
- Check that `sponsors` table has 8 rows

### Form submission fails?
- Check browser console for errors
- Verify RLS policies are enabled
- Check network tab for Supabase API errors

### Still having issues?
- Check the `.env` file exists with correct credentials
- Restart the dev server: `npm run dev`
- Check Supabase project is not paused (free tier pauses after inactivity)

## Viewing Inquiry Submissions

To view all inquiries submitted through your website:

1. Go to Supabase Dashboard
2. Click **Table Editor** → **inquiries**
3. You'll see all submissions with:
   - Contact information
   - Event details
   - Timestamp
   - Status (new/contacted/converted/rejected)

## Database Structure

### `sponsors` table
```
- id: UUID (primary key)
- name: Text
- logo: Text (URL)
- category: Text
- description: Text
- min_budget: Number
- max_budget: Number
- location: Text
- province: Text
- contact_email: Text
- contact_phone: Text
- benefits: Array of Text
- website: Text
- status: Text (active/inactive/pending)
- created_at: Timestamp
- updated_at: Timestamp
```

### `inquiries` table
```
- id: UUID (primary key)
- sponsor_id: UUID (references sponsors)
- sponsor_name: Text
- name: Text (court owner name)
- email: Text
- phone: Text
- court_name: Text
- court_location: Text
- event_type: Text
- participants: Number
- message: Text
- status: Text (new/contacted/converted/rejected)
- created_at: Timestamp
- updated_at: Timestamp
```

## Security Notes

✅ **Your data is protected!**
- Row Level Security (RLS) is enabled
- Public users can only:
  - Read active sponsors
  - Insert inquiries (submit forms)
- Authenticated users (when you add auth) can:
  - Manage sponsors
  - View all inquiries
  - Update inquiry status

## Next Steps (Optional)

After basic setup works, you can:
- [ ] Set up email notifications when inquiries are submitted
- [ ] Create admin dashboard to manage inquiries
- [ ] Add authentication for admin users
- [ ] Set up webhook to notify sponsors
- [ ] Add file upload for sponsor logos
- [ ] Export inquiries to Excel/CSV

---

**Ready?** Go run that SQL in your Supabase dashboard and test it out! 🚀
