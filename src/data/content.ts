export interface HeroStackRow {
  label: string;
  value: string;
  highlight?: boolean;
  href?: string;
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
  source: string;
  hot?: boolean;
}

export interface EnquiryStepRow {
  item: string;
  detail: string;
  tag: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export type ShowcaseCategory =
  | 'All Work'
  | 'Kitchens'
  | 'Wardrobes'
  | 'Pooja & TV Units'
  | 'Living & Shops';

export interface ShowcaseItem {
  id: string;
  title: string;
  category: Exclude<ShowcaseCategory, 'All Work'>;
  area: string;
  summary: string;
  highlights: string[];
  imageSrc: string;
  imageAlt: string;
  enquiryScope: string;
  featured?: boolean;
}

export const SHOWCASE_CATEGORIES: ShowcaseCategory[] = [
  'All Work',
  'Kitchens',
  'Wardrobes',
  'Pooja & TV Units',
  'Living & Shops',
];

// Tip: To display your own site photos later, simply replace the imageSrc path on any item below.
export const WORK_SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 'modular-kitchen',
    title: 'Warm Wood & Matte Modular Kitchen',
    category: 'Kitchens',
    area: 'Kundrathur, Chennai',
    summary:
      'Spacious U-shaped family kitchen built for daily South Indian cooking, pairing warm wood-grain base cabinets with clean matte overhead storage, full loft units, and bright under-cabinet lighting.',
    highlights: [
      'Waterproof plywood cabinets suited for Chennai humidity',
      'Full overhead loft storage with smooth soft-close drawers',
      'Clean quartz counter with warm under-cabinet strip lighting',
    ],
    imageSrc: '/src/assets/images/mn_kitchen_showcase_1795762703455.jpg',
    imageAlt:
      'Modern Chennai modular kitchen with warm wood lower cabinets, matte cream upper units, loft storage, and warm under-cabinet lighting',
    enquiryScope: 'Modular Kitchen',
    featured: true,
  },
  {
    id: 'tv-wall-display',
    title: 'Backlit TV Feature Wall & Display Units',
    category: 'Pooja & TV Units',
    area: 'Porur, Chennai',
    summary:
      'Living room TV wall finished with a marble-look center panel, fluted warm wood side slats with concealed warm LED strips, floating console drawers, and lit glass display cabinets.',
    highlights: [
      'Warm vertical LED lighting concealed neatly inside wood slats',
      'Tall glass-front display cabinets for idols & family decor',
      'Floating wooden TV console with clutter-free cable routing',
    ],
    imageSrc: '/src/assets/images/mn_tv_wall_showcase_1795762706221.jpg',
    imageAlt:
      'Contemporary Chennai living room TV feature wall with fluted wood slats, warm LED lighting, marble backdrop, and lit glass display cabinets',
    enquiryScope: 'Pooja Room / TV Unit',
  },
  {
    id: 'carved-pooja-unit',
    title: 'Decorative Peacock Pooja Unit',
    category: 'Pooja & TV Units',
    area: 'Kavanur, Chennai',
    summary:
      'Peaceful home pooja mandapam with matte double doors featuring traditional peacock and diya lattice cutouts, warm golden backlighting, handy storage drawer, and side glass niches for lamps.',
    highlights: [
      'Precision decorative peacock & diya lattice door work',
      'Warm golden interior lighting highlighting brass lamps & idols',
      'Bottom drawer storage for pooja essentials & daily convenience',
    ],
    imageSrc: '/src/assets/images/mn_pooja_unit_showcase_1795762706457.jpg',
    imageAlt:
      'South Indian home pooja room cabinet with pearl-grey decorative peacock lattice doors, warm wood frame, and lit side glass shelves',
    enquiryScope: 'Pooja Room / TV Unit',
  },
  {
    id: 'bedroom-wardrobe',
    title: 'Full-Height Bedroom Wardrobes & Loft',
    category: 'Wardrobes',
    area: 'Anna Nagar, Chennai',
    summary:
      'Floor-to-ceiling bedroom wardrobes with seamless overhead loft storage, warm matte beige shutters accented by slim wood vertical trims, long easy-grip handles, and calm ceiling cove lighting.',
    highlights: [
      'Ceiling-height loft cabinets maximizing every inch of storage',
      'Even door alignment with sturdy hinges that stay smooth for years',
      'Warm matte finish paired with slim solid-wood accent trims',
    ],
    imageSrc: '/src/assets/images/mn_wardrobe_showcase_1795762706339.jpg',
    imageAlt:
      'Floor-to-ceiling bedroom wardrobe in matte beige with vertical wood trim accents, matching overhead loft storage, and warm ceiling cove light',
    enquiryScope: 'Wardrobes & Bedrooms',
  },
  {
    id: 'commercial-shop',
    title: 'Modern Retail Shop & Display Interiors',
    category: 'Living & Shops',
    area: 'Chennai Commercial Project',
    summary:
      'Neat, welcoming commercial shop interior featuring a custom fluted-wood billing counter, illuminated built-in wall display shelves, clean ceiling spotlights, and organized floor layout.',
    highlights: [
      'Custom fluted-wood reception & billing counter built in-house',
      'Warm lit wall shelving designed for attractive product display',
      'Durable commercial finishing built for daily customer footfall',
    ],
    imageSrc: '/src/assets/images/mn_shop_interior_showcase_1795762707427.jpg',
    imageAlt:
      'Clean modern retail shop interior in Chennai with custom fluted wood counter, backlit wooden display shelves, and recessed ceiling spotlights',
    enquiryScope: 'Shop / Commercial Interiors',
  },
];

