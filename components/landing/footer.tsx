import Image from 'next/image'
import Link from 'next/link'
import { Headset } from 'lucide-react'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa6'

import { Button } from '@/components/ui/button'
import { games } from '@/lib/dummy-data'

const SITEMAP = [
  { label: 'Beranda', href: '/' },
  { label: 'Berita & Promo', href: '#news' },
  { label: 'Lacak Pesanan', href: '/lacak-pesanan' },
  { label: 'Privacy Policy', href: '/kebijakan-privasi' },
  { label: 'Dokumentasi API', href: '/dokumentasi-api' },
]

const OTHER_TOP_UPS = games.slice(0, 4)

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10 lg:px-8">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex">
              <Image
                src="/logo.webp"
                alt="BubbleShop"
                width={150}
                height={48}
                className="h-9 w-auto object-contain sm:h-10"
                priority
              />
            </Link>

            <p className="mt-3 max-w-sm text-xs leading-6 text-muted-foreground sm:mt-4 sm:text-sm">
              Top Up game favoritmu dengan proses cepat, aman, dan harga terbaik. Nikmati berbagai
              metode pembayaran lengkap hanya di BubbleShop.
            </p>
          </div>

          {/* Mobile Layout */}
          <div className="lg:contents">
            {/* Sitemap + Games */}
            <div className="grid grid-cols-2 gap-8 lg:contents">
              {/* Sitemap */}
              <div>
                <h3 className="text-sm font-semibold text-foreground sm:text-base">Peta Situs</h3>

                <ul className="mt-3 space-y-2.5 sm:mt-4">
                  {SITEMAP.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-xs text-muted-foreground transition-colors hover:text-primary sm:text-sm"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Games */}
              <div>
                <h3 className="text-sm font-semibold text-foreground sm:text-base">
                  Top Up Lainnya
                </h3>

                <ul className="mt-3 space-y-2.5 sm:mt-4">
                  {OTHER_TOP_UPS.map((game) => (
                    <li key={game.gameCode}>
                      <Link
                        href={`/game/${game.gameCode}`}
                        className="text-xs text-muted-foreground transition-colors hover:text-primary sm:text-sm"
                      >
                        {game.product_name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* MOBILE Contact + Social */}
            <div className="mt-8 grid grid-cols-2 gap-8 lg:hidden">
              {/* Contact */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-foreground sm:text-base">
                  Bantuan Pelanggan
                </h3>

                <Link href="/kontak">
                  <Button
                    variant="secondary"
                    className="h-11 justify-between rounded-xl px-4 text-xs sm:text-sm"
                  >
                    Hubungi Kami
                    <Headset className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Button>
                </Link>
              </div>

              {/* Social */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-foreground sm:text-base">
                  Ikuti Kami
                </h3>

                <div className="flex gap-3">
                  <Link
                    href="https://instagram.com/bubbleshop"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full hover:border-primary hover:bg-primary-glow hover:text-primary"
                    >
                      <FaInstagram className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </Link>

                  <Link
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full hover:border-primary hover:bg-primary-glow hover:text-primary"
                    >
                      <FaWhatsapp className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Desktop Contact */}
            <div className="hidden lg:block">
              <h3 className="text-sm font-semibold text-foreground sm:text-base">Ikuti Kami</h3>

              <div className="mt-4 flex gap-3">
                <Link
                  href="https://instagram.com/bubbleshop"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full hover:border-primary hover:bg-primary-glow hover:text-primary"
                  >
                    <FaInstagram className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </Link>

                <Link href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full hover:border-primary hover:bg-primary-glow hover:text-primary"
                  >
                    <FaWhatsapp className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </Link>
              </div>

              <div className="mt-6">
                <h3 className="mb-3 text-sm font-semibold text-foreground sm:text-base">
                  Bantuan Pelanggan
                </h3>

                <Link href="/kontak">
                  <Button
                    variant="secondary"
                    className="h-11 justify-between rounded-xl px-4 text-xs sm:text-sm"
                  >
                    Hubungi Kami
                    <Headset className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-5 text-center text-xs text-muted-foreground sm:flex-row sm:justify-between sm:text-sm lg:px-8">
          <p>© 2026 BubbleShop. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <Link href="/syarat-ketentuan" className="transition-colors hover:text-primary">
              Syarat & Ketentuan
            </Link>

            <Link href="/kebijakan-privasi" className="transition-colors hover:text-primary">
              Kebijakan Privasi
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
