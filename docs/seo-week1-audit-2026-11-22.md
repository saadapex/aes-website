# AES Week 1 — Search and AI Discovery Audit
Date: 2026-11-22
Website: https://www.apexsolutions.io
Scope: technical discovery, search-engine ownership, and company-listing consistency

## Verified live checks
- The live `/robots.txt` is accessible and declares `User-Agent: *`, `Allow: /`, exclusions for `/studio/`, `/api/` and `/thank-you`, and the canonical sitemap.
- The live `/sitemap.xml` publishes 29 static URLs, but omits publicly viewable Sanity `/blog/[slug]` articles.
- The homepage and sampled articles, case study and industry page have canonical URLs and `index, follow` directives.
- Public `/llms.txt` and `/llms-full.txt` are accessible. They are supplemental discovery aids, not a substitute for indexing.
- The non-www robots path redirects to the www URL; exact domain-property verification and other redirects still need account-side diagnostics.
- AES is discoverable via public search results; this does NOT establish full Google/Bing index coverage or AI recommendations.
- A business search result identifies AES in Sunnyvale with the published phone and address; ownership and verification of Google/Bing business listings are NOT known.

## Code changes in this review branch
1. `src/app/sitemap.ts`: remove inaccurate render-time `lastModified = now` across unchanged pages; add live Sanity blog article URLs with their actual publish/update dates, when available, and revalidate the sitemap hourly.
2. `src/app/contact/page.tsx`: unify ProfessionalService `@id` with existing Organization `#organization` identity. The homepage already emits Organization and WebSite JSON-LD.
3. `src/app/layout.tsx`: correct leadership URLs in Organization structured data; the former `/about#leadership` anchor did not exist. Also stage Search Console meta tag for URL-prefix property.

## Authenticated Google audit (2026-11-22)
### Google Search Console
- The connected AES Google Workspace account did not display any existing verified apexsolutions.io or www.apexsolutions.io properties.
- A Domain property setup for apexsolutions.io offered DNS TXT verification. A URL-prefix property for https://www.apexsolutions.io offered HTML file, meta tag, GA and GTM verification methods.
- No Search Console index coverage, search performance, or prior sitemap submissions could be confirmed without successful verification.
- Existing unverified Domain and URL-prefix setup flows are accessible in Search Console. GA verification failed because the homepage tracking code was not found; GTM verification failed because the container ID was not detected.
- The website URL-prefix ownership meta verification tag has now been staged in `src/app/layout.tsx` on this review branch. It must be deployed before clicking Verify. Domain-level verification via DNS remains the recommended eventual option.
- Do not claim a Search Console property has been verified or a sitemap submitted until confirmed.

### Google Business Profile
- The connected AES Workspace account has manager access to an existing Apex Enterprise Solutions business listing; the listing displays **Get verified** and is not fully verified.
- The profile visibly lacks a selected business category.
- Website is listed as http://www.apexsolutions.io/ instead of HTTPS; listed hours are 24 hours.
- AES confirmed it does not receive any customers at 1069 Duane Ct. Google guidance is to use a service-area listing and not publicly show the street address.
- 2026-11-22: On the existing managed Google Business Profile, disabled **Show business address to customers** and saved the edit. Google accepted the change but displays **Your edits will be visible once verified**; public removal is therefore pending verification. The backend address was preserved for verification.
- Existing profile service areas Sunnyvale, Santa Clara, San Jose, and Palo Alto were retained unchanged.
- Phone (669) 251-7810 matches website; no same-address duplicate was found in this check.
- Profile description currently references power distribution and data center builds; amend later to emphasize appropriately licensed / in-scope inside-plant cabling, racks, AP rollouts and field support.
- No listing changes made. Verify exact business category, true operating hours and storefront/service-area classification with AES before editing.

## Still requires authenticated access
### Google Search Console
1. Sign in to https://search.google.com/search-console
2. Check whether the DNS **Domain property** `apexsolutions.io` is already verified. If not, add it and verify its TXT record with the DNS owner. Do not create a duplicate property if one exists.
3. Submit `https://www.apexsolutions.io/sitemap.xml` once the branch fixes are deployed.
4. Inspect URL indexing for `/`, `/services/structured-cabling`, `/services/rack-and-stack`, `/industries/data-centers`, `/contact`, and sample blog posts.
5. Record indexed/not-indexed counts, crawl errors, impressions, top queries and CTR as the baseline.

### Bing Webmaster Tools
1. Sign in to https://www.bing.com/webmasters
2. Look for an existing `apexsolutions.io` site. If missing, import the GSC-verified site or verify via DNS / provided meta tag.
3. Submit the same sitemap; review SEO reports, URL inspection, indexing and AI Performance if available.
4. Consider IndexNow only after the standard sitemap and indexing baseline is functioning.

### Google Business Profile / Bing Places
1. Identify whether the existing AES listing is claimed; **do not create a duplicate**.
2. Confirm exact legal name (Apex Enterprise Solutions Inc.), public brand (Apex Enterprise Solutions), URL, main phone and correct operating category.
3. Confirm address eligibility. If AES visits client sites but does not receive customers at the listed address, review service-area profile rules and hide the street address from the listing where appropriate. Do not invent offices in other markets.
4. Claim or correct Bing Places via https://www.bing.com/forbusiness; verify Google listing through https://business.google.com if eligible.
5. Check LinkedIn and other social-profile URLs in Organization `sameAs` for ownership and actual availability.

