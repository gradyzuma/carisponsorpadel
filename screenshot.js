import puppeteer from 'puppeteer';

async function takeScreenshots() {
  console.log('Launching browser...');

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  try {
    console.log('Navigating to http://localhost:3000...');
    await page.goto('http://localhost:3000', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    // Wait for content to load
    await page.waitForSelector('header', { timeout: 10000 });
    console.log('Page loaded!');

    // 1. Full page screenshot
    console.log('Taking full page screenshot...');
    await page.screenshot({
      path: 'screenshots/01-homepage-full.png',
      fullPage: true
    });

    // 2. Above the fold (viewport only)
    console.log('Taking above-the-fold screenshot...');
    await page.screenshot({
      path: 'screenshots/02-homepage-viewport.png',
      fullPage: false
    });

    // 3. Sponsor cards section
    console.log('Taking sponsor cards screenshot...');
    const sponsorGrid = await page.$('.grid');
    if (sponsorGrid) {
      await sponsorGrid.screenshot({ path: 'screenshots/03-sponsor-grid.png' });
    }

    // 4. Search and filters section
    console.log('Taking search/filter section screenshot...');
    const filterSection = await page.$('.bg-white.rounded-lg.shadow-md.p-6');
    if (filterSection) {
      await filterSection.screenshot({ path: 'screenshots/04-search-filters.png' });
    }

    // 5. Single sponsor card
    console.log('Taking single sponsor card screenshot...');
    const firstCard = await page.$('.bg-white.rounded-lg.shadow-md.hover\\:shadow-xl');
    if (firstCard) {
      await firstCard.screenshot({ path: 'screenshots/05-sponsor-card.png' });
    }

    // 6. Apply some filters and take screenshot
    console.log('Testing filters...');
    await page.type('input[type="text"]', 'Jakarta');
    await page.screenshot({
      path: 'screenshots/06-search-applied.png',
      fullPage: true
    });

    // Clear search
    await page.evaluate(() => {
      document.querySelector('input[type="text"]').value = '';
    });

    // 7. Select location filter
    await page.select('select', 'Jakarta');
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({
      path: 'screenshots/07-location-filter.png',
      fullPage: true
    });

    // 8. Open contact modal
    console.log('Opening contact modal...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const contactButton = buttons.find(btn => btn.textContent.includes('Contact Sponsor'));
      if (contactButton) contactButton.click();
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({
      path: 'screenshots/08-contact-modal.png',
      fullPage: false
    });

    // Take modal-only screenshot
    const modal = await page.$('.fixed.inset-0 > div');
    if (modal) {
      await modal.screenshot({ path: 'screenshots/09-contact-modal-detail.png' });
    }

    console.log('\n✅ All screenshots saved to screenshots/ directory!');

  } catch (error) {
    console.error('Error taking screenshots:', error);
  } finally {
    await browser.close();
  }
}

// Run the script
takeScreenshots().catch(console.error);
