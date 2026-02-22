"use client"

import { X } from "lucide-react"

interface ProductFiltersProps {
  brands: string[]
  sizes: number[]
  selectedBrands: string[]
  selectedSizes: number[]
  priceRange: [number, number]
  maxPrice: number
  onBrandChange: (brand: string) => void
  onSizeChange: (size: number) => void
  onPriceChange: (range: [number, number]) => void
  onClearAll: () => void
}

export function ProductFilters({
  brands,
  sizes,
  selectedBrands,
  selectedSizes,
  priceRange,
  maxPrice,
  onBrandChange,
  onSizeChange,
  onPriceChange,
  onClearAll,
}: ProductFiltersProps) {
  const hasFilters =
    selectedBrands.length > 0 ||
    selectedSizes.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < maxPrice

  return (
    <aside className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
          Filters
        </h2>
        {hasFilters && (
          <button
            onClick={onClearAll}
            className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
          >
            <X className="h-3 w-3" />
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">Brand</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => onBrandChange(brand)}
                className="h-4 w-4 rounded border-border text-primary accent-primary"
              />
              <span className="text-sm text-foreground">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">Size</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => onSizeChange(size)}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                selectedSizes.includes(size)
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:border-primary/50"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">Price</h3>
        <div className="space-y-3">
          <input
            type="range"
            min={0}
            max={maxPrice}
            value={priceRange[1]}
            onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
            className="w-full accent-primary"
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>0 &#8376;</span>
            <span>{new Intl.NumberFormat("ru-RU").format(priceRange[1])} &#8376;</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
