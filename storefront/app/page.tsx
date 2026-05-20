'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight, Sparkles, Star, Zap, ShieldCheck, Download,
  RefreshCw, Briefcase, MessageSquare, Users, TrendingUp,
  FileText, Compass, CheckCircle2, Clock,
} from 'lucide-react'
import { useCollections } from '@/hooks/use-collections'
import { useProducts } from '@/hooks/use-products'
import ProductGrid from '@/components/product/product-grid'
import CollectionSection from '@/components/marketing/collection-section'

const HERO_IMAGE =
  'https://ahjviugsxpwzpkyzgrhi.supabase.co/storage/v1/object/public/product-user-files/609c5354-c20b-4473-8c5f-fe886e4a0ab5%2Fai-banner-1779152378599-0-01KRYVXPV0RGERYTCPZP2C6MVK.webp'
const STORY_IMAGE =
  'https://ahjviugsxpwzpkyzgrhi.supabase.co/storage/v1/object/public/product-user-files/609c5354-c20b-4473-8c5f-fe886e4a0ab5%2Fai-lifestyle-1779152328269-0-01KRYVW5PS7S8R2368B8F6RAYV.webp'

const PACK_CATEGORIES = [
  { icon: Briefcase,     title: 'Job Search',         blurb: 'Find roles that fit, faster.',     count: '40+ prompts' },
  { icon: MessageSquare, title: 'Interview Prep',     blurb: 'Walk in calm. Walk out hired.',    count: '35+ prompts' },
  { icon: Users,         title: 'LinkedIn Profile',   blurb: 'Get noticed by recruiters daily.', count: '28+ prompts' },
  { icon: TrendingUp,    title: 'Salary Negotiation', blurb: 'Add five figures to your offer.',  count: '22+ prompts' },
  { icon: FileText,      title: 'Resume & Cover Letter', blurb: 'Pass every ATS. Read like a human.', count: '45+ prompts' },
  { icon: Compass,       title: 'Career Change',      blurb: 'Pivot without starting over.',     count: '30+ prompts' },
]

const TESTIMONIALS = [
  {
    quote: 'Three weeks after using the Interview Prep pack I had two offers. The negotiation prompts got me a $22K bump.',
    name: 'Sarah K.',
    role: 'Senior PM · ex-Stripe',
  },
  {
    quote: 'The LinkedIn pack made my profile actually convert. Recruiter messages went from zero to five a week.',
    name: 'Marcus T.',
    role: 'Software Engineer',
  },
  {
    quote: 'I was stuck for months. The Career Change pack helped me reframe my background and land a director role in a new industry.',
    name: 'Priya R.',
    role: 'Director of Ops',
  },
]