export const CONTACT_INFO = {
  companyName: 'MN Interiors',
  phoneDisplay: '+91 98403 84824',
  phoneLocal: '098403 84824',
  phoneHref: 'tel:+919840384824',
  whatsappNumber: '919840384824',
  whatsappHref:
    'https://wa.me/919840384824?text=Hi%20MN%20Interiors%2C%20I%20would%20like%20to%20enquire%20about%20interior%20work%20in%20Chennai.',
  mapsHref:
    'https://www.google.com/maps/search/?api=1&query=MN+INTERIORS+No.16+Ganapathy+Nagar+1st+Street+Kundrathur+Kavanur+Chennai+600089',
  addressLine1: 'No. 16, Ganapathy Nagar 1st Street, Sriperumbudur Main Road',
  addressLine2: 'Kundrathur, Kavanur, Chennai, Tamil Nadu 600089',
  hours: 'Open Daily · Closes 9:00 PM',
  website: 'mninterior.in',
  googleRating: '4.9',
  googleReviewsCount: 71,
} as const;

export const MARQUEE_ITEMS: string[] = [
  '20+ YEARS IN CHENNAI',
  '4.9 ★ GOOGLE RATED (71 REVIEWS)',
  'KUNDRATHUR, KAVANUR · CHENNAI 600089',
  'OWN IN-HOUSE WORKSHOP',
  '10-YEAR WARRANTY',
  'HOMES, KITCHENS, WARDROBES & SHOPS',
  'CALL OR WHATSAPP +91 98403 84824',
  'FREE SITE VISIT & QUOTE',
];

export const HERO_SUMMARY_ROWS: HeroStackRow[] = [
  { label: 'Experience Across Chennai', value: '20+ YEARS' },
  { label: 'Google Rating (71 Reviews)', value: '4.9 ★' },
  { label: 'Office & Own Workshop', value: 'KUNDRATHUR' },
  { label: 'Quality & Service Promise', value: '10-YR WARRANTY' },
  { label: 'Call or WhatsApp Directly', value: '98403 84824', href: CONTACT_INFO.phoneHref },
  { label: 'Site Visit & Estimate', value: 'FREE', highlight: true },
];

export const STATS_BAND: StatItem[] = [
  { value: '20+', caption: 'Years of Interior Craftsmanship in Chennai', accent: false },
  { value: '4.9 ★', caption: 'Google Rating Across 71 Verified Reviews', accent: true },
  { value: '10 YR', caption: 'Warranty on Our Workmanship & Woodwork', accent: false },
  { value: 'FREE', caption: 'Home Visit & Clear Written Estimate', accent: true },
];

export const PROBLEM_POINTS: string[] = [
  'Cheap boards swell, warp, or start peeling within a couple of Chennai summers and monsoons.',
  'Many companies hand your home over to outside contractors who rush the work and disappear later.',
  'Low initial quotes suddenly increase midway with surprise extra charges for basic items.',
  'Crooked cabinet doors, loose hinges, and messy finishing spoil the look of a brand-new home.',
  'Projects drag on for months past the promised date, delaying your housewarming and move-in.',
];

