'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Search, Flame, LayoutGrid, SearchX, Gamepad2 } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { games } from '@/lib/dummy-data'
import type { GameCategory } from '@/lib/types'
import { GameCard } from './game-card'
import { Sword, Shield, Crosshair, Castle, PartyPopper } from 'lucide-react'

import type { LucideIcon } from 'lucide-react'

const CATEGORY_ICONS: Record<GameCategory | 'Semua', LucideIcon> = {
  Semua: Gamepad2,
  Action: Sword,
  RPG: Shield,
  MOBA: Shield,
  FPS: Crosshair,
  Strategy: Castle,
  Casual: PartyPopper,
}

const CATEGORIES: GameCategory[] = ['Action', 'RPG', 'MOBA', 'FPS', 'Strategy', 'Casual']

const ALL_CATEGORY_LABELS: (GameCategory | 'Semua')[] = ['Semua', ...CATEGORIES]

// Berapa lama skeleton awal ditampilkan sebelum data "siap".
// Ganti logic ini dengan status fetch/query asli kalau datanya sudah dari API.
const INITIAL_LOAD_MS = 700
// Skeleton singkat tiap kali user ganti kategori/kata kunci, biar transisinya kerasa proper juga.
const FILTER_LOAD_MS = 350

export function GamesSection() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<GameCategory | 'Semua'>('Semua')

  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [isFiltering, setIsFiltering] = useState(false)

  // Skeleton pertama kali section dimount (simulasi fetch awal)
  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoading(false), INITIAL_LOAD_MS)
    return () => clearTimeout(timer)
  }, [])

  // Skeleton singkat setiap kali query/kategori berubah, tapi hanya setelah load awal selesai
  useEffect(() => {
    if (isInitialLoading) return

    setIsFiltering(true)
    const timer = setTimeout(() => setIsFiltering(false), FILTER_LOAD_MS)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, category])

  const isLoading = isInitialLoading || isFiltering

  const filteredByQuery = useMemo(
    () =>
      games.filter((game) => game.product_name.toLowerCase().includes(query.trim().toLowerCase())),
    [query]
  )

  const popularGames = useMemo(() => filteredByQuery.filter((g) => g.popular), [filteredByQuery])

  const regularGames = useMemo(() => filteredByQuery.filter((g) => !g.popular), [filteredByQuery])

  const allGames = useMemo(
    () => regularGames.filter((g) => category === 'Semua' || g.category === category),
    [regularGames, category]
  )

  // Total game di kategori terpilih, dihitung dari SELURUH katalog (populer + reguler)
  // tanpa terpengaruh kata kunci pencarian — ini yang dipakai buat teks status di bawah grid.
  const totalInCategory = useMemo(
    () => games.filter((g) => category === 'Semua' || g.category === category).length,
    [category]
  )

  const isSearching = query.trim().length > 0

  return (
    <section id="games" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      {/* Header */}
      <div className="mb-5 sm:mb-8">
        <h2 className="mb-3 font-display text-lg font-bold text-foreground sm:mb-4 sm:text-2xl">
          Games
        </h2>

        <div className="flex flex-col gap-2.5 sm:gap-3 lg:flex-row lg:items-center lg:justify-between">
          {/* Search */}
          <div className="relative w-full lg:max-w-105">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari game favoritmu..."
              className="h-10 rounded-xl pl-10 text-sm sm:h-11"
            />
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3">
            <Link
              href="#games-populer"
              className="
                flex h-10 items-center justify-center gap-1.5
                rounded-xl
                border border-primary/40
                bg-primary/10
                px-3
                text-xs
                font-medium
                text-primary
                transition-all
                hover:bg-primary-glow
                sm:h-11 sm:gap-2 sm:px-5 sm:text-sm
              "
            >
              <Flame className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Populer
            </Link>

            <Link
              href="#games-semua"
              className="
                flex h-10 items-center justify-center gap-1.5
                rounded-xl
                border border-border
                bg-card
                px-3
                text-xs
                font-medium
                text-muted-foreground
                transition-all
                hover:border-primary/40
                hover:text-foreground
                sm:h-11 sm:gap-2 sm:px-5 sm:text-sm
              "
            >
              <LayoutGrid className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Semua Game
            </Link>
          </div>
        </div>
      </div>

      {/* Populer */}
      <div id="games-populer" className="mb-7 scroll-mt-24 sm:mb-10">
        <SectionHeading title="Populer" href="#games-populer" />

        {isInitialLoading ? (
          <GameGridSkeleton count={5} />
        ) : popularGames.length > 0 ? (
          <div className="grid grid-cols-3 gap-2.5 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
            {popularGames.map((game) => (
              <GameCard key={game.gameCode} game={game} />
            ))}
          </div>
        ) : (
          <EmptyState query={query} />
        )}
      </div>

      {/* Semua Game */}
      <div id="games-semua" className="scroll-mt-24">
        <SectionHeading title="Semua Game" href="#games-semua" showLink={false} />

        {/* Category */}
        <div className="mb-5">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {isInitialLoading
              ? Array.from({ length: ALL_CATEGORY_LABELS.length }).map((_, i) => (
                  <CategoryChipSkeleton key={i} />
                ))
              : ALL_CATEGORY_LABELS.map((label) => (
                  <CategoryChip
                    key={label}
                    label={label}
                    active={category === label}
                    onClick={() => setCategory(label)}
                  />
                ))}
          </div>
        </div>

        {isLoading ? (
          <GameGridSkeleton count={10} />
        ) : allGames.length > 0 ? (
          <>
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
              {allGames.map((game) => (
                <GameCard key={game.gameCode} game={game} />
              ))}
            </div>

            <ResultsFooter
              shown={allGames.length}
              total={totalInCategory}
              isSearching={isSearching}
              category={category}
            />
          </>
        ) : (
          <EmptyState query={query} />
        )}
      </div>
    </section>
  )
}