const FAQS = [
  {
    q: 'What exactly is in a prompt pack?',
    a: 'Each pack contains dozens of expert-engineered prompts you copy and paste into ChatGPT, Claude, or Gemini. Plus templates, examples, and a quick-start guide.',
  },
  {
    q: 'Which AI tools do these work with?',
    a: 'Every prompt is tested with ChatGPT, Claude, and Gemini. They work in both free and paid tiers — no API keys required.',
  },
  {
    q: 'What if I&apos;m not technical?',
    a: 'That&apos;s exactly who these are for. No coding, no setup. Open the pack, copy a prompt, paste it in. That&apos;s it.',
  },
  {
    q: 'Do you offer refunds?',
    a: 'Yes — 30 days, no questions asked. If a pack doesn&apos;t move the needle for you, we refund every cent.',
  },
]

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
        <div className="relative min-h-[88vh] lg:min-h-[92vh] w-full overflow-hidden">
          <Image
            src={HERO_IMAGE}
            alt="A focused professional working on a laptop with AI tools in a warm modern workspace"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Legibility wash from left */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-cream via-brand-cream/85 to-brand-cream/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-cream/40 via-transparent to-transparent" />

          <div className="absolute inset-0 flex items-center">
            <div className="container-custom py-12">
              <div className="max-w-2xl animate-fade-in-up">
                <div className="inline-flex items-center gap-2 rounded-pill bg-white/85 backdrop-blur px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-navy ring-1 ring-brand-navy/8">
                  <Sparkles className="h-3.5 w-3.5 text-brand-coral" strokeWidth={2.5} />
                  Trusted by 12,000+ professionals
                </div>

                <h1 className="mt-6 font-heading font-bold tracking-tight text-brand-navy text-[clamp(2.5rem,6.5vw,5.25rem)] leading-[0.98]">
                  Unlock your next{' '}
                  <span className="text-brand-coral">career move</span>{' '}
                  with AI.
                </h1>
                <p className="mt-6 text-lg sm:text-xl text-brand-navy/75 max-w-xl leading-relaxed">
                  Expert-engineered prompt packs for job search, interviews, LinkedIn, and salary
                  negotiation. Copy. Paste. Win the next round.
                </p>

                <div className="mt-9 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/products"
                    className="group inline-flex items-center justify-center gap-2 rounded-pill bg-brand-coral hover:bg-brand-coral-dark px-7 py-4 text-sm font-semibold text-white transition-colors shadow-lg shadow-brand-coral/20"
                  >
                    Browse the prompt packs
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center gap-2 rounded-pill bg-white/85 backdrop-blur hover:bg-white px-7 py-4 text-sm font-semibold text-brand-navy ring-1 ring-brand-navy/12 transition-colors"
                  >
                    See how it works
                  </Link>
                </div>

                {/* Mini social proof */}
                <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-brand-navy/70">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-brand-coral text-brand-coral" strokeWidth={0} />
                      ))}
                    </div>
                    <span className="font-semibold text-brand-navy">4.9 / 5</span>
                    <span>from 2,400+ professionals</span>
                  </div>
                  <span className="hidden sm:inline text-brand-navy/30">·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand-coral" strokeWidth={2.5} />
                    30-day money-back guarantee
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
              { icon: Download,    title: 'Instant access',     sub: 'Download in 30 seconds' },
              { icon: RefreshCw,   title: 'Lifetime updates',   sub: 'New prompts added monthly' },
              { icon: Zap,         title: 'Works with any AI',  sub: 'ChatGPT, Claude, Gemini' },
              { icon: ShieldCheck, title: '30-day guarantee',   sub: 'Refund, no questions' },
            ].map((row) => {
              const Icon = row.icon
              return (
                <li key={row.title} className="flex flex-col items-center text-center px-4 py-7 lg:py-9">
                  <Icon className="h-5 w-5 text-brand-coral" strokeWidth={2} />
                  <p className="mt-3 text-sm font-semibold text-brand-navy">{row.title}</p>
                  <p className="mt-1 text-xs text-brand-navy/55">{row.sub}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* ─────────────── PACK CATEGORIES ─────────────── */}
      <section className="py-20 lg:py-24">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-coral mb-3">
                Built for every step of your career
              </p>
              <h2 className="font-heading font-bold tracking-tight text-brand-navy text-[clamp(2rem,4vw,3rem)] leading-[1.05]">
                A pack for whatever you&apos;re facing next.
              </h2>
            </div>
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-coral transition-colors"
            >
              Browse all packs
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {PACK_CATEGORIES.map((cat, i: number) => {
              const Icon = cat.icon
              return (
                <Link
                  key={cat.title}
                  href="/products"
                  className="group relative overflow-hidden rounded-soft border border-border bg-background hover:border-brand-coral/40 hover:shadow-lg hover:shadow-brand-navy/5 transition-all p-7"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 inline-flex items-center justify-center h-12 w-12 rounded-xl bg-brand-coral/10 group-hover:bg-brand-coral transition-colors">
                      <Icon className="h-5 w-5 text-brand-coral group-hover:text-white transition-colors" strokeWidth={2} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-navy/40">
                        0{i + 1}
                      </p>
                      <h3 className="mt-1 font-heading text-xl font-bold text-brand-navy">
                        {cat.title}
                      </h3>
                      <p className="mt-2 text-sm text-brand-navy/65 leading-relaxed">
                        {cat.blurb}
                      </p>
                      <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-coral">
                        {cat.count}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="absolute top-7 right-7 h-4 w-4 text-brand-navy/30 group-hover:text-brand-coral group-hover:translate-x-1 transition-all" strokeWidth={2.5} />
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─────────────── FEATURED PACKS (dynamic) ─────────────── */}
      {hasProducts && (
        <section className="py-20 lg:py-24 bg-cream-deep/40">
          <div className="container-custom">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-coral mb-3">
                  Best sellers
                </p>
                <h2 className="font-heading font-bold tracking-tight text-brand-navy text-[clamp(1.85rem,3.5vw,2.5rem)]">
                  Packs people swear by.
                </h2>
              </div>
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-coral transition-colors"
              >
                Shop all packs
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
              </Link>
            </div>
            <ProductGrid limit={8} />
          </div>
        </section>
      )}

      {/* ─────────────── HOW IT WORKS ─────────────── */}
      <section className="py-20 lg:py-24 bg-cream">
        <div className="container-custom">
          <div className="max-w-2xl mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-coral mb-3">
              How it works
            </p>
            <h2 className="font-heading font-bold tracking-tight text-brand-navy text-[clamp(2rem,4vw,3rem)] leading-[1.05]">
              Land more interviews in three simple steps.
            </h2>
            <p className="mt-5 text-base lg:text-lg text-brand-navy/70 leading-relaxed">
              No fluff, no setup, no AI experience needed. Just proven prompts that
              do the heavy lifting on your résumé, cover letter, and interview prep.
            </p>
          </div>

          <ol className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                step: '01',
                title: 'Download your prompts',
                body: 'Grab the curated prompt collection the moment you check out. Instant access, organized by résumé, cover letter, and interview answers.',
              },
              {
                step: '02',
                title: 'Paste into ChatGPT',
                body: 'Pick a prompt, drop in your role and background, and let AI write a standout résumé, tailored cover letter, or sharp interview answers in minutes.',
              },
              {
                step: '03',
                title: 'Apply and get noticed',
                body: 'Send applications that beat the ATS, sound like the best version of you, and pull more recruiter replies than you&apos;ve had in months.',
              },
            ].map((s) => (
              <li key={s.step} className="relative">
                <p className="font-heading text-6xl lg:text-7xl font-bold text-brand-coral/20 leading-none">
                  {s.step}
                </p>
                <h3 className="mt-4 font-heading text-2xl font-bold text-brand-navy">
                  {s.title}
                </h3>
                <p
                  className="mt-3 text-base text-brand-navy/70 leading-relaxed max-w-sm"
                  dangerouslySetInnerHTML={{ __html: s.body }}
                />
              </li>
            ))}
          </ol>

          <div className="mt-12">
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 rounded-pill bg-brand-navy hover:bg-brand-navy-dark px-7 py-4 text-sm font-semibold text-white transition-colors"
            >
              Get the prompts
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────── BRAND STORY ─────────────── */}
      <section className="py-20 lg:py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative aspect-[4/5] overflow-hidden rounded-soft order-2 lg:order-1">
              <Image
                src={STORY_IMAGE}
                alt="A modern professional's workspace with a laptop, notebook, and warm natural lighting"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2 max-w-lg">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-coral mb-4">
                Why we built this
              </p>
              <h2 className="font-heading font-bold tracking-tight text-brand-navy text-[clamp(2rem,4vw,3rem)] leading-[1.05]">
                AI is the new edge. Most people are still guessing.
              </h2>
              <div className="mt-6 space-y-5 text-base lg:text-lg text-brand-navy/75 leading-relaxed">
                <p>
                  We spent years inside recruiting and hiring at fast-moving companies. Then we
                  watched AI quietly reshape how the best candidates prep — and how the worst ones got
                  filtered out.
                </p>
                <p>
                  CareerUnlocked is the playbook we wish we&apos;d had. Real prompts, tested on real
                  job hunts, that turn a blank ChatGPT window into a serious career weapon.
                </p>
              </div>
              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy link-underline pb-0.5"
              >
                Read the full story
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── COLLECTION SECTIONS (if any) ─────────────── */}
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
              Real results, real people
            </p>
            <h2 className="font-heading font-bold tracking-tight text-[clamp(2rem,4vw,3rem)] leading-[1.05]">
              The packs that paid for themselves.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="rounded-soft bg-white/[0.04] ring-1 ring-white/10 p-7">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-brand-coral text-brand-coral" strokeWidth={0} />
                  ))}
                </div>
                <blockquote className="font-heading text-lg leading-snug text-white">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 text-sm">
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-white/50 text-xs mt-0.5">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Stats strip */}
          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-white/10">
            {[
              { stat: '12,000+', label: 'Packs sold' },
              { stat: '4.9 / 5', label: 'Average rating' },
              { stat: '$22K',    label: 'Avg. salary increase' },
              { stat: '30 days', label: 'Money-back promise' },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-heading text-4xl lg:text-5xl font-bold text-white">{s.stat}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/55">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── FAQ TEASER ─────────────── */}
      <section className="py-20 lg:py-24">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-coral mb-3">
              Common questions
            </p>
            <h2 className="font-heading font-bold tracking-tight text-brand-navy text-[clamp(2rem,4vw,3rem)] leading-[1.05]">
              Everything you want to know.
            </h2>
          </div>

          <dl className="space-y-3">
            {FAQS.map((f) => (
              <details key={f.q} className="group rounded-soft border border-border bg-background overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer px-6 py-5 list-none">
                  <dt className="text-base font-semibold text-brand-navy">{f.q}</dt>
                  <span className="ml-3 flex-shrink-0 inline-flex items-center justify-center h-7 w-7 rounded-full bg-cream-deep group-open:bg-brand-coral group-open:text-white transition-colors">
                    <ArrowRight className="h-4 w-4 group-open:rotate-90 transition-transform" strokeWidth={2.5} />
                  </span>
                </summary>
                <dd
                  className="px-6 pb-5 text-sm text-brand-navy/70 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: f.a }}
                />
              </details>
            ))}
          </dl>

          <div className="mt-10 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-coral transition-colors"
            >
              See all FAQs
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────── FINAL CTA ─────────────── */}
      <section className="pb-20 lg:pb-24">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-soft bg-brand-navy text-white px-8 py-16 lg:px-16 lg:py-24 text-center">
            <div className="absolute inset-0 bg-dot-pattern opacity-10" aria-hidden />
            <div className="relative max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-pill bg-white/10 backdrop-blur px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white mb-6">
                <Clock className="h-3.5 w-3.5 text-brand-coral" strokeWidth={2.5} />
                Limited launch pricing
              </div>
              <h2 className="font-heading font-bold tracking-tight text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.02]">
                Stop sending résumés into the void.
              </h2>
              <p className="mt-6 text-lg text-white/70 max-w-md mx-auto">
                Get instant access to the prompt packs that turn AI into your unfair career advantage.
              </p>
              <Link
                href="/products"
                className="mt-9 inline-flex items-center justify-center gap-2 rounded-pill bg-brand-coral hover:bg-brand-coral-dark px-8 py-4 text-sm font-semibold text-white transition-colors shadow-xl shadow-brand-coral/30"
              >
                Unlock the packs
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </Link>
              <p className="mt-4 text-xs text-white/45">
                30-day money-back guarantee · Instant download · Lifetime updates
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
