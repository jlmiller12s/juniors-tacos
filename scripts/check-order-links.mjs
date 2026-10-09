import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { parseHTML } from "linkedom";
import { chromium } from "playwright";

const base = process.env.ORDER_LINKS_URL || "http://localhost:5188";
const origin = "https://jrs-tacos-st-peters.cloveronline.com";
const expected = JSON.parse(await readFile("scripts/fixtures/clover-products.json", "utf8"));
const response = await fetch(`${origin}/menu/all`);
assert.equal(response.status, 200);
const { document } = parseHTML(await response.text());
const catalog = new Map([...document.querySelectorAll('a[data-testid="item-name"][href]')].map(anchor => [anchor.getAttribute("href"), {
  name: anchor.querySelector("h3").textContent,
  price: Number(anchor.querySelector('[data-testid="product-price"]').textContent.replace("$", "")),
}]));
for (const item of expected) assert.equal(catalog.get(item.path)?.name, item.cloverName, `Wrong product for ${item.siteName}`);

const browser = await chromium.launch({ channel: "chrome", headless: true });
const links = new Map();
try {
  for (const width of [1440, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    if (!process.env.ORDER_LINKS_URL) {
      for (const route of ["catering", "reviews"]) await page.route(`${base}/${route}`, async request => request.fulfill({ contentType: "text/html", body: await readFile(`dist/${route}.html`, "utf8") }));
      await page.route("**/api/schedule", request => request.fulfill({ json: { schedule: [], source: "test" } }));
    }
    const observed = new Map();
    const missing = new Set();
    await page.goto(base, { waitUntil: "domcontentloaded" });
    await page.locator("#menu").scrollIntoViewIfNeeded();
    await page.locator(".category-tabs button").first().waitFor();
    for (const category of await page.locator(".category-tabs button").allTextContents()) {
      await page.locator(".category-tabs button").filter({ hasText: new RegExp(`^${category}$`) }).click();
      for (const card of await page.locator(".menu-card").all()) {
        const name = await card.locator("h3").textContent();
        if (await card.locator("a.item-order-link").count()) {
          const href = await card.locator("a.item-order-link").getAttribute("href");
          const url = new URL(href);
          assert.equal(url.origin, origin);
          const product = expected.find(item => item.siteName === name);
          assert(product, `Unexpected orderable item ${name}`);
          assert.equal(url.pathname, product.path);
          assert.equal(Number((await card.locator(".menu-card-title strong").textContent()).replace("$", "")), catalog.get(url.pathname).price);
          observed.set(name, href);
        } else {
          assert(await card.locator(".item-order-link.disabled").count());
          assert(await card.locator(".quantity-row button").last().isDisabled());
          missing.add(name);
        }
      }
    }
    assert.equal(observed.size, 33);
    assert.equal(missing.size, 13);
    for (const route of ["/", "/catering", "/reviews"]) {
      await page.goto(`${base}${route}`, { waitUntil: "domcontentloaded" });
      await page.locator("h1").first().waitFor();
      for (const anchor of await page.locator("a[href]").all()) {
        const href = await anchor.getAttribute("href");
        const url = new URL(href, `${base}${route}`);
        assert(!url.hostname.includes("jrs-tacos-saint-peters"), `Old Clover link ${href}`);
        if (url.hostname.endsWith("cloveronline.com")) {
          assert.equal(url.origin, origin);
          assert(url.pathname === "/menu/all" || expected.some(item => item.path === url.pathname));
        }
        if (url.origin === base && url.pathname === route && url.hash) {
          assert(await page.locator(`[id="${decodeURIComponent(url.hash.slice(1))}"]`).count(), `Missing anchor ${href} on ${route}`);
        }
        links.set(url.href.replace(base, "https://jrstacosstl.com"), true);
      }
    }
    assert.deepEqual(errors, []);
    await context.close();
    console.log(`Verified all menu categories and page links at ${width}px: 33 matched products, 13 unavailable.`);
  }

  if (!process.env.SKIP_CLOVER_DIALOGS) {
    const queue = [...expected];
    await Promise.all(Array.from({ length: 3 }, async () => {
      const page = await browser.newPage();
      try {
        while (queue.length) {
          const item = queue.shift();
          const result = await page.goto(`${origin}${item.path}`, { waitUntil: "domcontentloaded", timeout: 45000 });
          assert.equal(result.status(), 200);
          const dialog = page.getByRole("dialog").filter({ has: page.getByRole("heading", { name: item.cloverName, exact: true }) });
          await dialog.waitFor({ timeout: 20000 });
          assert.equal(await page.title(), `${item.cloverName} - JR's Tacos`);
          assert((await dialog.textContent()).includes(`$${catalog.get(item.path).price.toFixed(2)}`));
          console.log(`Opened correct Clover product: ${item.cloverName}`);
        }
      } finally { await page.close(); }
    }));
  }
  console.log("Checked link inventory:", JSON.stringify([...links.keys()], null, 2));
} finally { await browser.close(); }
