'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { heroSlides } from '@/lib/dummy-data'

export function Hero() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  // Skeleton dianggap selesai kalau embla sudah siap DAN gambar slide pertama sudah kebaca —
  // jadi ghost-nya nggak ilang duluan sebelum gambarnya beneran nongol.
  const [isCarouselReady, setIsCarouselReady] = useState(false)
  const [isFirstImageLoaded, setIsFirstImageLoaded] = useState(false)
  const isLoading = !isCarouselReady || !isFirstImageLoaded

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 25 }, [
    Autoplay({ delay: 6000, stopOnInteraction: false }),
  ])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    setIsCarouselReady(true)
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  return (
    <section className="relative overflow-hidden">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,.18),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl py-0 sm:px-4 sm:py-6 lg:px-8">
        <div className="group relative overflow-hidden sm:rounded-t-lg">
          {/* Viewport Carousel */}
          <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex">
              {heroSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  className="relative min-w-0 flex-[0_0_100%] aspect-5/3 sm:aspect-3/1"
                >
                  {/* Mobile */}
                  <Image
                    src={slide.mobileImage}
                    alt={slide.title}
                    fill
                    priority
                    sizes="100vw"
                    onLoad={index === 0 ? () => setIsFirstImageLoaded(true) : undefined}
                    className="object-cover select-none sm:hidden"
                  />

                  {/* Desktop & Tablet */}
                  <Image
                    src={slide.desktopImage}
                    alt={slide.title}
                    fill
                    priority
                    sizes="(min-width: 640px) 100vw, 1280px"
                    onLoad={index === 0 ? () => setIsFirstImageLoaded(true) : undefined}
                    className="hidden object-cover select-none sm:block"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Skeleton overlay — nutup carousel sampai slide pertama beneran siap */}
          <HeroSkeleton visible={isLoading} />

          {/* Nav Arrows */}
          <button
            aria-label="Slide sebelumnya"
            onClick={scrollPrev}
            className={`
              absolute left-2 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center
              rounded-full border border-white/20 bg-black/30 p-2 text-white backdrop-blur-sm
              transition-opacity duration-300
              sm:flex sm:left-4
              ${isLoading ? 'pointer-events-none opacity-0' : 'opacity-0 group-hover:opacity-100'}
            `}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            aria-label="Slide berikutnya"
            onClick={scrollNext}
            className={`
              absolute right-2 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center
              rounded-full border border-white/20 bg-black/30 p-2 text-white backdrop-blur-sm
              transition-opacity duration-300
              sm:flex sm:right-4
              ${isLoading ? 'pointer-events-none opacity-0' : 'opacity-0 group-hover:opacity-100'}
            `}
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Indicator Dots */}
          <div
            className={`
              absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5
              transition-opacity duration-300 sm:bottom-4 sm:gap-2
              ${isLoading ? 'opacity-0' : 'opacity-100'}
            `}
          >
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => scrollTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  selectedIndex === i
                    ? 'w-6 bg-white shadow-lg shadow-primary/30 sm:w-8'
                    : 'w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground/70 sm:w-2'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------- Skeleton ----------------------------- */

// Ghost overlay full-cover, aspect ratio sama persis dengan slide asli (aspect-5/3 di mobile,
// aspect-3/1 di desktop) supaya nggak ada layout shift pas gambar akhirnya muncul.
function HeroSkeleton({ visible }: { visible: boolean }) {
  return (
    <div
      aria-hidden={!visible}
      aria-busy={visible}
      className={`
        absolute inset-0 z-30
        aspect-5/3 sm:aspect-3/1
        bg-muted
        transition-opacity duration-500
        ${visible ? 'opacity-100' : 'pointer-events-none opacity-0'}
      `}
    >
      {/* Shimmer gradient sweep */}
      <div className="absolute inset-0 animate-pulse bg-linear-to-r from-muted via-muted-foreground/10 to-muted" />

      {/* Ghost dots, biar posisinya nggak "kosong" pas nunggu */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 sm:bottom-4 sm:gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 animate-pulse rounded-full bg-muted-foreground/30 ${
              i === 0 ? 'w-6 sm:w-8' : 'w-1.5 sm:w-2'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
