'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { newsItems } from '@/lib/dummy-data'

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const item = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  show: {
    opacity: 1,
    y: 0,
  },
}

export function NewsSection() {
  return (
    <section id="news" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mb-5 flex items-center justify-between sm:mb-6">
        <h2 className="font-display text-lg font-bold text-foreground sm:text-2xl">
          Berita &amp; Promo Terbaru
        </h2>

        <Link
          href="/berita"
          className="flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80 sm:text-sm"
        >
          Lihat Semua
          <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Link>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-2 gap-4 lg:grid-cols-4"
      >
        {newsItems.map((news) => (
          <motion.div key={news.id} variants={item} transition={{ duration: 0.35 }}>
            <Link
              href={news.href}
              className="
                group
                block
                overflow-hidden
                rounded-xl
                border
                border-border
                bg-card
                transition-all
                hover:border-primary/30
                hover:shadow-lg
              "
            >
              <div className="relative aspect-16/10 overflow-hidden">
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                <Badge className="absolute left-2 top-2 border-0 bg-primary px-2 py-1 text-[10px] font-semibold text-primary-foreground sm:text-xs">
                  {news.tag.toUpperCase()}
                </Badge>
              </div>

              <div className="p-3.5">
                <p className="text-xs text-muted-foreground sm:text-sm">{news.date}</p>

                <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-foreground transition-colors group-hover:text-primary sm:text-base">
                  {news.title}
                </h3>

                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground sm:text-sm">
                  {news.excerpt}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
