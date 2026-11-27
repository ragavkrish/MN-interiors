# Design System: Ink & Hot-Pink Long-Form Sales Page

> A design-language reference taken from a single long-form sales page (a digital-product checkout funnel). It records the system only. Brand names, prices, testimonials, links and headline copy were left out on purpose.

**Evidence legend:** values are tagged **[V]** verified, **[D]** declared or **[I]** inferred.
- **[V] Verified:** read from the live stylesheet or computed in the running page. The desktop pass ran at 1024px wide. The mobile pass ran at 375px emulation (380px reported).
- **[D] Declared:** present in the CSS (`:hover`, media queries above 1024px) but the rendered state wasn't observed.
- **[I] Inferred:** a judgement or synthesis, not a measured value.

## 1. Visual Theme & Atmosphere

A high-contrast, direct-response sales page built from three things: near-black ink panels, a single hot-pink accent, and enormous all-caps Montserrat 900 headlines. There are no photos, no illustrations and no SVG art. All the visual weight comes from type, solid colour blocks, 1px hairlines and small filled icons. The page alternates full-bleed dark, white and pale-gray sections, so scrolling feels like turning between "pressure" panels (dark) and "proof" panels (light). Pink is reserved for emphasis: one word or line of every headline, every number that matters, every buy button, and one "hot" card in each card group. The tone is loud, confident and conversion-first, but the layout is clean and orderly: generous section padding, centred section intros, strict grids and no decorative noise **[I]**.

- **Overall feeling:** bold infomercial energy rendered with modern SaaS restraint **[I]**.
- **Visual density:** spacious between sections (110px padding), moderately dense inside cards (18–34px padding) **[V]**.
- **Brand posture:** urgent, value-stacking and proof-heavy. Every section ends in either a number or a CTA **[I]**.
- **Signature motifs:** a pink word inside a white or black all-caps headline, a pink marquee ticker strip, a "hot" pink card among dark or white siblings, a struck-through anchor price above a giant pink price, and a sticky bottom buy bar **[V]**.

### Key Characteristics

- Montserrat 900 all-caps display type with tight negative tracking
- Single hot-pink accent #F31C60 on a near-black ink scale
- Full-bleed dark / white / gray section rhythm
- No imagery: type, colour blocks and filled icons only
- Hairline 1px borders with no shadows on cards
- Sticky white nav on top and a sticky buy bar at the bottom

## 2. Color Palette & Roles

All hex values are **[V]** from `:root` custom properties or computed rules.

| Role | Semantic Name | Value | Usage |
| --- | --- | --- | --- |
| Primary action | Hot Pink | #F31C60 | Buttons, the accent word in headlines, key numbers, eyebrows, tick badges, the ticker strip, "hot" cards |
| Primary hover | Deep Pink | #D4104C | Button hover background |
| Accent tint | Blush | #FDE8EF | Declared as a token, not seen in use (light-surface pink tint) |
| Background dark | Ink | #0A0A0A | Dark sections, topbar, footer, price card, dark quote cards; also body text colour on light sections |
| Surface dark | Ink 2 | #141414 | Cards sitting on Ink sections |
| Surface dark raised | Ink 3 | #1D1D1D | Stat chips and list chips nested inside Ink 2 panels |
| Background | White | #FFFFFF | Light sections, light cards, nav, sticky bar |
| Surface alt | Mist Gray | #F4F4F4 | Alternate light sections, FAQ "+" disc, neutral tag background |
| Border | Hairline | #E6E6E6 | Borders and dividers on light surfaces |
| Border dark | Hairline Dark | rgba(255,255,255,0.10) | Borders and dividers on ink surfaces |
| Text muted | Graphite | #666666 | Body copy on light surfaces |
| Status | Live Green | #2FD47A | The single "live" status dot with a 4px halo ring |

### Primary

