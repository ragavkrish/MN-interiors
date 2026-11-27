# SEO Audit — MN Interiors (Kundrathur, Chennai)

- **Audited**: `main` @ 918101d (React + Vite single-page site), built and served locally
- **Date**: 2026-11-27
- **Business type detected**: Local service business, hybrid (workshop/showroom visits + service-area work across Chennai) — interior design & carpentry/joinery
- **Method**: code + build inspection, Playwright rendering (desktop, throttled mid-range Android), live web searches for the brand, domain and local keywords
- **Not measured (and why)**: the site is **not deployed** — `mninterior.in` (the domain in the footer) has no indexed pages. Live rankings, Search Console data, Core Web Vitals field data and backlink metrics therefore don't exist yet; no DataForSEO/Moz/Google API credentials are configured either. Every finding below is from evidence gathered here; anything unverified is labelled **VERIFY**.

---

## Executive summary

**SEO Health Score: 40 / 100** (pre-launch)

| Category | Weight | Score | Main reason |
| --- | --- | --- | --- |
| Technical SEO | 22% | 35 | Content is JavaScript-only; no robots.txt, sitemap, canonical, favicon; private design files would be published |
| Content quality | 23% | 50 | Strong local copy, but heavy repetition, no real people/photos, unverifiable claims |
| On-page SEO | 20% | 45 | Decent title/description; **one URL only**, no keyword-targeted pages, anchors instead of pages |
| Schema / structured data | 10% | 0 | None |
| Performance | 10% | 70 | Fast enough (LCP ≈ 2.1 s throttled, CLS 0) but 3.8 MB of unoptimised photos |
| AI search readiness | 10% | 25 | AI crawlers see an empty page; no entity data; name collides with other "MN Interiors" |
| Images | 5% | 40 | Good alt text; oversized JPEGs, no dimensions, AI images, meaningless filenames |

**The one-sentence verdict:** the site is a single, well-written landing page — but to search engines it is *one empty URL* about a business whose name already belongs to firms in Indore and on IndiaMART. It can't rank for anything competitive until it (1) is deployed and pre-rendered, (2) becomes multiple pages that each target a service or area, and (3) is tied to a verified Google Business Profile.

### Top 5 critical issues
1. **Not live / not indexed.** No page from `mninterior.in` is in search results. Nothing else matters until the site is deployed on its domain and submitted to Google Search Console.
2. **Empty HTML for crawlers.** The served HTML body is `<div id="root"></div>`; all 2,376 words appear only after JavaScript runs. Google can usually render it (slowly), but Bing, WhatsApp/Facebook link previews and AI assistants (ChatGPT, Perplexity) mostly see nothing.
3. **Only one page.** Anchors like `#services` are not pages. Competitors rank with a page per service *and* per locality (e.g. HomeLane `/interior-designers-chennai/porur`, `/tambaram`; Cibi+Simeon `/pallavaram`). MN has nothing to rank for "modular kitchen Porur" or "interior designers Pallavaram".
4. **No structured data + brand-name collision.** Search results for "MN Interiors" return an Indore studio (Houzz) and IndiaMART sellers named "M N Interior". Without `LocalBusiness` schema, consistent NAP and a Google Business Profile, Google can't tell which "MN Interiors" this is.
5. **Possible wrong PIN code (VERIFY).** The site says *Kundrathur … Chennai **600089***. Kundrathur's PIN is commonly **600069**; 600089 is the Ramapuram area. A wrong PIN breaks NAP consistency with Google Maps and directories.

### Top 5 quick wins
1. Add `robots.txt`, `sitemap.xml`, canonical tag, favicon, `og:image` (≈1 hour).
2. Add `LocalBusiness` (`HomeAndConstructionBusiness`) JSON-LD with address, geo, hours, phone, `sameAs` (≈1 hour).
3. Remove `public/assets/aistudio/` before launch — it would publish a 2.9 MB PNG and the private design-reference document at public URLs.
4. Compress the 5 showcase photos to WebP/AVIF at 3 sizes (3.8 MB → ~0.5 MB), add width/height.
5. Claim/verify the Google Business Profile and make its name, address, phone and hours match the site exactly.

---

## 1. Technical SEO — 35/100

