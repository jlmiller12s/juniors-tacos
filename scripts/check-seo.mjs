import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { parseHTML, DOMParser } from "linkedom";

for (const route of ["/", "/catering", "/reviews"]) {
  const html = readFileSync(`dist/${route === "/" ? "index" : route.slice(1)}.html`, "utf8");
  const { document } = parseHTML(html);
  assert(!document.title.includes("Coming Soon"));
  assert.equal(document.querySelector('link[rel="canonical"]').getAttribute("href"), `https://jrstacosstl.com${route}`);
  assert(document.querySelector("h1"), `${route} needs a rendered heading`);
  assert(document.getElementById("root").textContent.length > 500, `${route} needs readable content`);
  assert(!document.getElementById("admin"));
  const data = JSON.parse(document.getElementById("site-structured-data").textContent);
  assert(data["@graph"].some(item => item["@type"] === "Restaurant"));
  assert.equal(data["@graph"].find(item => item["@type"] === "Restaurant").menu, "https://jrs-tacos-st-peters.cloveronline.com/menu/all");
  assert(data["@graph"].some(item => item["@type"] === "WebPage" && item.url === `https://jrstacosstl.com${route}`));
  assert(document.querySelector('meta[name="description"]').getAttribute("content").length > 80);
}
const robots = readFileSync("dist/robots.txt", "utf8");
const sitemap = new DOMParser().parseFromString(readFileSync("dist/sitemap.xml", "utf8"), "text/xml");
assert.deepEqual([...sitemap.querySelectorAll("url > loc")].map(item => item.textContent), ["https://jrstacosstl.com/", "https://jrstacosstl.com/catering", "https://jrstacosstl.com/reviews"]);
assert(robots.includes("User-agent: *") && robots.includes("Allow: /"));
assert(robots.includes("Sitemap: https://jrstacosstl.com/sitemap.xml"));
assert(readFileSync("dist/llms.txt", "utf8").includes("https://jrstacosstl.com/"));
console.log("SEO checks passed for all three prerendered pages and crawler files.");
