# Schema / Structured Data — 10/100

**What works:**
- Content needed for schema (NAP, hours, FAQs, services) already exists in src/data/content.ts

### [High] No JSON-LD at all
Zero structured data blocks found after render.

**Fix:** Add static JSON-LD in index.html: HomeAndConstructionBusiness (name, address 600089, geo, telephone, openingHours, url, image, priceRange, areaServed Chennai, sameAs GBP/socials), WebSite, and FAQPage mirroring the 6 FAQs.

### [Info] Don't add self-serving AggregateRating
Google ignores review stars a LocalBusiness puts on its own site, and marking up the 4.9/71 Google rating there can be treated as a policy violation.

**Fix:** Omit aggregateRating/review; let the GBP carry stars.

