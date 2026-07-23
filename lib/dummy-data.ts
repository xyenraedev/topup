import type { FeatureHighlightUI, GameUI, HeroSlideUI, NewsUI, PaymentMethodUI } from './types'

// ---------------------------------------------------------------------------
// Hero carousel — replace with a fetch to your own CMS/banner endpoint later.
// Drop matching artwork in public/hero/
// ---------------------------------------------------------------------------
export const heroSlides: HeroSlideUI[] = [
  {
    id: 'slide-diamond',
    eyebrow: 'BUBBLESHOP',
    title: 'Top Up',
    highlight: 'Game',
    description:
      'Top up diamond, UC, dan berbagai item game favoritmu dengan harga terbaik dan proses instan.',
    desktopImage: '/hero/hero-banner.png',
    mobileImage: '/hero/hero-banner-mobile.png',
    ctaLabel: 'Mulai Top Up',
    ctaHref: '#games',
  },
  {
    id: 'slide-promo',
    eyebrow: 'PROMO MINGGU INI',
    title: 'Cashback',
    highlight: '20%',
    description:
      'Nikmati cashback spesial untuk setiap top up Mobile Legends & Free Fire menggunakan e-wallet.',
    desktopImage: '/hero/hero-banner-promo.png',
    mobileImage: '/hero/hero-banner-promo-mobile.png',
    ctaLabel: 'Lihat Promo',
    ctaHref: '#news',
  },
  {
    id: 'slide-instant',
    eyebrow: 'PROSES OTOMATIS',
    title: 'Transaksi',
    highlight: 'Instan',
    description: 'Sistem otomatis 24 jam, pesananmu diproses dalam hitungan detik tanpa antre.',
    desktopImage: '/hero/hero-banner-instant.png',
    mobileImage: '/hero/hero-banner-instant-mobile.png',
    ctaLabel: 'Cek Status Pesanan',
    ctaHref: '/lacak-pesanan',
  },
]

// ---------------------------------------------------------------------------
// Payment methods — grouped the way the "METODE PEMBAYARAN" panel displays.
// Drop matching logos in public/payments/
// ---------------------------------------------------------------------------
export const paymentMethods: PaymentMethodUI[] = [
  { name: 'QRIS', group: 'QRIS', logo: '/payments/qris.svg' },
  { name: 'ShopeePay', group: 'E-Wallet', logo: '/payments/shopeepay.svg' },
  { name: 'GoPay', group: 'E-Wallet', logo: '/payments/gopay.svg' },
  { name: 'Permata Bank', group: 'Virtual Account', logo: '/payments/permata.svg' },
  { name: 'BRI', group: 'Virtual Account', logo: '/payments/bri.svg' },
  { name: 'BNI', group: 'Virtual Account', logo: '/payments/bni.svg' },
  { name: 'CIMB Niaga', group: 'Virtual Account', logo: '/payments/cimb.svg' },
  { name: 'BCA', group: 'Virtual Account', logo: '/payments/bca.svg' },
  { name: 'Alfamart', group: 'Convenience Store', logo: '/payments/alfamart.svg' },
  { name: 'Indomaret', group: 'Convenience Store', logo: '/payments/indomaret.svg' },
]

// ---------------------------------------------------------------------------
// Feature highlights ("24/7 Support", "Update Harga", etc.)
// ---------------------------------------------------------------------------
export const featureHighlights: FeatureHighlightUI[] = [
  {
    title: '24/7 Support',
    description: 'Kami siap membantu kapan saja.',
    icon: 'support',
  },
  {
    title: 'Update Harga',
    description: 'Harga selalu update dan kompetitif.',
    icon: 'price',
  },
  {
    title: 'Ribuan Transaksi',
    description: 'Telah dipercaya oleh ribuan pelanggan.',
    icon: 'transactions',
  },
  {
    title: 'Refund Guarantee',
    description: 'Garansi dana kembali jika terjadi kendala.',
    icon: 'refund',
  },
]

