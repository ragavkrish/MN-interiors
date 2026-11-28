export interface StatItem {
  value: string;
  caption: string;
  accent?: boolean;
  /** When set, the number counts up on scroll instead of showing `value` statically */
  count?: { to: number; decimals?: number; suffix?: string; finalSuffix?: string };
}

export interface RoomScope {
  tag: string;
  title: string;
  body: string;
  spec: string;
  hot?: boolean;
  /** Label drawn inside the floor plan */
  roomLabel: 'Kitchen' | 'Bedroom' | 'Pooja' | 'Living';
  /** Short name for the mobile tabs */
  shortLabel: string;
  /** Ends the button text "Get a quote for …" */
  ctaNoun: string;
  imageSrc: string;
  imageAlt: string;
  /** Must match an <option> value in BookingModal */
  enquiryScope: string;
}

export interface ProjectBenchmark {
  location: string;
  title: string;
  meta: string;
  summary: string;
  result: string;
  featured?: boolean;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  source: string;
  featured?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export type ShowcaseCategory =
  | 'All work'
  | 'Kitchens'
  | 'Wardrobes'
  | 'Pooja and TV units'
  | 'Living and shops';

export interface ShowcaseItem {
  id: string;
  title: string;
  category: Exclude<ShowcaseCategory, 'All work'>;
  area: string;
  summary: string;
  highlights: string[];
  imageSrc: string;
  imageAlt: string;
  enquiryScope: string;
  featured?: boolean;
  /** Original pixel size of the photo, used to place the detail dots */
  imageWidth: number;
  imageHeight: number;
  /** Craft details shown as dots on the photo. x / y are % of the original photo. */
  details: ShowcaseDetail[];
}

export interface ShowcaseDetail {
  x: number;
  y: number;
  title: string;
  text: string;
}

export const SHOWCASE_CATEGORIES: ShowcaseCategory[] = [
  'All work',
  'Kitchens',
  'Wardrobes',
  'Pooja and TV units',
  'Living and shops',
];

// Tip: To display your own site photos later, simply replace the imageSrc path on any item below.
export const WORK_SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 'modular-kitchen',
    title: 'Warm wood and matte modular kitchen',
    category: 'Kitchens',
    area: 'Kundrathur, Chennai',
    summary:
      'Spacious U-shaped family kitchen built for daily South Indian cooking, pairing warm wood-grain base cabinets with clean matte overhead storage, full loft units, and bright under-cabinet lighting.',
    highlights: [
      'Waterproof plywood cabinets suited for Chennai humidity',
      'Full overhead loft storage with smooth soft-close drawers',
      'Clean quartz counter with warm under-cabinet strip lighting',
    ],
    imageSrc: '/src/assets/images/real_chennai_kitchen_1795857019817.jpg',
    imageAlt:
      'Modern Chennai modular kitchen with warm wood lower cabinets, matte cream upper units, loft storage, and warm under-cabinet lighting',
    enquiryScope: 'Modular Kitchen',
    featured: true,
    imageWidth: 1376,
    imageHeight: 768,
    details: [
      {
        x: 46,
        y: 11,
        title: 'Full-height loft storage',
        text: 'Overhead lofts run to the ceiling, so rarely used vessels stay out of the way.',
      },
      {
        x: 31,
        y: 40,
        title: 'Warm under-cabinet lighting',
        text: 'Concealed LED strips light the counter evenly with no visible fittings.',
      },
      {
        x: 47,
        y: 72,
        title: 'Soft-close drawers',
        text: 'Deep drawers on branded channels that take heavy vessels and close gently.',
      },
    ],
  },
  {
    id: 'tv-wall-display',
    title: 'Backlit TV feature wall and display units',
    category: 'Pooja and TV units',
    area: 'Porur, Chennai',
    summary:
      'Living room TV wall finished with a marble-look center panel, fluted warm wood side slats with concealed warm LED strips, floating console drawers, and lit glass display cabinets.',
    highlights: [
      'Warm vertical LED lighting concealed neatly inside wood slats',
      'Tall glass-front display cabinets for idols and family decor',
      'Floating wooden TV console with clutter-free cable routing',
    ],
    imageSrc: '/src/assets/images/real_chennai_tv_wall_1795857020948.jpg',
    imageAlt:
      'Contemporary Chennai living room TV feature wall with fluted wood slats, warm LED lighting, marble backdrop, and lit glass display cabinets',
    enquiryScope: 'Pooja Room / TV Unit',
    imageWidth: 1200,
    imageHeight: 896,
    details: [
      {
        x: 33,
        y: 38,
        title: 'LED inside fluted slats',
        text: 'Warm vertical light tucked inside the wood slats, with no exposed strips.',
      },
      {
        x: 78,
        y: 46,
        title: 'Lit display cabinets',
        text: 'Tall glass-front units with shelf lighting for idols, books and family decor.',
      },
      {
        x: 48,
        y: 74,
        title: 'Floating console',
        text: 'A wall-hung console with drawers and hidden cable routing, so the floor stays clear.',
      },
    ],
  },
  {
    id: 'carved-pooja-unit',
    title: 'Decorative peacock pooja unit',
    category: 'Pooja and TV units',
    area: 'Kavanur, Chennai',
    summary:
      'Peaceful home pooja mandapam with matte double doors featuring traditional peacock and diya lattice cutouts, warm golden backlighting, handy storage drawer, and side glass niches for lamps.',
    highlights: [
      'Precision decorative peacock and diya lattice door work',
      'Warm golden interior lighting highlighting brass lamps and idols',
      'Bottom drawer storage for pooja essentials and daily convenience',
    ],
    imageSrc: '/src/assets/images/real_chennai_pooja_unit_1795857021813.jpg',
    imageAlt:
      'South Indian home pooja room cabinet with pearl-grey decorative peacock lattice doors, warm wood frame, and lit side glass shelves',
    enquiryScope: 'Pooja Room / TV Unit',
    imageWidth: 1200,
    imageHeight: 896,
    details: [
      {
        x: 42,
        y: 40,
        title: 'Peacock lattice doors',
        text: 'Precision-cut peacock and diya patterns, backlit so they glow during evening pooja.',
      },
      {
        x: 74,
        y: 31,
        title: 'Lit glass niches',
        text: 'Side niches with warm spotlights for brass lamps and idols.',
      },
      {
        x: 56,
        y: 85,
        title: 'Drawer for essentials',
        text: 'A full-width drawer keeps camphor, wicks and incense close at hand.',
      },
    ],
  },
  {
    id: 'bedroom-wardrobe',
    title: 'Full-height bedroom wardrobes and loft',
    category: 'Wardrobes',
    area: 'Anna Nagar, Chennai',
    summary:
      'Floor-to-ceiling bedroom wardrobes with seamless overhead loft storage, warm matte beige shutters accented by slim wood vertical trims, long easy-grip handles, and calm ceiling cove lighting.',
    highlights: [
      'Ceiling-height loft cabinets maximizing every inch of storage',
      'Even door alignment with sturdy hinges that stay smooth for years',
      'Warm matte finish paired with slim solid-wood accent trims',
    ],
    imageSrc: '/src/assets/images/real_chennai_wardrobe_1795857024068.jpg',
    imageAlt:
      'Floor-to-ceiling bedroom wardrobe in matte beige with vertical wood trim accents, matching overhead loft storage, and warm ceiling cove light',
    enquiryScope: 'Wardrobes and Bedrooms',
    imageWidth: 1200,
    imageHeight: 896,
    details: [
      {
        x: 38,
        y: 18,
        title: 'Ceiling-height lofts',
        text: 'Loft shutters line up with the wardrobe below for one clean, continuous wall.',
      },
      {
        x: 21,
        y: 62,
        title: 'Solid-wood trims',
        text: 'Slim vertical wood trims double as long, easy-grip handles.',
      },
      {
        x: 67,
        y: 10,
        title: 'Cove lighting',
        text: 'A false-ceiling cove adds soft, indirect light across the shutters.',
      },
    ],
  },
  {
    id: 'commercial-shop',
    title: 'Modern retail shop and display interiors',
    category: 'Living and shops',
    area: 'Chennai commercial project',
    summary:
      'Neat, welcoming commercial shop interior featuring a custom fluted-wood billing counter, illuminated built-in wall display shelves, clean ceiling spotlights, and organized floor layout.',
    highlights: [
      'Custom fluted-wood reception and billing counter built in-house',
      'Warm lit wall shelving designed for attractive product display',
      'Durable commercial finishing built for daily customer footfall',
    ],
    imageSrc: '/src/assets/images/real_chennai_shop_1795857024923.jpg',
    imageAlt:
      'Clean modern retail shop interior in Chennai with custom fluted wood counter, backlit wooden display shelves, and recessed ceiling spotlights',
    enquiryScope: 'Shop / Commercial Interiors',
    imageWidth: 1376,
    imageHeight: 768,
    details: [
      {
        x: 65,
        y: 78,
        title: 'Fluted billing counter',
        text: 'Built in our Kundrathur workshop, with a hard-wearing top for daily use.',
      },
      {
        x: 84,
        y: 33,
        title: 'Lit display shelving',
        text: 'Warm LED under each shelf makes products stand out from across the store.',
      },
      {
        x: 71,
        y: 12,
        title: 'Track spotlights',
        text: 'Adjustable ceiling spots so the lighting can follow changing displays.',
      },
    ],
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
  hours: 'Open daily · Closes 9:00 PM',
  website: 'mninterior.in',
  googleRating: '4.9',
  googleReviewsCount: 71,
} as const;