- **Hot Pink #F31C60** is the only chromatic colour in the system. It means "act / this matters". **[V]**
- **Deep Pink #D4104C** appears only as the hover state of pink buttons. **[V]**

### Interactive

- Primary buttons are pink with white text, darkening to #D4104C on hover **[V] / hover [D]**.
- Ghost buttons are transparent with a `rgba(255,255,255,0.28)` 1px border, filling to `rgba(255,255,255,0.06)` on hover **[V] / hover [D]**.
- Active tabs get white text and a 2px pink underline. Inactive tabs are `rgba(255,255,255,0.55)` **[V]**.
- Footer links go from 70% white to 100% white on hover **[D]**.
- **No custom focus styles exist.** There are no `:focus` or `:focus-visible` rules, so the browser default ring is all you get **[V]**.

### Neutral Scale

- Dark side: #0A0A0A → #141414 → #1D1D1D. Each step is roughly 4–5% lighter, used for nesting depth **[V]**.
- Light side: #FFFFFF → #F4F4F4 → #E6E6E6 (hairline) → #999999 (muted label) → #666666 (body) → #0A0A0A (headings) **[V]**.
- White-alpha text tiers on dark backgrounds: 0.85 (strong body), 0.80, 0.75, 0.70, 0.65 (lead/body-l), 0.60, 0.55, 0.50 (fine print, captions), 0.45 (muted labels), 0.40 (copyright) **[V]**.

### Surface & Overlay

- Main page surface: #FFFFFF
- Dark section surface: #0A0A0A
- Elevated card and control surface: #141414 on dark sections, #FFFFFF with a #E6E6E6 border on light sections
- Pink-tinted callout: `rgba(243,28,96,0.12)` fill + `rgba(243,28,96,0.35)` 1px border **[V]**
- Pink-tinted badge: `rgba(243,28,96,0.15)` fill with pink text **[V]**
- Nav glass: `rgba(255,255,255,0.96)` + `backdrop-filter: blur(10px)` **[V]**

### Shadows & Depth

- Ring border: 1px solid #E6E6E6 (light) or 1px rgba(255,255,255,0.10) (dark). This border does all the separation work **[V]**.
- Card shadow: none. No card in the system casts a shadow **[V]**.
- Sticky bar shadow: `0 -8px 30px rgba(0,0,0,0.08)`, the only shadow on the page **[V]**.
- Status dot halo: `0 0 0 4px rgba(47,212,122,0.18)` **[V]**.

## 3. Typography Rules

A two-family pairing: a geometric heavy display face for shouting and a friendly geometric sans for reading. Headlines are typed in capitals in the HTML (computed `text-transform: none`) and line-broken by hand with `<br>`, so each line is art-directed **[V]**.

### Font Family

