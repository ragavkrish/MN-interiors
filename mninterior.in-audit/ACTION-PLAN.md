# MN Interiors — SEO Action Plan

## Critical
- **Client-side-only rendering: empty HTML shell** (Technical SEO) — Pre-render the page at build time (e.g. vite-plugin-prerender / react-dom/server renderToString in a small build script, or move to Astro/Next static export) so dist/index.html ships the full HTML; hydrate on top.
- **AI crawlers see an empty page** (AI Search Readiness) — Pre-render (same fix as Technical).

## High
- **No robots.txt or sitemap.xml** (Technical SEO) — Add public/robots.txt (Allow all + Sitemap: https://mninterior.in/sitemap.xml) and public/sitemap.xml listing https://mninterior.in/. Configure host to return real 404s for unknown paths.
- **No canonical, og:url or www/apex decision** (Technical SEO) — Add <link rel="canonical" href="https://mninterior.in/"> and og:url; 301 www→apex and block/redirect the *.run.app host.
- **Showcase images look AI-generated but are labelled 'Real projects'** (Content Quality) — Replace with real site photos (even phone photos) of completed jobs; until then label them 'Design concept' and remove locality claims.
- **Single page targets every service and locality** (On-Page SEO) — Post-launch add /modular-kitchen-chennai, /wardrobes-chennai, /pooja-room-designs-chennai, /commercial-shop-interiors-chennai and 3-5 genuine area pages (Kundrathur, Porur, Tambaram...) with unique photos/projects.
- **No JSON-LD at all** (Schema / Structured Data) — Add static JSON-LD in index.html: HomeAndConstructionBusiness (name, address 600089, geo, telephone, openingHours, url, image, priceRange, areaServed Chennai, sameAs GBP/socials), WebSite, and FAQPage mirroring the 6 FAQs.
- **3.9 MB of JPEGs** (Images) — Export WebP/AVIF at 800 and 1400 px with srcset; target <150 KB each.
- **No og:image / social preview** (Images) — Add 1200x630 og:image + twitter:image (a real kitchen photo with logo).

## Medium
- **No favicon / apple-touch-icon** (Technical SEO) — Add a 48x48-multiple favicon (SVG + PNG) and apple-touch-icon.
- **Thin authorship / Experience signals** (Content Quality) — Add an About block: owner name + photo, founding year, workshop photo, GBP review link, social profiles.
- **Stale conflicting metadata.json** (Content Quality) — Update or delete metadata.json (it is AI-Studio scaffolding).
- **H1 and title missing the primary search phrase** (On-Page SEO) — Title: 'MN Interiors | Interior Designers & Modular Kitchens in Kundrathur, Chennai'. Keep the slogan visually but add a keyword line inside the H1 or the pill above it.
- **504 KB JS bundle (149 KB gzip) gates all content** (Performance (CWV)) — Pre-rendering fixes the critical path. Also split BookingModal/WorkShowcase via lazy(), and check phosphor icon imports tree-shake.
- **No entity corroboration** (AI Search Readiness) — Schema with sameAs + consistent NAP on GBP, JustDial, Sulekha, IndiaMART, Houzz.
- **No width/height attributes** (Images) — Add intrinsic width/height.

## Low
- **Images served from /src/assets path via copy plugin** (Technical SEO) — Import images or move to public/images with descriptive names (modular-kitchen-kundrathur-chennai.webp).
- **Unverifiable stat claims** (Content Quality) — Tie each benchmark to a named review or real photo set.
- **No navigation menu** (On-Page SEO) — Fine for a one-pager; once service pages exist, add a nav.
- **No outbound authority links** (On-Page SEO) — Link the real GBP place URL (from Share on Maps) and Instagram/Facebook/YouTube if they exist.
- **Mobile CLS 0.068** (Performance (CWV)) — Add width/height (or aspect-ratio) to images; consider size-adjust fallback fonts.
- **Unused heavy dependencies** (Performance (CWV)) — Remove from package.json.
- **No robots.txt AI policy / llms.txt** (AI Search Readiness) — robots.txt allowing all is sufficient; llms.txt optional.
- **Non-descriptive filenames** (Images) — modular-kitchen-kundrathur-chennai.webp etc.

## Roadmap
### Phase 1: Critical Fixes (before launch) (Week 1)
- [ ] Pre-render the homepage to static HTML
- [ ] Add robots.txt, sitemap.xml, canonical, og:url
- [ ] Add HomeAndConstructionBusiness + WebSite + FAQPage JSON-LD
- [ ] Replace or relabel AI-generated 'real project' images
- [ ] Fix/delete metadata.json

### Phase 2: High-Impact Improvements (Weeks 2-3)
- [ ] Compress images to WebP with srcset + width/height
- [ ] Add og:image and favicon
- [ ] Keyword-align title/H1
- [ ] Link real GBP listing; set up Search Console + Bing Webmaster, submit sitemap
- [ ] 301 www→apex and run.app→domain; real 404s
- [ ] Remove unused deps, lazy-load modal

### Phase 3: Content & Authority (Month 2)
- [ ] Service pages (kitchens, wardrobes, pooja, TV units, shop interiors)
- [ ] 3-5 genuine area pages with real local projects
- [ ] About section with owner + workshop photos
- [ ] Citations with identical NAP: JustDial, Sulekha, IndiaMART, Houzz, Facebook, Instagram
- [ ] Ask happy clients for Google reviews mentioning service + area

### Phase 4: Monitoring & Iteration (Ongoing)
- [ ] Re-run this audit against live mninterior.in (headers, redirects, CWV field data)
- [ ] Monitor GSC queries/indexing monthly
- [ ] Add new project photos monthly

