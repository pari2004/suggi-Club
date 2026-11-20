export interface CafeData {
  id: string;
  name: string;
  slug: string;
  neighborhood: string;
  address: string;
  city: string;
  rating: number;
  reviewsCount: number;
  coverImage: string;
  logo: string;
  description: string;
  openingHours: string;
  phone: string;
  amenities: string[];
  eligibleDrinks: {
    name: string;
    category: string;
    tier: 'STANDARD' | 'PREMIUM';
    retailPrice: number;
    description: string;
  }[];
  isFeatured?: boolean;
}

export const BENGALURU_CAFES: CafeData[] = [
  {
    id: 'cafe-1',
    name: 'Maverick & Farmer Coffee',
    slug: 'maverick-and-farmer',
    neighborhood: 'Ulsoor / Halasuru',
    city: 'Bengaluru',
    address: '82, Gangadhar Chetty Rd, Halasuru, Bengaluru, Karnataka 560042',
    rating: 4.8,
    reviewsCount: 342,
    coverImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
    logo: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=200&q=80',
    description: 'Artisanal farm-to-cup roastery overlooking Ulsoor Lake, renowned for revolutionary experimental fermentations like Cold Smoke and Clarified Cappuccino.',
    openingHours: '8:00 AM – 10:30 PM (Daily)',
    phone: '+91 98450 12345',
    amenities: ['Outdoor Lakeside Seating', 'Pet Friendly', 'Free High-Speed WiFi', 'Specialty Pour-Overs'],
    isFeatured: true,
    eligibleDrinks: [
      { name: 'Cold Smoke Nitro Brew', category: 'Cold Brew', tier: 'STANDARD', retailPrice: 220, description: 'Naturally smoked arabica with velvety crema' },
      { name: 'Flat White with Oat Milk', category: 'Hot Brew', tier: 'STANDARD', retailPrice: 200, description: 'Double ristretto with micro-foam steamed oat milk' },
      { name: 'Clarified Cappuccino', category: 'Speciality', tier: 'PREMIUM', retailPrice: 260, description: 'Crystal-clear clarified coffee topped with cold foam' },
      { name: 'Classic Cortado', category: 'Espresso', tier: 'STANDARD', retailPrice: 180, description: 'Equal parts single-origin espresso and warm milk' },
      { name: 'Pour Over (Orange Blossom)', category: 'Manual Brew', tier: 'PREMIUM', retailPrice: 240, description: 'Light roast V60 with floral notes and citrus finish' },
    ],
  },
  {
    id: 'cafe-2',
    name: 'Araku World Specialty Coffee',
    slug: 'araku-coffee',
    neighborhood: '12th Main, Indiranagar',
    city: 'Bengaluru',
    address: '968, 12th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038',
    rating: 4.9,
    reviewsCount: 520,
    coverImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
    logo: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=200&q=80',
    description: 'Award-winning regenerative agriculture coffee directly sourced from tribal farmers in the Eastern Ghats. World-class sensory experience.',
    openingHours: '8:30 AM – 11:00 PM (Daily)',
    phone: '+91 80 4370 0088',
    amenities: ['Sensory Tasting Bar', 'AC Co-Working Zone', 'Modernist Pastry', 'Valet Parking'],
    isFeatured: true,
    eligibleDrinks: [
      { name: 'Araku Grand Reserve Cappuccino', category: 'Hot Brew', tier: 'STANDARD', retailPrice: 240, description: 'Signature micro-climate beans with caramel and spice notes' },
      { name: 'Nitro Iced Americano', category: 'Cold Brew', tier: 'STANDARD', retailPrice: 210, description: 'Cascading smooth draught coffee with dense head' },
      { name: 'Chemex Selection Araku High Table', category: 'Manual Brew', tier: 'PREMIUM', retailPrice: 280, description: 'Clean, tea-like aromatic body, balanced tropical acidity' },
      { name: 'Espresso Tonic', category: 'Speciality', tier: 'STANDARD', retailPrice: 220, description: 'Fever Tree tonic over a fresh double pull of Signature blend' },
    ],
  },
  {
    id: 'cafe-3',
    name: 'Blue Tokai Coffee Roasters',
    slug: 'blue-tokai-koramangala',
    neighborhood: '80 Feet Rd, Koramangala',
    city: 'Bengaluru',
    address: '583, 80 Feet Rd, 8th Block, Koramangala, Bengaluru, Karnataka 560095',
    rating: 4.7,
    reviewsCount: 680,
    coverImage: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80',
    logo: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=200&q=80',
    description: 'Pioneers of Indian specialty coffee. Enjoy freshly roasted single-estate beans paired with an inviting creative work atmosphere.',
    openingHours: '7:30 AM – 10:00 PM (Daily)',
    phone: '+91 93199 70001',
    amenities: ['Fast WiFi', 'Power Sockets at every table', 'Outdoor Garden', 'Roastery Retail'],
    isFeatured: true,
    eligibleDrinks: [
      { name: 'Attikan Estate Cafe Latte', category: 'Hot Brew', tier: 'STANDARD', retailPrice: 190, description: 'Dark roast chocolatey estate beans with velvety steamed milk' },
      { name: 'Vietnamese Style Iced Coffee', category: 'Cold Brew', tier: 'STANDARD', retailPrice: 210, description: 'Slow-dripped dark roast coffee with condensed milk over ice' },
      { name: 'Cold Brew Tonic', category: 'Cold Brew', tier: 'STANDARD', retailPrice: 210, description: '18-hour cold steeped coffee with crisp tonic and citrus slice' },
      { name: 'Kalledevarapura Pulp Sun-Dried Pour Over', category: 'Manual Brew', tier: 'PREMIUM', retailPrice: 240, description: 'Sweet berry notes with lingering sugarcane finish' },
    ],
  },
  {
    id: 'cafe-4',
    name: 'Paper & Pie',
    slug: 'paper-and-pie',
    neighborhood: '100 Feet Rd, Indiranagar',
    city: 'Bengaluru',
    address: '842, 100 Feet Rd, Indiranagar, Bengaluru, Karnataka 560038',
    rating: 4.6,
    reviewsCount: 410,
    coverImage: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1200&q=80',
    logo: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=200&q=80',
    description: 'A serene cafe tailored for creative professionals and book lovers, featuring quiet meeting rooms and artisanal roasts.',
    openingHours: '8:00 AM – 11:00 PM (Daily)',
    phone: '+91 90350 22334',
    amenities: ['Podcast Studio', 'Conference Booths', 'Reading Library', 'Artisanal Bakery'],
    isFeatured: false,
    eligibleDrinks: [
      { name: 'Spanish Latte', category: 'Hot Brew', tier: 'STANDARD', retailPrice: 230, description: 'Espresso balanced with sweet spiced milk' },
      { name: 'Single Origin Iced Americano', category: 'Cold Brew', tier: 'STANDARD', retailPrice: 190, description: 'Refreshing iced double shot with clean fruit notes' },
      { name: 'Aeropress Selection', category: 'Manual Brew', tier: 'PREMIUM', retailPrice: 250, description: 'Full immersion pressure brewed specialty lot' },
      { name: 'Vanilla Bean Cortado', category: 'Espresso', tier: 'STANDARD', retailPrice: 200, description: 'Infused with real Madagascar vanilla bean extract' },
    ],
  },
  {
    id: 'cafe-5',
    name: 'Third Wave Coffee',
    slug: 'third-wave-church-street',
    neighborhood: 'Church Street, Central Bengaluru',
    city: 'Bengaluru',
    address: '20, Church St, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560001',
    rating: 4.7,
    reviewsCount: 890,
    coverImage: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&w=1200&q=80',
    logo: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=200&q=80',
    description: 'Iconic Church Street flagship branch. Energetic buzz, exceptional single origin pours and perfect people-watching balcony.',
    openingHours: '7:00 AM – 1:00 AM (Midnight)',
    phone: '+91 80 4956 7380',
    amenities: ['Balcony Seating', 'Metro Accessible (MG Road)', 'Quick Takeaway Counter', 'WiFi'],
    isFeatured: true,
    eligibleDrinks: [
      { name: 'La Mocha', category: 'Hot Brew', tier: 'STANDARD', retailPrice: 220, description: 'Dark chocolate ganache with double espresso' },
      { name: 'Orange Zest Cold Brew', category: 'Cold Brew', tier: 'STANDARD', retailPrice: 210, description: 'Slow brewed with fresh Nagpur orange peel infusion' },
      { name: 'Syphon Brew (Wayanad Estate)', category: 'Manual Brew', tier: 'PREMIUM', retailPrice: 270, description: 'Theatrical vacuum extraction highlighting subtle floral aromatics' },
    ],
  },
  {
    id: 'cafe-6',
    name: 'Humble Bean Coffee',
    slug: 'humble-bean-hsr',
    neighborhood: '27th Main Rd, HSR Layout',
    city: 'Bengaluru',
    address: '204, 27th Main Rd, Sector 2, HSR Layout, Bengaluru, Karnataka 560102',
    rating: 4.8,
    reviewsCount: 290,
    coverImage: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=1200&q=80',
    logo: 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=200&q=80',
    description: 'Dedicated to conscious coffee curation, micro-lots, and educating patrons on farmer livelihoods in Coorg and Chikmagalur.',
    openingHours: '8:00 AM – 10:00 PM (Daily)',
    phone: '+91 97410 88992',
    amenities: ['Lush Plant Decor', 'Quiet Work Vibe', 'Pour-Over Classes', 'Vegan Bites'],
    isFeatured: false,
    eligibleDrinks: [
      { name: 'Estate Flat White', category: 'Hot Brew', tier: 'STANDARD', retailPrice: 190, description: 'Smooth medium roast with rich hazelnut notes' },
      { name: 'Cascara Iced Tea', category: 'Speciality', tier: 'STANDARD', retailPrice: 180, description: 'Brewed from sun-dried coffee cherry fruit husk' },
      { name: 'Cold Brew on Tap', category: 'Cold Brew', tier: 'STANDARD', retailPrice: 200, description: 'Smooth, naturally sweet zero-bitterness cold brew' },
    ],
  },
];

export function getCafeBySlug(slug: string): CafeData | undefined {
  return BENGALURU_CAFES.find((c) => c.slug === slug);
}

export function getAllNeighborhoods(): string[] {
  const set = new Set<string>();
  BENGALURU_CAFES.forEach((c) => set.add(c.neighborhood.split(',')[0].trim()));
  return Array.from(set);
}
