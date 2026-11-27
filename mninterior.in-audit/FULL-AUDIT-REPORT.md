# MN Interiors — Pre-Launch SEO Audit

**Date:** 2026-11-27 · **Target:** mninterior.in (not yet live) · **Audited:** local production build of this repo
**SEO Health Score: 53/100** · **Business type:** Local service business (hybrid: workshop/office in Kundrathur + service-area across Chennai) — residential & commercial interiors

> Scope: Pre-launch: local production build (vite build + vite preview) of the single-page site. Intended domain mninterior.in did not resolve via DNS on 2026-11-27. Live-only checks (hosting headers, redirects, real-user CWV, GSC, backlinks, GBP/NAP citations) not run. The plugin's Python runtime was not installed, so checks were run directly with Playwright/Chromium; no Google, DataForSEO, Moz or Bing data was available.

| Category | Weight | Score |
|---|---|---|
| Technical SEO | 22% | 45 |
| Content Quality | 23% | 70 |
| On-Page SEO | 20% | 62 |
| Schema / Structured Data | 10% | 10 |
| Performance (CWV) | 10% | 70 |
| AI Search Readiness | 10% | 30 |
| Images | 5% | 50 |

## Top 5 issues
1. Raw HTML is an empty JS shell (0 characters of text without JavaScript) — AI crawlers and link previews see nothing
2. No structured data at all (no LocalBusiness/HomeAndConstructionBusiness, FAQPage, Organization)
3. No robots.txt, sitemap.xml, canonical tag or favicon; missing files fall back to the homepage HTML (soft 404s)
4. Showcase photos appear to be AI-generated renders presented as 'Real projects' — trust/E-E-A-T and policy risk
5. 3.9 MB of unoptimised JPEGs (~0.8 MB each) with no width/height, no WebP/AVIF, no og:image

## Top 5 quick wins
1. Add LocalBusiness + FAQPage JSON-LD to index.html (static, no JS needed)
2. Add public/robots.txt, public/sitemap.xml, <link rel=canonical>, og:url, og:image, favicon
3. Compress showcase images to WebP ~1200px (~100-150 KB each) and add width/height
4. Delete/rewrite stale metadata.json ('Kalaigar Interiors', 22 years, 15-yr guarantee)
5. Remove unused @google/genai, express, lucide-react dependencies

## Technical SEO — 45/100

**What works:**
- HTTPS-ready static build
- lang=en set
- viewport meta present
- No horizontal scroll on mobile
- Single clean URL, in-page anchors for sections

### [Critical] Client-side-only rendering: empty HTML shell
With JavaScript disabled the page body contains 0 characters; all 2,395 words, headings, NAP and FAQs are injected by a 504 KB React bundle. Google renders JS (deferred), but GPTBot, ClaudeBot, PerplexityBot, Bing's first pass, WhatsApp/Facebook link previews do not.

**Fix:** Pre-render the page at build time (e.g. vite-plugin-prerender / react-dom/server renderToString in a small build script, or move to Astro/Next static export) so dist/index.html ships the full HTML; hydrate on top.

### [High] No robots.txt or sitemap.xml
Neither file exists in public/. On the preview server /robots.txt and /sitemap.xml return 200 with the homepage HTML (SPA fallback) — crawlers get an invalid robots file and soft 404s.