### Hosting / crawler diagnostics
- Review Vercel or CDN security/firewall logs for Googlebot, Bingbot, OAI-SearchBot, Claude-SearchBot and PerplexityBot.
- Confirm real requests receive 200 responses, not challenge pages/403s. robots.txt permissions alone do not prove access.
- Check production domain redirects, canonical tags, robots headers and structured data using live inspection after deploy.
- Never publish Search Console/Bing verification secrets except platform-provided public site meta verification tokens.

## Website canonical company details for verification
- Brand: Apex Enterprise Solutions (AES)
- Legal company: Apex Enterprise Solutions Inc.
- Website: https://www.apexsolutions.io
- Contact email: info@apexsolutions.io
- Phone: +1-669-251-7810
- Headquarters as presently published: 1069 Duane Ct, Sunnyvale, CA 94085, United States
- Positioning: North American field execution partner for structured cabling, fiber, rack-and-stack, enterprise AP refresh and smart hands; Canada service via partners where applicable.

## Service-area address consistency work (2026-11-22)
- Owner confirmed no customers visit the Sunnyvale headquarters.
- Staged code edits remove the exact street/postal address from public Organization and ProfessionalService JSON-LD, the contact and footer display, and both llms.txt documents.
- Public business location becomes "Sunnyvale, CA — service-area business (no walk-in office)" while the private Google Business Profile address remains retained for Google verification.
- Google Business Profile address hide edit was accepted/saved but is awaiting verification before publication.

## Acceptance test after deploy
- The production sitemap includes real blog article URLs.
- No static URL's `lastmod` changes without a significant corresponding page change.
- Contact and homepage JSON-LD identify the same Organization `@id`.
- Sitemap can be submitted and processed by Google and Bing.
- Source crawling and indexing reports have been captured; outstanding account verification remains explicitly tracked.


## Updated confirmed status after implementation — November 22, 2026
- The search/AI discovery changes were merged into `main` via PR #2, commit `8da1ed43e015df08477ffc0318cb8fc14f4f0da1`; Vercel reported production deployment successful.
- Production recheck confirmed the homepage and contact page include Google's URL-prefix ownership verification meta tag, `/sitemap.xml` includes live blog slugs, and the previous full street address is absent from sampled pages and `/llms.txt`.
- A later, more complete authenticated Google Search Console inspection found the existing `https://www.apexsolutions.io/` URL-prefix property **verified** (superseding the earlier incomplete no-property report). Do not attempt to create another property. It was recorded as added September 3, 2025.
- `https://www.apexsolutions.io/sitemap.xml` was **already submitted** June 4, 2026; its last read on November 20, 2026 predates our deploy. No duplicate submission was made.
- Search Console reported 28 indexed URLs and 36 excluded URLs (last report update November 15, 2026). Exclusions included 10 crawled not indexed, 14 discovered not indexed, 3 redirects, 3 duplicate canonicals, and 6 robots blocks; inspect URL samples to decide which require remediation. Performance totals in the automated read appeared internally inconsistent and should be rechecked in the UI before quoting.
- Managed Google Business Profile correction: saved category **Computer networking service**, HTTPS website URL, and replacement description limited to AES's actual services. Street address visibility set to hidden; verified-location address retained privately.
- Google Business Profile is still **unverified**. The exact available owner-verification methods are **Phone or text** and **Mail**; email was not offered. No code was sent or entered. Edits are waiting for business verification before public publication.
- Google Business Profile still displays 24-hour hours; do not change until AES confirms real staffed/answering hours.
- Bing Webmaster Tools import from GSC reached a Google authentication prompt requiring the account owner's login; import/verification and Bing sitemap submission therefore remain **unconfirmed**. Do not assert that a Bing property exists.


## Follow-on technical indexing audit — November 22, 2026
- **Bing Webmaster**: A connected browser tried the official GSC import flow, but Google's permission screen required a fresh owner login. Do not claim the Bing property is imported or verified. AES owner has been offered the secure Bing sign-in link; continue only after connection is saved.
- **Live sitemap audit**: `https://www.apexsolutions.io/sitemap.xml` now emits 39 URLs (29 static routes and 10 Sanity CMS articles). All 39 fetched successfully in the live website check, have per-URL self-referencing canonical links, and expose `index, follow`. This is an accessibility and metadata check, *not* proof of Google indexing.
- **Search Console**: Existing verified URL-prefix property had reported 28 indexed and 36 not indexed at the earlier Nov 15 snapshot. Two browser extractions disagreed on indexing reason counts, and one result incorrectly listed 28 specific URLs as belonging to a group of 10. Treat all inferred URL group assignments as unconfirmed; use individual URL Inspection for important pages.
- **Privacy/metadata regression fixed on this branch**: `src/app/page.tsx` embedded the Duane Ct street address, approximate coordinates, unconfirmed office hours, and price tier in a second LocalBusiness JSON-LD node even though visible pages were already corrected. Remove unverified and street-specific fields, keep city/region/country, unify its ID with the main Organization entity.
- **Schema link fixed on this branch**: The article BlogPosting author URL referenced a nonexistent `/about#leadership` anchor; link Saad-authored content to the existing `/about#founder-letter` anchor, and avoid attaching that founder URL to unrelated authors.
- **Robots/noindex conflict fixed on this branch**: The `/thank-you` page has `noindex`, but robots.txt disallowed crawling that path, preventing a bot from reading the directive. Allow crawling while retaining the page-specific `noindex`; keep /studio/ and /api/ disallowed.
- Follow-on acceptance checks: Vercel build, merged production version, no private street address or unverified hours in homepage JSON-LD, article author link working, /thank-you crawlable but meta-noindex, 39 sitemap URLs still present. Do not claim resolved until inspected live.