| Finding | Severity | Evidence | Fix |
| --- | --- | --- | --- |
| Site not deployed; domain has no indexed pages | **Critical** | Web search for `mninterior.in` returns no pages from the domain | Deploy (Vercel/Netlify/Cloudflare Pages), connect domain, verify in Google Search Console + Bing Webmaster Tools |
| Client-side rendering only | **Critical** | `dist/index.html` body = `<div id="root"></div>` | Pre-render every route to static HTML at build time (e.g. `vite-react-ssg`, or move to Astro/Next static export). Required anyway for multi-page (§3) |
| No `robots.txt` | High | not in `public/` or `dist/` | Add `public/robots.txt` allowing all + `Sitemap:` line |
| No `sitemap.xml` | High | missing | Generate at build from the route list |
| No canonical tag | High | 0 in `index.html` | `<link rel="canonical">` per page (absolute URL, chosen www/non-www) |
| Private files would be published | High | `public/assets/aistudio/` = 2.9 MB PNG + 2 PNGs + `DESIGN-nextgenx_*.md` (internal design doc), all unused by the site | Delete the folder (or move out of `public/`) |
| Raw images shipped twice | Medium | build copies `src/assets` into `dist/src/assets` via a custom plugin; images referenced as `/src/assets/...` strings | Import images through Vite (hashed, cacheable), drop the copy plugin |
| No favicon / apple-touch-icon / manifest | Medium | none in build | Add favicon set; shows in Google mobile results |
| Hash-only navigation | Medium | nav links `#our-work`, `#services`… | Keep anchors for in-page scrolling, but services/projects/areas need real URLs (§3) |
| No 404 page / redirects plan | Low | SPA | Static 404 page; redirect `www` ↔ apex, HTTP → HTTPS at host |
| `lang="en"` only | Low | `<html lang="en">` | Fine for now; use `en-IN`. A Tamil version is a later opportunity (§3) |

## 2. Content quality & E-E-A-T — 50/100

**What works:** genuinely local, specific copy (Chennai humidity, BWP plywood, pooja mandapams, South Indian cooking); clear offer; 2,376 words; FAQ exists; real Google reviews quoted.

| Finding | Severity | Detail | Fix |
| --- | --- | --- | --- |
| Heavy repetition dilutes the page | High | "free" ×21, "Kundrathur" ×30, "10-year warranty" ×13, "4.9" ×11, phone ×14; four sections make the same "why us" argument | Covered by the design plan (merge sections) — do it once, it fixes both |
| **Experience** signals missing | High | No founder/team names or faces, no workshop photos, no years-founded date on page, no certifications/brands used | About/workshop page with named founder, team photo, machines, "since 2004"; brand list (Hettich, Greenply…) **if true** |
| Showcase photos are AI-generated, labelled with real localities | High | 5 AI images captioned "Kundrathur", "Porur", "Anna Nagar"… | Replace with real project photos before launch, or caption neutrally. Google's guidance and user trust both punish fabricated proof |
| Unverifiable claims | Medium | "Rated 5★ for workmanship", "100% within agreed budget", "556+ homes", "Verified 5★ Google review" | Keep only what can be backed (linked GBP reviews, real project count) |
| Missing high-intent answers | High | No cost/price guidance, no timeline, no materials comparison — the top questions searchers ask ("modular kitchen cost per sq ft Chennai") | Cost guide + FAQ entries (overlaps design plan item "cost/timeline FAQs" — write once, use on page + FAQ schema) |
| Thin service coverage | High | Each service = ~50 words on one card | One page per service, 600–1,000 words each, with photos, process, price range, FAQs (§3) |

## 3. On-page SEO, keywords & pages to rank — 45/100

**Title** (`MN Interiors — Home Interiors & Craftsmanship in Kundrathur, Chennai`, 66 chars): OK, but leads with the brand nobody searches yet and misses the head term "interior designers". **Meta description** (151 chars): fine. **H1** (`20+ years of Chennai interiors. Crafted to last every day.`): no target keyword. **13 H2s**: slogans ("Good interiors should not wear out…"), none keyword-aligned.

### Do we have enough keywords? No — the site targets none deliberately

Without a keyword tool connected, search volumes can't be quoted here. Based on what currently ranks (directories, HomeLane/DesignCafe city + locality pages, IndiaMART product pages), these are the realistic clusters, ordered by how winnable they are for a local workshop:

