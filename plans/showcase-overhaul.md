# Showcase Overhaul — giving the work the weight it deserves

- **Status**: PLAN (nothing built yet)
- **Branch**: `showcase-test`
- **Written against commit**: bd3fc70
- **Approach**: Emil Kowalski's design-engineering philosophy — let the work carry the page, keep motion
  restrained and purposeful, sweat the invisible details (image loading, swipe physics, layout shift).

---

## 1. Diagnosis — why the work feels light today

| What we found | Where | Why it matters |
| --- | --- | --- |
| The hero has **no imagery at all** — headline + a text table | `src/components/Hero.tsx` | An interiors studio's first impression is a text block. Visitors decide in seconds whether the work looks good; today they can't see any. |
| Only **5 projects**, **1 photo each** | `WORK_SHOWCASE_ITEMS`, `src/data/content.ts:107` | 20+ years of work shown as 5 single photos reads as a young company. |
| Projects have no facts (budget band, size, duration, materials, year) | `ShowcaseItem` interface, `content.ts:80` | Facts make a photo believable and help visitors picture *their* project. |
| "Real projects. Happy clients." is **text only** — 3 case studies with no photos | `CHENNAI_BENCHMARKS`, `App.tsx` band 8 | The strongest proof section has nothing to look at, and duplicates the gallery. |
| Services ("What we do") cards have **no photos and don't link to work** | `SIGNATURE_ROOMS`, `App.tsx` band 7 | "Modular kitchens" with an icon instead of a kitchen. |
| Reviews aren't connected to any project | `TESTIMONIALS` | "Divya loved her home" is stronger next to a photo of Divya's home. |
| Text sections outnumber visual sections ~10 : 1 | whole page | The layout came from a long-form *sales page* design system (`public/assets/aistudio/DESIGN-nextgenx_*.md`) — built to sell with words, not with a portfolio. |

**Principle for the overhaul:** *the photographs are the product.* Every section should either show work
or lead to it. Copy becomes the caption, not the headline.

---

## 2. The plan at a glance

| # | Move | Weight it adds | Effort | Phase |
| --- | --- | --- | --- | --- |
| A | Project data model: multiple photos + facts + linked review per project | Foundation for everything else | M | 1 |
| B | Hero becomes image-led (headline + large project photo) | First impression | M | 1 |
| C | Showcase grows to 9–12 projects, editorial grid, "Load more" | Volume = credibility | M | 1 |
| D | Project detail view: swipeable photo gallery + facts + client quote + CTA | Depth on each job | L | 1 |
| E | Merge "Real projects" case studies into the showcase as photo-led featured stories | Removes text duplication | S | 1 |
| F | Services cards get a photo and "See 4 kitchen projects →" link into the filtered gallery | Every section routes to work | S | 2 |
| G | Reviews show a thumbnail of that client's project, tap → opens that project | Proof + work together | S | 2 |
| H | "Up close" strip: macro shots of finishes (hinges, edges, veneer, handles) | Craftsmanship you can see | S | 2 |
| I | "Inside our workshop" strip: Kundrathur workshop, machines, team | Proves the in-house claim | S | 2 |
| J | Before / after slider on 2–3 projects | The transformation story | M | 2 |
| K | Trim text sections to rebalance the page | Lets photos breathe | S | 2 |
| L | Image pipeline: responsive sizes, WebP/AVIF, blur placeholders, no layout shift | Makes 50+ photos fast on 4G | M | 1 (must ship with C) |
| M | Separate page per project (`/projects/modular-kitchen-porur`) for Google | Search traffic | L | 3 (later) |

Phase 1 = the core showcase. Phase 2 = connect the rest of the page to the work. Phase 3 = SEO pages.

---

## 3. The moves in detail

### A. Project data model (foundation)

Everything else reads from this, and **swapping AI images for real photos later becomes a content-only
change** in `src/data/content.ts` — no code edits.

