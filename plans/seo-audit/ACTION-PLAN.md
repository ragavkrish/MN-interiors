# Combined Action Plan — Design + SEO + Showcase

One roadmap that merges three earlier pieces of work so nothing is done twice:

- **D** = design audit (Emil Kowalski principles; structure, headlines, alignment, copy) — delivered in chat on 2026-11-27
- **S** = this SEO audit (`FULL-AUDIT-REPORT.md`)
- **W** = showcase overhaul plan (`plans/showcase-overhaul.md`; Phase 1 was built on branch `showcase-test` and scrapped, but its image pipeline and project data model are reusable)

Each task lists which audits it satisfies. Where two audits asked for the same thing, it appears **once**.

---

## Decisions needed before building

| # | Decision | Why it blocks |
| --- | --- | --- |
| 1 | **Correct PIN code** — 600069 (Kundrathur) or 600089? | NAP must be exact on site, schema, GBP and every directory |
| 2 | **Domain** — is `mninterior.in` yours and the final address? | Canonicals, sitemap, schema, GBP website field |
| 3 | **Google Business Profile** — do you have access to the profile with the 71 reviews? | Map pack is the #1 traffic source for this business |
| 4 | **Real photos** — when can you shoot 8–12 finished projects? | Project pages, service pages, area pages and E-E-A-T all depend on them |
| 5 | **Price ranges** you're comfortable publishing (kitchen per sq ft, 2BHK/3BHK) | Cost guide + FAQ |
| 6 | **"556+ homes"** — is this the real count? | It's now a headline stat; must be defensible |
| 7 | Founder/team **names and photo** for the About page | E-E-A-T |

---

## Phase 1 — Foundation (week 1): make the site crawlable and correct

| # | Task | Satisfies | Notes |
| --- | --- | --- | --- |
| 1.1 | **Move to pre-rendered multi-page** (static HTML per route at build) | S-Critical (empty HTML, one URL), S-AI readiness | `vite-react-ssg` keeps the current React code; Astro is the alternative if a rebuild is acceptable. Everything in Phase 2 assumes real routes |
| 1.2 | Delete `public/assets/aistudio/`; import images via Vite and drop the copy plugin | S-Technical | Stops publishing the private design doc + 3.4 MB of unused files |
| 1.3 | Image pipeline: AVIF/WebP at 640/1080/1600, `srcset`, width/height, blur placeholder, descriptive filenames | S-Performance, S-Images, W-L | **Reuse** `ProjectPhoto` + `projectImages.ts` from `showcase-test` |
| 1.4 | Project data model (multiple photos, scope, area, facts) | W-A, S-content | **Reuse** from `showcase-test`; it now also feeds project pages, schema and sitemap |
| 1.5 | `robots.txt`, `sitemap.xml` (generated from routes), canonical per page, favicon set, `og:image` per page | S-Technical quick wins | |
| 1.6 | Site-wide `HomeAndConstructionBusiness` JSON-LD generated from `CONTACT_INFO` | S-Schema | Single source of truth = no NAP drift |
| 1.7 | **NAP clean-up**: one phone format (`+91 98403 84824`), one address format, verified PIN | S-Local, D-copy (phone & locality formats) | One fix closes both audits |
| 1.8 | Fix the enquiry form so submissions reach you (email/WhatsApp/sheet) | First review, D | Conversions — no point ranking if leads are lost |
| 1.9 | Deploy (Vercel/Netlify) on the domain; Search Console + Bing Webmaster; submit sitemap | S-Critical | |

## Phase 2 — Structure & pages (weeks 2–3): one homepage that sells, plus pages that rank

