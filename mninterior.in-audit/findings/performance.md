# Performance (CWV) — 70/100

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

