export interface HeroStackRow {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface StatItem {
  value: string;
  caption: string;
  accent: boolean;
}

export interface CraftPillar {
  id: string;
  icon: 'hammer' | 'shield' | 'sparkle' | 'factory' | 'lamp' | 'ruler';
  title: string;
  body: string;
  footnote: string;
  hot?: boolean;
}

export interface ProcessStage {
  num: string;
  tabLabel: string;
  title: string;
  description: string;
  outcomeTitle: string;
  outcomeText: string;
  stats: Array<{ label: string; value: string }>;
  checklist: string[];
}

export interface RoomScope {
  icon: 'cooking' | 'door' | 'temple' | 'armchair';
  tag: string;
  title: string;
  body: string;
  spec: string;
  hot?: boolean;
}

export interface ProjectBenchmark {
  location: string;
  title: string;
  meta: string;
  summary: string;
  result: string;
  hot?: boolean;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  locality: string;
  projectYear: string;
  hot?: boolean;
}

export interface ValueRow {
  item: string;
  detail: string;
  value: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const MARQUEE_ITEMS: string[] = [
  '22+ YEARS IN CHENNAI',
  '640+ BESPOKE HOMES DELIVERED',
  '18,000 SQ.FT AMBATTUR WORKSHOP',
  '48 SALARIED MASTER CARPENTERS',
  'BURMA TEAK & BWP 710 MARINE PLY',
  'ZERO SUB-CONTRACTING',
  '15-YEAR WRITTEN JOINERY WARRANTY',
  'FIXED-DATE HANDOVER GUARANTEE',
  'ALWARPET EXPERIENCE STUDIO',
];

export const HERO_VALUE_STACK: HeroStackRow[] = [
  { label: 'In-House Salaried Master Artisans', value: '48 CRAFTSMEN' },
  { label: 'Chennai Villas & Homes Delivered', value: '640+ HOMES' },
  { label: 'Owned Ambattur Carpentry Factory', value: '18,000 SQ.FT' },
  { label: 'Coastal Moisture-Proof Core Spec', value: 'BWP 710 PLY' },
  { label: 'Written Structural Joinery Warranty', value: '15 YEARS' },
  { label: 'On-Site Laser Audit & 3D Blueprint', value: '₹4,999', highlight: true },
];

export const STATS_BAND: StatItem[] = [
  { value: '22+', caption: 'Years Crafting Chennai Homes Since 2004', accent: false },
  { value: '640+', caption: 'Bespoke Villas & Residences Handed Over', accent: true },
  { value: '98.4%', caption: 'On-Time Handovers Across Two Decades', accent: false },
  { value: '15 YR', caption: 'Written Structural & Joinery Warranty', accent: true },
];

export const PROBLEM_POINTS: string[] = [
  'Particle-board and cheap commercial ply swell and peel within three Chennai coastal monsoons.',
  'Design apps outsource your home to rotating third-party labour crews who disappear after handover.',
  'Lowball initial quotes balloon by 22% to 35% once hidden electrical, civil, and hardware extras hit.',
  'Lopsided shutter gaps, sagging wardrobe hinges, and sloppy hand-brushed polish ruin expensive wood.',
  'Endless 6-month delays force families to postpone Grihapravesham dates and pay extra rent.',
];

export const SOLUTION_POINTS: string[] = [
  '100% boiling-waterproof BWP 710 Gurjan marine ply & seasoned Burma teak built for Chennai salt air.',
  '48 full-time salaried Kalaigar artisans working exclusively inside our own 18,000 sq.ft. Ambattur unit.',
  'Line-by-line locked Material BOQ signed before work starts — zero surprise escalation bills.',
  'Every kitchen and wardrobe dry-fitted at our factory to ±0.5mm laser tolerance before site delivery.',
  'Contractual handover date backed by a daily delay-penalty clause in your favour.',
];

export const CRAFT_PILLARS: CraftPillar[] = [
  {
    id: 'joinery',
    icon: 'hammer',
    title: 'Mortise & Tenon Joinery',
    body: 'Traditional South Indian wood joinery fused with German CNC precision. No rattling shutters, no loose screws, and zero sagging shelves even under heavy brassware.',
    footnote: 'ENGINEERED FOR 25+ YEAR LOAD LIFE',
    hot: true,
  },
  {
    id: 'marine-ply',
    icon: 'shield',
    title: 'Coastal-Grade BWP 710 Core',
    body: 'Chennai’s 85% sea-breeze humidity destroys MDF and HDHMR. We use authenticated IS:710 marine-grade Gurjan core with 2mm zero-line PUR edge banding on every panel.',
    footnote: 'ZERO SWELLING OR DELAMINATION',
  },
  {
    id: 'finishes',
    icon: 'sparkle',
    title: '6-Coat Dust-Free Italian PU',
    body: 'Book-matched natural veneers, aged Burma teak carvings, and six-stage Italian matte PU sprayed inside pressurized paint booths for a silk-smooth, museum-grade surface.',
    footnote: 'HAND-RUBBED ARCHITECTURAL FINISH',
  },
  {
    id: 'workshop',
    icon: 'factory',
    title: 'Owned Ambattur Factory',
    body: 'Walk into our 18,000 sq.ft. Ambattur Industrial Estate unit any weekday. Inspect the raw timber, German panel saws, and the exact craftsmen cutting your home.',
    footnote: 'ZERO THIRD-PARTY SUB-CONTRACTORS',
  },
  {
    id: 'lighting',
    icon: 'lamp',
    title: 'Architectural Lighting & Acoustics',
    body: 'Warm 3000K recessed cove layers, plaster-in magnetic tracks, and concealed conduit routing engineered on CAD drawings before the first ceiling frame goes up.',
    footnote: 'ZERO EXPOSED WIRES OR HARSH GLARE',
    hot: true,
  },
  {
    id: 'supervision',
    icon: 'ruler',
    title: 'Senior Master Site Supervision',
    body: 'A Kalaigar senior foreman with 12+ years tenure inspects your site every single morning with laser levels, moisture meters, and millimeter gap gauges.',
    footnote: '±0.5MM FITMENT TOLERANCE',
  },
];

export const PROCESS_STAGES: ProcessStage[] = [
  {
    num: '01',
    tabLabel: 'Site Audit',
    title: 'LASER SITE AUDIT & MOISTURE CHECK',
    description:
      'Before drawing a single line, our principal designer and head carpenter visit your Chennai property with Leica laser scanners and wall-moisture meters. We audit plumbing lines, coastal dampness, sun orientation, and structural beams.',
    outcomeTitle: 'STAGE 01 DELIVERABLE',
    outcomeText:
      'Complete millimeter-accurate as-built floor plan, coastal dampness risk map, and realistic budget bracket within 72 hours.',
    stats: [
      { label: 'DURATION', value: '3 DAYS' },
      { label: 'PRECISION', value: '±1.0MM' },
      { label: 'SITE VISIT BY', value: 'SENIOR LEAD' },
    ],
    checklist: [
      'Leica 3D laser measurement',
      'Coastal wall dampness scan',
      'Vaastu & daylight mapping',
      'Electrical load & AC duct check',
      'Structural beam clearance audit',
      'Preliminary budget band review',
    ],
  },
  {
    num: '02',
    tabLabel: '3D & Material Lab',
    title: '3D WALKTHROUGH & PHYSICAL MATERIAL BOX',
    description:
      'At our Alwarpet Experience Studio, you touch the exact veneer sheets, solid teak samples, quartz slabs, and Blum/Hettich hardware going into your home. We lock every photorealistic elevation and itemised line-by-line BOQ.',
    outcomeTitle: 'STAGE 02 DELIVERABLE',
    outcomeText:
      'Signed, fixed-price Master BOQ and physical Material Approval Board — every plank, hinge, and finish locked with zero hidden clauses.',
    stats: [
      { label: 'DURATION', value: '12 DAYS' },
      { label: 'COST VARIANCE', value: '0% LOCKED' },
      { label: 'STUDIO REVIEWS', value: 'ALWARPET' },
    ],
    checklist: [
      'Full 3D room-by-room renders',
      'Curated physical material box',
      'Lighting & false ceiling CAD',
      'Custom kitchen ergonomic plan',
      'Hardware & appliance specs',
      'Zero-escalation signed BOQ',
    ],
  },
  {
    num: '03',
    tabLabel: 'Factory Joinery',
    title: 'IN-HOUSE AMBATTUR WORKSHOP FABRICATION',
    description:
      'All carcasses, fluted teak panels, pooja mandapam carvings, and wardrobe shutters are milled inside our 18,000 sq.ft. Ambattur factory. You are invited for a live dry-fit inspection before a single board is packed for your home.',
    outcomeTitle: 'STAGE 03 DELIVERABLE',
    outcomeText:
      'Factory-inspected, dust-free PU-finished millwork dry-assembled and numbered room-by-room for clean site installation.',
    stats: [
      { label: 'DURATION', value: '4 WEEKS' },
      { label: 'FACTORY AREA', value: '18,000 SF' },
      { label: 'FINISH COATS', value: '6-COAT PU' },
    ],
    checklist: [
      'IS:710 BWP marine ply cutting',
      '2mm German PUR edge sealing',
      'Hand-carved solid teak accents',
      'Pressurized matte PU booth',
      'Full factory dry-fit trial',
      'Client workshop walkthrough',
    ],
  },
  {
    num: '04',
    tabLabel: 'MEP & Ceiling',
    title: 'PARALLEL SITE CIVIL, ELECTRICAL & CEILING',
    description:
      'While your woodwork is crafted in Ambattur, our in-house electrical, plumbing, tiling, and gypsum ceiling teams prepare your shell. Zero dust contamination between wet civil works and fine timber finishes.',
    outcomeTitle: 'STAGE 04 DELIVERABLE',
    outcomeText:
      'Pressure-tested plumbing, concealed copper AC lines, laser-levelled gypsum coves, and primed walls ready for precision millwork.',
    stats: [
      { label: 'DURATION', value: '3 WEEKS' },
      { label: 'WIRING SPEC', value: 'FR-LSH' },
      { label: 'SITE LOGS', value: 'WEEKLY' },
    ],
    checklist: [
      'Concealed electrical & data runs',
      'Saint-Gobain gypsum false ceilings',
      'Waterproofing & stone cladding',
      'Recessed magnetic light tracks',
      'Wall punning & royal primer',
      'Weekly WhatsApp photo audit',
    ],
  },
  {
    num: '05',
    tabLabel: 'Precision Fitment',
    title: 'WHITE-GLOVE ON-SITE INSTALLATION',
    description:
      'Because 90% of the heavy cutting and spraying happens in our factory, on-site installation is quiet, clean, and surgical. Our master carpenters align every shutter reveal to ±0.5mm and calibrate every soft-close runner.',
    outcomeTitle: 'STAGE 05 DELIVERABLE',
    outcomeText:
      'Flawless, gap-calibrated cabinetry, seamless quartz mitre joints, and fully commissioned warm architectural lighting.',
    stats: [
      { label: 'DURATION', value: '2 WEEKS' },
      { label: 'REVEAL GAP', value: '±0.5MM' },
      { label: 'CHECKPOINTS', value: '140 POINTS' },
    ],
    checklist: [
      'Protective floor sheet laydown',
      'Laser-aligned shutter calibration',
      'Blum & Hettich load testing',
      'Granite & quartz mitre sealing',
      'Brass hardware & mirror mount',
      '140-point snag inspection',
    ],
  },
  {
    num: '06',
    tabLabel: 'Handover & Care',
    title: 'DEEP-CLEAN HANDOVER & 15-YEAR WARRANTY',
    description:
      'We hand over a spotless, move-in-ready home before your Grihapravesham date alongside your bound 15-Year Written Structural Warranty, as-built electrical schematics, and a complimentary 6-month hinge re-tuning visit.',
    outcomeTitle: 'STAGE 06 DELIVERABLE',
    outcomeText:
      'Guaranteed on-time key handover, signed 15-year structural warranty certificate, and direct hotline to our Ambattur service desk.',
    stats: [
      { label: 'WARRANTY', value: '15 YEARS' },
      { label: 'FREE TUNE-UP', value: '6 MONTHS' },
      { label: 'ON-TIME RATE', value: '98.4%' },
    ],
    checklist: [
      'Industrial deep cleaning',
      'Signed 15-year warranty bond',
      'As-built MEP drawing dossier',
      'Teak & stone care manual',
      '6-month complimentary tune-up',
      'Direct Chennai service hotline',
    ],
  },
];

export const COMPARISON_BEFORE: string[] = [
  'Outsourced freelance carpenters with zero long-term accountability',
  'MDF, particle board & commercial ply that swell in Chennai humidity',
  'Low teaser quotes followed by 25–35% mid-project cost escalations',
  'Dusty on-site hand polishing that leaves brush marks and uneven sheen',
  'Vague 1-year "service warranties" packed with fine-print exclusions',
  'No own workshop — just a shiny showroom acting as a middleman',
];

export const COMPARISON_AFTER: string[] = [
  '48 full-time salaried Kalaigar artisans — many with us 10 to 18 years',
  'Authenticated IS:710 BWP marine-grade Gurjan ply & seasoned Burma teak',
  'Itemised, fixed-price Master BOQ locked before a single nail is driven',
  '18,000 sq.ft. Ambattur factory with CNC precision & dust-free PU booths',
  '15-Year written structural joinery warranty + 6-month free tune-up',
  'Direct founder & senior foreman accountability from audit to handover',
];

export const SIGNATURE_ROOMS: RoomScope[] = [
  {
    icon: 'cooking',
    tag: 'MOST COMMISSIONED',
    title: 'Marine-Grade & Solid Wood Kitchens',
    body: 'Heavy-duty Indian cooking kitchens engineered with BWP 710 carcasses, Blum Legrabox drawers, mitred quartz islands, and stainless steel cutlery systems.',
    spec: 'BUILT FOR HEAVY SOUTH INDIAN COOKING',
    hot: true,
  },
  {
    icon: 'door',
    tag: 'PRECISION JOINERY',
    title: 'Walk-In & Fluted Teak Wardrobes',
    body: 'Floor-to-ceiling wardrobes with fluted Burma teak, lacquered acoustic glass, motion-triggered warm strip lighting, and velvet jewellery organisers.',
    spec: 'BLUM & HETTICH SOFT-CLOSE HARDWARE',
  },
  {
    icon: 'temple',
    tag: 'HERITAGE ARTISTRY',
    title: 'Hand-Carved Pooja Mandapams',
    body: 'Traditional Chettinad and temple-proportioned Burma teak pooja sanctuaries with custom bell-metal brass inlays, concealed diya exhaust, and Vaastu alignment.',
    spec: 'CARVED BY 3RD-GEN ARTISANS',
  },
  {
    icon: 'armchair',
    tag: 'COMPLETE TURNKEY',
    title: 'Living, Dining & Full Villa Builds',
    body: 'Architectural wall panelling, Italian marble TV plinths, bespoke solid-wood dining tables, cane-webbed accent consoles, and layered false-ceiling lighting.',
    spec: 'SINGLE-TEAM END-TO-END EXECUTION',
  },
];

export const CHENNAI_BENCHMARKS: ProjectBenchmark[] = [
  {
    location: 'BOAT CLUB ROAD, CHENNAI',
    title: 'THE COURTYARD TEAK RESIDENCE',
    meta: '5,400 SQ.FT · 14 WEEKS · FULL TURNKEY',
    summary:
      'Double-height solid Burma teak slatted wall, brass-inlaid foyer console, bespoke Chettinad pooja mandapam, and dual wet/dry Italian marble kitchens crafted end-to-end.',
    result: 'HANDED OVER 4 DAYS AHEAD OF SCHEDULE',
    hot: true,
  },
  {
    location: 'ADYAR SEA-FACING PENTHOUSE',
    title: 'COASTAL OAK & GLASS SANCTUARY',
    meta: '3,200 SQ.FT · 10 WEEKS · TURNKEY MILLWORK',
    summary:
      'Engineered 400 metres from the Bay of Bengal using sealed IS:710 marine carcasses, fluted oak ceiling acoustic baffles, and stainless-316 coastal hardware throughout.',
    result: 'ZERO WARPING ACROSS 6 CHENNAI MONSOONS',
  },
  {
    location: 'ANNA NAGAR EAST VILLA',
    title: 'THREE-GENERATION FAMILY BUNGALOW',
    meta: '4,100 SQ.FT · 12 WEEKS · BARE SHELL TO KEYS',
    summary:
      'Complete architectural interior build featuring 6-coat Italian matte PU wardrobes, concealed teak home library, ergonomic senior-friendly bathrooms, and island kitchen.',
    result: '₹0 COST OVERRUN ON SIGNED MASTER BOQ',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Kalaigar built our Poes Garden villa interiors in 2016. Ten Chennai summers later, every single Burma teak shutter and kitchen drawer glides like day one. When our daughter bought her apartment in Adyar last year, we did not even call a second designer.',
    name: 'Dr. Rajeshwar & Meenakshi Subramanian',
    role: 'Homeowners · Two Commissioned Homes',
    locality: 'Poes Garden & Adyar, Chennai',
    projectYear: '2016 & 2025',
    hot: true,
  },
  {
    quote:
      'Visiting their Ambattur workshop sealed our decision. Watching their senior carpenters dry-fit our entire pooja mandapam and walk-in wardrobe before a single truck arrived at Besant Nagar gave us complete peace of mind. Not one rupee over the signed BOQ.',
    name: 'Karthik Balasubramanian',
    role: 'Managing Director · Independent Villa',
    locality: 'Besant Nagar, Chennai',
    projectYear: '2024',
  },
  {
    quote:
      'After a terrible contractor experience on our first flat, Kalaigar felt like working with precision engineers. Daily laser checks, dust-free PU finishes, and they handed over our keys three days before our Grihapravesham.',
    name: 'Priya & Anand Narayanan',
    role: '3BHK Residence Owners',
    locality: 'Anna Nagar West, Chennai',
    projectYear: '2025',
  },
];

export const AUDIT_VALUE_ROWS: ValueRow[] = [
  {
    item: 'On-Site Leica Laser Measure & Dampness Scan',
    detail: 'Senior designer + head carpenter visit anywhere in Chennai',
    value: '₹6,000',
  },
  {
    item: '2D Architectural Space Plan & Vaastu Review',
    detail: 'Two layout iterations optimised for light, breeze, and storage',
    value: '₹12,000',
  },
  {
    item: 'Physical Craftsmanship Material Box',
    detail: 'IS:710 BWP ply, Burma teak, natural veneer, PU & hardware samples',
    value: '₹8,000',
  },
  {
    item: 'Key-Room 3D Concepts & Ceiling Lighting Layout',
    detail: 'Living, kitchen, and master suite elevations with fixture map',
    value: '₹14,000',
  },
  {
    item: 'Line-by-Line Locked Material & Execution BOQ',
    detail: 'Transparent per-sq.ft pricing with brand specs & handover timeline',
    value: '₹5,000',
  },
];

export const AUDIT_CHECKLIST: string[] = [
  '100% credited into your turnkey build invoice',
  'Private walkthrough of our 18,000 sq.ft. Ambattur workshop',
  'Zero obligation to proceed after receiving your full BOQ',
  'Delivered within 10 working days of site measurement',
  'Direct review session with Principal Craftsman S. Sundararajan',
];

export const FAQS: FaqItem[] = [
  {
    question: 'Can we inspect your Ambattur carpentry workshop before paying anything?',
    answer:
      'Yes — we actively encourage it. You can schedule a free weekday or Saturday tour of our 18,000 sq.ft. Ambattur Industrial Estate workshop and our Alwarpet Experience Studio. You will see live projects in fabrication, our Italian PU spray booths, raw IS:710 marine plywood stacks, and our salaried master carpenters at work.',
  },
  {
    question: 'What is the realistic turnkey budget for a 3BHK apartment or villa in Chennai?',
    answer:
      'Because we use authenticated IS:710 BWP marine ply, German hardware (Blum/Hettich), and 6-coat factory PU or natural teak veneer, full turnkey 3BHK residences typically range between ₹16 Lakhs and ₹32 Lakhs depending on square footage and solid wood scope. Independent villas typically start at ₹35 Lakhs. Your ₹4,999 Site Audit produces an exact, line-by-line locked BOQ before you commit.',
  },
  {
    question: 'How does your woodwork withstand Chennai’s coastal humidity, heat, and termites?',
    answer:
      'Over 22 years across Adyar, Besant Nagar, and ECR, we eliminated every weak material. We never use MDF or particle board in kitchens, vanities, or damp-prone walls. We build strictly with boiling-waterproof BWP 710 Gurjan core, vacuum-treated seasoned timber, 2mm German PUR waterproof edge sealing, and SS-304/316 hardware in sea-facing homes.',
  },
  {
    question: 'What happens to the ₹4,999 Site Audit fee if we hire Kalaigar for execution?',
    answer:
      'Every single rupee of the ₹4,999 Site Audit fee is 100% deducted from your first execution milestone invoice. If you decide not to build with us after receiving your laser floor plans, 3D concepts, and itemised BOQ, you keep every drawing and specification with zero obligation.',
  },
  {
    question: 'Do you outsource carpentry or painting to local daily-wage sub-contractors?',
    answer:
      'Never. Outsourced labour is the #1 reason Chennai interior projects suffer delays and sloppy joints. All 48 carpenters, polishers, CNC operators, and senior site supervisors are full-time salaried Kalaigar employees—our average craftsman tenure is 11 years.',
  },
  {
    question: 'How long does a full turnkey interior build take from approval to handover?',
    answer:
      'A standard 3BHK apartment takes 9 to 11 weeks from design & material sign-off to deep-cleaned handover. Independent villas take 12 to 16 weeks depending on civil and custom Burma teak carving scope. Every project carries a contractual handover date backed by a delay-penalty clause.',
  },
  {
    question: 'Do you undertake custom Burma teak pooja rooms and heritage bungalow renovations?',
    answer:
      'Yes — custom solid-wood joinery and heritage renovations are what built our reputation in Mylapore, Boat Club, and Alwarpet since 2004. Our third-generation woodcarvers craft traditional Chettinad pillars, brass-inlaid pooja doors, and restoration millwork right inside our Ambattur unit.',
  },
];

export const CHENNAI_LOCALITIES: string[] = [
  'Alwarpet / Boat Club / Poes Garden',
  'Adyar / Besant Nagar / Thiruvanmiyur',
  'Anna Nagar / Kilpauk / Shenoy Nagar',
  'Nungambakkam / Mylapore / Gopalapuram',
  'ECR (Neelankarai / Injambakkam / Akkarai)',
  'OMR / Velachery / Perungudi',
  'Porur / Mogappair / Ambattur',
  'Other Chennai Locality',
];
