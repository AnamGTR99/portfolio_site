import { chromium } from "playwright";

const BASE = "http://localhost:3111";
const OUT = process.argv[2] || "/tmp";

const pages = [
  ["home", "/"],
  ["projects", "/projects"],
  ["ventures", "/ventures"],
  ["venture-mana", "/ventures/mana-group"],
  ["venture-hotel", "/ventures/anam-hotel"],
  ["about", "/about"],
  ["contact", "/contact"],
  ["project-dive", "/projects/dive"],
];

const viewports = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
};

const browser = await chromium.launch();

for (const [vpName, viewport] of Object.entries(viewports)) {
  const ctx = await browser.newContext({ viewport });
  await ctx.addInitScript(() => {
    try {
      sessionStorage.setItem("intro-played", "1");
    } catch {}
  });
  for (const [name, path] of pages) {
    const page = await ctx.newPage();
    try {
      await page.goto(BASE + path, { waitUntil: "networkidle", timeout: 20000 });
    } catch {}
    await page.waitForTimeout(3200);
    // settle lazy whileInView sections for fullPage capture
    await page.evaluate(async () => {
      const l = window.__lenis;
      if (l) l.destroy?.();
      const h = document.body.scrollHeight;
      for (let y = 0; y < h; y += 700) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 90));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 400));
    });
    await page.screenshot({ path: `${OUT}/${vpName}-${name}.png`, fullPage: true });
    await page.close();
    console.log(`${vpName}-${name}.png`);
  }
  await ctx.close();
}

// Preloader shot (no skip)
const ctx = await browser.newContext({ viewport: viewports.desktop });
const page = await ctx.newPage();
page.goto(BASE + "/").catch(() => {});
await page.waitForTimeout(900);
await page.screenshot({ path: `${OUT}/desktop-preloader.png` });
console.log("desktop-preloader.png");
await ctx.close();

await browser.close();