export const MARQUEE_ITEMS: string[] = [
  '20+ years in Chennai',
  '4.9 ★ Google rated (71 reviews)',
  'Kundrathur, Kavanur · Chennai 600089',
  'Own in-house workshop',
  '10-year warranty',
  'Homes, kitchens, wardrobes and shops',
  'Call or WhatsApp +91 98403 84824',
  'Free site visit and quote',
];

export const STATS_BAND: StatItem[] = [
  {
    value: '20+',
    caption: 'Years of interior craftsmanship in Chennai',
    count: { to: 20, finalSuffix: '+' },
  },
  {
    value: '4.9 ★',
    caption: 'Google rating across 71 verified reviews',
    count: { to: 4.9, decimals: 1, finalSuffix: ' ★' },
  },
  {
    value: '10 yr',
    caption: 'Warranty on our workmanship and woodwork',
    count: { to: 10, suffix: ' yr' },
  },
  {
    value: 'Free',
    caption: 'Home visit and clear written estimate',
    accent: true,
  },
];

export const SIGNATURE_ROOMS: RoomScope[] = [
  {
    tag: 'Most popular',
    title: 'Modular and custom kitchens',
    body: 'Sturdy, easy-to-clean kitchens built for everyday South Indian cooking—with smart pull-out baskets, tall storage units, and smooth drawers that handle heavy vessels easily.',
    spec: 'Waterproof and easy to maintain',
    hot: true,
    roomLabel: 'Kitchen',
    shortLabel: 'Kitchens',
    ctaNoun: 'kitchens',
    imageSrc: '/src/assets/images/service_chennai_kitchen_1795857642289.jpg',
    imageAlt:
      'Naturally lit Chennai family modular kitchen with matte off-white upper cabinets, full loft storage, honey-oak base cabinets, black granite counter, and open grilled window',
    enquiryScope: 'Modular Kitchen',
  },
  {
    tag: 'Custom storage',
    title: 'Wardrobes and bedroom units',
    body: 'Sliding or hinged wardrobes, loft storage, dressing tables, and study desks custom-sized to fit your bedroom walls neatly without wasting an inch of space.',
    spec: 'Smooth doors and smart storage',
    roomLabel: 'Bedroom',
    shortLabel: 'Wardrobes',
    ctaNoun: 'wardrobes',
    imageSrc: '/src/assets/images/service_chennai_wardrobe_1795857646070.jpg',
    imageAlt:
      'Naturally lit Chennai bedroom with full-wall cream and walnut sliding wardrobe, overhead loft cabinets, and built-in dressing mirror unit with drawers',
    enquiryScope: 'Wardrobes and Bedrooms',
  },
  {
    tag: 'Traditional and modern',
    title: 'Pooja rooms and mandapams',
    body: 'Peaceful, thoughtfully crafted pooja units with decorative laser-cut or wooden doors, warm lighting, and neat display shelves for idols, lamps, and pooja essentials.',
    spec: 'Crafted with care and detail',
    roomLabel: 'Pooja',
    shortLabel: 'Pooja rooms',
    ctaNoun: 'pooja rooms',
    imageSrc: '/src/assets/images/service_chennai_pooja_1795857646649.jpg',
    imageAlt:
      'Naturally lit South Indian home teak wood pooja mandapam with slatted sides, pull-out tray, brass lamps, framed deities, and lower storage doors',
    enquiryScope: 'Pooja Room / TV Unit',
  },
  {
    tag: 'Homes and shops',
    title: 'TV units, living and shop interiors',
    body: 'TV feature walls with warm lighting, crockery cabinets, foyer shoe racks, false ceilings, complete home interiors, and neat, well-organized commercial shop interiors.',
    spec: 'Residential and commercial',
    roomLabel: 'Living',
    shortLabel: 'Living & shops',
    ctaNoun: 'living rooms',
    imageSrc: '/src/assets/images/service_chennai_living_1795857646326.jpg',
    imageAlt:
      'Naturally lit Chennai apartment living and dining hall with oak and cream modular TV unit, wooden slat room divider, dining table, and built-in crockery cabinet',
    enquiryScope: 'Pooja Room / TV Unit',
  },
];