- Primary: Poppins, system-ui, sans-serif (body/UI). Loaded weights 400, 400 italic, 500, 600, 700 **[V]**
- Display: Montserrat, system-ui, sans-serif (h1–h3, brand, big numbers). Loaded weights 800, 900. 700 is requested but never used **[V]**
- Monospace: none used
- Icons: Phosphor Icons, **Fill** style only, from a CDN (`ph-fill ph-*`) **[V]**
- OpenType Features: none set. `-webkit-font-smoothing: antialiased` on body **[V]**

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Hero headline | Montserrat | clamp(44px, 6.2vw, 76px) | 900 | 45px (1.02 × 44px floor) | -1.5px | [V] 63.5px at 1024, 44px at 375; 76px cap reached ≈1226px [D]. Typed in capitals, 4–5 hand-broken lines, accent line in pink |
| Section heading | Montserrat | clamp(32px, 4.4vw, 54px) | 900 | 33px (1.04 × 32px floor) | -1px | [V] Margin 14px 0 18px; `.xl` variant clamp(36px, 5.4vw, 64px) for the final CTA |
| Price display | Montserrat | 72px (64px final, 60px mobile) | 900 | 72px (1) | -2px | [V] Pink |
| Stat number | Montserrat | 44px (34px mobile) | 900 | ≈54px (normal) | -1px | [V] Alternating ink / pink |
| Panel title | Montserrat | 30px (24px mobile) | 900 | 33px (1.1) | -0.5px | [V] Tab panel and comparison card titles |
| Card title (h3) | Montserrat | 18–19px | 800 | 23px (1.3) | 0 | [V] |
| Lead / Body L | Poppins | 18px | 400 | 30px (1.65) | 0 | [V] Max-width 560–640px; 65% white on dark, #666 on light |
| Body | Poppins | 15–16px | 400 | 26px (1.65 at 16px; range 1.5–1.7) | 0 | [V] Card text 14.5–15px / 1.6–1.65; FAQ answers 16px / 1.7 |
| Button | Poppins | 16px (17 lg, 14 sm) | 700 | ≈24px (normal) | 0 | [V] |
| Label / Eyebrow | Poppins | 12px | 600 | ≈18px (normal) | 0.22em | [V] Uppercase, pink; `.label` variant is 11px / 0.18em |
| Caption / Meta | Poppins | 13px | 400 | ≈20px (normal) | 0 | [V] Fine print at 50% white; stat-chip micro label 10.5px / 0.12em uppercase |

Line-height pixel values are computed at each role's smallest size; the ratio in brackets is the source value. Body `line-height` is never set globally, so un-styled text falls back to `normal` (≈1.5 for Poppins) **[V / I]**.

### Principles

- Headlines are always capitals in Montserrat 900. Lowercase display type never appears **[V]**.
- Exactly one phrase per headline turns pink through `<em>`, with italic reset to normal **[V]**.
- Big numbers (stats, prices, value rows) borrow the display face so data reads as headline material **[V]**.
- Reading text stays in Poppins with generous 1.6–1.7 leading and a 560–760px measure **[V]**.
- Tracked uppercase micro-labels (0.12–0.22em) are the only use of positive tracking **[V]**.

## 4. Component Stylings

### Buttons and Links

**Primary CTA**
- Background: #F31C60
- Text: #FFFFFF
- Text style: 16px Poppins 700
- Height: ≈51px (15px vertical padding) [I from padding]
- Padding: 15px 26px; lg 18px 30px; sm 11px 18px
- Radius: 10px
- Icon: optional leading Phosphor Fill icon at 17px, 8px gap
- Hover: #D4104C + translateY(-1px), 0.15s [D]

**Secondary CTA**
- Background: transparent
- Text: #FFFFFF
- Ring: rgba(255,255,255,0.28)
- Radius: 10px
- Hover: rgba(255,255,255,0.06) fill [D]

**Text links**
- Text links: there are no underlined inline links. Anchors inherit colour, and links appear only in the footer nav at 70% white **[V]**.
- Hover and active feel: a crisp 1px lift with a darker pink. There is no glow, no ripple and no shadow **[D]**.

### Cards and Containers

- Surface style: two families. Dark cards are #141414 on #0A0A0A with a 1px 10% white border. Light cards are #FFFFFF with a 1px #E6E6E6 border on white or #F4F4F4 sections **[V]**
- Radius: 16px standard cards, 18px feature panels, 20px price card, 12px list rows and callouts, 10px nested chips **[V]**
- Border: 1px hairline; the "winner" comparison card uses a 2px pink border **[V]**
- Shadow or elevation: none
- Internal spacing: 26–34px for cards, 18–24px for rows and headers **[V]**
- Hot variant: in each group of 3 one card flips to a solid pink header or a solid pink body with white text. In the testimonial and stage groups the first card is the pink one **[V]**

### Inputs and Interactive Controls

- Input treatment: no form inputs exist on the page; checkout is an external link **[V]**
- Focus behavior: browser default only. No custom focus ring is defined **[V]**
- Selection states: tabs use a 2px pink bottom border plus a white label. Open FAQ items turn the "+" disc pink and rotate it 45° into an "×" **[V]**