```ts
interface ShowcaseProject {
  id: string;                     // 'porur-3bhk-kitchen'
  title: string;                  // 'Warm Wood & Matte Modular Kitchen'
  category: 'Kitchens' | 'Wardrobes' | 'Pooja & TV Units' | 'Full Homes' | 'Living & Shops';
  area: string;                   // 'Porur, Chennai'
  propertyType: string;           // '3BHK Apartment'
  scope: string[];                // ['Modular kitchen', '3 wardrobes', 'TV unit']
  durationWeeks?: number;         // 6
  year?: number;                  // 2025
  materials: string[];            // ['BWP plywood', 'Matte laminate', 'Hettich soft-close']
  summary: string;                // 1–2 sentences
  cover: ProjectImage;            // the grid image
  gallery: ProjectImage[];        // 3–6 more photos
  before?: ProjectImage;          // optional, same angle as one gallery photo
  reviewId?: string;              // links to a TESTIMONIALS entry
  featured?: boolean;             // shown large in the grid
  enquiryScope: string;
}

interface ProjectImage {
  src: string;                    // processed by the image pipeline (move L)
  alt: string;                    // describe the room, not "image of kitchen"
  aspect: '3:2' | '4:5' | '1:1';  // drives the grid slot, prevents layout shift
}
```

- New category **"Full Homes"** — a whole-home project is the most impressive thing an interiors firm can
  show and currently has no home.
- Budget: show a **band** only if you're comfortable ("₹6–8 lakh"), otherwise leave it out. It pre-qualifies
  leads strongly, but it's a business decision — your call.

### B. Image-led hero

Today: headline (left) + "Why homeowners choose us" table (right).
Target: headline (left) + **one large project photo** (right, ~4:5 portrait on desktop, full-width
below the headline on mobile), with a small caption chip ("Modular kitchen · Porur · 2025") that opens
that project.

- The "Why choose us" table moves down into the stats strip (it repeats those facts anyway).
- **Motion:** keep the statement entrance. The photo reveals with `clip-path: inset(0 0 100% 0) → inset(0)`,
  **900ms `--ease-in-out`** (`cubic-bezier(0.77, 0, 0.175, 1)`), starting at **200ms** so it lands with
  the pink lines. Reduced motion: 300ms fade.
- **Not** an auto-rotating hero carousel: it pulls attention from the headline, and nobody waits for
  slide 3. One great photo beats five rotating ones.
- Performance: the hero photo is the page's main image — load it eagerly with `fetchpriority="high"`,
  never lazy.

### C. Showcase grows — 9–12 projects, editorial grid

- Move the section title to something work-first: **"OUR WORK — 20 YEARS, 500+ HOMES"** (use your real number).
- Grid: keep the current bento (1 large + 2 stacked) as the **opening row**, then a regular
  3-column grid (2 on tablet, 1 on phone). Large tile = the `featured` project.
- Each tile shows: cover photo, category chip, title, area, and **a photo-count badge ("1 / 6")** so
  people know there's more inside.
- Show **9** projects, then **"Show 6 more projects"** button (not infinite scroll — the page has sections
  below that people need to reach).
- Filters gain counts that update (already there) + the new "Full Homes" category.
- **Motion:** tiles reveal once on scroll — image `clip-path: inset(0 0 100% 0) → inset(0)` 600ms
  `--ease-out` with the existing shrinking stagger (0/45/85/120/150/175ms). Hover zoom stays at
  `scale(1.03)` 200ms, mouse only. "Show more" items enter with the same reveal; already-visible tiles
  don't move.

### D. Project detail view (the big one)

The current lightbox becomes a **project story**:

- **Desktop:** large dialog — photo stage (left, ~65%) with a thumbnail rail under it; details (right):
  title, area, facts row (property · scope · weeks · year), materials chips, summary, linked client quote
  with ★★★★★, then CTAs ("Get a quote for a similar kitchen", WhatsApp).
- **Phone:** full-height **bottom sheet** (drawer) instead of a centred box — swipe photos horizontally,
  scroll details below, drag down to close. Feels like an app, not a popup.
