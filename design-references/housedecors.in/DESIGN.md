# Design System: House Decors (housedecors.in)

> Reference study of a Chennai interior-design competitor's homepage, extracted 2026-11-28 from the live DOM, computed styles and stylesheet rules (agent-browser eval). Use it to learn the *language*, not to copy the brand: swap the red, logo, copy and photography for your own.

## 1. Visual Theme & Atmosphere

House Decors reads like an architecture studio's portfolio rather than a typical Indian interiors lead-gen page. The canvas is a warm off-white paper (`#FAFAF8`) and a warmer stone grey (`#E7E5E1`), punctuated by full-bleed near-black bands (`#16181D`) and a single, saturated signal red (`#E41E26`) that is reserved for action, numerical units and the closing CTA. Headlines are enormous, tightly-tracked grotesque type (Bricolage Grotesque, weight 500, up to ~148px with −0.05em tracking) set in short, broken lines that rise out of masks as they enter the viewport. Body copy is a calm, small Manrope at 15–17px in muted ink. Photography does the emotional work: real finished homes appear in a cursor-trail hero, a clip-path "window opening" reveal, a pinned horizontal gallery and a sticky image that swaps as you read. Everything is generous: sections breathe with 90–170px vertical padding, and a 3/9 asymmetric grid puts a small grey "side note" label beside every big headline. Motion is slow, long-tailed and expensive-feeling (1.3s expo-out), never bouncy.

- Overall feeling: editorial, architectural, quietly premium, confident
- Visual density: low; one idea per viewport, huge type, lots of air
- Brand posture: "proof over promises": numbers, real projects, published prices
- Signature motifs: masked line-by-line headline reveals, red unit glyphs after big numbers (`16+`, `510+`), hairline dividers, pill buttons with a fill that slides up from below, alternating paper / stone / ink / red section bands

### Key Characteristics

- One accent color only. Red appears on primary CTAs, the `+` after stats, step numbers, progress bars, open FAQ titles, and one full-bleed final CTA band.
- Display type does the layout work. H2s run 64–104px; the final CTA headline runs up to 176px with 0.88 line-height.
- Hairlines (`1px #D3D0CA`) separate everything. There are almost no shadows and no card elevation.
- Corner radius is binary: 6px on images, cards and packages; 999px on pills, tags and round buttons.
- Scroll is the main interaction: pinned sections, scrubbed clip-paths, words lighting up, images swapping.

## 2. Color Palette & Roles

| Role | Semantic Name | Value | Usage |
| --- | --- | --- | --- |
| Primary action | Signal Red | `#E41E26` | Primary pill CTA, hover fill of dark pills, stat units, step numbers, progress bar, final CTA band |
| Accent (pressed/deep) | Deep Red | `#B8141B` | Darker red variant token |
| Surface | Paper | `#FAFAF8` | Default page background, light pill background, package cards |
| Surface alt | Stone | `#E7E5E1` | Hero, reveal section, "Why us" band, open FAQ icon |
| Inverse surface | Ink | `#16181D` | Gallery and process bands, default pill, featured package, FAQ "Q" badge |
| Text | Ink | `#16181D` | Headlines, strong labels |
| Text secondary | Ink 2 | `#3B3E45` | Paragraphs, fact labels, review body |
| Text tertiary | Muted | `#5F6268` | Side-note labels, captions, `dt` labels, hints |
| Border | Line | `#D3D0CA` | All hairline dividers, package borders, FAQ separators |

### Primary

- **Signal Red `#E41E26`** is the only chromatic color. Give it to the one most important action per view and to small "unit" glyphs.
- **Ink `#16181D`** is a blue-tinted near-black, never pure `#000`. It's used for text and for whole inverse bands.

### Interactive

- Pill hover: a pseudo-element of the opposite color slides up from `translateY(101%)` to `0` in 0.55s (expo-out). Dark pills fill red and red pills fill ink.
- Nav links: a 1px underline scales in from the left on hover (`scaleX(0→1)`, 0.5s) and leaves to the right.
- Text links (`.txt-link`): 600 weight with a 1px bottom border, turning red on hover.
- Round "View the full gallery" link: 1px `#474A52` ring that fills solid red on hover.
- Package cards: the border darkens from Line to Ink on hover (0.4s). There's no lift or shadow.
- FAQ: an open `details` turns its summary red and rotates the plus icon 180°.

