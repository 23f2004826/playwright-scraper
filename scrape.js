const { chromium } = require('playwright');

const urls = [
  'https://sanand0.github.io/tdsdata/js_table/?seed=85',
  'https://sanand0.github.io/tdsdata/js_table/?seed=86',
  'https://sanand0.github.io/tdsdata/js_table/?seed=87',
  'https://sanand0.github.io/tdsdata/js_table/?seed=88',
  'https://sanand0.github.io/tdsdata/js_table/?seed=89',
  'https://sanand0.github.io/tdsdata/js_table/?seed=90',
  'https://sanand0.github.io/tdsdata/js_table/?seed=91',
  'https://sanand0.github.io/tdsdata/js_table/?seed=92',
  'https://sanand0.github.io/tdsdata/js_table/?seed=93',
  'https://sanand0.github.io/tdsdata/js_table/?seed=94',
];

(async () => {
  const browser = await chromium.launch();
  let grandTotal = 0;

  for (const url of urls) {
    const page = await browser.newPage();
    await page.goto(url);

    // Wait for the table to load (it's dynamically generated with JS)
    await page.waitForSelector('table');

    // Grab all cell text inside the table
    const numbers = await page.$$eval('table td', cells =>
      cells.map(cell => parseFloat(cell.innerText)).filter(n => !isNaN(n))
    );

    const pageSum = numbers.reduce((a, b) => a + b, 0);
    console.log(`Sum for ${url}: ${pageSum}`);
    grandTotal += pageSum;

    await page.close();
  }

  await browser.close();
  console.log(`Total sum across all pages: ${grandTotal}`);
})();
