"use client"

import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import type { Product } from "@/lib/products"

function formatPrice(price: number): string {
  return new Intl.NumberFormat("ru-RU").format(price) + " \u20B8"
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {product.brand}
        </p>
        <h3 className="font-semibold text-foreground text-balance leading-snug">
          {product.name}
        </h3>
        <div className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-primary text-primary" />
          <span className="text-sm text-muted-foreground">{product.rating}</span>
        </div>
        <div className="mt-auto pt-2">
          <p className="text-lg font-bold text-foreground">{formatPrice(product.price)}</p>
        </div>
      </div>
    </Link>
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border bg-card">
      <div className="aspect-square animate-pulse bg-muted" />
      <div className="flex flex-col gap-2 p-4">
        <div className="h-3 w-16 animate-pulse rounded bg-muted" />
        <div className="h-5 w-32 animate-pulse rounded bg-muted" />
        <div className="h-3 w-10 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-6 w-24 animate-pulse rounded bg-muted" />
      </div>
    </div>
  )
}