| Cluster | Example queries | Who ranks today | Winnable? | Page that should target it |
| --- | --- | --- | --- | --- |
| **Near-me / map pack** | "interior designers near me", "carpenter near me", "modular kitchen near me" | Google Maps 3-pack | **Yes — best ROI** | Google Business Profile + Home page |
| **Hyper-local** | "interior designers in Kundrathur", "modular kitchen Kundrathur", "interior decorators Kavanur" | Quikr/Sulekha directory pages with no real firms | **Yes — weak competition** | Home + Kundrathur area page |
| **Nearby localities** | "interior designers Porur / Pallavaram / Tambaram / Pammal / Anakaputhur / Mangadu / Iyyappanthangal / Chromepet / Poonamallee / Gerugambakkam" | HomeLane, Cibi+Simeon, Homworks locality pages | Medium | 6–8 area pages (only with real local projects — see doorway warning) |
| **Service + city** | "modular kitchen Chennai", "wardrobe manufacturers Chennai", "pooja unit designs Chennai", "TV unit design Chennai", "shop interiors Chennai" | HomeLane, Livspace, DesignCafe, IndiaMART | Hard for head terms; medium for long-tail | 6 service pages |
| **Cost / commercial-investigation** | "modular kitchen cost per sq ft Chennai", "2BHK/3BHK interior cost Chennai", "wardrobe price per sq ft" | HomeLane cost calculators, IndiaMART | Medium (local workshop pricing is a real differentiator) | Cost guide page |
| **Material / informational** | "BWP vs MR plywood", "laminate vs acrylic kitchen", "best plywood for Chennai humidity" | Blogs, brand sites | Medium, slow | Guides (Phase 3) |
| **Brand** | "MN Interiors Kundrathur" | **Indore "MN Interiors" (Houzz)** | Yes once entity is established | Home + GBP + `sameAs` |

### Do we have enough pages to rank? No — 1 URL vs. ~25 needed

Proposed site map (each line = one crawlable, pre-rendered URL with its own title, H1, description, schema):

```
/                                   Home (interior designers in Kundrathur, Chennai)
/services/modular-kitchens          Modular kitchens Chennai
/services/wardrobes                 Wardrobes & bedroom furniture
/services/pooja-units               Pooja units & mandapams
/services/tv-units-living           TV units, crockery, living storage
/services/full-home-interiors       Full home (2BHK/3BHK/villa) interiors
/services/shop-interiors            Shops & commercial
/projects                           Project gallery (= showcase plan)
/projects/<project-slug>            One page per real project (= showcase plan item M)
/areas/kundrathur                   + porur, pallavaram, tambaram, pammal, anakaputhur, mangadu, iyyappanthangal
/interior-cost-chennai              Cost guide (kitchen per sq ft, 2BHK/3BHK ranges, what changes price)
/about                              Founder, team, Kundrathur workshop, since 2004
/contact                            NAP, map, hours, form, WhatsApp
/reviews                            (optional) all Google reviews summary
```

**Doorway-page warning:** area pages must each carry genuine local content (projects done in that area, travel time from the workshop, local building types). Copy-pasted city-swapped pages get filtered. Build an area page only when there are 2+ real projects there.

### Internal linking
Today: 12 anchor links to 6 sections, 2 external hosts (wa.me, google.com). Target: services ↔ projects ↔ areas cross-linked (each project page links to its service + area; each service page lists its projects).

## 4. Schema / structured data — 0/100

Nothing present. Add (as JSON-LD, generated from `content.ts` so it never drifts from the visible content):

| Type | Where | Key fields |
| --- | --- | --- |
| `HomeAndConstructionBusiness` (LocalBusiness) | every page (site-wide) | name, url, telephone, address (**VERIFY PIN**), geo, openingHours, priceRange, areaServed (list of localities), image, logo, `sameAs` (GBP, Instagram, Facebook, Justdial…), aggregateRating **only if** it mirrors real Google data and policy allows (self-serving review markup is not shown as stars for LocalBusiness — keep it out) |
| `Service` | each service page | serviceType, provider, areaServed, offers/priceSpecification (ranges) |
| `FAQPage` | FAQ + cost guide | questions visible on page only |
| `BreadcrumbList` | inner pages | |
| `ImageObject` / `CreativeWork` | project pages | contentLocation, image, dateCreated |

## 5. Performance — 70/100

Measured locally on a throttled mid-range Android profile (≈1.6 Mbps, 150 ms latency, 4× CPU): **FCP 1.55 s, LCP 2.14 s, CLS 0** — good. Field data (CrUX) doesn't exist until launch.

