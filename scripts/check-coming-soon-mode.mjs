import fs from "node:fs";
import path from "node:path";

const appSource = fs.readFileSync("src/App.jsx", "utf8");
const styleSource = fs.readFileSync("src/styles.css", "utf8");
const htmlSource = fs.readFileSync("index.html", "utf8");
const assetPath = path.resolve("public/assets/coming-soon-bg.jpg");

const failures = [];

if (!/const\s+siteMode\s*=\s*"coming-soon"/.test(appSource)) {
  failures.push('Expected src/App.jsx to set const siteMode = "coming-soon".');
}

if (!/siteMode\s*===\s*"coming-soon"/.test(appSource)) {
  failures.push("Expected App to render the Coming Soon page when siteMode is coming-soon.");
}

if (!appSource.includes("function ComingSoonPage")) {
  failures.push("Expected a ComingSoonPage component.");
}

if (!appSource.includes('asset("coming-soon-bg.jpg")')) {
  failures.push("Expected ComingSoonPage to use public/assets/coming-soon-bg.jpg.");
}

if (!appSource.includes("Coming Soon")) {
  failures.push('Expected the page to display "Coming Soon".');
}

if (!styleSource.includes(".coming-soon-page")) {
  failures.push("Expected styles for the coming soon page.");
}

if (!styleSource.includes("linear-gradient(90deg, #171717ed, #17171773)")) {
  failures.push("Expected the requested dark gradient tint.");
}

if (!htmlSource.includes("Coming Soon | Juniors Tacos")) {
  failures.push("Expected static page title/metadata to reflect the temporary Coming Soon page.");
}

if (!fs.existsSync(assetPath)) {
  failures.push(`Expected background image at ${assetPath}.`);
}

if (failures.length > 0) {
  console.error("Coming soon mode check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Coming soon mode is enabled.");