function SectionHeading({
  title,
  href,
  showLink = true,
}: {
  title: string
  href: string
  showLink?: boolean
}) {
  return (
    <div className="mb-3 flex items-center justify-between sm:mb-4">
      <h3 className="text-sm font-semibold text-foreground sm:text-base">{title}</h3>

      {showLink && (
        <Link
          href={href}
          className="flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80 sm:text-sm"
        >
          Lihat Semua
          <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Link>
      )}
    </div>
  )
}

function CategoryChip({
  label,
  active,
  onClick,
}: {
  label: GameCategory | 'Semua'
  active: boolean
  onClick: () => void
}) {
  const Icon = CATEGORY_ICONS[label]

  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center justify-center
        gap-1.5
        rounded-xl
        border

        px-3 py-2
        sm:px-4 sm:py-2.5

        text-xs
        sm:text-sm

        font-medium
        transition-all duration-200

        ${
          active
            ? 'border-primary bg-primary text-primary-foreground shadow-md'
            : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:bg-accent hover:text-foreground'
        }
      `}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  )
}

// Info status di bawah grid — total sekarang menjumlahkan game populer + reguler
// dalam kategori terpilih, bukan cuma yang tampil di grid "Semua Game" saja.
function ResultsFooter({
  shown,
  total,
  isSearching,
  category,
}: {
  shown: number
  total: number
  isSearching: boolean
  category: GameCategory | 'Semua'
}) {
  const message = isSearching
    ? `Menampilkan ${shown} hasil pencarian`
    : category === 'Semua'
      ? `Menampilkan semua ${total} game`
      : `Menampilkan semua ${total} game kategori "${category}"`

  return (
    <motion.p
      key={message}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="mt-5 text-center text-xs italic text-muted-foreground sm:mt-6 sm:text-sm"
    >
      {message}
    </motion.p>
  )
}

function EmptyState({ query }: { query: string }) {
  const isSearching = query.trim().length > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="
        flex flex-col items-center justify-center
        rounded-2xl border border-dashed border-border
        bg-card/40
        px-4 py-10
        text-center
        sm:py-14
      "
    >
      <div
        className="
          mb-3 flex h-12 w-12 items-center justify-center
          rounded-full bg-muted
          sm:mb-4 sm:h-14 sm:w-14
        "
      >
        {isSearching ? (
          <SearchX className="h-5 w-5 text-muted-foreground sm:h-6 sm:w-6" />
        ) : (
          <Gamepad2 className="h-5 w-5 text-muted-foreground sm:h-6 sm:w-6" />
        )}
      </div>

      <p className="text-sm font-semibold text-foreground sm:text-base">
        {isSearching ? 'Game tidak ditemukan' : 'Belum ada game di kategori ini'}
      </p>

      <p className="mt-1 max-w-xs text-xs text-muted-foreground sm:text-sm">
        {isSearching ? (
          <>
            Tidak ada hasil untuk{' '}
            <span className="font-medium text-foreground">&quot;{query}&quot;</span>. Coba kata
            kunci lain.
          </>
        ) : (
          'Coba pilih kategori lain atau kembali lagi nanti.'
        )}
      </p>
    </motion.div>
  )
}

/* ----------------------------- Skeletons ----------------------------- */

// Ghost card — mengikuti bentuk GameCard asli persis: satu blok gambar aspect-3/4,
// rounded-xl, border-border/60, tanpa baris teks tambahan (GameCard cuma gambar + badge api).
function GameCardSkeleton() {
  return (
    <div className="relative block h-full w-full overflow-hidden rounded-xl border border-border/60 bg-card">
      <div className="relative aspect-3/4 h-full w-full animate-pulse bg-muted" />
    </div>
  )
}

function GameGridSkeleton({ count }: { count: number }) {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className="grid grid-cols-3 gap-2.5 sm:gap-4 md:grid-cols-4 lg:grid-cols-5"
    >
      {Array.from({ length: count }).map((_, i) => (
        <GameCardSkeleton key={i} />
      ))}
    </div>
  )
}

// Ghost chip, lebar bervariasi dikit biar nggak kelihatan kaku/berulang persis
function CategoryChipSkeleton() {
  return (
    <div
      className="h-9 w-20 animate-pulse rounded-xl border border-border bg-muted sm:h-11 sm:w-24"
      aria-hidden="true"
    />
  )
}