| Finding | Severity | Fix |
| --- | --- | --- |
| 3.8 MB of images on a full scroll (5 JPEGs 680–835 KB each, served full size to phones) | High | Responsive AVIF/WebP at 640/1080/1600 w with `srcset` (≈85–90% smaller). The scrapped showcase branch already has a working pipeline (`vite-imagetools`) — reuse it |
| ~150 KB gzip JS for one page (Motion library) | Medium | Fine today; pre-rendering will improve FCP/LCP further |
| Google Fonts render-blocking | Low | `font-display: swap` is set; self-host the two fonts to drop the extra origin |

## 6. AI search readiness (GEO) — 25/100

| Finding | Severity | Fix |
| --- | --- | --- |
| AI crawlers (GPTBot, PerplexityBot, ClaudeBot) don't run JavaScript → see an empty page | **Critical** | Pre-rendering (§1) |
| Entity ambiguity: other "MN Interiors" in Indore and on IndiaMART | High | Consistent "MN Interiors, Kundrathur" naming, schema `sameAs`, GBP, citations (§8) |
| Answers are buried in cards, not quotable passages | Medium | Cost guide + FAQ written as short, factual, self-contained answers (e.g. "A 10 ft modular kitchen in Chennai typically costs ₹X–₹Y with BWP plywood…") |
| No `llms.txt` | Low | Optional; add a short one after launch |

## 7. Images — 40/100

Alt text is excellent (130–140 descriptive characters each). Problems: filenames are meaningless (`mn_kitchen_showcase_1795762703455.jpg`), no `width`/`height`, no modern formats, and the photos are AI-generated. Rename real photos descriptively (`modular-kitchen-u-shaped-kundrathur.jpg`), compress, add dimensions, add `ImageObject` on project pages.

## 8. Local SEO & backlinks

### Do we have enough backlinks? Zero — and they can't be measured until launch
The domain has no indexed pages and no backlink data source is connected (Moz/Bing/DataForSEO). For a local trades business, **links matter less than the Google Business Profile, reviews and citations**. Priorities:

1. **Google Business Profile** — the site quotes 71 reviews at 4.9★; make sure this profile is claimed, the category is "Interior designer" (+ "Kitchen remodeler", "Carpenter", "Furniture maker"), the website field points to the new domain, and photos are real. **VERIFY** the profile name/address match the site.
2. **NAP consistency** — one exact format everywhere: `MN Interiors, No. 16, Ganapathy Nagar 1st Street, Sriperumbudur Main Road, Kundrathur, Chennai 6000XX, +91 98403 84824`. The site currently shows the phone in two formats and the area as "Kundrathur, Kavanur" / "Kundrathur & Kavanur".
3. **Citations (first 15–20 links)** — Justdial, Sulekha, IndiaMART (claim/clean up any "M N Interior" listing), Houzz India, UrbanClap/Urban Company (if listed), Bing Places, Apple Business Connect, Facebook, Instagram, Quikr, Grotal, Yellow Pages India, local Kundrathur/Porur directories.
4. **Earned local links** — material suppliers' "dealers/fabricators" pages (plywood, hardware brands), builders/flat promoters you've done interiors for, local associations, Tamil home-decor YouTubers/Instagram features of finished homes.
5. **Review engine** — WhatsApp a review link after every handover; reply to every review. Recency and volume drive the map pack more than any backlink.

## 9. Search experience (SXO)

Searchers for "interior designers in Kundrathur" expect: photos of finished homes, a price idea, location/map, and a quick call/WhatsApp. The page delivers call/WhatsApp well, but shows 5 (AI) photos, no prices and no map — and makes them scroll past ~11 phone screens of repeated reassurance. The design plan's restructure + the SEO page split solve this together.

---

## Appendix — evidence
- Search: "MN Interiors" Kundrathur Chennai → no matching business; Indore "MN Interiors" on Houzz; IndiaMART "M N Interior" listings.
- Search: `mninterior.in` → no pages from the domain.
- Search: Kundrathur / Porur / Tambaram / Pallavaram interior designers → directories (IndiaMART, Sulekha, Quikr), national brands with locality pages (HomeLane, DesignCafe, Homworks), local firm Cibi+Simeon with Pallavaram pages.
- Build: `dist/index.html` body is an empty root; no robots/sitemap/canonical/favicon/og:image/JSON-LD; `public/assets/aistudio/` would be deployed.
- Render: 1 H1, 13 H2, 21 H3; 2,376 words; 5 images (all `loading=lazy`, no dimensions); internal links are 6 anchors (×2).
