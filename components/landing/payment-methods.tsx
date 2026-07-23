'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

import { paymentMethods } from '@/lib/dummy-data'

const logos = [...paymentMethods, ...paymentMethods]

export function PaymentMethods() {
  const [loadedNames, setLoadedNames] = useState<Set<string>>(new Set())

  const isLoading = loadedNames.size < paymentMethods.length

  const handleLoad = (name: string) => {
    setLoadedNames((prev) => {
      if (prev.has(name)) return prev
      const next = new Set(prev)
      next.add(name)
      return next
    })
  }

  const skeletonWidths = useMemo(
    () => paymentMethods.map((_, i) => 64 + ((i * 17) % 40)),
    []
  )

  return (
    <section className="mx-auto sm:-mt-8 max-w-7xl  sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="overflow-hidden rounded-b-lg  bg-card"
      >
        <div className="flex flex-col gap-2.5 border-b border-border/60 px-4 pb-4 pt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:pb-5 sm:pt-8">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-foreground sm:text-lg">
              METODE PEMBAYARAN
            </h2>

            <p className="mt-0.5 text-xs text-muted-foreground sm:mt-1 sm:text-sm">
              Transaksi aman dengan berbagai metode pembayaran pilihan
            </p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 self-start sm:gap-2 sm:self-auto">
            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] sm:h-2.5 sm:w-2.5" />
            </span>
            <span className="text-[11px] font-medium text-muted-foreground sm:text-xs">
              Semua sistem online
            </span>
          </div>
        </div>

        <div className="relative overflow-hidden py-3 sm:py-6">
          <div className="absolute inset-y-0 left-0 w-12 sm:w-24 bg-linear-to-r from-card to-transparent z-10 pointer-events-none" />

          <div className="absolute inset-y-0 right-0 w-12 sm:w-24 bg-linear-to-l from-card to-transparent z-10 pointer-events-none" />

          {isLoading && (
            <div
              aria-hidden="true"
              aria-busy="true"
              className="flex items-center gap-6 overflow-hidden sm:gap-12"
            >
              {skeletonWidths.map((w, i) => (
                <div
                  key={i}
                  className="flex h-7 shrink-0 items-center justify-center sm:h-12"
                >
                  <div
                    className="h-6 animate-pulse rounded-md bg-muted sm:h-10"
                    style={{ width: w }}
                  />
                </div>
              ))}
            </div>
          )}

          <motion.div
            className="flex w-max items-center gap-6 sm:gap-12"
            style={isLoading ? { position: 'absolute', inset: 0, opacity: 0 } : undefined}
            animate={isLoading ? undefined : { x: ['0%', '-50%'] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {logos.map((method, index) => (
              <div
                key={`${method.name}-${index}`}
                className="flex h-7 sm:h-12 min-w-fit items-center justify-center"
              >
                <Image
                  src={method.logo}
                  alt={method.name}
                  width={90}
                  height={40}
                  onLoad={() => handleLoad(method.name)}
                  className="h-6 sm:h-10 w-auto object-contain transition duration-300 hover:scale-105"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