### Neutral Scale

- `#FAFAF8` paper → `#F7F5F1` footer paper → `#E7E5E1` stone → `#D3D0CA` line → `#C9C6C0` hero/footer divider
- `#A9ABB0` muted-on-dark → `#B9BBC0` step body on dark → `#5F6268` muted → `#3B3E45` ink-2 → `#16181D` ink
- Dark-band structure: `#23262C` image placeholder, `#2A2D33` inactive bar, `#353840` divider, `#474A52` ring

### Surface & Overlay

- Header becomes solid on scroll: `rgba(250,250,248,0.94)` + `backdrop-filter: blur(10px)` + `box-shadow: 0 1px 0 #D3D0CA`.
- Image captions sit on a bottom gradient `linear-gradient(transparent, rgba(10,10,12,.55))` covering 45% height.

### Theme Modes

The site has no light/dark toggle (none observed). "Dark" appears only as full-bleed Ink section bands inside a single light theme. On Ink bands, text becomes Paper `#FAFAF8`, secondary text `#A9ABB0`, and dividers `#353840`.

### Shadows & Depth

- Depth comes from tone and hairlines, not shadows. Separation uses `1px solid #D3D0CA` rules and background band changes.
- The only shadows are utility ones: the sticky header's `0 1px 0` line and the floating back-to-top button `0 6px 18px rgba(0,0,0,.28)`.

## 3. Typography Rules

### Font Family

- **Display:** `"Bricolage Grotesque", "Helvetica Neue", Arial, sans-serif`. Used for all headings, big numbers, prices, quotes, FAQ questions and the giant footer wordmark.
- **Body:** `"Manrope", "Helvetica Neue", Arial, sans-serif`. Used for paragraphs, nav, buttons and labels.

### Hierarchy

| Level | Font | Size (desktop @1280) | Fluid rule | Weight | Line height | Tracking |
| --- | --- | --- | --- | --- | --- | --- |
| Hero H1 | Display | 105px | `clamp(40px, 8.2vw, 148px)` | 500 | 0.90 | −0.05em |
| Final CTA H2 | Display | ~134px | `clamp(56px, 10.5vw, 176px)` | 500 | 0.88 | −0.055em |
| Footer wordmark | Display | ~198px | `clamp(56px, 15.5vw, 260px)` | 500 | 0.80 | −0.06em |
| Section H2 | Display | 82px | `clamp(44px, 6.4vw, 104px)` | 500 | 0.98 | −0.035em |
| Rating numeral | Display | 179px | n/a | 500 | 0.85 | −0.06em |
| Stat number | Display | 77px | `clamp(52px, 6vw, 96px)` | 500 | 1.0 | −0.05em, tabular nums |
| Statement paragraph | Display | 51px | `clamp(30px, 4vw, 60px)` | 500 | 1.08 | −0.035em |
| Price | Display | 51px | `clamp(40px, 4vw, 60px)` | 400 | 1.0 | −0.05em, tabular nums |
| Service name | Display | 46px | n/a | 400 | 1.0 | −0.04em |
| H3 (why items) | Display | 38px | `clamp(28px, 3vw, 44px)` | 500 | 0.98 | −0.035em |
| Quote | Display | 31px | `clamp(24px, 2.4vw, 36px)` | 400 | 1.15 | −0.03em |
| FAQ question | Display | 26px | `clamp(20px, 2vw, 28px)` | 600 | 1.2 | −0.02em |
| Body / lead | Manrope | 17px | n/a | 400 | 1.6 | normal |
| Small body / labels | Manrope | 15px | n/a | 400 | 1.45–1.6 | normal |
| Button | Manrope | 15px | n/a | 600 | 1.2 | normal |
| Caption / hint | Manrope | 14px | n/a | 400 | 1.6 | normal |
| Tag | Manrope | 13px | n/a | 600 | n/a | normal |

### Principles

- Contrast comes from scale. Display text sits around weight 500 and is never heavy, which keeps giant type elegant rather than loud.
- Tracking tightens as size grows, from −0.02em at 26px down to −0.06em at 260px.
- Headlines are written as 2–3 short manual lines ("Spaces that work / beautifully.") because each line animates separately.
- Sentence case everywhere. There are no all-caps eyebrows; small grey "side notes" ("What we design", "Packages and pricing") replace them.
- Numbers use `font-variant-numeric: tabular-nums`.