export const SOLUTION_POINTS: string[] = [
  'We use strong, moisture-resistant plywood and trusted branded fittings suited for Chennai homes.',
  'All major woodwork is crafted by our own experienced team at our workshop in Kundrathur.',
  'You receive a clear, written quote upfront so you know exactly what you are paying for.',
  'Every shutter, drawer, and corner is checked carefully for a smooth, neat, long-lasting finish.',
  'We listen patiently to your ideas, welcome adjustments, and hand over cleanly on schedule.',
];

export const CRAFT_PILLARS: CraftPillar[] = [
  {
    id: 'finishing',
    icon: 'hammer',
    title: 'Neat, Long-Lasting Craftsmanship',
    body: 'Over 20 years, we have earned our name through clean edges, properly aligned doors, and sturdy woodwork that still feels solid years after you move in.',
    footnote: 'KNOWN ACROSS CHENNAI FOR 20+ YEARS',
    hot: true,
  },
  {
    id: 'weather-proof',
    icon: 'shield',
    title: 'Made for Chennai Weather',
    body: 'Heat, humidity, and heavy rains quickly ruin poor-quality boards. We choose reliable waterproof plywood and durable finishes that hold up season after season.',
    footnote: 'NO SWELLING OR PEELING',
  },
  {
    id: 'smooth-finish',
    icon: 'sparkle',
    title: 'Clean, Smooth Finishes',
    body: 'Whether you prefer warm wood tones, glossy laminates, or calm matte colours, we pay close attention to every corner, handle, and joint so nothing looks rushed.',
    footnote: 'NEAT DETAIL IN EVERY ROOM',
  },
  {
    id: 'workshop',
    icon: 'factory',
    title: 'Our Own Kundrathur Workshop',
    body: 'Because we have our own workshop right in Kundrathur, Kavanur, we control the quality directly instead of outsourcing your furniture to random outside shops.',
    footnote: 'DIRECT QUALITY CONTROL',
  },
  {
    id: 'practical-design',
    icon: 'lamp',
    title: 'Flexible & Customer-Friendly',
    body: 'We listen to your ideas, stay patient with changes, and adjust layouts based on your family’s comfort and budget—never forcing cookie-cutter templates on you.',
    footnote: '4.9 ★ RATED BY 71 CLIENTS',
    hot: true,
  },
  {
    id: 'support',
    icon: 'ruler',
    title: '10-Year Warranty & Real Support',
    body: 'We have been in Kundrathur for over two decades and we are not going anywhere. If a hinge needs adjustment or you need help later, we are one phone call away.',
    footnote: '10-YEAR WARRANTY INCLUDED',
  },
];