// ---------------------------------------------------------------------------
// Games catalog — this is the front-end mirror of GET /api/product, extended
// with gameCode (matches the provider's Game Name/Game Code table), category,
// popular flag and artwork path.
// Drop matching artwork in public/games/
// ---------------------------------------------------------------------------
export const games: GameUI[] = [
  {
    gameCode: 'mobile-legends',
    product_code: 'BSML301',
    product_name: 'Mobile Legends',
    account_identifier: 'Game ID & Zone',
    status: 'Available',
    category: 'MOBA',
    popular: true,
    image: '/games/mobile-legends.png',
  },
  {
    gameCode: 'free-fire',
    product_code: 'BSFF104',
    product_name: 'Free Fire',
    account_identifier: 'Player ID',
    status: 'Available',
    category: 'Action',
    popular: true,
    image: '/games/free-fire.png',
  },
  {
    gameCode: 'pubg-mobile',
    product_code: 'BSPM220',
    product_name: 'PUBG Mobile',
    account_identifier: 'Player ID',
    status: 'Available',
    category: 'Action',
    popular: true,
    image: '/games/pubg-mobile.png',
  },
  {
    gameCode: 'genshin-impact',
    product_code: 'BSGI450',
    product_name: 'Genshin Impact',
    account_identifier: 'UID & Server',
    status: 'Available',
    category: 'RPG',
    popular: true,
    image: '/games/genshin-impact.png',
  },
  {
    gameCode: 'valorant',
    product_code: 'BSVL512',
    product_name: 'Valorant',
    account_identifier: 'Riot ID',
    status: 'Available',
    category: 'FPS',
    popular: true,
    image: '/games/valorant.png',
  },
  {
    gameCode: 'call-of-duty-mobile',
    product_code: 'BSCD198',
    product_name: 'Call of Duty Mobile',
    account_identifier: 'Player ID',
    status: 'Available',
    category: 'FPS',
    popular: false,
    image: '/games/call-of-duty-mobile.png',
  },
  {
    gameCode: 'magic-chess',
    product_code: 'BSMC382',
    product_name: 'Magic Chess',
    account_identifier: 'Game ID & Zone',
    status: 'Available',
    category: 'Strategy',
    popular: false,
    image: '/games/magic-chess.png',
  },
  {
    gameCode: 'arena-of-valor',
    product_code: 'BSAV233',
    product_name: 'Arena of Valor',
    account_identifier: 'Game ID & Zone',
    status: 'Available',
    category: 'MOBA',
    popular: false,
    image: '/games/arena-of-valor.png',
  },
  {
    gameCode: 'point-blank',
    product_code: 'BSPB144',
    product_name: 'Point Blank',
    account_identifier: 'Player ID',
    status: 'Available',
    category: 'FPS',
    popular: false,
    image: '/games/point-blank.png',
  },
  {
    gameCode: 'metal-slug-awakening',
    product_code: 'BSMS077',
    product_name: 'Metal Slug Awakening',
    account_identifier: 'Player ID',
    status: 'Unavailable',
    category: 'Action',
    popular: false,
    image: '/games/metal-slug-awakening.png',
  },
  {
    gameCode: 'honor-of-kings',
    product_code: 'BSHK266',
    product_name: 'Honor of Kings',
    account_identifier: 'Game ID & Zone',
    status: 'Available',
    category: 'MOBA',
    popular: false,
    image: '/games/honor-of-kings.png',
  },
  {
    gameCode: 'stumble-guys',
    product_code: 'BSSG309',
    product_name: 'Stumble Guys',
    account_identifier: 'Player ID',
    status: 'Available',
    category: 'Casual',
    popular: false,
    image: '/games/stumble-guys.png',
  },
  {
    gameCode: 'sausage-man',
    product_code: 'BSSM118',
    product_name: 'Sausage Man',
    account_identifier: 'Player ID',
    status: 'Available',
    category: 'Casual',
    popular: false,
    image: '/games/sausage-man.png',
  },
  {
    gameCode: 'super-sus',
    product_code: 'BSSS411',
    product_name: 'Super Sus',
    account_identifier: 'Player ID',
    status: 'Available',
    category: 'Casual',
    popular: false,
    image: '/games/super-sus.png',
  },
]

// ---------------------------------------------------------------------------
// News & promo feed
// Drop matching artwork in public/news/
// ---------------------------------------------------------------------------
export const newsItems: NewsUI[] = [
  {
    id: 'news-1',
    tag: 'Promo',
    date: '22 Jul 2026',
    title: 'Promo Top Up Gopay Cashback 20%',
    excerpt: 'Dapatkan cashback 20% untuk setiap top up menggunakan Gopay.',
    image: '/news/mcgg.webp',
    href: '/berita/promo-top-up-gopay-cashback-20',
  },
  {
    id: 'news-2',
    tag: 'Event',
    date: '20 Jul 2026',
    title: 'Event Spesial MLBB Diamond Bonus',
    excerpt: 'Top up diamond Mobile Legends dan dapatkan bonus hingga 30%.',
    image: '/news/ffws-sea.webp',
    href: '/berita/event-spesial-mlbb-diamond-bonus',
  },
  {
    id: 'news-3',
    tag: 'Update',
    date: '18 Jul 2026',
    title: 'Update Harga Terbaru Juli 2026',
    excerpt: 'Cek update harga terbaru untuk semua game favoritmu.',
    image: '/news/pubg-mobile-x-peaky.webp',
    href: '/berita/update-harga-terbaru-juli-2026',
  },
  {
    id: 'news-4',
    tag: 'Info',
    date: '15 Jul 2026',
    title: 'Sistem Pembayaran QRIS Tersedia',
    excerpt: 'Kini tersedia pembayaran QRIS untuk semua transaksi.',
    image: '/news/alter-ego.webp',
    href: '/berita/sistem-pembayaran-qris-tersedia',
  },
]