## 4. Component Stylings

### Buttons

- **Pill (default):** height 48px min, padding `0 24px`, radius 999px, Ink background, Paper text, Manrope 15/600, gap 10px for an icon. On hover a red `::before` slides up from below (`transform .55s cubic-bezier(.19,1,.22,1)`). Uses `overflow:hidden; isolation:isolate`.
- **Pill red (`--red`):** red background whose hover fill is Ink. Used for "Book a free consultation" and "Compare packages" on the featured plan.
- **Pill light (`--light`):** Paper background with Ink text and an optional `1px #D3D0CA` border. On hover it fills red with white text.
- **Round link:** a 200–280px circle with a 1px ring and centered display text at 22–30px. Fills red on hover. It sits at the end of the horizontal gallery.
- **Mobile menu button:** a 48px Ink circle with two 2px Paper bars that rotate into an X.

### Cards & Containers

- **Project card (gallery):** width `clamp(280px,34vw,520px)`, with a wide variant `clamp(320px,52vw,820px)`. The image area is `clamp(300px,56vh,600px)` tall with radius 6px, `object-fit: cover`, and a slow 1.4s zoom to `scale(1.05)` on hover. Meta sits below in a space-between row: title in 17/600 Paper, details in 15px `#A9ABB0`.
- **Package card:** Paper fill, `1px` Line border, radius 6px, padding `clamp(24px,2.6vw,36px)`. Top row has the name (30px display) and a red pill tag. Then the price (40–60px display), "2 BHK starting package" in 14px muted, and a spec `dl` with hairline rows (`dt` muted left, `dd` 600 right-aligned). The CTA is pinned to the bottom with `margin-top:auto`. The featured plan inverts to an Ink background.
- **Stat strip:** 4 columns with a top hairline and vertical hairlines between facts. Each fact is a big number, a red half-size unit glyph, then a 15px label capped at 24ch.

### Inputs & Forms

- No form on the homepage (not observed). Enquiries route to quote pages and WhatsApp.

### Navigation

- Fixed header, 84px tall (72px under 900px), logo 52px tall. Links are Manrope 15/500 with a 30px gap, and a dark "Get a quote" pill sits at the end.
- It's transparent over the hero. After scrolling it becomes solid paper with blur and a hairline (`.is-solid`), hides on scroll-down (`translateY(-110%)`, 0.6s expo-out) and returns on scroll-up.
- Mobile shows a full-screen menu revealed with `clip-path` (0.8s). While the menu is open the logo inverts to white.

### Image Treatment

- Real project photography only: warm and naturally lit, no illustrations.
- Radius 6px everywhere, cover-cropped, often at a 4:5 portrait ratio.
- Images are revealed through motion (clip-path, scale-down from 1.18 or 1.06, crossfade) rather than shown statically.

### Distinctive Components

1. **Cursor-trail hero.** The hero is a stone-colored, 100svh block with the H1 anchored to the bottom. Moving the cursor spawns 170–260px portrait photos of finished homes that pop in (scale .55→1) and fade along the trail (`hdx-trail`, 1.6s). On touch devices a pulsing red dot hint ("tap") replaces it.
2. **Window-open reveal (`.rv`).** A 190vh section with a sticky 100vh frame. The frame's `clip-path: inset(14% 22% round 12px)` is scrubbed open to full-bleed while the image scales from 1.18 to 1, then a caption and bottom shade fade in.
3. **Word-lighting statement.** A large display paragraph whose words start at `opacity .14` and turn fully opaque one by one as you scroll (`.w.lit`).
4. **Pinned horizontal gallery (`.hs`).** An Ink band with a sticky 100vh viewport. Vertical scroll drives the card track horizontally, and a 180×2px progress bar fills red. Under 900px it becomes a native scroll-snap carousel.
5. **Sticky "Why us" swap.** A two-column layout: the left image is sticky and crossfades to match the item being read, while the right list dims inactive items to 0.35 opacity.
6. **Process strip.** An Ink band with 5 steps divided by `#353840` hairlines, red step numbers, then a payment-split bar whose 84px-tall segments grow `scaleX(0→1)` with staggered delays (red highlights one stage).
7. **Service-area marquee.** A 50s linear infinite marquee of area links that pauses on hover.
8. **FAQ with "Q" badges.** Each `details` row has a 34px Ink circle with "Q", the question in display 600, and a plus icon on the right. Rows are separated by hairlines.
9. **Giant footer wordmark.** The brand name spans the full width at up to 260px, line-height 0.8, above a hairline bottom bar.