export const PROCESS_STAGES: ProcessStage[] = [
  {
    num: '01',
    tabLabel: 'Enquiry & Visit',
    title: 'FREE SITE VISIT & DISCUSSION',
    description:
      'Call, WhatsApp, or send us an enquiry and we will visit your home or shop anywhere in Chennai. We measure your rooms, listen to your ideas, and understand your budget.',
    outcomeTitle: 'WHAT HAPPENS NEXT',
    outcomeText:
      'You get honest advice on layouts, storage ideas, and what will work best for your space—with zero pressure to commit.',
    stats: [
      { label: 'SITE VISIT', value: 'FREE' },
      { label: 'COVERAGE', value: 'ALL CHENNAI' },
      { label: 'OBLIGATION', value: 'NONE' },
    ],
    checklist: [
      'Complete room measurements',
      'Understanding your daily needs',
      'Storage & layout suggestions',
      'Budget-friendly options',
      'Honest timeline discussion',
      'Direct talk with our team',
    ],
  },
  {
    num: '02',
    tabLabel: 'Design & Samples',
    title: 'CHOOSE YOUR DESIGN & FINISHES',
    description:
      'We plan the look of each room and help you pick colours, laminates, wood shades, handles, and hardware by seeing real physical samples—and we stay flexible as you refine your choices.',
    outcomeTitle: 'WHAT YOU GET',
    outcomeText:
      'A clear picture of how your kitchen, wardrobes, TV unit, and pooja room will look before any work begins.',
    stats: [
      { label: 'SAMPLES', value: 'TOUCH & SEE' },
      { label: 'CHANGES', value: 'FLEXIBLE' },
      { label: 'STYLE', value: 'YOUR CHOICE' },
    ],
    checklist: [
      'Kitchen layout & storage plan',
      'Wardrobe internal shelf layout',
      'Real colour & finish samples',
      'Lighting & false ceiling ideas',
      'Pooja unit & living room plan',
      'Easy revisions until happy',
    ],
  },
  {
    num: '03',
    tabLabel: 'Clear Quote',
    title: 'TRANSPARENT WRITTEN ESTIMATE',
    description:
      'Once you like the plan and materials, we give you a clear, room-by-room quote. Every material, hardware brand, and finish is written down simply so there are no surprises later.',
    outcomeTitle: 'OUR PROMISE',
    outcomeText:
      'No hidden costs and no sudden price jumps halfway through the project. Everything stays clear and upfront.',
    stats: [
      { label: 'QUOTE FORMAT', value: 'ROOM-WISE' },
      { label: 'HIDDEN FEES', value: 'ZERO' },
      { label: 'PAYMENTS', value: 'STAGE-WISE' },
    ],
    checklist: [
      'Room-by-room price breakdown',
      'Clear plywood & finish details',
      'Hardware brands clearly listed',
      'Agreed start & finish dates',
      'Comfortable stage-wise payments',
      '10-year warranty terms included',
    ],
  },
  {
    num: '04',
    tabLabel: 'Workshop Build',
    title: 'CRAFTED IN OUR KUNDRATHUR WORKSHOP',
    description:
      'We build your woodwork carefully at our own workshop on Sriperumbudur Main Road in Kundrathur. Making the pieces in our workshop ensures cleaner cutting, neater edges, and far less mess inside your home.',
    outcomeTitle: 'WHY IT MATTERS',
    outcomeText:
      'Better finish quality, steady progress, and you are always welcome to drop by Kundrathur to see your work taking shape.',
    stats: [
      { label: 'WORKSHOP', value: 'KUNDRATHUR' },
      { label: 'CONTROL', value: 'IN-HOUSE' },
      { label: 'SITE MESS', value: 'MINIMAL' },
    ],
    checklist: [
      'Carefully selected quality plywood',
      'Clean machine & hand finishing',
      'Proper edge sealing against damp',
      'Branded hinges & drawer channels',
      'Checked before leaving workshop',
      'Regular progress updates to you',
    ],
  },
  {
    num: '05',
    tabLabel: 'Home Fitment',
    title: 'NEAT & CAREFUL INSTALLATION',
    description:
      'Our team brings the finished units to your home and installs everything with care. We protect your flooring, align every door and drawer properly, and check every detail before wrapping up.',
    outcomeTitle: 'WHAT YOU SEE',
    outcomeText:
      'Smooth-opening drawers, straight cabinet lines, clean corners, and a spotless space ready for your family.',
    stats: [
      { label: 'FITMENT', value: 'NEAT & CLEAN' },
      { label: 'FLOOR CARE', value: 'PROTECTED' },
      { label: 'FINAL CHECK', value: 'EVERY DOOR' },
    ],
    checklist: [
      'Careful handling of your tiles',
      'Straight, even door alignment',
      'Smooth soft-close drawer check',
      'Neat electrical & light cutouts',
      'Final touch-ups & polishing',
      'Thorough walk-through with you',
    ],
  },
  {
    num: '06',
    tabLabel: 'Handover & Care',
    title: 'ON-TIME HANDOVER & 10-YEAR WARRANTY',
    description:
      'We hand over your ready home on schedule along with our 10-year warranty. Even years later, if a door needs tightening or you want to add a new unit, you know right where to find us in Kundrathur.',
    outcomeTitle: 'PEACE OF MIND',
    outcomeText:
      'A beautiful home built by people who stand behind their work long after the keys are handed over.',
    stats: [
      { label: 'WARRANTY', value: '10 YEARS' },
      { label: 'AFTER-CARE', value: 'DIRECT CALL' },
      { label: 'RATING', value: '4.9 ★ GOOGLE' },
    ],
    checklist: [
      'Ready before your move-in date',
      'Clean, dust-free handover',
      '10-year warranty coverage',
      'Easy care & cleaning tips',
      'Quick help for future tweaks',
      'Local Kundrathur team support',
    ],
  },
];

export const COMPARISON_BEFORE: string[] = [
  'Work handed off to random outside contractors with uneven quality',
  'Low-grade boards that swell, sag, or peel after a couple of monsoons',
  'Sweet initial quotes followed by unexpected extra charges mid-way',
  'Rushed finishing with crooked doors, loose hinges, and visible gaps',
  'Missed deadlines that upset your move-in or housewarming plans',
  'Hard to reach for repairs or adjustments once final payment is made',
];

