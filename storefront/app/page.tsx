'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import {
  Truck, RotateCcw, Gift, Zap,
  Star, CheckCircle2, ChevronDown, ChevronUp,
  ShieldCheck, Package, Tag
} from 'lucide-react'

const HERO_IMAGE = 'https://ahjviugsxpwzpkyzgrhi.supabase.co/storage/v1/object/public/product-user-files/609c5354-c20b-4473-8c5f-fe886e4a0ab5%2Fcompressed_dinkra-hero-v2-01KPE64Q0V2A9W7E7GFD1PEW3D.webp'
const LIFESTYLE_IMAGE = 'https://ahjviugsxpwzpkyzgrhi.supabase.co/storage/v1/object/public/product-user-files/609c5354-c20b-4473-8c5f-fe886e4a0ab5%2Fcompressed_dinkra-lifestyle-v2-01KPE64QQAPERFW8A3P153J7XK.webp'

/* ─── Paddle SVG (Midnight Ink colourway) ─────────────────────────── */
function PaddleSVG({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 380"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Handle */}
      <rect x="88" y="260" width="44" height="110" rx="10" fill="#181C27" />
      <rect x="96" y="268" width="28" height="94" rx="6" fill="#1B6B3A" opacity="0.25" />
      {/* Grip wrap lines */}
      {[280,295,310,325,340].map((y) => (
        <rect key={y} x="88" y={y} width="44" height="3" rx="1.5" fill="#E8B84B" opacity="0.6" />
      ))}
      {/* Neck */}
      <path d="M88 260 Q80 230 70 210 L150 210 Q140 230 132 260 Z" fill="#181C27" />
      {/* Face */}
      <ellipse cx="110" cy="140" rx="80" ry="110" fill="#181C27" />
      {/* Face highlight */}
      <ellipse cx="110" cy="140" rx="70" ry="100" fill="#1e2235" />
      {/* Gold slash accent */}
      <path d="M55 90 L165 185" stroke="#E8B84B" strokeWidth="6" strokeLinecap="round" opacity="0.85" />
      {/* DINKRA text on paddle */}
      <text
        x="110" y="148"
        textAnchor="middle"
        fill="#E8B84B"
        fontSize="18"
        fontFamily="sans-serif"
        fontWeight="bold"
        letterSpacing="3"
      >
        DINKRA
      </text>
      {/* Edge guard */}
      <ellipse cx="110" cy="140" rx="80" ry="110" stroke="#E8B84B" strokeWidth="3" fill="none" opacity="0.5" />
    </svg>
  )
}

/* ─── Star rating ─────────────────────────────────────────────────── */
function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-dinkra-gold text-dinkra-gold" />
      ))}
    </div>
  )
}

/* ─── Kit data ────────────────────────────────────────────────────── */
const KITS = [
  {
    handle: 'starter-kit',
    name: 'Starter Kit',
    tagline: 'Your first step on the court.',
    items: ['1 Paddle', '4 Outdoor Balls', 'Grip Tape', 'Drawstring Bag'],
    price: 44,
    compare: 59,
    badge: 'Best Seller',
    badgeColor: 'bg-dinkra-gold text-dinkra-ink',
    highlight: false,
    upsell: true,
  },
  {
    handle: 'rally-kit',
    name: 'Rally Kit',
    tagline: 'Everything for two players, ready to go.',
    items: ['2 Paddles', '6 Outdoor Balls', '2x Grip Tape', 'Zip Bag', 'Rules Card'],
    price: 79,
    compare: 99,
    badge: 'Most Popular',
    badgeColor: 'bg-dinkra-green text-white',
    highlight: true,
    upsell: false,
  },
  {
    handle: 'gift-kit',
    name: 'Gift Kit',
    tagline: 'The perfect gift for anyone active.',
    items: ['1 Paddle', '4 Outdoor Balls', 'Grip Tape', 'Gift Box', 'Ribbon & Card'],
    price: 94,
    compare: 119,
    badge: 'Gift Ready',
    badgeColor: 'bg-dinkra-gold text-dinkra-ink',
    highlight: false,
    upsell: false,
  },
]

/* ─── WHAT'S INSIDE items ─────────────────────────────────────────── */
const WHATS_INSIDE = [
  {
    icon: '🏓',
    title: '1× Fiberglass Composite Paddle',
    detail: 'USAPA-approved · PP honeycomb core · 7.5–8.2 oz',
  },
  {
    icon: '🟡',
    title: '4× Outdoor Pickleballs',
    detail: 'USAPA-approved · tournament-grade durability',
  },
  {
    icon: '🟢',
    title: '1× Replacement Grip Tape',
    detail: 'Cushioned, sweat-resistant, easy-wrap',
  },
  {
    icon: '🎒',
    title: '1× Dinkra Drawstring Bag',
    detail: 'Durable, lightweight, branded',
  },
  {
    icon: '📋',
    title: '1× Quick-Start Rules Card',
    detail: 'Learn the basics in minutes',
  },
]