## 5. Layout Principles

### Spacing System

- Horizontal page padding: `--pad: clamp(20px, 4vw, 56px)`.
- Section rhythm: `.sec` uses `clamp(90px, 12vw, 170px)` top and bottom. The statement uses `clamp(100px,14vw,200px)` / `clamp(60px,8vw,110px)` and the final CTA `clamp(100px,13vw,190px)` / `clamp(60px,7vw,90px)`.
- Head-to-content gap: `clamp(40px, 6vw, 80px)`. Grid gaps are 40px for asymmetric heads and 16px between package cards.
- Inner rhythm uses 12 / 14 / 16 / 24 / 28 / 32 / 36 / 40px steps.

### Grid & Container

- **Signature 3/9 split:** `grid-template-columns: minmax(0,3fr) minmax(0,9fr)` with a small grey side note on the left and the giant headline on the right. Used by section heads, the statement and the payment block.
- Reviews use a 4/8 split: a huge rating numeral on the left and stacked quotes on the right.
- "Why us" uses a 1:1 split with a sticky media column.
- Packages sit in 3 equal columns, collapsing to 1 under 1100px. Facts and process steps sit in 4- and 5-column hairline grids.
- Text measures are capped: paragraphs 44–60ch, labels 24ch.

### Whitespace Philosophy

Each section makes one statement and gets at least a full viewport. Restraint is the luxury signal: few elements, huge type, long scroll.

### Border Radius Scale

- `0` for sections and text blocks
- `6px` for images, cards, packages and the payment bar
- `12px` for the clip-path reveal frame only
- `999px` / `50%` for pills, tags, round links, the menu button and the FAQ badge

## 6. Depth & Elevation

- The page is flat. Hierarchy comes from tone bands (Paper → Stone → Ink → Red) and 1px hairlines.
- Elevation appears only for floating UI: the solid header (blur + hairline) and the back-to-top button (`0 6px 18px rgba(0,0,0,.28)`).
- Images add depth through motion (scale-down on reveal), not drop shadows.

## 7. Do's and Don'ts

**Do**
- Keep one accent color and spend it sparingly on the most important action.
- Set headlines huge, weight 500 and tightly tracked, broken into 2–3 lines.
- Pair every big headline with a small muted side-note label in a 3/9 grid.
- Use hairline dividers and tone bands instead of shadows and boxes.
- Show real numbers and real prices in big display type.
- Use slow, long-tailed easing (`cubic-bezier(.19,1,.22,1)`, 0.5–1.3s) and respect `prefers-reduced-motion`.

**Don't**
- Don't use all-caps eyebrows, gradients, glassy cards or drop-shadow stacks.
- Don't use more than one saturated color, or pure black or white text.
- Don't use bouncy or springy motion, or short 150ms snaps on reveals.
- Don't crowd a viewport with multiple CTAs. One primary and one secondary is the maximum.

## 8. Responsive Behavior

### Breakpoints (from stylesheet rules)

- **≤1100px:** packages stack to 1 column.
- **≤900px:** nav collapses to the menu button and the header becomes 72px. The 3/9 grids, "Why us" and payment blocks become one column. Facts go 2×2. The pinned gallery becomes a scroll-snap carousel (cards 80vw, images 60vh, max 480px) and its progress bar hides. The sticky "Why us" image becomes a static 62vh block with all items at full opacity. The footer becomes 2 columns.
- **≤560px:** hero buttons stretch to equal widths and the footer becomes 1 column.

### Touch Targets

- Pills are at least 48px tall and the menu button is 48×48.
- The hero switches to a tap hint (`.is-touch`) because there is no cursor trail on touch.

### Collapsing Strategy

Scroll-scrubbed effects are dropped on small screens and replaced by native, simpler equivalents: snap carousels, static images and full-opacity lists. Fluid `clamp()` type means there are no font-size breakpoints.

## 9. Agent Prompt Guide

### Quick Color Reference

