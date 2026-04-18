'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ShoppingBag, Check, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { getProductImage } from '@/lib/utils/placeholder-images'
import ProductPrice, { isProductSoldOut, type VariantExtension } from './product-price'
import { useCart } from '@/hooks/use-cart'
import { trackAddToCart } from '@/lib/analytics'
import { trackMetaEvent, toMetaCurrencyValue } from '@/lib/meta-pixel'

interface ProductCardProps {
  product: any
  variantExtensions?: Record<string, VariantExtension>
}

export default function ProductCard({ product, variantExtensions }: ProductCardProps) {
  const variant = product.variants?.[0]
  const calculatedPrice = variant?.calculated_price

  const currency = calculatedPrice?.currency_code || 'usd'
  const currentAmount = calculatedPrice?.calculated_amount
  const ext = variant?.id ? variantExtensions?.[variant.id] : null

  const soldOut = isProductSoldOut(product.variants || [], variantExtensions)
  const hasMultipleVariants = (product.variants?.length || 0) > 1

  const { addItem, isAddingItem } = useCart()
  const [justAdded, setJustAdded] = useState(false)
  const [pending, setPending] = useState(false)

  const handleQuickAdd = (e: React.MouseEvent) => {
    // For products with multiple variants, let the Link navigate to product page
    if (hasMultipleVariants) return

    e.preventDefault()
    e.stopPropagation()

    if (!variant?.id || soldOut || pending) return

    setPending(true)
    addItem(
      { variantId: variant.id, quantity: 1 },
      {
        onSuccess: () => {
          setJustAdded(true)
          toast.success(`${product.title} added to bag`)
          const value = calculatedPrice?.calculated_amount
          const metaValue = toMetaCurrencyValue(value)
          trackAddToCart(product.id, variant.id, 1, value)
          trackMetaEvent('AddToCart', {
            content_ids: [variant.id],
            content_type: 'product',
            value: metaValue,
            currency,
            contents: [{ id: variant.id, quantity: 1, item_price: metaValue }],
            num_items: 1,
          })
          setTimeout(() => setJustAdded(false), 2000)
        },
        onError: (error: Error) => {
          toast.error(error.message || 'Failed to add to bag')
        },
        onSettled: () => {
          setPending(false)
        },
      }
    )
  }

  return (
    <Link href={`/products/${product.handle}`} className="group block" prefetch={true}>
      <div className="space-y-3">
        {/* Product Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-muted rounded-sm">
          <Image
            src={getProductImage(product.thumbnail, product.id)}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={`object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${soldOut ? 'opacity-50' : ''}`}
          />
          {soldOut && (
            <div className="absolute top-2 left-2 bg-muted-foreground/80 text-white text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-sm">
              Sold Out
            </div>
          )}

          {/* Quick Add Button */}
          {!soldOut && (
            <button
              onClick={handleQuickAdd}
              disabled={pending || isAddingItem}
              aria-label={hasMultipleVariants ? `Choose options for ${product.title}` : `Add ${product.title} to bag`}
              className={`absolute bottom-2 left-2 right-2 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold uppercase tracking-wide transition-all duration-300 ${
                justAdded
                  ? 'bg-green-700 text-white opacity-100 translate-y-0'
                  : 'bg-foreground text-background hover:opacity-90 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 focus:opacity-100 focus:translate-y-0'
              } disabled:cursor-not-allowed`}
            >
              {pending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : justAdded ? (
                <>
                  <Check className="h-4 w-4" />
                  Added
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" />
                  {hasMultipleVariants ? 'Choose Options' : 'Add to Bag'}
                </>
              )}
            </button>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-1">
          <h3 className={`text-sm font-medium line-clamp-1 group-hover:underline underline-offset-4 transition-all ${soldOut ? 'text-muted-foreground' : ''}`}>
            {product.title}
          </h3>
          <ProductPrice
            amount={currentAmount}
            currency={currency}
            compareAtPrice={ext?.compare_at_price}
            soldOut={soldOut}
            size="card"
          />
        </div>
      </div>
    </Link>
  )
}
