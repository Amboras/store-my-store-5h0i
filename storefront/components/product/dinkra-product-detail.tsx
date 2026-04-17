'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Star, CheckCircle2, Truck, ShieldCheck,
  ChevronDown, ChevronUp, ChevronRight, Gift
} from 'lucide-react'
import { type VariantExtension } from '@/components/product/product-price'
import ProductActions from '@/components/product/product-actions'
import { ProductViewTracker } from '@/components/product/product-view-tracker'

/* ─── Colorways ─────────────────────────────────────────────────── */
const COLORWAYS = [
  { id: 'midnight-ink', label: 'Midnight Ink', bg: '#181C27', accent: '#E8B84B' },
  { id: 'ghost-white',  label: 'Ghost White',  bg: '#FAFAF8', accent: '#1B6B3A' },
  { id: 'clay-court',   label: 'Clay Court',   bg: '#EDD9BE', accent: '#1B6B3A' },
]

/* ─── Paddle SVG ────────────────────────────────────────────────── */
function PaddleSVG({ bg = '#181C27', accent = '#E8B84B', className = '' }: {
  bg?: string; accent?: string; className?: string
}) {
  return (
    <svg
      viewBox="0 0 220 380"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="88" y="260" width="44" height="110" rx="10" fill={bg} />
      <rect x="96" y="268" width="28" height="94" rx="6" fill={accent} opacity="0.18" />
      {[280, 295, 310, 325, 340].map((y) => (
        <rect key={y} x="88" y={y} width="44" height="3" rx="1.5" fill={accent} opacity="0.55" />
      ))}
      <path d="M88 260 Q80 230 70 210 L150 210 Q140 230 132 260 Z" fill={bg} />
      <ellipse cx="110" cy="140" rx="80" ry="110" fill={bg} />
      <ellipse cx="110" cy="140" rx="70" ry="100" fill={bg} opacity="0.85" />
      <path d="M55 90 L165 185" stroke={accent} strokeWidth="6" strokeLinecap="round" opacity="0.85" />
      <text
        x="110" y="148"
        textAnchor="middle"
        fill={accent}
        fontSize="18"
        fontFamily="sans-serif"
        fontWeight="bold"
        letterSpacing="3"
      >
        DINKRA
      </text>
      <ellipse cx="110" cy="140" rx="80" ry="110" stroke={accent} strokeWidth="3" fill="none" opacity="0.45" />
    </svg>
  )
}

/* ─── FAQ data ──────────────────────────────────────────────────── */
const FAQ_ITEMS = [
  {
    q: 'What skill level is this for?',
    a: 'All of our kits are designed for complete beginners. No experience needed — the quick-start rules card walks you through everything in minutes.',
  },
  {
    q: 'How fast does it ship?',
    a: 'We ship within 1 business day. Most US customers receive their kit in 2–4 business days. Free shipping on orders over $65.',
  },
  {
    q: 'Can I return it?',
    a: "Yes! We offer a 30-day hassle-free return policy. If you're not happy for any reason, just reach out to support@dinkrapickleball.com.",
  },
  {
    q: 'Is the equipment USAPA approved?',
    a: 'Yes. Our paddles and balls are USAPA-approved, meaning they meet official pickleball tournament standards.',
  },
  {
    q: 'Is this a good gift?',
    a: 'Absolutely. Every Dinkra order ships in clean, gift-ready packaging. The Gift Kit includes a premium gift box — no extra wrapping needed.',
  },
]

/* ─── FAQ accordion item ─────────────────────────────────────────── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-dinkra-sand last:border-0">
      <button
        className="w-full flex items-center justify-between py-4 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm font-semibold text-dinkra-ink pr-4">{q}</span>
        {open
          ? <ChevronUp className="h-4 w-4 text-dinkra-green flex-shrink-0" />
          : <ChevronDown className="h-4 w-4 text-dinkra-green flex-shrink-0" />
        }
      </button>
      {open && <p className="pb-4 text-sm text-dinkra-ink/65 leading-relaxed">{a}</p>}
    </div>
  )
}

/* ─── Related kit card ──────────────────────────────────────────── */
const KIT_META: Record<string, { name: string; price: number; tagline: string }> = {
  'starter-kit': { name: 'Starter Kit', price: 44, tagline: 'Your first step on the court.' },
  'rally-kit':   { name: 'Rally Kit',   price: 79, tagline: 'Everything for two players.' },
  'gift-kit':    { name: 'Gift Kit',    price: 94, tagline: 'The perfect gift.' },
}