export const CHENNAI_BENCHMARKS: ProjectBenchmark[] = [
  {
    location: 'Kundrathur and Kavanur',
    title: 'Complete family home interiors',
    meta: 'Kitchen, wardrobes, TV wall and pooja unit',
    summary:
      'Custom modular kitchen, bedroom wardrobes with loft storage, warm backlit living room TV unit with glass display shelves, and a decorative carved pooja mandapam.',
    result: 'Completed neatly as promised',
    featured: true,
  },
  {
    location: 'Porur and West Chennai',
    title: 'Practical 3BHK apartment',
    meta: 'Full home interiors · Designed to budget',
    summary:
      'Bright, practical interior design planned carefully around the family’s budget—with durable plywood cabinets, smooth matte finishes, and smart storage in every room.',
    result: '100% within agreed budget',
  },
  {
    location: 'Chennai commercial space',
    title: 'Neat and organized shop interiors',
    meta: 'Custom displays, counters and lighting',
    summary:
      'Full commercial shop interior built for daily customer footfall—clean counters, organized shelving, attractive lighting, and durable finishing delivered right on schedule.',
    result: 'Rated 5 ★ for workmanship',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'I am extremely happy and satisfied with the work done by the MN Interiors team for my home. They have done a wonderful job, paying attention to the details and ensuring that the final outcome reflects my expectations. What I particularly appreciate is their flexibility and willingness to listen to my ideas, accommodate changes, and make adjustments based on my comfort and preferences. Thank you for making my house feel more like a home!',
    name: 'Divya',
    role: 'Homeowner · Home interiors',
    source: 'Verified 5 ★ Google review',
    featured: true,
  },
  {
    quote:
      'We are extremely happy with the interior work done for our shop with M.N Interiors. The workmanship, finishing, and overall design were excellent. The team was professional, friendly, and cooperative throughout the project. They understood our requirements and delivered the work beautifully. The shop looks neat, attractive, and well-organized. Highly recommended for anyone looking for quality interior work!',
    name: 'R&D Enterprises',
    role: 'Commercial shop interiors',
    source: 'Verified 5 ★ Google review',
  },
  {
    quote:
      'I recently got my home interiors done by M.N. Interiors, and I’m really happy with the overall work. The design, finishing, material quality, and execution were all very good. The team was professional, responsive, and completed the work neatly as promised. They understood our requirements well and gave a beautiful, practical design within our budget. Highly recommended!',
    name: 'Praveen Civil',
    role: 'Homeowner · Full home interiors',
    source: 'Verified 5 ★ Google review',
  },
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
      'You can call or WhatsApp us directly on +91 98403 84824 (098403 84824), or click any "Get a free quote" button on this page to send us your details. We will get back to you promptly.',
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
  'Other area in Chennai',
];
