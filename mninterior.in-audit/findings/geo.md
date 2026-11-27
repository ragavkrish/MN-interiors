# AI Search Readiness — 30/100

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

