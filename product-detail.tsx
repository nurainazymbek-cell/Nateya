"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Star, ArrowLeft, ShoppingBag, Check } from "lucide-react"
import type { Product } from "@/lib/products"
import { useCart } from "@/lib/cart-store"
import { ShopHeader } from "./shop-header"

function formatPrice(price: number): string {
  return new Intl.NumberFormat("ru-RU").format(price) + " \u20B8"
}

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null)
  const [added, setAdded] = useState(false)
  const { add } = useCart()

  function handleAddToCart() {
    if (!selectedSize) return
    add(product, selectedSize)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  function handleBuyNow() {
    if (!selectedSize) return
    add(product, selectedSize)
    window.location.href = "/cart"
  }

  return (
    <div className="min-h-screen">
      <ShopHeader showSearch={false} />

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to catalog
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Product image */}
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Product info */}
          <div className="flex flex-col gap-6">
            <div className="space-y-2">
              <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {product.brand}
              </p>
              <h1 className="text-3xl font-bold text-foreground lg:text-4xl text-balance">
                {product.name}
              </h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={`star-${i}`}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-primary text-primary"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{product.rating}</span>
              </div>
            </div>

            <p className="text-3xl font-bold text-foreground">{formatPrice(product.price)}</p>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Select Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-lg border px-5 py-3 text-sm font-medium transition-all ${
                      selectedSize === size
                        ? "border-primary bg-primary text-primary-foreground shadow-sm"
                        : "border-border bg-card text-foreground hover:border-primary/50"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-xs text-muted-foreground">Please select a size to continue</p>
              )}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-primary bg-transparent px-6 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4" />
                    Added to cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" />
                    Add to cart
                  </>
                )}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!selectedSize}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Buy now
              </button>
            </div>

            <div className="space-y-3 border-t pt-6">
              <h3 className="text-sm font-semibold text-foreground">Description</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