### Navigation

- Structure: a one-line dark announcement topbar (13px, 80% white, pink bold highlight, 9px 16px padding), then a 68px nav row with the wordmark on the left and a small pink CTA on the right. There are no menu links **[V]**
- Background treatment: white at 96% opacity with `backdrop-filter: blur(10px)` and a 1px #E6E6E6 bottom border, sitting directly above a black hero **[V]**
- Link style: the wordmark is Montserrat 900, 18px, -0.3px tracking, with one pink letter **[V]**
- Sticky or scroll behavior: the nav is `position: sticky; top: 0; z-index: 40`. A second sticky bar is fixed to the bottom (68px, white, shadow upward, z 50) with a two-line product label and a small CTA. The body carries `padding-bottom: 76px` so the bar never covers the footer **[V]**

### Image Treatment

- Screenshot treatment: none. The page contains zero `<img>` and zero `<svg>` elements **[V]**
- Photography or illustration style: none. Visual interest comes from Phosphor **Fill** icons set in solid pink rounded squares (46×46px, 12px radius, 22px glyph) **[V]**
- Border and radius treatment: icon tiles 12px; check and cross badges 24×24px at 6px radius **[V]**

### Distinctive Components

- **Marquee ticker:** a full-width pink strip under the hero. 14px/600 white phrases with 14px 22px padding, separated by a 60%-opacity "◆". It scrolls left continuously (`translateX(0 → -50%)`, 40s linear, infinite, on a duplicated track) and stops under `prefers-reduced-motion` **[V]**
- **Value-stack card (hero right column):** an Ink 2 card listing label/value rows separated by hairlines. Values are Montserrat 800 at 22px, the last row is a 30px pink figure **[V]**
- **Stats band:** a white 4-column strip with 1px vertical dividers and centred number-over-caption cells (44px/900 numbers, alternating ink and pink) **[V]**
- **Problem list vs solution list:** pain points get a cross badge (15% pink tint, pink glyph) and benefits get a tick badge (solid pink, white glyph), both 24px squares at 6px radius **[V]**
- **Pull-quote:** a 3px pink left border on Ink 2, radius only on the right (0 12px 12px 0), 17px italic at 85% white **[V]**
- **Comparison pair:** "before" card is white with a gray tag; "after" card is Ink 2 with a 2px pink border and a pink tag. Tags are 11px/700, 0.16em, 6px radius **[V]**
- **Tabbed stepper:** a horizontally scrollable tab row (numbered pink prefix + label) above an Ink 2 two-column panel (title + description + pink-tint outcome callout | 3 stat chips + 2-column checklist). Prev (ghost) and Next (pink) small buttons sit bottom-right, and the stepper wraps around at both ends. It's driven by click only, not by time or scroll **[V]**
- **Price stack:** a hairline table of item/value rows with a 19px/800 total row (value in pink) next to a dark price card (20px radius, 34px padding) holding a pink-tint pill badge, a struck-through anchor price at 50% white, a 72px pink price, a checklist and a full-width large CTA **[V]**
- **FAQ accordion:** native `<details>` with hairline separators, a 17px/600 summary and a 32px circular "+" disc that rotates 45° and turns pink when open (0.2s) **[V]**

## 5. Layout Principles

### Spacing System

- Base unit: 2px steps in practice, with no strict 4 or 8 grid. Most values are even numbers between 6px and 34px **[V]**; treating it as an 8px system with 2px fine-tuning is **[I]**
- Repeated spacing values: `8px` `10px` `12px` `14px` `16px` `18px` `22px` `24px` `28px` `36px` `48px` `64px` `110px`
- Section padding: 110px (desktop) → 84px (≤1000px) → 68px (≤680px); final CTA 120px **[V]**
- Grid gaps: 8–12px chips, 20px (4-up), 24px (2/3-up), 40px panels, 56–64px hero/two-column **[V]**
- Section intro → grid: 48px top margin on card grids **[V]**

