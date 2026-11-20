export interface PlanData {
  id: string;
  name: string;
  slug: string;
  badge?: string;
  pricePaise: number; // in paise
  priceDisplay: number; // in INR
  validityDays: number;
  creditsCount: number;
  costPerCup: number;
  dailyCap: number;
  isPopular?: boolean;
  isPremiumTier: boolean;
  tagline: string;
  features: string[];
}

export const SUBSCRIPTION_PLANS: PlanData[] = [
  {
    id: 'plan-weekly',
    name: 'Weekly Explorer',
    slug: 'weekly-explorer',
    badge: 'Best for Visitors',
    pricePaise: 24900,
    priceDisplay: 249,
    validityDays: 7,
    creditsCount: 3,
    costPerCup: 83,
    dailyCap: 2,
    isPopular: false,
    isPremiumTier: false,
    tagline: 'Test the waters or enjoy a week of coffee dates across town.',
    features: [
      '3 Specialty Coffee redemptions',
      '7 days validity from purchase',
      'Valid across all approved Bengaluru cafes',
      'Standard Espresso, Americano, Latte & Brews',
      'Max 2 redemptions per day',
      'Instant digital QR pass',
    ],
  },
  {
    id: 'plan-coffee-10',
    name: 'Coffee 10',
    slug: 'coffee-10',
    badge: 'Most Popular',
    pricePaise: 69900,
    priceDisplay: 699,
    validityDays: 30,
    creditsCount: 10,
    costPerCup: 70,
    dailyCap: 2,
    isPopular: true,
    isPremiumTier: false,
    tagline: 'The sweet spot for hybrid workers and everyday coffee fans.',
    features: [
      '10 Specialty Coffee redemptions',
      '30 days validity',
      'Save over 40% on retail cafe prices',
      'Valid at top Bengaluru partner cafes',
      'Standard menu drinks included',
      'Max 2 redemptions per day',
      'Exclusive partner event invites',
    ],
  },
  {
    id: 'plan-coffee-15',
    name: 'Coffee 15',
    slug: 'coffee-15',
    badge: 'Maximum Value',
    pricePaise: 99900,
    priceDisplay: 999,
    validityDays: 30,
    creditsCount: 15,
    costPerCup: 66,
    dailyCap: 2,
    isPopular: false,
    isPremiumTier: false,
    tagline: 'A cup every weekday. Designed for remote workers and cafe regulars.',
    features: [
      '15 Specialty Coffee redemptions',
      '30 days validity',
      'Best value at only ~₹66 per drink',
      'Valid across all approved partner cafes',
      'Hot & cold standard menu items',
      'Max 2 redemptions per day',
      'Rollover unused credits upon prompt renewal',
    ],
  },
  {
    id: 'plan-premium-club',
    name: 'Premium Club',
    slug: 'premium-club',
    badge: 'Connoisseur Tier',
    pricePaise: 149900,
    priceDisplay: 1499,
    validityDays: 30,
    creditsCount: 15,
    costPerCup: 100,
    dailyCap: 3,
    isPopular: false,
    isPremiumTier: true,
    tagline: 'Unrestricted access to single-origins, manual brews & signature drinks.',
    features: [
      '15 Premium specialty coffee redemptions',
      'Includes V60, Chemex, Aeropress, Nitro & Syphon',
      'Single-origin microlots & signature clarified drinks',
      'Up to 3 redemptions per day',
      '30 days validity',
      'Priority roastery cupping sessions access',
    ],
  },
];
