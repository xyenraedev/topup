'use client'

import { motion } from 'framer-motion'
import { Headset, RefreshCcw, ShieldCheck, TrendingUp, type LucideIcon } from 'lucide-react'

import { featureHighlights } from '@/lib/dummy-data'
import type { FeatureHighlightUI } from '@/lib/types'

const ICON_MAP: Record<FeatureHighlightUI['icon'], LucideIcon> = {
  support: Headset,
  price: TrendingUp,
  instant: TrendingUp,
  secure: ShieldCheck,
  transactions: ShieldCheck,
  refund: RefreshCcw,
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

export function FeatureHighlights() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4"
      >
        {featureHighlights.map((feature) => {
          const Icon = ICON_MAP[feature.icon]

          return (
            <motion.div
              key={feature.title}
              variants={item}
              transition={{ duration: 0.35 }}
              className="
                flex items-start gap-3
                rounded-xl
                border border-border
                bg-card
                p-3
                transition-colors
                hover:bg-accent
                sm:p-4
              "
            >
              <span
                className="
                  flex h-9 w-9 shrink-0
                  items-center justify-center
                  rounded-lg
                  bg-primary/10
                  text-primary
                  sm:h-10 sm:w-10
                "
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>

              <div className="min-w-0">
                <p className="text-xs font-semibold leading-snug text-foreground sm:text-sm">
                  {feature.title}
                </p>

                <p className="mt-1 text-[11px] leading-snug text-muted-foreground sm:text-xs">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
