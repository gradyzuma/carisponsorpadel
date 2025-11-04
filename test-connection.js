import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ybeboxppyhrhmwqpcuwa.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliZWJveHBweWhyaG13cXBjdXdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNDIxNTAsImV4cCI6MjA3NzgxODE1MH0.oQqtZtwj6HMnxZqCFsEm2dYV91fUkeLYky16PU3lNgs'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

console.log('🔍 Testing Supabase connection...\n')

// Test 1: Fetch sponsors
console.log('Test 1: Fetching sponsors...')
const { data: sponsors, error: sponsorsError } = await supabase
  .from('sponsors')
  .select('*')
  .limit(1)

if (sponsorsError) {
  console.error('❌ Error fetching sponsors:', sponsorsError)
} else {
  console.log('✅ Sponsors fetch successful!')
  console.log('   First sponsor:', sponsors[0]?.name)
  console.log('   Sponsor ID:', sponsors[0]?.id)
}

// Test 2: Try to insert inquiry
console.log('\nTest 2: Inserting test inquiry...')
const testInquiry = {
  sponsor_id: sponsors[0]?.id || null,
  sponsor_name: sponsors[0]?.name || 'Test Sponsor',
  name: 'Test User',
  email: 'test@example.com',
  phone: '+62 812 1234 5678',
  court_name: 'Test Court',
  court_location: 'Jakarta',
  event_type: 'tournament',
  participants: 100,
  message: 'This is a test inquiry',
  status: 'new'
}

console.log('   Sending data:', JSON.stringify(testInquiry, null, 2))

const { data: inquiry, error: inquiryError } = await supabase
  .from('inquiries')
  .insert([testInquiry])
  .select()

if (inquiryError) {
  console.error('❌ Error inserting inquiry:', inquiryError)
  console.error('   Error details:', JSON.stringify(inquiryError, null, 2))
} else {
  console.log('✅ Inquiry inserted successfully!')
  console.log('   Inquiry ID:', inquiry[0]?.id)
  console.log('   Created at:', inquiry[0]?.created_at)
}

console.log('\n✨ Test complete!')