**Fix:** Add public/robots.txt (Allow all + Sitemap: https://mninterior.in/sitemap.xml) and public/sitemap.xml listing https://mninterior.in/. Configure host to return real 404s for unknown paths.

### [High] No canonical, og:url or www/apex decision
No <link rel=canonical>. Hosting will likely serve both www and apex plus any Cloud Run *.run.app URL — duplicate hosts.

**Fix:** Add <link rel="canonical" href="https://mninterior.in/"> and og:url; 301 www→apex and block/redirect the *.run.app host.

### [Medium] No favicon / apple-touch-icon
No icon link; Google shows favicons next to mobile results.

**Fix:** Add a 48x48-multiple favicon (SVG + PNG) and apple-touch-icon.

### [Low] Images served from /src/assets path via copy plugin
Images bypass Vite's asset pipeline (no hashing/compression), served from /src/assets/images/... with long timestamp filenames.

**Fix:** Import images or move to public/images with descriptive names (modular-kitchen-kundrathur-chennai.webp).

### [Info] Security headers unverified
Cannot test HSTS, CSP, X-Content-Type-Options etc. until hosted.

**Fix:** Re-run audit against the live URL after launch.


## Content Quality — 70/100

**What works:**
- 2,395 words of specific, locally-relevant copy (Kundrathur, Kavanur, Porur, Anna Nagar, Chennai humidity/monsoons)
- Concrete service details: plywood, soft-close, loft, pooja units
- Real-looking Google review quotes with names
- 6 FAQs answering real buyer questions
- Clear process (6 steps), warranty terms, address & hours

### [High] Showcase images look AI-generated but are labelled 'Real projects'
The five showcase images come from an image-generation pipeline (vite.config comment 'generate_image output', timestamped filenames) yet sit under 'REAL PROJECTS. HAPPY CLIENTS.' with specific localities (Porur, Anna Nagar). For an interiors business, portfolio authenticity is the core trust signal; misleading visuals hurt E-E-A-T and conversions and can conflict with Google's misrepresentation policies for ads/GBP.

**Fix:** Replace with real site photos (even phone photos) of completed jobs; until then label them 'Design concept' and remove locality claims.

### [Medium] Thin authorship / Experience signals
No founder/owner name, team photo, workshop photo, year established, GST/registration, or link to the Google Business Profile reviews page.

**Fix:** Add an About block: owner name + photo, founding year, workshop photo, GBP review link, social profiles.

### [Medium] Stale conflicting metadata.json
metadata.json says 'Kalaigar Interiors — since 2004, 22 years, Burma teak, 15-year guarantee' — contradicts site (MN Interiors, 20+ years, 10-year warranty). If served it is a contradictory entity signal.

**Fix:** Update or delete metadata.json (it is AI-Studio scaffolding).

### [Low] Unverifiable stat claims
'100% within agreed budget', 'Rated 5 ★ for workmanship' on anonymised projects.

**Fix:** Tie each benchmark to a named review or real photo set.


## On-Page SEO — 62/100

**What works:**
- Title 68 chars with brand + service + location
- Meta description 150 chars, location + USP
- Exactly one H1; logical H2/H3 hierarchy
- Descriptive section IDs

### [High] Single page targets every service and locality
One URL tries to rank for modular kitchens, wardrobes, pooja rooms, TV units, shop interiors and 9 locality clusters. Competing Chennai interior sites rank with dedicated service and area pages.

**Fix:** Post-launch add /modular-kitchen-chennai, /wardrobes-chennai, /pooja-room-designs-chennai, /commercial-shop-interiors-chennai and 3-5 genuine area pages (Kundrathur, Porur, Tambaram...) with unique photos/projects.

### [Medium] H1 and title missing the primary search phrase
H1 is a slogan ('20+ years of Chennai interiors. Crafted to last every day.'). People search 'interior designers in Kundrathur', 'home interiors Chennai', 'modular kitchen Kundrathur'.

**Fix:** Title: 'MN Interiors | Interior Designers & Modular Kitchens in Kundrathur, Chennai'. Keep the slogan visually but add a keyword line inside the H1 or the pill above it.

### [Low] No navigation menu
Header has no links (by design). Section anchors exist only further down.

**Fix:** Fine for a one-pager; once service pages exist, add a nav.

### [Low] No outbound authority links
Only tel:, wa.me and a Google Maps search link. No link to the actual GBP listing or socials.

**Fix:** Link the real GBP place URL (from Share on Maps) and Instagram/Facebook/YouTube if they exist.


## Schema / Structured Data — 10/100

**What works:**
- Content needed for schema (NAP, hours, FAQs, services) already exists in src/data/content.ts

### [High] No JSON-LD at all
Zero structured data blocks found after render.

**Fix:** Add static JSON-LD in index.html: HomeAndConstructionBusiness (name, address 600089, geo, telephone, openingHours, url, image, priceRange, areaServed Chennai, sameAs GBP/socials), WebSite, and FAQPage mirroring the 6 FAQs.

### [Info] Don't add self-serving AggregateRating
Google ignores review stars a LocalBusiness puts on its own site, and marking up the 4.9/71 Google rating there can be treated as a policy violation.

**Fix:** Omit aggregateRating/review; let the GBP carry stars.


## Performance (CWV) — 70/100

**What works:**
- Desktop lab: FCP 0.28 s, LCP 0.64 s, CLS 0.0005
- Mobile (4x CPU, ~1.6 Mbps, 150 ms RTT): FCP 1.42 s, LCP 1.85 s (text element), CLS 0.068
- Images lazy-loaded
- fonts display=swap with preconnect

### [Medium] 504 KB JS bundle (149 KB gzip) gates all content
Because the page is client-rendered, nothing paints until the full bundle downloads and executes. Vite warns the chunk exceeds 500 KB. Real-world Indian 4G + local server latency will push LCP higher than lab.

**Fix:** Pre-rendering fixes the critical path. Also split BookingModal/WorkShowcase via lazy(), and check phosphor icon imports tree-shake.

### [Low] Mobile CLS 0.068
Under the 0.1 threshold but close; images lack width/height and fonts swap.

**Fix:** Add width/height (or aspect-ratio) to images; consider size-adjust fallback fonts.

### [Low] Unused heavy dependencies
@google/genai, express, lucide-react, dotenv are in dependencies but not imported by src.

**Fix:** Remove from package.json.

### [Info] Field data unavailable
No CrUX data pre-launch.

**Fix:** Check PageSpeed Insights / Search Console CWV 28 days after launch.


## AI Search Readiness — 30/100

**What works:**
- FAQ answers are self-contained and quotable
- Explicit facts: address, phone, hours, warranty, years, service area

### [Critical] AI crawlers see an empty page
GPTBot, ClaudeBot, PerplexityBot and most agent fetchers don't run JS — they would index only the <title> and meta description.

**Fix:** Pre-render (same fix as Technical).

### [Medium] No entity corroboration
No sameAs links, no Organization schema, no About/owner info for AI engines to resolve the entity 'MN Interiors Kundrathur'.

**Fix:** Schema with sameAs + consistent NAP on GBP, JustDial, Sulekha, IndiaMART, Houzz.

### [Low] No robots.txt AI policy / llms.txt
Optional; llms.txt is not used by Google.

**Fix:** robots.txt allowing all is sufficient; llms.txt optional.


## Images — 50/100

**What works:**
- All 5 images have descriptive, keyword-relevant alt text
- loading=lazy on all

### [High] 3.9 MB of JPEGs
Each showcase image is 680-836 KB at 1200-1376 px, displayed at 362-746 px.

**Fix:** Export WebP/AVIF at 800 and 1400 px with srcset; target <150 KB each.

### [High] No og:image / social preview
Links shared on WhatsApp (your main channel) show no preview image.

**Fix:** Add 1200x630 og:image + twitter:image (a real kitchen photo with logo).

### [Medium] No width/height attributes
Contributes to layout shift.

**Fix:** Add intrinsic width/height.

### [Low] Non-descriptive filenames
mn_kitchen_showcase_1795762703455.jpg

**Fix:** modular-kitchen-kundrathur-chennai.webp etc.


## Screenshots
See `screenshots/` (desktop and mobile, above-fold and full page).