### Grid & Container

- Grid logic: CSS grid throughout. Asymmetric 2-column splits favour the copy side: 1.15fr/0.85fr hero, 1.1fr/0.9fr for two-col, price and tab panel. Even grids are used for 2-, 3- and 4-up cards **[V]**
- Max content width: 1180px container with 24px gutters (16px on mobile). The narrow variant is 900px for FAQ, math and final CTA **[V]**
- Section spacing: full-bleed colour bands, each with its own padding. Nothing overlaps between sections **[V]**
- Section sequence observed: dark hero → white stats → dark → white → dark → dark → white → gray → dark → white → gray → white → dark final → dark footer **[V]**

### Whitespace Philosophy

- Whitespace philosophy: very large vertical breathing room between bands, compact inside components. The contrast keeps a long scroll from feeling cramped **[I]**
- Alignment tendencies: section intros (eyebrow + headline + lead) are centred; content inside cards is left-aligned; the hero is left-aligned **[V]**
- Content width behavior: copy blocks cap at 560–760px even inside the 1180px container **[V]**

### Border Radius Scale

- Micro: 6px (badges, tags)
- Small: 8px (list chips), 10px (buttons, stat chips)
- Standard: 12px (list rows, callouts, icon tiles), 16px (cards)
- Large: 18px (feature panels), 20px (price card)
- Pill: 99px (status pill), 50% (dots, FAQ disc)

## 6. Depth & Elevation

| Level | Treatment | Use |
| --- | --- | --- |
| Flat | Solid section colour, no border | Full-bleed bands |
| Ring | 1px #E6E6E6 or 1px rgba(255,255,255,0.10) | Every card, row, divider |
| Tonal step | #0A0A0A → #141414 → #1D1D1D | Nesting on dark: section → card → chip |
| Accent ring | 2px #F31C60 | The single "recommended" comparison card |
| Glass | rgba(255,255,255,0.96) + blur(10px) | Sticky top nav |
| Float | 0 -8px 30px rgba(0,0,0,0.08) | Sticky bottom buy bar only |
| Focus | Browser default | No custom treatment (gap) |

### Depth Principles

- Surface hierarchy: depth comes from tonal stepping on dark and hairlines on light, never from shadows **[V]**
- Shadow language: one soft upward shadow for the fixed bottom bar, nothing else **[V]**
- Blur, glass, or overlay behavior: only the top nav uses blur **[V]**
- When depth is used versus avoided: emphasis comes from colour (solid pink), not elevation **[I]**

## 7. Do's and Don'ts

### Do

- Set every headline in capitals, Montserrat 900, tracked tight, with one phrase in pink
- Alternate full-bleed dark and light bands to pace a long scroll
- Use pink for one meaning only: action or the most important figure
- Make exactly one card per group the solid-pink "hot" variant
- Separate surfaces with 1px hairlines and tonal steps instead of shadows
- Render key numbers in the display face at large sizes
- Pair a sticky bottom CTA bar with matching body bottom padding
- Respect `prefers-reduced-motion` for any looping motion

### Don't

- Don't introduce a second accent hue; the system is monochrome plus pink
- Don't add drop shadows to cards or buttons
- Don't use photography or decorative illustration; lean on type and filled icons
- Don't set long body copy in Montserrat or display headlines in Poppins
- Don't copy the missing focus states. Add a visible `:focus-visible` ring (e.g. 2px #F31C60 with a 2px offset) when reusing this system
- Don't rely on hover for tabs. The source has no tab hover state, so add one when reusing
- Don't let pink text drop below large sizes on white. #F31C60 on #FFFFFF is ≈4.0:1, fine for bold/large text but under AA for small body text **[I, computed]**

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
| --- | --- | --- |
| Desktop | >1000px | 2-col hero/two-col/price/tab panel; 3- and 4-up grids; 110px section padding [V at 1024] |
| Tablet | ≤1000px | All 2-col splits stack; 4-up → 2-up; 3-up → 2-up; section padding 84px [D] |
| Mobile | ≤680px | Gutters 16px; all grids 1-col; stats 2×2; section padding 68px; hero CTAs full width; price 60px; sticky bar hides its subline [V at 375] |

