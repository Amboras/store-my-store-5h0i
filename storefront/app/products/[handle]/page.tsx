import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { medusaServerClient } from '@/lib/medusa-client'
import { type VariantExtension } from '@/components/product/product-price'
import ProductDetail from '@/components/product/product-detail'

export const revalidate = 3600

async function getProduct(handle: string) {
  try {
    const regionsResponse = await medusaServerClient.store.region.list()
    const regionId = regionsResponse.regions[0]?.id
    if (!regionId) throw new Error('No region found')

    const response = await medusaServerClient.store.product.list({
      handle,
      region_id: regionId,
      fields: '*variants.calculated_price,*images,*options.values,*collection',
    })
    return response.products?.[0] || null
  } catch {
    return null
  }
}

async function getRelatedProducts(currentId: string, collectionId?: string) {
  try {
    const regionsResponse = await medusaServerClient.store.region.list()
    const regionId = regionsResponse.regions[0]?.id
    if (!regionId) return []

    const response = await medusaServerClient.store.product.list({
      region_id: regionId,
      collection_id: collectionId,
      limit: 5,
      fields: '*variants.calculated_price',
    })
    return (response.products || []).filter((p: any) => p.id !== currentId).slice(0, 4)
  } catch {
    return []
  }
}

async function getVariantExtensions(productId: string): Promise<Record<string, VariantExtension>> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'
    const storeId = process.env.NEXT_PUBLIC_STORE_ID
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
    const headers: Record<string, string> = {}
    if (storeId) headers['X-Store-Environment-ID'] = storeId
    if (publishableKey) headers['x-publishable-api-key'] = publishableKey

    const res = await fetch(
      `${baseUrl}/store/product-extensions/products/${productId}/variants`,
      { headers, next: { revalidate: 30 } },
    )
    if (!res.ok) return {}

    const data = await res.json()
    const map: Record<string, VariantExtension> = {}
    for (const v of data.variants || []) {
      map[v.id] = {
        compare_at_price: v.compare_at_price,
        manage_inventory: v.manage_inventory ?? false,
        inventory_quantity: v.inventory_quantity,
      }
    }
    return map
  } catch {
    return {}
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>
}): Promise<Metadata> {
  const { handle } = await params
  const product = await getProduct(handle)
  if (!product) return { title: 'Product not found' }

  return {
    title: `${product.title} — My Store`,
    description: product.description || `Shop ${product.title} at My Store.`,
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params
  const product = await getProduct(handle)

  if (!product) notFound()

  const variantExtensions = await getVariantExtensions(product.id)
  const relatedProducts = await getRelatedProducts(product.id, product.collection?.id)

  return (
    <ProductDetail
      product={product}
      variantExtensions={variantExtensions}
      relatedProducts={relatedProducts}
    />
  )
}
