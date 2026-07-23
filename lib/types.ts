// ---------------------------------------------------------------------------
// Types mirroring the BabelShop provider API responses.
// Ref: GET /api/account, GET /api/product, GET /api/service, POST /api/order
// ---------------------------------------------------------------------------

export interface ApiAccount {
  name: string
  username: string
  saldo: number
  registered_at: string
}

export interface ApiProduct {
  product_name: string
  product_code: string
  account_identifier: string
  status: 'Available' | 'Unavailable'
}

export interface ApiServicePrice {
  currency: string
  value: number
}

export interface ApiService {
  service_name: string
  service_code: string
  price: ApiServicePrice
  status: 'Available' | 'Unavailable'
}

export interface ApiOrder {
  ref_id: string
  order_id: string
  service_code: string
  service_name: string
  account_identifier: Record<string, string>
  price: number
  status: 'Process' | 'Success' | 'Failed'
  purchase_time: string
}

// ---------------------------------------------------------------------------
// UI-level types. These extend the raw API shape with front-end-only
// metadata (image, category, popular flag, slug) that the provider API does
// not return but the landing page needs for display/routing.
// ---------------------------------------------------------------------------

export type GameCategory = 'Action' | 'RPG' | 'MOBA' | 'FPS' | 'Strategy' | 'Casual'

export interface GameUI extends ApiProduct {
  /** Slug used for the detail route /game/[gameCode] — mirrors the provider's "Game Code" table (e.g. "mobile-legends"). */
  gameCode: string
  category: GameCategory
  popular: boolean
  /** Place the matching artwork at public/landing/games/<image> */
  image: string
}

export interface PaymentMethodUI {
  name: string
  group: 'QRIS' | 'E-Wallet' | 'Virtual Account' | 'Convenience Store'
  /** Place the matching logo at public/landing/payments/<logo> */
  logo: string
}

export interface NewsUI {
  id: string
  tag: 'Promo' | 'Event' | 'Update' | 'Info'
  date: string
  title: string
  excerpt: string
  /** Place the matching image at public/landing/news/<image> */
  image: string
  href: string
}

export interface FeatureHighlightUI {
  title: string
  description: string
  icon: 'instant' | 'price' | 'secure' | 'support' | 'transactions' | 'refund'
}

export interface HeroSlideUI {
  id: string
  eyebrow: string
  title: string
  highlight: string
  description: string
  desktopImage: string
  mobileImage: string
  ctaLabel: string
  ctaHref: string
}