export const COMPARISON_AFTER: string[] = [
  '20+ years of trusted craftsmanship done by our own dedicated team',
  'Strong, moisture-resistant materials chosen for Chennai’s climate',
  'Clear, room-by-room written estimate tailored to your budget',
  'Careful workshop finishing and neat alignment checked in every room',
  'Patient, flexible team that listens to your ideas and finishes on time',
  '10-year warranty backed by our permanent presence in Kundrathur',
];

export const SIGNATURE_ROOMS: RoomScope[] = [
  {
    icon: 'cooking',
    tag: 'MOST POPULAR',
    title: 'Modular & Custom Kitchens',
    body: 'Sturdy, easy-to-clean kitchens built for everyday South Indian cooking—with smart pull-out baskets, tall storage units, and smooth drawers that handle heavy vessels easily.',
    spec: 'WATERPROOF & EASY TO MAINTAIN',
    hot: true,
  },
  {
    icon: 'door',
    tag: 'CUSTOM STORAGE',
    title: 'Wardrobes & Bedroom Units',
    body: 'Sliding or hinged wardrobes, loft storage, dressing tables, and study desks custom-sized to fit your bedroom walls neatly without wasting an inch of space.',
    spec: 'SMOOTH DOORS & SMART STORAGE',
  },
  {
    icon: 'temple',
    tag: 'TRADITIONAL & MODERN',
    title: 'Pooja Rooms & Mandapams',
    body: 'Peaceful, thoughtfully crafted pooja units with decorative laser-cut or wooden doors, warm lighting, and neat display shelves for idols, lamps, and pooja essentials.',
    spec: 'CRAFTED WITH CARE & DETAIL',
  },
  {
    icon: 'armchair',
    tag: 'HOMES & SHOPS',
    title: 'TV Units, Living & Shop Interiors',
    body: 'TV feature walls with warm lighting, crockery cabinets, foyer shoe racks, false ceilings, complete home interiors, and neat, well-organized commercial shop interiors.',
    spec: 'RESIDENTIAL & COMMERCIAL',
  },
];

export const CHENNAI_BENCHMARKS: ProjectBenchmark[] = [
  {
    location: 'KUNDRATHUR & KAVANUR',
    title: 'COMPLETE FAMILY HOME INTERIORS',
    meta: 'KITCHEN, WARDROBES, TV WALL & POOJA UNIT',
    summary:
      'Custom modular kitchen, bedroom wardrobes with loft storage, warm backlit living room TV unit with glass display shelves, and a decorative carved pooja mandapam.',
    result: 'COMPLETED NEATLY AS PROMISED',
    hot: true,
  },
  {
    location: 'PORUR & WEST CHENNAI',
    title: 'PRACTICAL 3BHK APARTMENT',
    meta: 'FULL HOME INTERIORS · DESIGNED TO BUDGET',
    summary:
      'Bright, practical interior design planned carefully around the family’s budget—with durable plywood cabinets, smooth matte finishes, and smart storage in every room.',
    result: '100% WITHIN AGREED BUDGET',
  },
  {
    location: 'CHENNAI COMMERCIAL SPACE',
    title: 'NEAT & ORGANIZED SHOP INTERIORS',
    meta: 'CUSTOM DISPLAYS, COUNTERS & LIGHTING',
    summary:
      'Full commercial shop interior built for daily customer footfall—clean counters, organized shelving, attractive lighting, and durable finishing delivered right on schedule.',
    result: 'RATED 5 ★ FOR WORKMANSHIP',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'I am extremely happy and satisfied with the work done by the MN Interiors team for my home. They have done a wonderful job, paying attention to the details and ensuring that the final outcome reflects my expectations. What I particularly appreciate is their flexibility and willingness to listen to my ideas, accommodate changes, and make adjustments based on my comfort and preferences. Thank you for making my house feel more like a home!',
    name: 'Divya',
    role: 'Homeowner · Home Interiors',
    source: 'Verified 5 ★ Google Review',
    hot: true,
  },
  {
    quote:
      'We are extremely happy with the interior work done for our shop with M.N Interiors. The workmanship, finishing, and overall design were excellent. The team was professional, friendly, and cooperative throughout the project. They understood our requirements and delivered the work beautifully. The shop looks neat, attractive, and well-organized. Highly recommended for anyone looking for quality interior work!',
    name: 'R&D Enterprises',
    role: 'Commercial Shop Interiors',
    source: 'Verified 5 ★ Google Review',
  },
  {
    quote:
      'I recently got my home interiors done by M.N. Interiors, and I’m really happy with the overall work. The design, finishing, material quality, and execution were all very good. The team was professional, responsive, and completed the work neatly as promised. They understood our requirements well and gave a beautiful, practical design within our budget. Highly recommended!',
    name: 'Praveen Civil',
    role: 'Homeowner · Full Home Interiors',
    source: 'Verified 5 ★ Google Review',
  },
];

