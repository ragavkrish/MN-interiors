# Technical SEO — 45/100

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