### Touch Targets

- Primary buttons are ≈51–57px tall; small buttons ≈40px; the mobile nav CTA shrinks to 10px 14px padding / 13px text (≈36px tall, below the 44px guideline) **[V / I]**
- FAQ summary rows are ≈66px tall (22px padding + 17px text); the "+" disc is 32px **[I from CSS]**

### Collapsing Strategy

- Desktop behavior: asymmetric split hero with the value-stack card on the right
- Tablet behavior: everything stacks into one column at ≤1000px; card grids halve
- Mobile behavior: single column; headlines fall to their clamp floors (h1 44px, h2 32px) **[V]**; hero and final CTAs go full width (343px at 375) **[V]**
- Breakpoint-driven component changes: the stats strip re-borders into a 2×2 grid; the stepper panel padding drops 36→22px; stat chips and the tool checklist go 1-column; the investment row stacks vertically
- Touch target and spacing adjustments: the large button drops to 16px text / 16px 20px padding; the tab row stays a horizontal scroller with a hidden scrollbar

## 9. Agent Prompt Guide

### Quick Color Reference

- Primary CTA: #F31C60 (hover #D4104C)
- Background: #FFFFFF
- Elevated surface: #FFFFFF (light cards, with #E6E6E6 hairline; dark cards use #141414)
- Heading text: #0A0A0A
- Body text: #666666
- Ring / border: #E6E6E6
- Accent / focus: #F31C60

### Quick Summary

A long-form conversion page in near-black ink and white, with a single hot-pink accent. Montserrat 900 capitals with tight tracking carry every headline and big number, and one phrase per headline is pink. Poppins handles all reading and UI text. Sections are full-bleed bands alternating #0A0A0A, #FFFFFF and #F4F4F4 with 110px padding. Cards are flat, use 16–20px radii and are separated by 1px hairlines, never shadows. One card per group is solid pink. There is no imagery, only filled icons in pink tiles. Motion is minimal: a looping pink ticker, a 1px button lift and an FAQ plus-to-cross rotation.

### Example Component Prompts

- Hero: Black #0A0A0A full-bleed band, 80px top padding. A 1.15fr/0.85fr grid, 56px gap. Left: an outlined pill (13px, 18% white border, 99px radius) with a green live dot, a 4-line capitals Montserrat 900 headline at clamp(44px, 6.2vw, 76px) / 1.02 / -1.5px with the last two lines pink, an 18px/1.65 lead at 65% white, then a pink large button and a ghost button, plus 13px fine print below. Right: a #141414 card (18px radius, 10% white border) of label/value rows divided by hairlines. End the band with a pink scrolling ticker strip.
- Card: White card, 1px #E6E6E6 border, 16px radius, 26px padding. A 46px pink rounded-square icon tile with a white filled icon, an 18px Montserrat 800 title, 14.5px/1.6 #666 body, and a 13px/700 pink footnote line pinned to the bottom.
- Navigation: A dark 39px announcement strip, then a 68px sticky bar at 96% white with 10px backdrop blur and a 1px #E6E6E6 bottom border. Wordmark left in Montserrat 900 18px with one pink letter; a small pink button right; no menu links.
- Button or badge: Pink #F31C60 button, white Poppins 700 16px, 15px 26px padding, 10px radius, optional 17px leading filled icon. On hover go to #D4104C and lift 1px over 0.15s. Badge: 11px/700 uppercase, 0.16em tracking, 6px 10px padding, 6px radius, solid pink or #F4F4F4 with #666 text.

