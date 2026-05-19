'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useCart } from '@/hooks/use-cart'
import { useProducts } from '@/hooks/use-products'
import Image from 'next/image'
import Link from 'next/link'
import { X, ShoppingBag, Minus, Plus, Trash2, Gift, Check, ArrowRight, Plus as PlusIcon, Zap } from 'lucide-react'
import { getProductImage } from '@/lib/utils/placeholder-images'
import { formatPrice } from '@/lib/utils/format-price'
import { PromoCodeInput } from '@/components/checkout/promo-code-input'
import { toast } from 'sonner'
import type { CartLineItem } from '@/types'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

/* Threshold (in dollars) to unlock the bonus pack — digital product equivalent of free shipping. */
const BONUS_PACK_THRESHOLD = 99

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const {
    cart, removeItem, updateItem, addItemAsync, itemCount, subtotal, isLoading,
    appliedPromoCodes, discountTotal, applyPromoCode, removePromoCode,
    isApplyingPromo, isRemovingPromo,
  } = useCart()

  const { data: allProducts } = useProducts({ limit: 6 })

  const drawerRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !drawerRef.current) return

    const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (focusable.length === 0) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); first.focus(); last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus()
    }
  }, [])

  if (!isOpen) return null

  const currencyCode = cart?.currency_code || cart?.region?.currency_code || 'usd'
  const formattedSubtotal = formatPrice(subtotal || 0, currencyCode)

  // Bonus pack progress (subtotal is in cents)
  const subtotalDollars = (subtotal || 0) / 100
  const remainingForBonus = Math.max(0, BONUS_PACK_THRESHOLD - subtotalDollars)
  const progressPct = Math.min(100, Math.round((subtotalDollars / BONUS_PACK_THRESHOLD) * 100))
  const qualifiesForBonus = remainingForBonus <= 0 && (cart?.items?.length || 0) > 0

  // Upsell: find a product not already in the cart
  const inCartIds = new Set((cart?.items || []).map(i => i.product_id).filter(Boolean) as string[])
  const upsellProduct = (allProducts ?? []).find((p: any) => !inCartIds.has(p.id))
  const upsellVariant = upsellProduct?.variants?.[0]
  const upsellPrice = upsellVariant?.calculated_price?.calculated_amount ?? 0
  const upsellDiscounted = Math.round(upsellPrice * 0.9) // 10% off

  async function handleAddUpsell() {
    if (!upsellVariant?.id) return
    try {
      await addItemAsync({ variantId: upsellVariant.id, quantity: 1 })
      toast.success(`${upsellProduct?.title} added with 10% off`)
    } catch (err) {
      toast.error((err as Error).message || 'Could not add to bag')
    }
  }

  return (
    <>
      <div className="fixed inset-0 bg-brand-navy/40 backdrop-blur-sm z-40 transition-opacity" onClick={onClose} />

      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        onKeyDown={handleKeyDown}
        className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-2xl z-50 flex flex-col animate-slide-in-right"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="font-heading text-xl font-bold tracking-tight text-brand-navy">
            Your bag <span className="text-brand-navy/40">({itemCount})</span>
          </h2>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2 -mr-2 hover:opacity-70 transition-opacity"
            aria-label="Close bag"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Bonus pack progress */}
        {(cart?.items?.length ?? 0) > 0 && (
          <div className="border-b border-border bg-cream px-6 py-4">
            {qualifiesForBonus ? (
              <div className="flex items-center gap-2.5 text-sm font-semibold text-brand-navy">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-brand-coral text-white">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                You unlocked the <span className="text-brand-coral">free bonus pack</span>
              </div>
            ) : (
              <>
                <p className="text-xs text-brand-navy/75">
                  <Gift className="inline h-3.5 w-3.5 mr-1.5 -mt-0.5 text-brand-coral" strokeWidth={2} />
                  Add{' '}
                  <span className="font-semibold text-brand-navy">
                    {formatPrice(remainingForBonus * 100, currencyCode)}
                  </span>{' '}
                  more for a free bonus prompt pack
                </p>
                <div className="mt-2 h-1.5 w-full rounded-full bg-brand-navy/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-brand-coral transition-all duration-500"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </>
            )}
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-4 animate-pulse">
                  <div className="h-24 w-20 rounded-lg bg-muted" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-2/3 rounded bg-muted" />
                    <div className="h-3 w-1/3 rounded bg-muted" />
                    <div className="h-4 w-1/4 rounded bg-muted mt-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : !cart?.items || cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="h-16 w-16 rounded-full bg-cream flex items-center justify-center">
                <ShoppingBag className="h-7 w-7 text-brand-coral" strokeWidth={1.75} />
              </div>
              <p className="mt-5 font-heading text-lg font-bold text-brand-navy">Your bag is empty</p>
              <p className="mt-2 text-sm text-brand-navy/55 max-w-[18rem]">
                Find a pack that solves what you&apos;re working on next.
              </p>
              <Link
                href="/products"
                onClick={onClose}
                className="mt-6 inline-flex items-center gap-2 rounded-pill bg-brand-coral hover:bg-brand-coral-dark px-6 py-3 text-sm font-semibold text-white transition-colors"
              >
                Browse the packs
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {cart.items.map((item: CartLineItem) => {
                const price = item.unit_price
                const formattedPrice = formatPrice(price, currencyCode)

                return (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative h-28 w-22 flex-shrink-0 overflow-hidden rounded-lg bg-cream-deep">
                      <Image
                        src={getProductImage(item.thumbnail, item.product_id || item.id)}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col min-w-0">
                      <div className="flex justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="font-medium text-sm text-brand-navy truncate">{item.title}</h3>
                          {item.variant?.title && item.variant.title !== 'Default' && (
                            <p className="text-xs text-brand-navy/55 mt-0.5">{item.variant.title}</p>
                          )}
                          <p className="text-[10px] text-brand-navy/45 mt-1 inline-flex items-center gap-1">
                            <Zap className="h-3 w-3 text-brand-coral" strokeWidth={2.5} />
                            Instant download
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 -mr-2 text-brand-navy/45 hover:text-brand-coral transition-colors flex-shrink-0"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-auto pt-2 flex items-center justify-between">
                        <div className="flex items-center rounded-pill border border-border bg-background">
                          <button
                            onClick={() => updateItem({ lineId: item.id, quantity: Math.max(1, item.quantity - 1) })}
                            className="p-2 pl-3 hover:text-brand-coral transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="px-2 text-sm font-semibold tabular-nums text-brand-navy">{item.quantity}</span>
                          <button
                            onClick={() => updateItem({ lineId: item.id, quantity: item.quantity + 1 })}
                            className="p-2 pr-3 hover:text-brand-coral transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <p className="text-sm font-semibold text-brand-navy">
                          {item.quantity > 1 ? (
                            <span>{formattedPrice} × {item.quantity}</span>
                          ) : (
                            formattedPrice
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* Upsell card — only if cart has items and we have a product to suggest */}
              {upsellProduct && upsellVariant && (
                <div className="rounded-soft border-2 border-dashed border-brand-coral/30 bg-brand-coral/5 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center rounded-pill bg-brand-coral text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5">
                      Add this for 10% off
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-cream-deep">
                      <Image
                        src={getProductImage(upsellProduct.thumbnail, upsellProduct.id)}
                        alt={upsellProduct.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col min-w-0">
                      <h4 className="font-semibold text-sm text-brand-navy line-clamp-2">{upsellProduct.title}</h4>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-sm font-bold text-brand-navy">{formatPrice(upsellDiscounted, currencyCode)}</span>
                        <span className="text-xs text-brand-navy/40 line-through">{formatPrice(upsellPrice, currencyCode)}</span>
                      </div>
                      <button
                        onClick={handleAddUpsell}
                        className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-pill bg-brand-navy hover:bg-brand-navy-dark text-white py-2 px-3 text-xs font-semibold transition-colors"
                      >
                        <PlusIcon className="h-3.5 w-3.5" strokeWidth={2.5} />
                        Add to bag
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart?.items && cart.items.length > 0 && (
          <div className="border-t border-border px-6 py-5 space-y-4">
            <PromoCodeInput
              appliedPromoCodes={appliedPromoCodes}
              discountTotal={discountTotal}
              currencyCode={currencyCode}
              isApplyingPromo={isApplyingPromo}
              isRemovingPromo={isRemovingPromo}
              onApply={applyPromoCode}
              onRemove={removePromoCode}
            />
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-brand-navy/65">Subtotal</span>
                <span className="font-heading text-xl font-bold text-brand-navy">{formattedSubtotal}</span>
              </div>
              {discountTotal > 0 && (
                <div className="flex justify-between text-sm font-medium text-brand-coral">
                  <span>Discount</span>
                  <span>-{formatPrice(discountTotal, currencyCode)}</span>
                </div>
              )}
            </div>
            <p className="text-xs text-brand-navy/45 inline-flex items-center gap-1.5">
              <Zap className="h-3 w-3 text-brand-coral" strokeWidth={2.5} />
              Instant download after checkout. 30-day money-back guarantee.
            </p>
            <Link
              href="/checkout"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full rounded-pill bg-brand-coral hover:bg-brand-coral-dark text-white py-4 text-sm font-semibold transition-colors"
            >
              Checkout
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </Link>
            <button
              onClick={onClose}
              className="block w-full text-center text-sm text-brand-navy/60 hover:text-brand-coral transition-colors"
            >
              Continue shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
