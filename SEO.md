# Search readiness

The production build prerenders the homepage, catering and reviews routes from the same React components used by the browser. Titles, descriptions, canonical URLs, social metadata and JSON-LD are generated per route. Vercel must serve `dist`, not `public`.

Run `npm ci`, `npm run build`, then `npm test`. Optional browser verification: start `npm run preview -- --port 5188`, then run `node scripts/check-seo-browser.mjs` with Chrome installed. Set `SEO_TEST_URL` to verify a deployed site instead.

`public/robots.txt` allows search crawlers (including AI search crawlers following the wildcard rule), blocks API crawling, and advertises the sitemap. API responses also send `X-Robots-Tag: noindex`. These are discovery controls, not authentication. The owner admin remains client-only and is excluded from prerendered content.

`public/llms.txt` is a supplementary directory for AI tools, not an indexing requirement or a ranking guarantee. It refers readers to the live schedule and Clover rather than duplicating changing prices. No fabricated ratings or review markup are added.

After deployment, submit https://jrstacosstl.com/sitemap.xml in Google Search Console and Bing Webmaster Tools. Verify the preferred domain and inspect all three URLs. Keep the Google Business Profile, phone, pickup details and public copy consistent. Update sitemap lastmod dates only when page content changes.

The schedule still loads live in the browser. Prerendered HTML contains the existing default pickup information; schedule changes do not automatically rebuild HTML. Confirm pickup hours with the business, and rebuild after changing default hours or permanent contact information. Server-rendered live schedule data would require a separate backend change.

## Clover account migration

Ordering now uses https://jrs-tacos-st-peters.cloveronline.com/menu/all. On 2026-10-08, 33 existing menu items were matched to the new account's product names, URLs and prices. The 13 items not present in that catalog remain visible as unavailable, with ordering disabled and their old URLs removed.

Run `npm run test:links` against the local preview before publishing. It checks every menu category at desktop and mobile sizes, general page links and anchors, and opens each of the 33 product URLs to verify the correct Clover ordering dialog. To check production without reopening the external dialogs, set `ORDER_LINKS_URL=https://jrstacosstl.com` and `SKIP_CLOVER_DIALOGS=1`. The fixtures document the explicit product matches; review them when the merchant changes accounts again.