export const ENQUIRY_STEPS: EnquiryStepRow[] = [
  {
    item: 'Free Home or Shop Visit & Measurements',
    detail: 'Our team visits your apartment, house, or shop anywhere in Chennai at your convenience.',
    tag: 'INCLUDED',
  },
  {
    item: 'Practical Layout & Storage Ideas',
    detail: 'Honest suggestions on how to make the most of your kitchen, bedrooms, and living room.',
    tag: 'INCLUDED',
  },
  {
    item: 'Touch & Feel Material Samples',
    detail: 'See real plywood, laminate, finish colours, and hardware options before deciding.',
    tag: 'INCLUDED',
  },
  {
    item: 'Clear, Room-by-Room Written Quote',
    detail: 'Simple pricing broken down clearly by room with no confusing terms or hidden fees.',
    tag: 'INCLUDED',
  },
  {
    item: 'Realistic Start-to-Handover Schedule',
    detail: 'An honest timeline planned around your family’s move-in or housewarming date.',
    tag: 'INCLUDED',
  },
];

export const ENQUIRY_CHECKLIST: string[] = [
  '100% free consultation and site visit across Chennai',
  'Call or WhatsApp directly at +91 98403 84824',
  'Visit our Kundrathur, Kavanur workshop open till 9:00 PM',
  'Clear written quote tailored to your rooms and budget',
  'Backed by our 10-year warranty & 4.9 ★ Google rating',
];

export const FAQS: FaqItem[] = [
  {
    question: 'Where is MN Interiors located, and which areas of Chennai do you cover?',
    answer:
      'Our office and workshop are located at No. 16, Ganapathy Nagar 1st Street, Sriperumbudur Main Road, Kundrathur, Kavanur, Chennai 600089 (open daily until 9:00 PM). We take up residential and shop interior projects across all parts of Chennai.',
  },
  {
    question: 'How can I contact you directly for a quick enquiry?',
    answer:
      'You can call or WhatsApp us directly on +91 98403 84824 (098403 84824), or click any "Get a Free Quote" button on this page to send us your details. We will get back to you promptly.',
  },
  {
    question: 'Is the site visit and estimate really free?',
    answer:
      'Yes, completely free. We will visit your site anywhere in Chennai, take measurements, discuss your ideas and budget, and share a clear room-wise estimate with zero obligation.',
  },
  {
    question: 'Do you handle both home interiors and commercial shops?',
    answer:
      'Yes! We handle complete home interiors (2BHK, 3BHK, independent houses), individual requirements like modular kitchens, wardrobes, TV units, and pooja rooms, as well as neat, well-organized shop and commercial interiors.',
  },
  {
    question: 'What does your 10-year warranty cover?',
    answer:
      'Our 10-year warranty covers workmanship and core woodwork against manufacturing defects, peeling, or structural issues under normal use. Since we are permanently based in Kundrathur, you can reach us easily whenever you need support.',
  },
  {
    question: 'Can we visit your workshop in Kundrathur before finalizing?',
    answer:
      'Of course! We welcome families and business owners to visit us at No. 16, Ganapathy Nagar 1st Street, Sriperumbudur Main Road, Kundrathur, Kavanur. Seeing live work in progress and touching the finishes yourself is the best way to judge our craftsmanship.',
  },
];

export const CHENNAI_LOCALITIES: string[] = [
  'Kundrathur / Kavanur / Mangadu / Gerugambakkam',
  'Porur / Iyyappanthangal / Valasaravakkam',
  'Tambaram / Chromepet / Pallavaram',
  'Anna Nagar / Mogappair / Ambattur',
  'Velachery / Madipakkam / Medavakkam',
  'Adyar / Besant Nagar / Thiruvanmiyur',
  'T. Nagar / Alwarpet / Mylapore',
  'OMR / ECR',
  'Other Area in Chennai',
];
