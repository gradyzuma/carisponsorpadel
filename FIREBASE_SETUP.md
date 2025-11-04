# Firebase Setup Guide

This guide will help you set up Firebase for your CariSponsorPadel application.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `carisponsorpadel` (or your preferred name)
4. (Optional) Enable Google Analytics
5. Click "Create project"

## Step 2: Set Up Firestore Database

1. In your Firebase project, click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (for development) or "Start in production mode"
4. Select your preferred region (e.g., asia-southeast1 for Singapore)
5. Click "Enable"

## Step 3: Configure Security Rules

For development, use these test rules (in Firestore Rules tab):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /sponsors/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

For production, restrict write access appropriately.

## Step 4: Get Your Firebase Config

1. Click the gear icon next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps"
4. Click the web icon `</>`
5. Register your app with a nickname (e.g., "CariSponsorPadel Web")
6. Copy the `firebaseConfig` object

## Step 5: Update Your Application

1. Open `src/config/firebase.js`
2. Replace the placeholder config with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
}
```

## Step 6: Add Initial Data

### Option A: Using Firebase Console (Manual)

1. Go to Firestore Database
2. Click "Start collection"
3. Collection ID: `sponsors`
4. Add documents with these fields:
   - `name` (string)
   - `logo` (string - URL)
   - `category` (string)
   - `description` (string)
   - `minBudget` (number)
   - `maxBudget` (number)
   - `location` (string)
   - `province` (string)
   - `contactEmail` (string)
   - `contactPhone` (string)
   - `benefits` (array of strings)
   - `website` (string)

### Option B: Using Import Script

Create a file `scripts/importData.js`:

```javascript
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { mockSponsors } from '../src/config/mockData.js'

const firebaseConfig = {
  // Your config here
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function importSponsors() {
  for (const sponsor of mockSponsors) {
    try {
      const docRef = await addDoc(collection(db, 'sponsors'), sponsor)
      console.log('Added sponsor:', sponsor.name, 'with ID:', docRef.id)
    } catch (error) {
      console.error('Error adding sponsor:', error)
    }
  }
  console.log('Import complete!')
}

importSponsors()
```

Run with: `node scripts/importData.js`

## Step 7: Enable Firebase in Your App

1. Open `src/composables/useSponsors.js`
2. Comment out the "MOCK DATA VERSION" section
3. Uncomment the "FIREBASE VERSION" section

```javascript
// MOCK DATA VERSION (comment out)
// await new Promise(resolve => setTimeout(resolve, 500))
// sponsors.value = mockSponsors

// FIREBASE VERSION (uncomment)
const querySnapshot = await getDocs(collection(db, 'sponsors'))
sponsors.value = querySnapshot.docs.map(doc => ({
  id: doc.id,
  ...doc.data()
}))
```

## Step 8: Test Your Setup

1. Start your development server: `npm run dev`
2. Open the application in your browser
3. Check the browser console for any errors
4. Verify that sponsors are loading from Firebase

## Troubleshooting

### Error: "Missing or insufficient permissions"
- Check your Firestore security rules
- Make sure read access is allowed

### Error: "Firebase: Firebase App named '[DEFAULT]' already exists"
- You're initializing Firebase multiple times
- Make sure you only import `db` from `firebase.js`

### Sponsors not loading
- Check the browser console for errors
- Verify your Firebase config is correct
- Ensure you've added sponsors to the `sponsors` collection
- Check that the collection name matches exactly: `sponsors`

### CORS errors
- This usually happens in production
- Make sure you've registered your domain in Firebase console

## Alternative: Using Supabase

If you prefer Supabase over Firebase:

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Create a table named `sponsors` with the required columns
3. Update `src/config/firebase.js` to use Supabase client instead
4. Modify `src/composables/useSponsors.js` to use Supabase queries

## Security Best Practices

1. **Never commit your Firebase config** with real credentials to public repositories
2. Use environment variables for sensitive data
3. Implement proper authentication before allowing write operations
4. Set up proper security rules in production
5. Enable App Check to prevent abuse
6. Monitor usage in Firebase console

## Next Steps

- Set up Firebase Authentication for admin access
- Create an admin dashboard to manage sponsors
- Set up Firebase Cloud Functions for handling contact form submissions
- Enable Firebase Analytics to track user behavior
- Set up Firebase Hosting for deployment

---

Need help? Check the [Firebase Documentation](https://firebase.google.com/docs)
