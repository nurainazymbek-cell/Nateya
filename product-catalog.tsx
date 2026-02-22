"use client"

import { useState, useCallback, useMemo } from "react"
import useSWR from "swr"
import type { Product } from "@/lib/products"
import { ProductCard, ProductCardSkeleton } from "./product-card"
import { ProductFilters } from "./product-filters"
import { ShopHeader } from "./shop-header"
import { AlertCircle, SlidersHorizontal, X } from "lucide-react"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function ProductCatalog() {
  const { data: products, error, isLoading, mutate } = useSWR<Product[]>("/api/products", fetcher)

  const [search, setSearch] = useState("")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<number[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000])
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const brands = useMemo(() => {
    if (!products) return []
    return [...new Set(products.map((p) => p.brand))]
  }, [products])

  const sizes = useMemo(() => {
    if (!products) return []
    return [...new Set(products.flatMap((p) => p.sizes))].sort((a, b) => a - b)
  }, [products])

  const maxPrice = useMemo(() => {
    if (!products) return 50000
    return Math.max(...products.map((p) => p.price))
  }, [products])

  const filteredProducts = useMemo(() => {
    if (!products) return []
    return products.filter((p) => {
      const matchSearch =
        search === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase())
      const matchBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand)
      const matchSize =
        selectedSizes.length === 0 || p.sizes.some((s) => selectedSizes.includes(s))
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1]
      return matchSearch && matchBrand && matchSize && matchPrice
    })
  }, [products, search, selectedBrands, selectedSizes, priceRange])

  const handleBrandChange = useCallback((brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    )
  }, [])

  const handleSizeChange = useCallback((size: number) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    )
  }, [])

  const handlePriceChange = useCallback((range: [number, number]) => {
    setPriceRange(range)
  }, [])

  const handleClearAll = useCallback(() => {
    setSelectedBrands([])
    setSelectedSizes([])
    setPriceRange([0, maxPrice])
  }, [maxPrice])

  return (
    <div className="min-h-screen">
      <ShopHeader onSearch={setSearch} />

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        {/* Mobile filter toggle */}
        <div className="mb-6 flex items-center justify-between lg:hidden">
          {isLoading ? "Loading..." : `${filteredProducts.length} programs`}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm font-medium text-foreground"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>
        </div>

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <div className="hidden lg:block lg:w-56 lg:flex-shrink-0">
            <div className="sticky top-24">
              <ProductFilters
                brands={brands}
                sizes={sizes}
                selectedBrands={selectedBrands}
                selectedSizes={selectedSizes}
                priceRange={priceRange}
                maxPrice={maxPrice}
                onBrandChange={handleBrandChange}
                onSizeChange={handleSizeChange}
                onPriceChange={handlePriceChange}
                onClearAll={handleClearAll}
              />
            </div>
          </div>

          {/* Mobile filters overlay */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
                onClick={() => setShowMobileFilters(false)}
                onKeyDown={() => { }}
                role="presentation"
              />
              <div className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-card p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">Filters</h2>
                  <button onClick={() => setShowMobileFilters(false)} aria-label="Close filters">
                    <X className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>
                <ProductFilters
                  brands={brands}
                  sizes={sizes}
                  selectedBrands={selectedBrands}
                  selectedSizes={selectedSizes}
                  priceRange={priceRange}
                  maxPrice={maxPrice}
                  onBrandChange={handleBrandChange}
                  onSizeChange={handleSizeChange}
                  onPriceChange={handlePriceChange}
                  onClearAll={handleClearAll}
                />
              </div>
            </div>
          )}

          {/* Product grid */}
          <div className="flex-1">
            <div className="mb-6 hidden items-center justify-between lg:flex">
              {isLoading ? "Loading programs..." : `${filteredProducts.length} programs found`}
            </div>

            {/* Loading state */}
            {isLoading && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ProductCardSkeleton key={`skeleton-${i}`} />
                ))}
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="flex flex-col items-center justify-center gap-4 py-20">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                  <AlertCircle className="h-8 w-8 text-destructive" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Something went wrong</h3>
                <p className="text-sm text-muted-foreground">
                  Failed to load products. Please try again.
                </p>
                <button
                  onClick={() => mutate()}
                  className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Empty state */}
            {!isLoading && !error && filteredProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-4 py-20">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <SlidersHorizontal className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">No programs found</h3>
                <p className="text-sm text-muted-foreground">
                  Try changing your search or filters.
                </p>
                <button
                  onClick={handleClearAll}
                  className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Clear filters
                </button>
              </div>
            )}

            {/* Success state */}
            {!isLoading && !error && filteredProducts.length > 0 && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