/* ─── Reviews ─────────────────────────────────────────────────────── */
const REVIEWS = [
  {
    name: 'Sarah M.',
    text: '"Bought this as a gift for my dad who just retired. He\'s been playing 3x a week ever since. Everything he needed was already in the kit."',
  },
  {
    name: 'Jake R.',
    text: '"Perfect starter kit. I had no idea what to buy and this took all the guesswork out. Quality is way better than I expected for the price."',
  },
  {
    name: 'Linda K.',
    text: '"Ordered the Rally Kit for my husband and me. The bag is great, paddles feel solid. We were playing the same day it arrived."',
  },
]

/* ─── Why Dinkra ──────────────────────────────────────────────────── */
const WHY = [
  { icon: <CheckCircle2 className="h-8 w-8 text-dinkra-green" strokeWidth={1.5} />, title: 'Beginner-Approved Gear', body: 'Every item selected by players who started exactly where you are.' },
  { icon: <Zap className="h-8 w-8 text-dinkra-green" strokeWidth={1.5} />, title: 'Ships Fast, Plays Faster', body: 'Order today, court-ready in 2–4 business days, anywhere in the US.' },
  { icon: <Gift className="h-8 w-8 text-dinkra-green" strokeWidth={1.5} />, title: 'Gift-Ready Packaging', body: 'Every order ships in packaging you\'re proud to give — no gift wrap needed.' },
  { icon: <Package className="h-8 w-8 text-dinkra-green" strokeWidth={1.5} />, title: 'No Guesswork, Just Play', body: 'One kit = everything. No separate orders, no missing pieces.' },
]

