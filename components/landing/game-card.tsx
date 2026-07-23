'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'

import type { GameUI } from '@/lib/types'

export function GameCard({ game, className = '' }: { game: GameUI; className?: string }) {
  const isAvailable = game.status === 'Available'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className={`group h-full w-full ${className}`}
    >
      <Link
        href={`/game/${game.gameCode}`}
        className="relative block h-full w-full overflow-hidden rounded-xl border border-border/60 bg-card"
      >
        <div className="relative aspect-3/4 h-full w-full overflow-hidden">
          <Image
            src={game.image}
            alt={game.product_name}
            fill
            sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {game.popular && (
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.12 }}
              transition={{ type: 'spring', stiffness: 260, damping: 15 }}
              className="absolute right-1.5 top-1.5 z-10 h-5 w-5 sm:right-3 sm:top-3 sm:h-9 sm:w-9"
            >
              {/* SVG gradient definitions */}
              <svg width="0" height="0" className="absolute">
                <defs>
                  <linearGradient
                    id={`flameGradient-${game.gameCode}`}
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#fff4c2" />
                    <stop offset="30%" stopColor="#ffb52e" />
                    <stop offset="65%" stopColor="#ff7a1a" />
                    <stop offset="100%" stopColor="#d43d0a" />
                  </linearGradient>
                  <linearGradient
                    id={`flameCore-${game.gameCode}`}
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="50%" stopColor="#fff2b0" />
                    <stop offset="100%" stopColor="#ffcf5c" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Soft ambient glow behind */}
              <motion.div
                animate={{
                  scale: [0.9, 1.2, 0.95, 1.15, 0.9],
                  opacity: [0.35, 0.65, 0.4, 0.7, 0.35],
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute -inset-0.75 rounded-full blur-sm sm:-inset-1.5 sm:blur-md"
                style={{
                  background:
                    'radial-gradient(circle, rgba(255,140,20,0.55) 0%, rgba(255,90,0,0) 70%)',
                }}
              />

              {/* Main Flame — gradient fill + thin white outline via stroke (single path, precise shape) */}
              <motion.div
                animate={{
                  rotate: [-1.5, 1.5, -1, 1.2, -1.5],
                  scaleY: [1, 1.08, 0.95, 1.06, 1],
                  scaleX: [1, 0.96, 1.03, 0.97, 1],
                }}
                transition={{
                  duration: 0.75,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{ transformOrigin: 'bottom center' }}
                className="relative flex h-full w-full items-center justify-center"
              >
                <Flame
                  className="h-full w-full drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)] sm:drop-shadow-[0_3px_4px_rgba(0,0,0,0.7)]"
                  fill={`url(#flameGradient-${game.gameCode})`}
                  stroke="#ffffff"
                  strokeWidth={0.75}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  style={{ paintOrder: 'stroke' }}
                />
              </motion.div>

              {/* Inner Core */}
              <motion.div
                animate={{
                  scaleY: [0.68, 0.78, 0.64, 0.76, 0.68],
                  scaleX: [0.6, 0.52, 0.62, 0.54, 0.6],
                  opacity: [0.7, 1, 0.8, 1, 0.7],
                  rotate: [-0.8, 0.8, -0.5, 0.8, -0.8],
                }}
                transition={{
                  duration: 0.55,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: 0.08,
                }}
                style={{ transformOrigin: 'bottom center' }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Flame
                  className="h-2 w-2 sm:h-3.5 sm:w-3.5"
                  fill={`url(#flameCore-${game.gameCode})`}
                  strokeWidth={0}
                />
              </motion.div>
            </motion.div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
