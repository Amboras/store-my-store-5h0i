'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Star, CheckCircle2, Truck, ShieldCheck,
  ChevronDown, ChevronUp, ChevronRight, Package,
  Minus, Plus
} from 'lucide-react'
import { ProductViewTracker } from '@/components/product/product-view-tracker'
import { type VariantExtension } from '@/components/product/product-price'
import { useCart } from '@/hooks/use-cart'

/* ─── FAQ data per kit ───────────────────────────────────────────── */
const FAQ_ITEMS: Record<string, { q: string; a: string }[]> = {
  'starter-kit': [
    {
      q: 'What skill level is this for?',
      a: 'Complete beginners. No experience needed. Everything in the kit is chosen to make your first game easy and fun.',
    },
    {
      q: 'How fast does it ship?',
      a: 'We ship within 1–2 business days. US delivery takes 2–4 days depending on your location.',
    },
    {
      q: 'Can I return it?',
      a: "Yes. 30-day hassle-free returns. If you're not happy for any reason, we'll make it right.",
    },
    {
      q: 'Is the paddle USAPA approved?',
      a: 'Yes. The paddle is USAPA-approved and legal for recreational and sanctioned play.',
    },
    {
      q: 'Is this a good gift?',
      a: "One of the best. Every kit ships in clean, gift-ready packaging with no extra wrapping needed.",
    },
  ],
  'rally-kit': [
    {
      q: 'What skill level is this for?',
      a: 'Complete beginners. No experience needed. Everything in the kit is chosen to make your first game easy and fun.',
    },
    {
      q: 'How fast does it ship?',
      a: 'We ship within 1–2 business days. US delivery takes 2–4 days depending on your location.',
    },
    {
      q: 'Can I return it?',
      a: "Yes. 30-day hassle-free returns. If you're not happy for any reason, we'll make it right.",
    },
    {
      q: 'Is the paddle USAPA approved?',
      a: 'Yes. The paddles are USAPA-approved and legal for recreational and sanctioned play.',
    },
    {
      q: 'Is this a good gift?',
      a: 'Absolutely. The Rally Kit is our most popular gift. Two paddles, six balls, a duffel bag — everything two people need to start playing together. Ships gift-ready.',
    },
  ],
}

/* ─── FAQ accordion item ─────────────────────────────────────────── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-[#1B6B3A]/20 last:border-0">
      <button
        className="w-full flex items-center justify-between py-4 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm font-semibold text-dinkra-ink pr-4">{q}</span>
        {open
          ? <ChevronUp className="h-4 w-4 text-[#1B6B3A] flex-shrink-0" />
          : <ChevronDown className="h-4 w-4 text-[#1B6B3A] flex-shrink-0" />
        }
      </button>
      {open && <p className="pb-4 text-sm text-dinkra-ink/65 leading-relaxed">{a}</p>}
    </div>
  )
}

/* ─── Related kit card ──────────────────────────────────────────── */
const KIT_META: Record<string, { name: string; price: number; compare: number; tagline: string; save: number }> = {
  'starter-kit': { name: 'The Starter Kit', price: 44, compare: 59, save: 15, tagline: 'Your first game starts here.' },
  'rally-kit':   { name: 'The Rally Kit',   price: 79, compare: 99, save: 20, tagline: 'Grab a partner. Get on the court.' },
}

