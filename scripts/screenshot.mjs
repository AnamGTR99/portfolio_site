import { chromium } from 'playwright';

const url = process.argv[2] || 'http://localhost:3000';
const viewport = process.argv[3] || 'desktop';
const outputPath = process.argv[4] || `/tmp/screenshot-${viewport}-${Date.now()}.png`;

const viewports = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 375, height: 812 },
};

const { width, height } = viewports[viewport] || viewports.desktop;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height } });
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(1000); // let animations settle
const path = await page.screenshot({ path: outputPath, fullPage: true });
console.log(outputPath);
await browser.close();
