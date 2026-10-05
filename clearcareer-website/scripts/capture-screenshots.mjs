import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, '../screenshots');

const PAGES = [
  { url: 'http://localhost:4324/shop', name: 'shop' },
  { url: 'http://localhost:4324/products/adhd-cheat-sheet', name: 'adhd-cheat-sheet' },
  { url: 'http://localhost:4324/products/job-search-scorecard', name: 'job-search-scorecard' },
  { url: 'http://localhost:4324/products/rejection-cards', name: 'rejection-cards' },
  { url: 'http://localhost:4324/products/ghost-job-checklist', name: 'ghost-job-checklist' },
  { url: 'http://localhost:4324/products/adhd-focus-kit', name: 'adhd-focus-kit' },
  { url: 'http://localhost:4324/products/linkedin-detox', name: 'linkedin-detox' },
  { url: 'http://localhost:4324/products/salary-generator', name: 'salary-generator' },
  { url: 'http://localhost:4324/products/cold-outreach-pack', name: 'cold-outreach-pack' },
  { url: 'http://localhost:4324/products/emotional-survival-kit', name: 'emotional-survival-kit' },
  { url: 'http://localhost:4324/products/script-vault', name: 'script-vault' },
  { url: 'http://localhost:4324/products/adhd-career-change', name: 'adhd-career-change' },
  { url: 'http://localhost:4324/products/interview-confidence', name: 'interview-confidence' },
  { url: 'http://localhost:4324/products/career-change-command-center', name: 'career-change-command-center' },
  { url: 'http://localhost:4324/products/over-40-toolkit', name: 'over-40-toolkit' },
  { url: 'http://localhost:4324/products/adhd-command-center', name: 'adhd-command-center' },
];

async function capture() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const results = [];

  for (const { url, name } of PAGES) {
    const filePath = path.join(OUTPUT_DIR, `screenshot-${name}.png`);
    try {
      console.log(`Capturing: ${name} ...`);
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
      // Brief pause for any CSS animations to settle
      await new Promise(r => setTimeout(r, 500));
      await page.screenshot({ path: filePath, fullPage: true });
      console.log(`  Saved: ${filePath}`);
      results.push({ name, filePath, success: true });
    } catch (err) {
      console.error(`  FAILED ${name}: ${err.message}`);
      results.push({ name, filePath, success: false, error: err.message });
    }
  }

  await browser.close();

  console.log('\n--- Summary ---');
  for (const r of results) {
    console.log(`${r.success ? 'OK' : 'FAIL'} ${r.name}${r.error ? ' — ' + r.error : ''}`);
  }
}

capture().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