| # | Task | Satisfies | Notes |
| --- | --- | --- | --- |
| 2.1 | **Homepage restructure**: Hero → Stats → Work → Services → Reviews → Why MN (merged) → Process → Enquiry → FAQ → Final CTA | D-structure (order), S-SXO | |
| 2.2 | **Merge the 4 "why us" sections** into one; fold "Three promises" into stats | D-repetition, S-content (repetition) | Cuts ~40% of homepage length |
| 2.3 | **Headline rewrite** — fix broken lines (per-line `<span>`s, `text-wrap: pretty`) *and* put target keywords in H1/H2 | D-headlines, S-on-page | Do both in one pass: e.g. H1 "Interior designers in Kundrathur, Chennai — built in our own workshop since 2004" |
| 2.4 | **Service pages** ×6 (kitchens, wardrobes, pooja, TV/living, full home, shops), 600–1,000 words, photos, process, price range, FAQs, `Service` + `FAQPage` schema | S-pages, D-"add photos to services" | Homepage service cards become links to these |
| 2.5 | **Projects gallery + project pages** (`/projects/<slug>`) | W-C, W-D, W-M (moved up from "later"), S-pages | The showcase plan's project view becomes real URLs instead of `#project=` hashes |
| 2.6 | **Cost guide** `/interior-cost-chennai` + cost/timeline FAQs | D-missing content, S-keywords (cost cluster), S-AI citability | Same content serves page, FAQ section and FAQ schema |
| 2.7 | **About / workshop page** — founder, team, machines, since 2004 | D-"faces of team", W-I (workshop strip), S-E-E-A-T | |
| 2.8 | **Contact page** with map embed, email, hours | D-"email, map", S-local | |
| 2.9 | Layout/alignment fixes: card title min-heights + bottom labels aligned, equal-height enquiry cards, one content width, phone filter row scrolls | D-layout | Do during 2.1 so sections aren't fixed twice |
| 2.10 | Limit pink "highlight" cards (contrast 4.1:1 fails AA for body text) | D-layout, S-accessibility | |
| 2.11 | Header/footer nav: same labels, add Contact, link real pages | D-copy, S-internal linking | |

## Phase 3 — Local authority (month 2)

| # | Task | Satisfies |
| --- | --- | --- |
| 3.1 | GBP optimisation: categories, services, real photos weekly, website → domain, Q&A | S-Local |
| 3.2 | 15–20 citations with identical NAP (Justdial, Sulekha, IndiaMART clean-up, Houzz IN, Bing Places, Apple Business Connect, Facebook, Instagram…) | S-Local, S-backlinks, S-entity |
| 3.3 | Review engine: WhatsApp review link at every handover; reply to all | S-Local |
| 3.4 | **Area pages** (Kundrathur first; then Porur, Pallavaram, Tambaram, Pammal, Anakaputhur, Mangadu, Iyyappanthangal) — only where 2+ real projects exist | S-keywords (locality cluster) |
| 3.5 | Before/after slider + "Up close" finishes strip on project/service pages | W-J, W-H |
| 3.6 | Earned links: supplier dealer pages, builder partners, local features | S-backlinks |

## Phase 4 — Content & monitoring (ongoing)

| # | Task | Satisfies |
| --- | --- | --- |
| 4.1 | 1–2 guides/month (plywood for Chennai humidity, laminate vs acrylic, pooja unit sizing…) | S-informational cluster, S-AI |
| 4.2 | Monthly Search Console review; drift baseline after launch (`/seo drift`) | S-monitoring |
| 4.3 | Re-run this audit 6–8 weeks after launch with real crawl + field data | — |
| 4.4 | Optional: Tamil-language versions of top service pages | S-keywords |

---

## Overlap map (what was merged)

| Earlier item | Now lives in |
| --- | --- |
| D: merge repetitive sections / reorder page | 2.1, 2.2 |
| D: broken headlines | 2.3 (together with keyword targeting) |
| D: add photos to services / "Real projects" has no photos | 2.4, 2.5 |
| D: cost & timeline FAQs | 2.6 |
| D: email, map | 2.8 |
| D: team faces | 2.7 |
| D: phone/locality formats | 1.7 |
| D: alignment, card heights, widths, pink cards, nav labels | 2.9–2.11 |
| W-A data model, W-L image pipeline | 1.3, 1.4 (reuse code from `showcase-test`) |
| W-B image-led hero | 2.1 (hero gets the lead project photo) |
| W-C bigger gallery, W-D project view, W-E merge case studies | 2.5 |
| W-M per-project pages (was "Phase 3 later") | 2.5 — **moved up**, SEO needs them |
| W-H up-close strip, W-I workshop, W-J before/after | 3.5, 2.7 |
| W-F services→work links, W-G reviews→work | 2.4, 2.5 |
| W-K trim text sections | 2.2 |