function RelatedKitCard({ handle }: { handle: string }) {
  const meta = KIT_META[handle]
  if (!meta) return null
  const cw = COLORWAYS[0]
  return (
    <Link
      href={`/products/${handle}`}
      className="group bg-dinkra-offwhite rounded-2xl p-5 border border-dinkra-sand hover:border-dinkra-green hover:shadow-md transition-all flex flex-col items-center text-center gap-3"
    >
      <PaddleSVG bg={cw.bg} accent={cw.accent} className="w-16 h-24 group-hover:scale-105 transition-transform" />
      <div>
        <p className="font-heading text-xl text-dinkra-ink">{meta.name}</p>
        <p className="text-xs text-dinkra-ink/55 mt-0.5">{meta.tagline}</p>
      </div>
      <span className="text-dinkra-green font-bold text-sm">${meta.price}</span>
    </Link>
  )
}

/* ─── Types ─────────────────────────────────────────────────────── */
interface KitExtra {
  badge: string
  badgeColor: string
  tagline: string
  saveAmount: number
  comparePrice: number
  checklist: string[]
  otherKits: string[]
}

interface Props {
  product: any
  variantExtensions: Record<string, VariantExtension>
  handle: string
  kitExtra: KitExtra | undefined
}

/* ─── Main component ─────────────────────────────────────────────── */
export default function DinkraProductDetail({ product, variantExtensions, handle: _handle, kitExtra }: Props) {
  const [colorwayIdx, setColorwayIdx] = useState(0)
  const cw = COLORWAYS[colorwayIdx]

  const price = kitExtra ? (kitExtra.comparePrice - kitExtra.saveAmount) : null
  const compare = kitExtra?.comparePrice

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-dinkra-sand bg-white">
        <div className="container-custom py-3">
          <nav className="flex items-center gap-2 text-xs text-dinkra-ink/50">
            <Link href="/" className="hover:text-dinkra-green transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/products" className="hover:text-dinkra-green transition-colors">Shop</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-dinkra-ink">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="container-custom py-10 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

          {/* ── Image / paddle area ─────────────────────────── */}
          <div className="space-y-4">
            {/* Main paddle display */}
            <div className="relative aspect-square rounded-2xl bg-dinkra-sand overflow-hidden flex items-center justify-center">
              {kitExtra && (
                <span className={`absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full z-10 ${kitExtra.badgeColor}`}>
                  {kitExtra.badge}
                </span>
              )}
              <PaddleSVG
                bg={cw.bg}
                accent={cw.accent}
                className="w-64 sm:w-80 drop-shadow-2xl"
              />
            </div>

            {/* Colorway thumbnails */}
            <div className="grid grid-cols-3 gap-3">
              {COLORWAYS.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => setColorwayIdx(i)}
                  className={`relative aspect-square rounded-xl flex items-center justify-center border-2 transition-all overflow-hidden ${
                    i === colorwayIdx
                      ? 'border-dinkra-green shadow-md scale-105'
                      : 'border-dinkra-sand hover:border-dinkra-green/50'
                  }`}
                  style={{ background: c.id === 'ghost-white' ? '#f5f5f3' : c.id === 'clay-court' ? '#f2e4d0' : '#1e2235' }}
                  aria-label={c.label}
                  title={c.label}
                >
                  <PaddleSVG bg={c.bg} accent={c.accent} className="w-12 h-16" />
                </button>
              ))}
            </div>

            {/* Colorway labels */}
            <div className="grid grid-cols-3 gap-3 text-center">
              {COLORWAYS.map((c, i) => (
                <p
                  key={c.id}
                  className={`text-[10px] font-semibold uppercase tracking-widest transition-colors ${
                    i === colorwayIdx ? 'text-dinkra-green' : 'text-dinkra-ink/40'
                  }`}
                >
                  {c.label}
                </p>
              ))}
            </div>
          </div>

          {/* ── Product info ─────────────────────────────────── */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
            <ProductViewTracker
              productId={product.id}
              productTitle={product.title}
              variantId={product.variants?.[0]?.id || null}
              currency={product.variants?.[0]?.calculated_price?.currency_code || 'usd'}
              value={product.variants?.[0]?.calculated_price?.calculated_amount ?? null}
            />

            {/* Title + rating */}
            <div>
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-dinkra-green mb-1">
                Dinkra Pickleball
              </p>
              <h1 className="font-heading text-h1 text-dinkra-ink leading-tight">{product.title}</h1>
              {kitExtra && (
                <p className="text-sm text-dinkra-ink/60 mt-1">{kitExtra.tagline}</p>
              )}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-dinkra-gold text-dinkra-gold" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-dinkra-ink/60">4.9 · 120+ reviews</span>
              </div>
            </div>

            {/* Price */}
            {price !== null && compare !== undefined && (
              <div className="flex items-baseline gap-3">
                <span className="font-heading text-4xl text-dinkra-ink">${price}</span>
                <span className="text-lg text-dinkra-ink/40 line-through">${compare}</span>
                <span className="text-xs font-bold bg-dinkra-green/10 text-dinkra-green px-2.5 py-1 rounded-full">
                  Save ${kitExtra!.saveAmount}
                </span>
              </div>
            )}

            {/* Colorway selector */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-dinkra-ink mb-2">
                Colorway:{' '}
                <span className="text-dinkra-green">{cw.label}</span>
              </p>
              <div className="flex gap-2">
                {COLORWAYS.map((c, i) => (
                  <button
                    key={c.id}
                    onClick={() => setColorwayIdx(i)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      i === colorwayIdx ? 'border-dinkra-green scale-110' : 'border-dinkra-sand hover:border-dinkra-green/50'
                    }`}
                    style={{ background: c.bg }}
                    aria-label={c.label}
                    title={c.label}
                  />
                ))}
              </div>
            </div>

            {/* Add to cart */}
            <div>
              <ProductActions product={product} variantExtensions={variantExtensions} />
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap items-center gap-4 py-4 border-t border-dinkra-sand">
              <div className="flex items-center gap-2 text-xs text-dinkra-ink/60">
                <ShieldCheck className="h-4 w-4 text-dinkra-green" strokeWidth={2} />
                30-day guarantee
              </div>
              <div className="flex items-center gap-2 text-xs text-dinkra-ink/60">
                <Truck className="h-4 w-4 text-dinkra-green" strokeWidth={2} />
                Free shipping over $65
              </div>
              <div className="flex items-center gap-2 text-xs text-dinkra-ink/60">
                <Gift className="h-4 w-4 text-dinkra-green" strokeWidth={2} />
                Gift-ready packaging
              </div>
            </div>

            {/* What&apos;s inside checklist */}
            {kitExtra && (
              <div className="bg-dinkra-offwhite rounded-2xl p-5 border border-dinkra-sand">
                <p className="text-xs font-bold uppercase tracking-widest text-dinkra-green mb-4">
                  What&apos;s Inside
                </p>
                <ul className="space-y-2.5">
                  {kitExtra.checklist.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-dinkra-green flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-dinkra-ink/75">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* FAQ */}
            <div className="border-t border-dinkra-sand pt-6">
              <p className="text-xs font-bold uppercase tracking-widest text-dinkra-ink mb-4">
                Frequently Asked
              </p>
              {FAQ_ITEMS.map((item, i) => (
                <FAQItem key={i} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </div>

        {/* You might also like */}
        {kitExtra && kitExtra.otherKits.length > 0 && (
          <div className="mt-16 lg:mt-24 border-t border-dinkra-sand pt-12">
            <h2 className="font-heading text-h2 text-dinkra-ink mb-8 text-center">
              YOU MIGHT ALSO LIKE
            </h2>
            <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
              {kitExtra.otherKits.map((h) => (
                <RelatedKitCard key={h} handle={h} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