`paper #FAFAF8` · `stone #E7E5E1` · `ink #16181D` · `ink-2 #3B3E45` · `muted #5F6268` · `line #D3D0CA` · `accent #E41E26` · `accent-deep #B8141B` · ease `cubic-bezier(.19,1,.22,1)`

### Example Component Prompts

- **Hero:** "Build a 100svh hero on a warm stone `#E7E5E1` background with the H1 anchored to the bottom-left in Bricolage Grotesque 500, `clamp(40px,8.2vw,148px)`, line-height 0.9, tracking −0.05em, written as 3 short lines that each rise from a mask (translateY 108%→0, 1.3s expo-out, 80ms stagger). Below the H1, add a hairline-topped footer row: a 17px Manrope lead paragraph (max 46ch, `#3B3E45`) on the left and two 48px pills on the right (red primary, paper secondary). Add a muted 14px hint at the top right."
- **Pill button:** "A 48px-tall, 999px-radius pill in Ink `#16181D` with Paper text, Manrope 15/600, 0 24px padding, overflow hidden. On hover a red `#E41E26` pseudo-element slides up from translateY(101%) to 0 over 0.55s `cubic-bezier(.19,1,.22,1)`. Red variant: red base with an Ink fill on hover."
- **Section head:** "A 3fr/9fr grid with a 40px gap. The left column is a 15px muted label with 12px top padding; the right is an H2 at `clamp(44px,6.4vw,104px)`, weight 500, tracking −0.035em, line-height 0.98, in 2 lines. Section padding `clamp(90px,12vw,170px)` vertical."
- **Pricing card:** "A paper card with a 1px `#D3D0CA` border, 6px radius and `clamp(24px,2.6vw,36px)` padding. Name in 30px display on the left and a red 13px/600 pill tag on the right, then a 60px tabular price, a 14px muted subline, and a spec list as a 2-column `dl` with hairline rows (`dt` muted, `dd` 600 right-aligned). Pin a full-width pill to the bottom. The featured variant inverts to Ink. The border darkens to Ink on hover."
- **Stat strip:** "4 columns with a top hairline and vertical hairlines between them. Each stat is a 96px display tabular number followed by a red half-size `+`, then a 15px `#3B3E45` label capped at 24ch."

### Iteration Guide

1. Start with the palette and two fonts, and get the giant tracked display type right before anything else.
2. Lay out sections as alternating paper/stone/ink bands with the 3/9 head grid.
3. Add hairlines, then pills, then cards. Resist adding shadows.
4. Add motion last, in this order: masked line reveals, then pill fills, then scroll-scrubbed set pieces. Gate everything behind `prefers-reduced-motion`.
5. If it starts feeling "template-y", cut elements and increase whitespace and type size.

## Appendix: Content & Messaging Patterns

- Headlines are short, calm sentences with a period ("Real homes. Real details.", "Design is half the job.", "First conversation to handover."). They're never shouted.
- Proof is stated as plain numbers: "16+ years", "510+ projects completed and handed over", "30+ team of our own", "49-day delivery promise", "5.0 from 232 Google reviews". Prices are published ("from ₹3,18,500, 2 BHK starting package").
- CTAs are low-pressure and specific: "Book a free consultation", "See our projects", "Compare packages", "See all 13 steps", "Read all reviews".
- Section labels use plain language ("What we design", "Packages and pricing", "Google reviews").
- Local SEO is woven into the design: an "Interior design across Chennai" marquee of area links ("Interior decoration in Anna Nagar").

## Appendix: Evidence Notes

- Observed: homepage at 1280px desktop after a full scroll pass. Extracted root tokens from `:is(#hdx-header,#hdx-footer,#hdx-home)`, computed styles of headings, pills, cards, packages, FAQ and reviews, plus the stylesheet rules including `@media` and keyframes.
- Inferred: scroll-scrub behaviour (clip-path opening, horizontal track translation, word lighting) is driven by JS. The CSS end states and classes were observed, but exact scrub curves were not.
- Mobile layout is documented from the site's media-query rules, not a separate mobile-viewport pass.
- Platform: WordPress + Elementor, with a custom hand-written `hdx` theme layer on top that carries the real design system. The site showed a bot-check interstitial before loading.
- Not inspected: inner pages (projects, packages, quote form).
