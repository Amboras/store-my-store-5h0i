'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Truck, ShieldCheck, Undo2, Sparkles, Star } from 'lucide-react'
import { useCollections } from '@/hooks/use-collections'
import { useProducts } from '@/hooks/use-products'
import ProductGrid from '@/components/product/product-grid'
import CollectionSection from '@/components/marketing/collection-section'

const HERO_IMAGE =
  'https://ahjviugsxpwzpkyzgrhi.supabase.co/storage/v1/object/public/product-user-files/609c5354-c20b-4473-8c5f-fe886e4a0ab5%2Fai-banner-1779151462658-0-01KRYV1RCANS7HP4YZPV5G1B8M.webp'
const STORY_IMAGE =
  'https://ahjviugsxpwzpkyzgrhi.supabase.co/storage/v1/object/public/product-user-files/609c5354-c20b-4473-8c5f-fe886e4a0ab5%2Fai-lifestyle-1779151507390-0-01KRYV341HP1DW2PV0K930C2JS.webp'

export default function Home() {
  const { data: collections } = useCollections()
  const { data: products } = useProducts({ limit: 8 })

  const hasCollections = (collections?.length ?? 0) > 0
  const hasProducts = (products?.length ?? 0) > 0
  const featuredCollections = (collections ?? []).slice(0, 3)

  return (
    <div className="overflow-x-hidden bg-background">
      {/* ─────────────── HERO ─────────────── */}
      <section className="relative">
        {/* Full-bleed image */}
        <div className="relative h-[78vh] min-h-[560px] max-h-[820px] w-full overflow-hidden">
          <Image
            src={HERO_IMAGE}
            alt="A considered still life — kraft boxes, ceramics, and natural fabric on warm linen"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Soft gradient for legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-cream/95 via-brand-cream/60 to-brand-cream/10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-cream/30" />

          {/* Hero content */}
          <div className="absolute inset-0 flex items-center">
            <div className="container-custom">
              <div className="max-w-xl animate-fade-in-up">
                <div className="inline-flex items-center gap-2 rounded-pill bg-white/85 backdrop-blur px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-navy ring-1 ring-brand-navy/8">
                  <Sparkles className="h-3.5 w-3.5 text-brand-coral" strokeWidth={2.5} />
                  New for the season
                </div>
                <h1 className="mt-6 font-heading font-bold tracking-tight text-brand-navy text-[clamp(2.5rem,6vw,5rem)] leading-[0.98]">
                  Modern goods,{' '}
                  <span className="text-brand-coral">made with intention.</span>
                </h1>
                <p className="mt-6 text-lg sm:text-xl text-brand-navy/75 max-w-md leading-relaxed">
                  A curated shop for the everyday — built for the people who notice the details.
                </p>

                <div className="mt-9 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/products"
                    className="group inline-flex items-center justify-center gap-2 rounded-pill bg-brand-navy hover:bg-brand-navy-dark px-7 py-4 text-sm font-semibold text-white transition-colors"
                  >
                    Shop everything
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                  </Link>
                  <Link
                    href="/collections"
                    className="inline-flex items-center justify-center gap-2 rounded-pill bg-white/85 backdrop-blur hover:bg-white px-7 py-4 text-sm font-semibold text-brand-navy ring-1 ring-brand-navy/12 transition-colors"
                  >
                    Browse collections
                  </Link>
                </div>

                {/* Mini social proof */}
                <div className="mt-9 flex items-center gap-3 text-xs text-brand-navy/65">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-brand-coral text-brand-coral" strokeWidth={0} />
                    ))}
                  </div>
                  <span className="font-medium">
                    4.9 / 5 from over 2,400 happy customers
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── VALUE STRIP ─────────────── */}
      <section className="border-y border-border bg-background">
        <div className="container-custom">
          <ul className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
            {[
              { icon: Truck,       title: 'Free shipping',   sub: 'On orders over $75'   },
              { icon: Undo2,       title: '30-day returns',  sub: 'No questions asked'   },
              { icon: ShieldCheck, title: 'Secure checkout', sub: 'Encrypted at every step' },
              { icon: Sparkles,    title: 'Made with care',  sub: 'Curated, not chosen'  },
            ].map((row) => {
              const Icon = row.icon
              return (
                <li key={row.title} className="flex flex-col items-center text-center px-4 py-7 lg:py-9 first:border-l-0">
                  <Icon className="h-5 w-5 text-brand-coral" strokeWidth={2} />
                  <p className="mt-3 text-sm font-semibold text-brand-navy">{row.title}</p>
                  <p className="mt-1 text-xs text-brand-navy/55">{row.sub}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* ─────────────── COLLECTIONS / SHOP CATEGORIES ─────────────── */}
      <section className="py-20 lg:py-24">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-coral mb-3">
                Shop by collection
              </p>
              <h2 className="font-heading font-bold tracking-tight text-brand-navy text-[clamp(2rem,4vw,3rem)] leading-[1.05]">
                Find something you&apos;ll keep for a while.
              </h2>
            </div>
            <Link
              href="/collections"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-coral transition-colors"
            >
              View all collections
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </Link>
          </div>

          {hasCollections ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {featuredCollections.map((c: any, i: number) => (
                <Link
                  key={c.id}
                  href={`/collections/${c.handle}`}
                  className="group relative aspect-[4/5] overflow-hidden rounded-soft bg-cream-deep"
                >
                  {c.metadata?.image_url ? (
                    <Image
                      src={String(c.metadata.image_url)}
                      alt={c.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-cream-dark to-brand-cream-deep" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/55 via-brand-navy/0 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
                      0{i + 1}
                    </p>
                    <h3 className="mt-1 font-heading text-2xl font-bold text-white">
                      {c.title}
                    </h3>
                    <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 group-hover:text-brand-coral-light transition-colors">
                      Shop the collection
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* Placeholder tiles — visible until collections exist */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {[
                { title: 'Best Sellers',  blurb: 'The pieces everyone keeps coming back for.' },
                { title: 'New Arrivals',  blurb: 'Just landed this season.' },
                { title: 'Gifts',         blurb: 'Thoughtful, easy to ship, hard to forget.' },
              ].map((tile, i) => (
                <Link
                  key={tile.title}
                  href="/products"
                  className="group relative aspect-[4/5] overflow-hidden rounded-soft border border-border bg-gradient-to-br from-brand-cream-dark to-brand-cream-deep transition-colors hover:border-brand-coral/40"
                >
                  <div className="absolute inset-0 bg-dot-pattern opacity-40" aria-hidden />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-navy/45">
                      0{i + 1}
                    </p>
                    <h3 className="mt-1 font-heading text-2xl font-bold text-brand-navy">
                      {tile.title}
                    </h3>
                    <p className="mt-2 text-sm text-brand-navy/65 max-w-[20rem]">
                      {tile.blurb}
                    </p>
                    <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-navy group-hover:text-brand-coral transition-colors">
                      Browse the shop
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─────────────── FEATURED PRODUCTS ─────────────── */}
      {hasProducts && (
        <section className="py-20 lg:py-24 bg-cream-deep/40">
          <div className="container-custom">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-coral mb-3">
                  Best sellers
                </p>
                <h2 className="font-heading font-bold tracking-tight text-brand-navy text-[clamp(1.85rem,3.5vw,2.5rem)]">
                  The ones people keep coming back for.
                </h2>
              </div>
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-coral transition-colors"
              >
                Shop all
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
              </Link>
            </div>
            <ProductGrid limit={8} />
          </div>
        </section>
      )}

      {/* ─────────────── BRAND STORY ─────────────── */}
      <section className="py-20 lg:py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative aspect-[4/5] overflow-hidden rounded-soft order-2 lg:order-1">
              <Image
                src={STORY_IMAGE}
                alt="Hands wrapping a small ceramic object in soft tissue paper"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2 max-w-lg">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-coral mb-4">
                Our promise
              </p>
              <h2 className="font-heading font-bold tracking-tight text-brand-navy text-[clamp(2rem,4vw,3rem)] leading-[1.05]">
                Less stuff. Better stuff.
              </h2>
              <div className="mt-6 space-y-5 text-base lg:text-lg text-brand-navy/75 leading-relaxed">
                <p>
                  Every product we ship is something we&apos;d keep on our own shelf. We test
                  before we sell, edit ruthlessly, and only stock what earns its place.
                </p>
                <p>
                  The internet is full of fast. This is the other thing.
                </p>
              </div>
              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy link-underline pb-0.5"
              >
                Read our story
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── COLLECTION SECTIONS (dynamic, server-driven) ─────────────── */}
      {hasCollections && featuredCollections.length > 0 && (
        <div>
          {featuredCollections.slice(0, 2).map((c: any, i: number) => (
            <CollectionSection key={c.id} collection={c} alternate={i % 2 === 1} />
          ))}
        </div>
      )}

      {/* ─────────────── TESTIMONIALS ─────────────── */}
      <section className="py-20 lg:py-24 bg-brand-navy text-white">
        <div className="container-custom">
          <div className="max-w-2xl mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-coral mb-4">
              Loved by thousands
            </p>
            <h2 className="font-heading font-bold tracking-tight text-[clamp(2rem,4vw,3rem)] leading-[1.05]">
              From people who notice the difference.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
            {[
              {
                quote:
                  '"Honestly the best packaging I&apos;ve ever received. Felt like a gift, not an order."',
                name: 'Maya R.',
                role: 'Brooklyn, NY',
              },
              {
                quote:
                  '"Every piece I&apos;ve bought has stuck around. Nothing tossed, nothing returned."',
                name: 'Jordan T.',
                role: 'Austin, TX',
              },
              {
                quote:
                  '"Customer service replied in three minutes. Three. On a Sunday."',
                name: 'Priya S.',
                role: 'Toronto, ON',
              },
            ].map((t) => (
              <figure key={t.name} className="rounded-soft bg-white/[0.04] ring-1 ring-white/10 p-7">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-brand-coral text-brand-coral" strokeWidth={0} />
                  ))}
                </div>
                <blockquote
                  className="font-heading text-lg leading-snug text-white"
                  dangerouslySetInnerHTML={{ __html: t.quote }}
                />
                <figcaption className="mt-5 text-sm">
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-white/50 text-xs mt-0.5">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── FINAL CTA ─────────────── */}
      <section className="py-20 lg:py-24">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-soft bg-cream-deep px-8 py-16 lg:px-16 lg:py-24 text-center">
            <div className="absolute inset-0 bg-dot-pattern opacity-30" aria-hidden />
            <div className="relative max-w-2xl mx-auto">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-coral mb-4">
                Welcome to the shop
              </p>
              <h2 className="font-heading font-bold tracking-tight text-brand-navy text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.02]">
                Ready when you are.
              </h2>
              <p className="mt-6 text-lg text-brand-navy/70 max-w-md mx-auto">
                Free shipping over $75. 30-day returns. New things added every week.
              </p>
              <Link
                href="/products"
                className="mt-9 inline-flex items-center justify-center gap-2 rounded-pill bg-brand-navy hover:bg-brand-navy-dark px-8 py-4 text-sm font-semibold text-white transition-colors"
              >
                Start shopping
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