### Ready-to-Use Prompt

Build a long-form landing page in a high-contrast ink-and-hot-pink system. Use full-bleed sections alternating #0A0A0A, #FFFFFF and #F4F4F4 with 110px vertical padding inside a 1180px container. Set all headlines in capitals in Montserrat 900 with tight negative tracking (h1 clamp(44px, 6.2vw, 76px), h2 clamp(32px, 4.4vw, 54px)) and colour one phrase per headline #F31C60. Use Poppins 400–700 for body (16–18px, 1.65 leading, #666 on light, 65% white on dark). Keep cards flat: 1px hairlines (#E6E6E6 or 10% white), 16–20px radius, no shadows, and make one card per group solid pink. Primary buttons are pink with 10px radius and a 1px hover lift. Use no photos, only Phosphor Fill icons in pink rounded tiles. Add a sticky blurred white top nav and a fixed white bottom CTA bar. Stack to one column at 1000px and 680px.

### Iteration Guide

1. When adding emphasis, ask whether it can be pink text or a pink card before adding any new colour or effect.
2. When a section feels flat, change its band colour (dark/light/gray) instead of adding decoration.
3. When adding data, set the figure in Montserrat 900 and the caption in 13–14px muted Poppins beneath it.
4. Nest on dark by stepping #0A0A0A → #141414 → #1D1D1D; nest on light with a white card + #E6E6E6 hairline.
5. Keep motion at 0.15–0.2s for state changes, and gate any loop behind `prefers-reduced-motion`.

## Optional Appendix: Interaction Patterns

- Scroll behavior: `scroll-behavior: smooth` for in-page anchors. The top nav sticks and the bottom buy bar stays fixed. There are **no scroll-triggered reveals, parallax or IntersectionObserver effects** **[V: none in script or CSS]**
- Hover behavior: pink buttons darken and lift 1px; ghost buttons gain a 6% white fill; footer links brighten. Transition is `background 0.15s, transform 0.15s` **[D]**
- Click behavior: the tab stepper re-renders its panel instantly (no transition) on tab, Prev or Next click and wraps at both ends; FAQ uses native `<details>` toggling with the disc rotating over 0.2s **[V]**
- Animation tone: restrained and crisp. The only ambient motion is the 40s linear ticker loop **[V / I]**

## Optional Appendix: Content & Messaging Patterns

- Headline pattern: short capitals declarations broken across 2–5 lines, with the promise or outcome phrase in pink. Questions ("Which one are you?") and contrasts ("This is not X. It's Y.") recur **[I]**
- CTA language: a lock icon + an access verb + the price, repeated identically in hero, nav, price card, final band and sticky bar **[I]**
- Trust signal pattern: member counts, a 4-up stats strip, five-star testimonial cards with name + role + city, a value-stack table summing to a large "total value", and a struck anchor price **[I]**
- Voice and tone: direct, second-person, urgent, numeric. Ellipsis-free and claim-heavy, with an eyebrow label introducing every section **[I]**

## Optional Appendix: Observed Pages

- https://academy.nextgenxsystem.com/p — the only page inspected. It's a single long-form sales page (≈11,200px tall at 1024px) with one stylesheet and one small behaviour script.

## Optional Appendix: Evidence Notes

- Extraction used the desktop app's built-in browser with JavaScript eval (DOM, computed styles, full `cssRules` dump, script source) because the `agent-browser` CLI was not installed. No screenshots were used.
- No light/dark theme toggle exists. The dark/light bands are section rhythm, not a theme mode.
- Hover states and the ≤1000px tablet layout come from the CSS but weren't rendered. The 76px h1 cap (≥≈1226px viewport) wasn't observed.
- The `--tint` (#FDE8EF) token is declared but no rule visibly uses it.
