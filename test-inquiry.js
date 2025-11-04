import puppeteer from 'puppeteer';

async function testInquirySubmission() {
  console.log('🧪 Testing inquiry form submission...\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  try {
    console.log('📱 Navigating to website...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });

    console.log('✅ Page loaded');

    // Click first "Contact Sponsor" button
    console.log('🖱️  Clicking "Contact Sponsor" button...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const contactButton = buttons.find(btn => btn.textContent.includes('Contact Sponsor'));
      if (contactButton) contactButton.click();
    });

    await new Promise(r => setTimeout(r, 1000));
    console.log('✅ Modal opened');

    // Fill out the form
    console.log('✍️  Filling out form...');

    await page.type('input[placeholder="John Doe"]', 'Test User');
    await page.type('input[placeholder="john@example.com"]', 'test@padel.com');
    await page.type('input[placeholder="+62 812 3456 7890"]', '+62 812 1234 5678');
    await page.type('input[placeholder="Your Padel Court Name"]', 'Test Padel Court Jakarta');
    await page.type('input[placeholder="City, Province"]', 'Jakarta Selatan, DKI Jakarta');

    // Select event type
    await page.select('select', 'tournament');

    // Enter participants
    await page.type('input[placeholder="50"]', '100');

    // Enter message
    await page.type('textarea', 'This is a test inquiry submission to verify Supabase integration is working correctly. We are planning a tournament with 100 participants.');

    console.log('✅ Form filled');

    // Take screenshot before submission
    await page.screenshot({ path: 'screenshots/test-form-filled.png' });
    console.log('📸 Screenshot saved: test-form-filled.png');

    // Submit the form
    console.log('📤 Submitting form...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const submitButton = buttons.find(btn => btn.textContent.includes('Send Inquiry'));
      if (submitButton) submitButton.click();
    });

    // Wait for success message
    await new Promise(r => setTimeout(r, 2000));

    // Take screenshot after submission
    await page.screenshot({ path: 'screenshots/test-form-submitted.png' });
    console.log('📸 Screenshot saved: test-form-submitted.png');

    // Check for success message
    const successMessage = await page.evaluate(() => {
      const successDiv = document.querySelector('.bg-green-50');
      return successDiv ? successDiv.textContent : null;
    });

    if (successMessage && successMessage.includes('successfully')) {
      console.log('✅ SUCCESS! Inquiry submitted successfully!');
      console.log('📊 Check your Supabase dashboard → Table Editor → inquiries');
    } else {
      console.log('❌ No success message found. Check screenshots for details.');
    }

  } catch (error) {
    console.error('❌ Error during test:', error.message);
    await page.screenshot({ path: 'screenshots/test-error.png' });
  } finally {
    await browser.close();
    console.log('\n✨ Test complete!');
  }
}

testInquirySubmission().catch(console.error);
