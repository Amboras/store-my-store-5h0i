'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Star, Truck, ShieldCheck, RotateCcw, ChevronRight,
  ChevronDown, Minus, Plus, Sparkles, Check, ShoppingBag,
  Flame,
} from 'lucide-react'
import { toast } from 'sonner'
import { ProductViewTracker } from '@/components/product/product-view-tracker'
import { type VariantExtension, isProductSoldOut } from '@/components/product/product-price'
import { useCart } from '@/hooks/use-cart'
import { getProductImage } from '@/lib/utils/placeholder-images'
import { formatPrice } from '@/lib/utils/format-price'

interface Props {
  product: any
  variantExtensions?: Record<string, VariantExtension>
  relatedProducts?: any[]
}

export default function ProductDetail({ product, variantExtensions, relatedProducts = [] }: Props) {
  const [qty, setQty] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [bundleSelected, setBundleSelected] = useState<'single' | 'double' | 'triple'>('single')
  const [adding, setAdding] = useState(false)
  const [buyingNow, setBuyingNow] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    // Default to first option value for each option
    const init: Record<string, string> = {}
    for (const opt of product.options || []) {
      const firstVal = opt.values?.[0]?.value || opt.values?.[0]
      if (firstVal) init[opt.id] = firstVal
    }
    return init
  })
  const { addItemAsync } = useCart()

  // Resolve selected variant
  const selectedVariant = useMemo(() => {
    const variants = product.variants || []
    if (!variants.length) return null
    if (Object.keys(selectedOptions).length === 0) return variants[0]
    return variants.find((v: any) => {
      const vOpts: Record<string, string> = {}
      for (const o of v.options || []) vOpts[o.option_id] = o.value
      return Object.entries(selectedOptions).every(([k, val]) => vOpts[k] === val)
    }) || variants[0]
  }, [product.variants, selectedOptions, product.options])

  const calculatedPrice = selectedVariant?.calculated_price
  const currency = calculatedPrice?.currency_code || 'usd'
  const currentAmount = calculatedPrice?.calculated_amount ?? 0
  const ext = selectedVariant?.id ? variantExtensions?.[selectedVariant.id] : null
  const compareAtPrice = ext?.compare_at_price
  const hasDiscount = compareAtPrice != null && compareAtPrice > currentAmount
  const savings = hasDiscount ? compareAtPrice! - currentAmount : 0
  const discountPct = hasDiscount ? Math.round((savings / compareAtPrice!) * 100) : 0

  const soldOut = isProductSoldOut(product.variants || [], variantExtensions)
  const inventoryQty = ext?.inventory_quantity ?? null
  const lowStock = inventoryQty !== null && inventoryQty > 0 && inventoryQty <= 12

  // Bundle pricing — Buy 2 get 10% off, Buy 3 get 1 free
  const bundleConfig = {
    single: { qty: 1, label: 'Single', subLabel: 'One unit',          multiplier: 1,    badge: null },
    double: { qty: 2, label: 'Pair',   subLabel: 'Save 10% on 2',     multiplier: 1.8,  badge: 'Most popular' },
    triple: { qty: 3, label: '3-pack', subLabel: 'Buy 2, get 1 free', multiplier: 2,    badge: 'Best value' },
  } as const

  const images = product.images?.length
    ? product.images
    : product.thumbnail
      ? [{ id: 'thumb', url: product.thumbnail }]
      : [{ id: 'placeholder', url: getProductImage(null, product.id) }]

  async function handleAdd(buyNow = false) {
    if (!selectedVariant?.id) {
      toast.error('Please select all options')
      return
    }
    const bundle = bundleConfig[bundleSelected]
    const totalQty = qty * bundle.qty
    const setLoading = buyNow ? setBuyingNow : setAdding
    setLoading(true)
    try {
      await addItemAsync({ variantId: selectedVariant.id, quantity: totalQty })
      if (buyNow) window.location.href = '/checkout'
      else toast.success(`${product.title} added to your bag`)
    } catch (err) {
      toast.error((err as Error).message || 'Could not add to bag')
    } finally {
      setLoading(false)
    }
  }

  const heroImage = images[Math.min(activeImage, images.length - 1)]?.url ?? images[0]?.url

  return (
    <>
      <ProductViewTracker
        productId={product.id}
        productTitle={product.title}
        variantId={selectedVariant?.id || null}
        currency={currency}
        value={currentAmount}
      />

      {/* Urgency sale banner */}
      {hasDiscount && (
        <div className="bg-brand-coral text-white">
          <div className="container-custom flex items-center justify-center gap-2 py-2 text-xs sm:text-sm font-semibold tracking-wide">
            <Flame className="h-4 w-4" strokeWidth={2.5} />
            <span>Limited-time offer — save {discountPct}% while supplies last</span>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="border-b border-border bg-background">
        <div className="container-custom py-3">
          <nav className="flex items-center gap-2 text-xs text-brand-navy/55">
            <Link href="/" className="hover:text-brand-coral transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/products" className="hover:text-brand-coral transition-colors">Shop</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-brand-navy line-clamp-1">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="bg-background">
        <div className="container-custom py-8 lg:py-14">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

            {/* ─── Image gallery ─── */}
            <div className="space-y-3">
              <div className="relative aspect-square rounded-soft bg-cream-deep overflow-hidden">
                {hasDiscount && (
                  <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1 rounded-pill bg-brand-coral px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                    <Sparkles className="h-3 w-3" strokeWidth={2.5} />
                    Save {discountPct}%
                  </span>
                )}
                <Image
                  src={heroImage}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>

              {images.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {images.slice(0, 5).map((img: any, i: number) => (
                    <button
                      key={img.id || i}
                      onClick={() => setActiveImage(i)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 bg-cream-deep transition-colors ${
                        i === activeImage ? 'border-brand-coral' : 'border-transparent hover:border-brand-navy/15'
                      }`}
                      aria-label={`View image ${i + 1}`}
                    >
                      <Image src={img.url} alt="" fill className="object-cover" sizes="80px" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ─── Info column ─── */}
            <div className="lg:sticky lg:top-24 lg:self-start space-y-6">

              {/* Title + reviews */}
              <div>
                {product.collection?.title && (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-coral mb-3">
                    {product.collection.title}
                  </p>
                )}
                <h1 className="font-heading font-bold tracking-tight text-brand-navy text-[clamp(1.85rem,3.5vw,2.75rem)] leading-[1.05]">
                  {product.title}
                </h1>

                <div className="mt-3 flex items-center gap-2.5">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-brand-coral text-brand-coral" strokeWidth={0} />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-brand-navy">4.9</span>
                  <span className="text-sm text-brand-navy/55">(214 reviews)</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="font-heading text-4xl font-bold text-brand-navy">
                  {formatPrice(currentAmount, currency)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-lg text-brand-navy/40 line-through">
                      {formatPrice(compareAtPrice!, currency)}
                    </span>
                    <span className="inline-flex items-center rounded-pill bg-brand-coral/15 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-brand-coral">
                      Save {formatPrice(savings, currency)}
                    </span>
                  </>
                )}
              </div>

              {/* Short description */}
              {product.subtitle || product.description ? (
                <p className="text-base text-brand-navy/75 leading-relaxed">
                  {product.subtitle || (product.description?.length > 220
                    ? product.description.slice(0, 220) + '…'
                    : product.description)}
                </p>
              ) : null}

              {/* Stock urgency */}
              {lowStock && (
                <div className="flex items-center gap-2 rounded-lg bg-brand-coral/8 px-3.5 py-2.5 ring-1 ring-brand-coral/20">
                  <Flame className="h-4 w-4 text-brand-coral flex-shrink-0" strokeWidth={2.5} />
                  <p className="text-xs font-semibold text-brand-navy">
                    Only <span className="text-brand-coral">{inventoryQty}</span> left in stock — moving fast
                  </p>
                </div>
              )}

              {/* Options selector */}
              {(product.options || []).map((opt: any) => (
                <div key={opt.id}>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-navy/80 mb-3">
                    {opt.title}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(opt.values || []).map((v: any) => {
                      const value = v.value || v
                      const isActive = selectedOptions[opt.id] === value
                      return (
                        <button
                          key={value}
                          onClick={() => setSelectedOptions(o => ({ ...o, [opt.id]: value }))}
                          className={`px-4 py-2 rounded-pill text-sm font-medium border transition-colors ${
                            isActive
                              ? 'border-brand-navy bg-brand-navy text-white'
                              : 'border-border text-brand-navy hover:border-brand-navy'
                          }`}
                        >
                          {value}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}

              {/* Bundle / quantity offer */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-navy/80">
                    Choose your bundle
                  </p>
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-brand-coral">
                    Save up to 33%
                  </span>
                </div>
                <div className="space-y-2">
                  {(Object.keys(bundleConfig) as Array<keyof typeof bundleConfig>).map((key) => {
                    const cfg = bundleConfig[key]
                    const totalPrice = Math.round(currentAmount * cfg.multiplier)
                    const fullPrice = currentAmount * cfg.qty
                    const bundleSave = fullPrice - totalPrice
                    const isActive = bundleSelected === key
                    return (
                      <button
                        key={key}
                        onClick={() => setBundleSelected(key)}
                        className={`w-full flex items-center gap-3 p-4 rounded-soft border-2 transition-all text-left ${
                          isActive
                            ? 'border-brand-navy bg-cream'
                            : 'border-border bg-background hover:border-brand-navy/40'
                        }`}
                      >
                        <span className={`flex items-center justify-center h-5 w-5 rounded-full border-2 flex-shrink-0 ${
                          isActive ? 'border-brand-navy bg-brand-navy' : 'border-brand-navy/30'
                        }`}>
                          {isActive && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-brand-navy text-sm">{cfg.label}</span>
                            {cfg.badge && (
                              <span className="inline-flex items-center rounded-pill bg-brand-coral text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5">
                                {cfg.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-brand-navy/55 mt-0.5">{cfg.subLabel}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-heading font-bold text-brand-navy">
                            {formatPrice(totalPrice, currency)}
                          </p>
                          {bundleSave > 0 && (
                            <p className="text-[11px] text-brand-coral font-semibold">
                              Save {formatPrice(bundleSave, currency)}
                            </p>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-navy/80 mb-3">
                  Quantity
                </p>
                <div className="inline-flex items-center rounded-pill border border-border bg-background">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="px-4 py-3 hover:text-brand-coral transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center font-semibold text-brand-navy tabular-nums">{qty}</span>
                  <button
                    onClick={() => setQty(q => q + 1)}
                    className="px-4 py-3 hover:text-brand-coral transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => handleAdd(false)}
                  disabled={adding || soldOut}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-pill bg-brand-navy hover:bg-brand-navy-dark disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 text-sm font-semibold transition-colors"
                >
                  {soldOut ? (
                    'Sold out'
                  ) : adding ? (
                    'Adding…'
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" strokeWidth={2.5} />
                      Add to bag — {formatPrice(Math.round(currentAmount * bundleConfig[bundleSelected].multiplier) * qty, currency)}
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleAdd(true)}
                  disabled={buyingNow || soldOut}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-pill bg-brand-coral hover:bg-brand-coral-dark disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 text-sm font-semibold transition-colors"
                >
                  {buyingNow ? 'Redirecting…' : 'Buy it now'}
                </button>
              </div>

              {/* Trust strip */}
              <ul className="grid grid-cols-3 gap-2 pt-4 border-t border-border">
                {[
                  { icon: Truck,       label: 'Free shipping', sub: 'Orders $75+' },
                  { icon: RotateCcw,   label: '30-day returns', sub: 'No questions' },
                  { icon: ShieldCheck, label: 'Secure checkout', sub: 'SSL encrypted' },
                ].map((t) => {
                  const Icon = t.icon
                  return (
                    <li key={t.label} className="text-center">
                      <Icon className="h-5 w-5 text-brand-coral mx-auto" strokeWidth={1.75} />
                      <p className="mt-1.5 text-[11px] font-semibold text-brand-navy">{t.label}</p>
                      <p className="text-[10px] text-brand-navy/55">{t.sub}</p>
                    </li>
                  )
                })}
              </ul>

              {/* Description accordion */}
              {product.description && (
                <Accordion
                  items={[
                    { title: 'Description', content: product.description },
                    {
                      title: 'Shipping & returns',
                      content:
                        'Ships within 1–2 business days. Free standard shipping on orders over $75. 30-day no-questions-asked returns.',
                    },
                    {
                      title: 'Care',
                      content:
                        'Treat your purchase with care to keep it in great shape. See product page for material-specific care notes.',
                    },
                  ]}
                />
              )}
            </div>
          </div>

          {/* Related products */}
          {relatedProducts.length > 0 && (
            <div className="mt-20 lg:mt-28 border-t border-border pt-14">
              <div className="flex items-end justify-between mb-8">
                <h2 className="font-heading text-2xl lg:text-3xl font-bold tracking-tight text-brand-navy">
                  You might also like
                </h2>
                <Link
                  href="/products"
                  className="text-sm font-semibold text-brand-navy hover:text-brand-coral transition-colors"
                >
                  Shop all →
                </Link>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
                {relatedProducts.map((p: any) => (
                  <Link
                    key={p.id}
                    href={`/products/${p.handle}`}
                    className="group block"
                  >
                    <div className="relative aspect-[4/5] rounded-soft overflow-hidden bg-cream-deep mb-3">
                      <Image
                        src={getProductImage(p.thumbnail, p.id)}
                        alt={p.title}
                        fill
                        sizes="(min-width: 1024px) 25vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-sm font-medium text-brand-navy line-clamp-1 group-hover:text-brand-coral transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-sm text-brand-navy/65 mt-0.5">
                      {p.variants?.[0]?.calculated_price?.calculated_amount
                        ? formatPrice(p.variants[0].calculated_price.calculated_amount, p.variants[0].calculated_price.currency_code || 'usd')
                        : ''}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

/* ─── Accordion ────────────────────────────────────────────────── */
function Accordion({ items }: { items: { title: string; content: string }[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0)
  return (
    <div className="border-t border-border pt-2">
      {items.map((item, i) => {
        const open = openIdx === i
        return (
          <div key={item.title} className="border-b border-border">
            <button
              onClick={() => setOpenIdx(open ? null : i)}
              className="w-full flex items-center justify-between py-4 text-left"
              aria-expanded={open}
            >
              <span className="text-sm font-semibold text-brand-navy">{item.title}</span>
              <ChevronDown
                className={`h-4 w-4 text-brand-navy/55 transition-transform ${open ? 'rotate-180' : ''}`}
              />
            </button>
            {open && (
              <div className="pb-5 text-sm text-brand-navy/70 leading-relaxed whitespace-pre-line">
                {item.content}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