- **Photo gallery interaction:**
  - Swipe/drag tracks the finger 1:1; release with **velocity-based** snapping (a quick flick moves one
    photo even if the drag was short: `Math.abs(distance) / elapsedMs > 0.11`).
  - Rubber-band resistance at the first/last photo instead of a hard stop.
  - Arrow keys + Previous/Next buttons on desktop — **instant**, no slide animation on key presses
    (keyboard actions shouldn't animate).
  - Thumbnail tap → photo cross-fades 200ms `--ease-out`.
  - Counter "3 / 6" always visible.
- **Open/close:** desktop keeps the current centred scale-in (300ms `--ease-drawer`). Phone sheet slides
  up with `translateY(100%) → 0`, **400ms `--ease-drawer`**, closes faster (250ms).
- **Deep link:** opening a project updates the URL hash (`#project=porur-3bhk-kitchen`) so you can
  WhatsApp a link to a specific project to a customer. Back button closes the view.
- Library: **Vaul** for the phone drawer (it already solves drag physics, focus trapping, Escape), the gallery
  swipe built with Motion `drag` + spring `{ type: 'spring', duration: 0.5, bounce: 0.15 }`.

### E. Merge "Real projects. Happy clients." into the showcase

The 3 text-only case studies (`CHENNAI_BENCHMARKS`) become the first 3 **featured projects** with full
galleries and their Google review attached. The separate text section is removed — the stories now live
where the photos are.

### F. Services → work

Each "What we do" card (Kitchens, Wardrobes, Pooja, TV & Shops) gets a cover photo strip at the top and a
link **"See 4 kitchen projects →"** that sets the gallery filter and smooth-scrolls to it. The count comes
from the data, so it's always right.

### G. Reviews → work

Each review card gets a small square thumbnail (and "See Divya's home →") of the linked project. Tapping
opens that project's detail view. Reviews without a project simply show no thumbnail.

### H. "Up close" — finishes strip

A horizontal, swipeable strip of **6–8 macro photos**: edge banding, soft-close hinges, handle details,
veneer grain, laminate texture, internal drawer organisers. One-line captions ("Edge-banded on all 4
sides — no swelling in monsoon"). This turns "neat finishing" from a claim into evidence.

- CSS `scroll-snap-type: x mandatory`, native momentum scrolling, no autoplay.

### I. "Inside our Kundrathur workshop"

3–4 photos: the workshop floor, machines (panel saw, edge bander), the team, a unit being assembled.
Short paragraph. This is the single best proof of "own workshop, not outsourced" — currently a sentence.

### J. Before / after slider

For 2–3 projects with a matching before photo: drag a handle to compare. Built with
`clip-path: inset(0 X% 0 0)` on the "after" image (no extra DOM, GPU-only), keyboard-accessible
(arrow keys move 5%), handle starts at 50%. Lives inside the project detail view and as one feature
block on the page.

### K. Rebalance the page (proposed new order)

| # | Section | Change |
| --- | --- | --- |
| 1 | Hero | **Image-led** (B) |
| 2 | Stats strip | + facts from the old hero table |
| 3 | **Our Work** | **Expanded** (C, D, E) |
| 4 | Up close — finishes | **New** (H) |
| 5 | Why experience matters (problem / solution) | Shortened |
| 6 | What we're known for | Merge with 5 *or* cut to 3 cards |
| 7 | Process (6 steps) | Keep |
| 8 | Inside our workshop | **New** (I) |
| 9 | Before / after feature | **New** (J) |
| 10 | What we do (services) | + photos & links (F) |
| 11 | Reviews | + project thumbnails (G) |
| 12 | Free site visit / enquiry | Keep |
| 13 | Three promises | **Cut** — repeats the stats and warranty |
| 14 | Comparison (us vs contractors) | **Cut or shorten** — text-heavy, says what 5 already says |
| 15 | FAQ, final CTA, footer | Keep |

Net effect: 4 new visual sections, 2–3 text sections removed.

### L. Image pipeline (must ship with C)

Going from 5 to ~60 photos will make the page heavy unless this is done right:

- Every photo exported at **3 widths** (640, 1080, 1600px) in **AVIF + WebP + JPEG** fallback via
  `<picture>` + `srcset`/`sizes`. Automated with a Vite image plugin (`vite-imagetools`) so you just drop
  originals into `src/assets/projects/<project-id>/`.
- Explicit `width`/`height` (or `aspect-ratio`) on every image → **zero layout shift** while loading.
- **Blur-up placeholders**: a tiny 20px version shown blurred, cross-fading to the real photo in 300ms
  `ease` once loaded.
- `loading="lazy"` + `decoding="async"` on everything except the hero photo.
- Budget: first screen under **250 KB** of images on a phone.

### M. Project pages for Google (later)

One page per project (`/projects/modular-kitchen-porur`) with its own title and description so searches
like "modular kitchen Porur" can find you. Needs routing and pre-rendering — worth it once the real
photos are in. Not part of this round.

---

## 4. Motion rules for the showcase (restraint list)

Do: one-time image reveals, swipe with real physics, drawer on phones, crossfades on photo change.
Don't:

- ❌ Auto-playing carousels or slideshows anywhere.
- ❌ Parallax on project photos (heavy on mid-range Android, makes photos harder to look at).
- ❌ Ken Burns slow-zoom on photos — it distorts the work you want people to trust.
- ❌ Animating keyboard navigation in the gallery.
- ❌ Hover effects on touch devices.
- All new motion gets a reduced-motion path (fades only) and uses the existing tokens
  (`--ease-out`, `--ease-in-out`, `--ease-drawer`) and full `transform` strings (motion 12.x).

---

## 5. Content you'll need (AI now, real later)

I can't generate images in this environment, so the placeholders need to come from AI Studio (or
wherever the current 5 came from). Use this shot list for both the AI round and the real shoot:

**Per project (aim for 10–12 projects):**
1. Wide hero shot — whole room, landscape **3:2**, doors/lights on.
2. Second angle — opposite corner, landscape 3:2.
3. Detail — open drawer / open wardrobe interior, portrait **4:5**.
4. Close-up — handle, edge, texture, portrait 4:5.
5. (Optional) Before — same angle as shot 1.

**Mix to aim for:** 3 kitchens, 2 wardrobes, 2 pooja/TV units, 2 full homes, 1–2 shops.

**Extra sets:** 6–8 macro finish shots (move H); 3–4 workshop/team shots (move I).

**Real-shoot tips (when you swap):** shoot in daylight + all interior lights on, declutter counters,
hold the phone level so vertical lines stay straight, shoot from chest height in a corner, take the
"before" from the exact same spot. Name files `<project-id>-01.jpg`, `-02.jpg`, …

**Honesty note:** while the AI images are live, avoid labelling them with specific real
localities and client names as if they were real jobs. Either use neutral captions ("Modular kitchen
concept") or swap in real photos before the site goes public.

---

## 6. Build order (Phase 1)

1. **L** image pipeline + **A** data model (move existing 5 projects across; add placeholders).
2. **C** expanded grid + "Show more" + Full Homes filter.
3. **D** project detail view (desktop dialog → phone drawer → swipe gallery → deep links).
4. **E** merge case studies; remove the old text section.
5. **B** image-led hero.
6. Test on a real phone (swipe feel, drawer drag, load speed on throttled 4G), then republish the preview.

Phase 2 (F–K) follows once Phase 1 feels right.

## 7. Decisions needed from you

1. **Budget bands** on projects — show them or not?
2. **Real project count** for the headline ("500+ homes"?) — what's the true number?
3. **Cuts** — OK to remove the "Three promises" and "Comparison" sections?
4. **Placeholder photos** — will you generate the extra AI images (shot list above), or should I build
   Phase 1 reusing the current 5 photos as stand-ins until real ones arrive?