/* ═══════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) setSubmitted(true)
  }

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[640px] max-h-[1080px] overflow-hidden flex items-center">
        {/* Full-bleed background image */}
        <Image
          src={HERO_IMAGE}
          alt="Dinkra Pickleball starter kit — paddle, balls, bag"
          fill
          className="object-cover object-center"
          priority
          quality={100}
          sizes="100vw"
        />

        {/* Dark gradient overlay — left side heavy, right fades out */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, rgba(14,16,24,0.82) 0%, rgba(14,16,24,0.60) 40%, rgba(14,16,24,0.25) 70%, rgba(14,16,24,0.10) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Bottom vignette so trust bar bleeds in cleanly */}
        <div
          className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(14,16,24,0.35))' }}
          aria-hidden="true"
        />

        {/* Gold diagonal slash accents */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute left-[38%] top-[-10%] h-[140%] w-[3px] bg-dinkra-gold opacity-25 rotate-[18deg] origin-top" />
          <div className="absolute left-[42%] top-[-10%] h-[140%] w-[1.5px] bg-dinkra-gold opacity-12 rotate-[18deg] origin-top" />
        </div>

        {/* Content */}
        <div className="container-custom relative z-10 py-24">
          <div className="max-w-2xl space-y-6 animate-fade-in-up">
            <p className="text-xs font-semibold tracking-[0.35em] uppercase text-dinkra-gold">
              Dinkra Pickleball
            </p>
            <h1 className="font-heading text-[clamp(3.5rem,9vw,7rem)] text-white leading-[0.92] tracking-tight">
              EVERYTHING<br />
              YOU NEED<br />
              <span className="text-dinkra-gold">TO START</span><br />
              PLAYING.
            </h1>
            <p className="text-base sm:text-lg text-white/75 max-w-md leading-relaxed font-body">
              One kit. Court-ready gear. Ships in 2–4 days.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-dinkra-green text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wide hover:bg-dinkra-green/90 transition-colors shadow-lg shadow-dinkra-green/30"
              >
                Shop Starter Kits
              </Link>
              <a
                href="#whats-inside"
                className="inline-flex items-center gap-2 border-2 border-white/60 text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wide hover:border-white hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                See What&#39;s Inside
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ─────────────────────────────────────────────── */}
      <section className="bg-white border-y border-dinkra-sand py-6">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Truck className="h-5 w-5 text-dinkra-green" strokeWidth={2} />, label: 'Free US Shipping', sub: 'Over $65' },
              { icon: <RotateCcw className="h-5 w-5 text-dinkra-green" strokeWidth={2} />, label: '30-Day Returns', sub: 'No questions asked' },
              { icon: <Zap className="h-5 w-5 text-dinkra-green" strokeWidth={2} />, label: 'Ships in 2–4 Days', sub: 'Fast & reliable' },
              { icon: <Gift className="h-5 w-5 text-dinkra-green" strokeWidth={2} />, label: 'Gift-Ready Packaging', sub: 'On every order' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 justify-center text-center lg:text-left lg:justify-start">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-dinkra-green/10 flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-dinkra-ink">{item.label}</p>
                  <p className="text-xs text-dinkra-ink/50">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3-KIT PRODUCT GRID ────────────────────────────────────── */}
      <section id="kits" className="py-16 lg:py-24 bg-dinkra-offwhite">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-dinkra-green mb-2">Choose Your Kit</p>
            <h2 className="font-heading text-h1 text-dinkra-ink">GET ON THE COURT.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {KITS.map((kit) => (
              <div
                key={kit.handle}
                className={`relative bg-white rounded-2xl flex flex-col overflow-hidden transition-shadow hover:shadow-xl ${
                  kit.highlight
                    ? 'border-2 border-dinkra-green shadow-lg'
                    : 'border border-dinkra-sand'
                }`}
              >
                {/* Most popular badge */}
                {kit.highlight && (
                  <div className="absolute top-0 inset-x-0 bg-dinkra-green text-white text-xs font-bold uppercase tracking-widest text-center py-2">
                    ⭐ Most Popular
                  </div>
                )}

                <div className={`p-6 flex flex-col flex-1 ${kit.highlight ? 'pt-12' : ''}`}>
                  {/* Paddle icon + badge */}
                  <div className="flex items-start justify-between mb-4">
                    <PaddleSVG className="w-20 h-28 opacity-90" />
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${kit.badgeColor}`}>
                      {kit.badge}
                    </span>
                  </div>

                  {/* Name & description */}
                  <h3 className="font-heading text-2xl text-dinkra-ink">{kit.name}</h3>
                  <p className="text-sm text-dinkra-ink/60 mt-1 mb-4">{kit.tagline}</p>

                  {/* Included pills */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {kit.items.map((item) => (
                      <span
                        key={item}
                        className="text-[10px] font-semibold uppercase tracking-wide bg-dinkra-green/10 text-dinkra-green px-2 py-0.5 rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-5 mt-auto">
                    <span className="font-heading text-3xl text-dinkra-ink">${kit.price}</span>
                    <span className="text-sm text-dinkra-ink/40 line-through">${kit.compare}</span>
                    <span className="text-xs font-bold text-dinkra-green bg-dinkra-green/10 px-2 py-0.5 rounded-full">
                      Save ${kit.compare - kit.price}
                    </span>
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/products/${kit.handle}`}
                    className={`block w-full text-center py-3.5 rounded-full text-sm font-bold uppercase tracking-wide transition-colors ${
                      kit.highlight
                        ? 'bg-dinkra-green text-white hover:bg-dinkra-green/90'
                        : 'border-2 border-dinkra-green text-dinkra-green hover:bg-dinkra-green hover:text-white'
                    }`}
                  >
                    Add to Cart — ${kit.price}
                  </Link>

                  {/* Upsell nudge on starter */}
                  {kit.upsell && (
                    <p className="text-[11px] text-center text-dinkra-ink/50 mt-3 leading-snug">
                      💡 Add the Rally Kit and ship free
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INSIDE ─────────────────────────────────────────── */}
      <section id="whats-inside" className="py-16 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Paddle illustration */}
            <div className="flex justify-center">
              <div className="relative w-64 sm:w-80">
                <div className="absolute inset-0 bg-dinkra-green/8 rounded-full blur-3xl scale-110" />
                <PaddleSVG className="relative w-full drop-shadow-2xl" />
              </div>
            </div>

            {/* Content */}
            <div>
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-dinkra-green mb-3">Starter Kit</p>
              <h2 className="font-heading text-h1 text-dinkra-ink mb-8">WHAT&#39;S INSIDE.</h2>
              <ul className="space-y-5">
                {WHATS_INSIDE.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
                    <div>
                      <p className="font-semibold text-dinkra-ink text-sm">{item.title}</p>
                      <p className="text-xs text-dinkra-ink/55 mt-0.5">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link
                href="/products/starter-kit"
                className="mt-8 inline-flex items-center gap-2 bg-dinkra-green text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wide hover:bg-dinkra-green/90 transition-colors"
              >
                Get the Starter Kit — $44
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SCROLLING MARQUEE ─────────────────────────────────────── */}
      <section className="bg-dinkra-green py-4 overflow-hidden select-none">
        <div className="marquee-track">
          {[1, 2].map((rep) => (
            <span key={rep} className="flex items-center gap-6 pr-6 whitespace-nowrap">
              {[
                'USAPA APPROVED',
                'BEGINNER READY',
                'SHIPS FAST',
                'GIFT-READY PACKAGING',
                'DINKRA PICKLEBALL',
                'GET ON THE COURT',
              ].map((msg) => (
                <span key={msg} className="flex items-center gap-6">
                  <span className="text-white font-body font-bold text-xs tracking-[0.25em] uppercase">{msg}</span>
                  <span className="text-dinkra-gold text-lg">·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </section>

      {/* ── LIFESTYLE STRIP ───────────────────────────────────────── */}
      <section className="relative h-[420px] sm:h-[520px] lg:h-[600px] overflow-hidden">
        <Image
          src={LIFESTYLE_IMAGE}
          alt="Friends playing pickleball together on an outdoor court"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark green overlay with centered call-out */}
        <div className="absolute inset-0 bg-gradient-to-r from-dinkra-ink/70 via-dinkra-ink/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom">
            <div className="max-w-lg space-y-4">
              <p className="text-dinkra-gold text-xs font-bold uppercase tracking-[0.3em]">Join Thousands of Players</p>
              <h2 className="font-heading text-display text-white leading-none">
                GET ON<br />THE COURT.
              </h2>
              <p className="text-white/80 text-base leading-relaxed">
                Today. Not someday. Everything you need ships in 2–4 days.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-dinkra-gold text-dinkra-ink px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wide hover:opacity-90 transition-opacity"
              >
                Shop All Kits
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ───────────────────────────────────────────────── */}
      <section id="reviews" className="py-16 lg:py-24 bg-dinkra-sand">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-dinkra-green mb-2">Real Customers</p>
            <h2 className="font-heading text-h1 text-dinkra-ink">THEY&#39;RE PLAYING.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((review, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 shadow-sm flex flex-col gap-4">
                <Stars />
                <p className="text-sm text-dinkra-ink/75 leading-relaxed italic">{review.text}</p>
                <p className="text-xs font-bold uppercase tracking-widest text-dinkra-green">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY DINKRA ────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-dinkra-green mb-2">Why Us</p>
            <h2 className="font-heading text-h1 text-dinkra-ink">WHY DINKRA.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {WHY.map((item, i) => (
              <div key={i} className="text-center space-y-3 p-6 rounded-2xl hover:bg-dinkra-sand/40 transition-colors">
                <div className="flex justify-center">{item.icon}</div>
                <h3 className="font-heading text-xl text-dinkra-ink">{item.title}</h3>
                <p className="text-sm text-dinkra-ink/60 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOMO / URGENCY ────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-dinkra-green">
        <div className="container-custom max-w-2xl text-center">
          <p className="text-dinkra-gold text-xs font-bold uppercase tracking-[0.3em] mb-3">Limited Stock</p>
          <h2 className="font-heading text-display text-white mb-4 leading-none">
            THE RALLY KIT<br />IS FLYING.
          </h2>
          <p className="text-white/75 text-sm leading-relaxed mb-8 max-w-md mx-auto">
            It&#39;s our most popular order. Grab yours before the next restock delay.
          </p>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-white/60 font-medium">Claimed this week</span>
              <span className="text-xs font-bold text-dinkra-gold">74%</span>
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full gold-progress"
                style={{ width: '74%' }}
              />
            </div>
          </div>

          <Link
            href="/products/rally-kit"
            className="inline-flex items-center gap-2 bg-dinkra-gold text-dinkra-ink px-10 py-4 rounded-full text-sm font-bold uppercase tracking-wide hover:opacity-90 transition-opacity"
          >
            Get the Rally Kit — $79
          </Link>
        </div>
      </section>

      {/* ── EMAIL CAPTURE ─────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-dinkra-sand">
        <div className="container-custom max-w-xl text-center">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-dinkra-green mb-3">Email List</p>
          <h2 className="font-heading text-display text-dinkra-ink mb-3 leading-none">JOIN THE RALLY.</h2>
          <p className="text-dinkra-ink/60 text-sm mb-8">
            Get 10% off your first order.
          </p>

          {submitted ? (
            <div className="inline-flex items-center gap-2 text-dinkra-green font-semibold">
              <CheckCircle2 className="h-5 w-5" />
              You&#39;re in! Check your inbox for your discount.
            </div>
          ) : (
            <form onSubmit={handleEmailSubmit} className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 bg-white border border-dinkra-sand rounded-full px-5 py-3.5 text-sm text-dinkra-ink placeholder:text-dinkra-ink/40 focus:outline-none focus:ring-2 focus:ring-dinkra-green transition"
              />
              <button
                type="submit"
                className="bg-dinkra-green text-white px-6 py-3.5 rounded-full text-sm font-bold uppercase tracking-wide hover:bg-dinkra-green/90 transition-colors whitespace-nowrap"
              >
                Get 10% Off
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