function RelatedKitCard({ handle, thumbnail }: { handle: string; thumbnail?: string }) {
  const meta = KIT_META[handle]
  if (!meta) return null

  return (
    <Link
      href={`/products/${handle}`}
      className="group bg-white rounded-2xl overflow-hidden border border-[#1B6B3A]/20 hover:border-[#1B6B3A] hover:shadow-lg transition-all flex flex-col"
    >
      <div className="relative aspect-square bg-[#E9E5DE] overflow-hidden">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={`Dinkra Pickleball ${meta.name}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 300px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-heading text-5xl text-[#1B6B3A]/20">D</span>
          </div>
        )}
        <span className="absolute top-3 left-3 bg-[#E8F5EC] text-[#1B6B3A] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
          Save ${meta.save}
        </span>
      </div>
      <div className="p-5 flex flex-col gap-2 flex-1">
        <p className="font-heading text-xl text-dinkra-ink">{meta.name}</p>
        <p className="text-xs text-dinkra-ink/55 leading-relaxed">{meta.tagline}</p>
        <div className="flex items-baseline gap-2 mt-auto pt-3">
          <span className="font-heading text-2xl text-[#1B6B3A]">${meta.price}</span>
          <span className="text-sm text-dinkra-ink/40 line-through">${meta.compare}</span>
        </div>
        <div className="w-full mt-2 py-2.5 px-4 rounded-full border border-[#1B6B3A] text-[#1B6B3A] text-sm font-semibold text-center group-hover:bg-[#1B6B3A] group-hover:text-white transition-colors">
          Shop Now
        </div>
      </div>
    </Link>
  )
}

/* ─── Types ─────────────────────────────────────────────────────── */
interface ChecklistItem {
  qty: string
  item: string
  detail: string
}

interface KitExtra {
  badge: string
  badgeStyle: 'solid' | 'outline'
  headline: string
  tagline: string
  saveAmount: number
  comparePrice: number
  reviewCount: number
  checklist: ChecklistItem[]
  infoBox: string
  freeShipping: boolean
  nudge?: string
  otherKits: string[]
}

interface Props {
  product: any
  variantExtensions?: Record<string, VariantExtension>
  handle: string
  kitExtra: KitExtra | undefined
  relatedThumbnails?: Record<string, string>
}

/* ─── Main component ─────────────────────────────────────────────── */
export default function DinkraProductDetail({ product, handle, kitExtra, relatedThumbnails = {} }: Props) {
  const [qty, setQty] = useState(1)
  const [adding, setAdding] = useState(false)
  const [buyingNow, setBuyingNow] = useState(false)
  const { addItemAsync } = useCart()

  const price = kitExtra ? (kitExtra.comparePrice - kitExtra.saveAmount) : null
  const compare = kitExtra?.comparePrice
  const faqItems = FAQ_ITEMS[handle] || FAQ_ITEMS['starter-kit']
  const variantId = product.variants?.[0]?.id

  async function handleAddToCart() {
    if (!variantId) return
    setAdding(true)
    try {
      await addItemAsync({ variantId, quantity: qty })
    } finally {
      setAdding(false)
    }
  }

  async function handleBuyNow() {
    if (!variantId) return
    setBuyingNow(true)
    try {
      await addItemAsync({ variantId, quantity: qty })
      window.location.href = '/checkout'
    } finally {
      setBuyingNow(false)
    }
  }

  return (
    <>
      <ProductViewTracker
        productId={product.id}
        productTitle={product.title}
        variantId={variantId || null}
        currency={product.variants?.[0]?.calculated_price?.currency_code || 'usd'}
        value={product.variants?.[0]?.calculated_price?.calculated_amount ?? null}
      />

      {/* Breadcrumb */}
      <div className="border-b border-[#E9E5DE] bg-white">
        <div className="container-custom py-3">
          <nav className="flex items-center gap-2 text-xs text-dinkra-ink/50">
            <Link href="/" className="hover:text-[#1B6B3A] transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/products" className="hover:text-[#1B6B3A] transition-colors">Shop</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-dinkra-ink">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="bg-[#E9E5DE] min-h-screen">
        <div className="container-custom py-10 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

            {/* ── Image area ─────────────────────────────────── */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl bg-white overflow-hidden shadow-sm">
                {kitExtra && (
                  kitExtra.badgeStyle === 'solid' ? (
                    <span className="absolute top-4 left-4 bg-[#1B6B3A] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full z-10">
                      {kitExtra.badge}
                    </span>
                  ) : (
                    <span className="absolute top-4 left-4 border border-[#1B6B3A] text-[#1B6B3A] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full z-10 bg-white">
                      {kitExtra.badge}
                    </span>
                  )
                )}
                {product.thumbnail ? (
                  <Image
                    src={product.thumbnail}
                    alt={`Dinkra Pickleball ${kitExtra?.badge ?? product.title} — Midnight Ink paddle with DINKRA wordmark`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-dinkra-ink/20 text-sm">
                    No image
                  </div>
                )}
              </div>

              {/* Thumbnail strip */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.slice(0, 4).map((img: { id: string; url: string }, i: number) => (
                    <div key={img.id || i} className="relative aspect-square rounded-lg overflow-hidden border border-[#1B6B3A]/20 bg-white">
                      <Image
                        src={img.url}
                        alt={`Dinkra Pickleball ${product.title} view ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="25vw"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── Product info ──────────────────────────────── */}
            <div className="lg:sticky lg:top-24 lg:self-start space-y-6">

              {/* Brand + badge */}
              <div className="flex items-center gap-3">
                <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#1B6B3A]">
                  Dinkra Pickleball
                </p>
                {kitExtra?.freeShipping && (
                  <span className="bg-[#E8F5EC] text-[#1B6B3A] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    Free Shipping Included
                  </span>
                )}
              </div>

              {/* Title + headline */}
              <div>
                <h1 className="font-heading text-h1 text-dinkra-ink leading-tight">{product.title}</h1>
                {kitExtra && (
                  <p className="text-base text-dinkra-ink/70 mt-2 font-light">{kitExtra.headline}</p>
                )}
              </div>

              {/* Star rating */}
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-dinkra-gold text-dinkra-gold" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-[#1B6B3A]">4.9</span>
                <span className="text-xs text-dinkra-ink/50">({kitExtra?.reviewCount ?? 120} reviews)</span>
              </div>

              {/* Price */}
              {price !== null && compare !== undefined && (
                <div className="flex items-baseline gap-3">
                  <span className="font-heading text-4xl text-[#1B6B3A] font-bold">${price}</span>
                  <span className="text-xl text-dinkra-ink/40 line-through">${compare}</span>
                  <span className="bg-[#E8F5EC] text-[#1B6B3A] text-xs font-bold px-3 py-1 rounded-full">
                    Save ${kitExtra!.saveAmount}
                  </span>
                </div>
              )}

              {/* What's inside checklist */}
              {kitExtra && (
                <div className="bg-white rounded-2xl p-5 border border-[#1B6B3A]/15 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#1B6B3A] mb-4">
                    What&apos;s Inside
                  </p>
                  <ul className="space-y-3">
                    {kitExtra.checklist.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="h-4 w-4 text-[#1B6B3A] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-dinkra-ink/80">
                          <span className="font-semibold text-dinkra-ink">{item.qty} {item.item}</span>
                          <span className="text-dinkra-ink/55"> — {item.detail}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                  {/* Info box */}
                  <div className="mt-4 bg-[#E8F5EC] rounded-xl px-4 py-3">
                    <p className="text-xs text-[#1B6B3A] leading-relaxed font-medium">{kitExtra.infoBox}</p>
                  </div>
                </div>
              )}

              {/* Quantity selector */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-dinkra-ink mb-3">
                  Quantity
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-9 h-9 rounded-lg border border-dinkra-ink/20 flex items-center justify-center hover:border-[#1B6B3A] hover:text-[#1B6B3A] transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-semibold text-dinkra-ink">{qty}</span>
                  <button
                    onClick={() => setQty(q => q + 1)}
                    className="w-9 h-9 rounded-lg border border-dinkra-ink/20 flex items-center justify-center hover:border-[#1B6B3A] hover:text-[#1B6B3A] transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Add to cart + Buy now */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={adding}
                  className="w-full py-4 rounded-full bg-[#1B6B3A] text-white font-bold text-base tracking-wide hover:bg-[#155730] transition-colors disabled:opacity-60"
                >
                  {adding ? 'Adding...' : 'Add to Cart'}
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={buyingNow}
                  className="w-full py-4 rounded-full bg-white text-[#1B6B3A] font-bold text-base tracking-wide border-2 border-[#1B6B3A] hover:bg-[#E8F5EC] transition-colors disabled:opacity-60"
                >
                  {buyingNow ? 'Redirecting...' : 'Buy Now'}
                </button>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 py-4 border-t border-[#1B6B3A]/15">
                {[
                  { icon: ShieldCheck, label: 'USAPA Approved' },
                  { icon: Truck,       label: 'Ships in 2–4 Days' },
                  { icon: Package,     label: '30-Day Returns' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5 text-xs text-dinkra-ink/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1B6B3A]" />
                    <Icon className="h-3.5 w-3.5 text-[#1B6B3A]" strokeWidth={2} />
                    <span className="font-medium uppercase tracking-wide">{label}</span>
                  </div>
                ))}
              </div>

              {/* Free shipping nudge */}
              {kitExtra?.nudge && (
                <p className="text-xs text-dinkra-ink/50 text-center -mt-2">{kitExtra.nudge}</p>
              )}

              {/* FAQ */}
              <div className="border-t border-[#1B6B3A]/15 pt-6">
                <p className="text-xs font-bold uppercase tracking-widest text-dinkra-ink mb-2">
                  Frequently Asked
                </p>
                {faqItems.map((item, i) => (
                  <FAQItem key={i} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          </div>

          {/* You might also like */}
          {kitExtra && kitExtra.otherKits.length > 0 && (
            <div className="mt-16 lg:mt-24 border-t border-[#1B6B3A]/15 pt-12">
              <h2 className="font-heading text-h2 text-dinkra-ink mb-8 text-center">
                YOU MIGHT ALSO LIKE
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg mx-auto">
                {kitExtra.otherKits.map((h) => (
                  <RelatedKitCard key={h} handle={h} thumbnail={relatedThumbnails[h]} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
