import puppeteer from 'puppeteer';

async function testAdmin() {
  console.log('🧪 Testing Admin Dashboard...\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  try {
    // 1. Homepage with new design
    console.log('📸 Capturing homepage with new design...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: 'screenshots/admin-01-homepage.png', fullPage: false });

    // 2. Click Admin button
    console.log('🖱️  Clicking Admin button...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const adminBtn = buttons.find(btn => btn.textContent.includes('Admin'));
      if (adminBtn) adminBtn.click();
    });
    await new Promise(r => setTimeout(r, 2000));

    // 3. Admin Dashboard - Sponsors tab
    console.log('📸 Capturing Admin Dashboard - Sponsors...');
    await page.screenshot({ path: 'screenshots/admin-02-dashboard-sponsors.png', fullPage: false });

    // 4. Click Inquiries tab
    console.log('🖱️  Switching to Inquiries tab...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const inquiriesBtn = buttons.find(btn => btn.textContent.includes('View Inquiries'));
      if (inquiriesBtn) inquiriesBtn.click();
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: 'screenshots/admin-03-dashboard-inquiries.png', fullPage: false });

    console.log('\n✅ All screenshots captured!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
}

testAdmin().catch(console.error);
