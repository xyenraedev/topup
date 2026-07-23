'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { LogIn, Home, Megaphone, PackageSearch, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

const NAV_LINKS = [
  {
    label: 'Beranda',
    description: 'Kembali ke halaman utama',
    href: '/',
    icon: Home,
  },
  {
    label: 'Berita & Promo',
    description: 'Info promo & berita terbaru',
    href: '#news',
    icon: Megaphone,
  },
  {
    label: 'Lacak Pesanan',
    description: 'Cek status pesanan kamu',
    href: '/lacak-pesanan',
    icon: PackageSearch,
  },
]

function Logo() {
  return (
    <Link href="/" className="inline-flex items-center">
      <Image
        src="/logo.webp"
        alt="BubbleShop"
        width={140}
        height={40}
        priority
        className="h-9 w-auto object-contain"
      />
    </Link>
  )
}

// Icon hamburger yang morph jadi X — dipakai di trigger navbar
function MenuToggleIcon({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-4 w-5 flex-col items-center justify-center">
      <motion.span
        className="absolute h-0.5 w-5 rounded-full bg-current"
        animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
      />
      <motion.span
        className="absolute h-0.5 w-5 rounded-full bg-current"
        animate={open ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.15 }}
      />
      <motion.span
        className="absolute h-0.5 w-5 rounded-full bg-current"
        animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
      />
    </span>
  )
}

const listVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 16 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-60 border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={`
                relative text-sm font-medium transition-colors
                ${
                  index === 0
                    ? 'text-foreground after:absolute after:-bottom-5.25 after:left-0 after:h-0.5 after:w-full after:bg-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Login Button */}
        <div className="hidden md:block">
          <button
            className="
              inline-flex items-center justify-center gap-1.5 rounded-xl border border-primary
              px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-medium
              bg-primary text-primary-foreground shadow-md
              transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]
            "
          >
            <LogIn className="h-4 w-4" />
            <span>Login</span>
          </button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="relative z-70 inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted md:hidden">
            <MenuToggleIcon open={open} />
            <span className="sr-only">Buka menu</span>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="flex w-[85vw] max-w-sm flex-col border-l border-border bg-background p-0"
          >
            {/* Header — logo saja, tanpa border pemisah biar nyatu sama navbar */}
            <SheetHeader className="px-6 py-5 text-left">
              <SheetTitle>
                <Logo />
              </SheetTitle>
            </SheetHeader>

            {/* Body — nav list card-style, icon + title + deskripsi + chevron */}
            <AnimatePresence>
              {open && (
                <motion.nav
                  variants={listVariants}
                  initial="hidden"
                  animate="show"
                  className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-2"
                >
                  <motion.p
                    variants={itemVariants}
                    className="px-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70"
                  >
                    Menu
                  </motion.p>

                  {NAV_LINKS.map((link) => {
                    const Icon = link.icon
                    const isActive = pathname === link.href

                    return (
                      <motion.div key={link.href} variants={itemVariants}>
                        <Link
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className={`
                            group flex w-full items-center gap-3
                            rounded-2xl border
                            px-3.5 py-3
                            transition-all duration-200
                            ${
                              isActive
                                ? 'border-primary bg-primary text-primary-foreground shadow-md'
                                : 'border-border bg-card text-foreground hover:border-primary/40 hover:bg-accent hover:shadow-sm'
                            }
                          `}
                        >
                          <span
                            className={`
                              flex h-10 w-10 shrink-0 items-center justify-center rounded-xl
                              transition-colors duration-200
                              ${
                                isActive
                                  ? 'bg-primary-foreground/15 text-primary-foreground'
                                  : 'bg-primary/10 text-primary group-hover:bg-primary/15'
                              }
                            `}
                          >
                            <Icon className="h-5 w-5" />
                          </span>

                          <span className="flex min-w-0 flex-1 flex-col">
                            <span className="text-sm font-semibold leading-tight">
                              {link.label}
                            </span>
                            <span
                              className={`
                                truncate text-xs leading-snug
                                ${isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'}
                              `}
                            >
                              {link.description}
                            </span>
                          </span>

                          <ChevronRight
                            className={`
                              h-4 w-4 shrink-0 transition-transform duration-200
                              ${isActive ? 'text-primary-foreground/80' : 'text-muted-foreground/60 group-hover:translate-x-0.5'}
                            `}
                          />
                        </Link>
                      </motion.div>
                    )
                  })}
                </motion.nav>
              )}
            </AnimatePresence>

            {/* Footer — pinned CTA */}
            <div className="p-4">
              <button
                onClick={() => setOpen(false)}
                className="
                  inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-primary
                  bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-md
                  transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]
                "
              >
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
