import assert from "node:assert/strict";
import { readFile, mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const base = process.env.SEO_TEST_URL || "http://localhost:5188";
const browser = await chromium.launch({ channel: "chrome", headless: true });
await mkdir(".codex-temp", { recursive: true });
try {
  for (const width of [1440, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    if (!process.env.SEO_TEST_URL) {
      // Mirror Vercel's page rewrites without changing the browser pathname.
      for (const route of ["catering", "reviews"]) {
        await page.route(`${base}/${route}`, async request => request.fulfill({ contentType: "text/html", body: await readFile(`dist/${route}.html`, "utf8") }));
      }
      await page.route("**/api/schedule", request => request.fulfill({ json: { schedule: [], source: "test" } }));
    }
    for (const route of ["/", "/catering", "/reviews"]) {
      await page.goto(`${base}${route}`, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(2000);
      assert(await page.locator("h1").first().isVisible());
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), `https://jrstacosstl.com${route}`);
      await page.screenshot({ path: `.codex-temp/seo-${width}-${route === "/" ? "home" : route.slice(1)}.png` });
    }
    assert.deepEqual(errors, []);
    await context.close();
  }
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(base);
  assert(await page.locator("h1").first().isVisible());
  assert(await page.locator("#menu").isVisible());
  await context.close();
  console.log("Desktop, mobile, route metadata and JavaScript-disabled checks passed.");
} finally {
  await browser.close();
}
