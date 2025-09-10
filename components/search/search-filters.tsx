"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"

const categories = [
  { id: "temple", label: "観光", icon: "🏯" },
  { id: "food", label: "グルメ", icon: "🍜" },
  { id: "nature", label: "自然", icon: "🌸" },
  { id: "landmark", label: "ランドマーク", icon: "🗼" },
  { id: "experience", label: "体験", icon: "🎌" },
  { id: "shopping", label: "ショッピング", icon: "🛍️" },
]

const regions = [
  { id: "kanto", label: "関東" },
  { id: "kansai", label: "関西" },
  { id: "kyushu", label: "九州" },
  { id: "hokkaido", label: "北海道" },
  { id: "tohoku", label: "東北" },
  { id: "chubu", label: "中部" },
]

const priceRanges = [
  { id: "free", label: "無料", min: 0, max: 0 },
  { id: "budget", label: "¥1-500", min: 1, max: 500 },
  { id: "moderate", label: "¥501-1,500", min: 501, max: 1500 },
  { id: "expensive", label: "¥1,501以上", min: 1501, max: 10000 },
]

interface SearchFiltersProps {
  onFilterChange: (filters: any) => void
}

export function SearchFilters({ onFilterChange }: SearchFiltersProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedRegions, setSelectedRegions] = useState<string[]>([])
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])
  const [ratingFilter, setRatingFilter] = useState([0])

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...selectedCategories, categoryId]
      : selectedCategories.filter((id) => id !== categoryId)

    setSelectedCategories(newCategories)
    emitFilterChange({ categories: newCategories })
  }

  const handleRegionChange = (regionId: string, checked: boolean) => {
    const newRegions = checked ? [...selectedRegions, regionId] : selectedRegions.filter((id) => id !== regionId)

    setSelectedRegions(newRegions)
    emitFilterChange({ regions: newRegions })
  }

  const handlePriceChange = (priceId: string, checked: boolean) => {
    const newPrices = checked ? [...selectedPriceRanges, priceId] : selectedPriceRanges.filter((id) => id !== priceId)

    setSelectedPriceRanges(newPrices)
    emitFilterChange({ priceRanges: newPrices })
  }

  const handleRatingChange = (value: number[]) => {
    setRatingFilter(value)
    emitFilterChange({ minRating: value[0] })
  }

  const emitFilterChange = (partialFilters: any) => {
    onFilterChange({
      categories: selectedCategories,
      regions: selectedRegions,
      priceRanges: selectedPriceRanges,
      minRating: ratingFilter[0],
      ...partialFilters,
    })
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedRegions([])
    setSelectedPriceRanges([])
    setRatingFilter([0])
    onFilterChange({
      categories: [],
      regions: [],
      priceRanges: [],
      minRating: 0,
    })
  }

  const hasActiveFilters =
    selectedCategories.length > 0 || selectedRegions.length > 0 || selectedPriceRanges.length > 0 || ratingFilter[0] > 0

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">フィルター</h3>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              すべてクリア
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Categories */}
          <div>
            <h4 className="font-medium mb-3">カテゴリ</h4>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) => handleCategoryChange(category.id, !!checked)}
                  />
                  <label
                    htmlFor={category.id}
                    className="flex items-center space-x-2 text-sm font-medium cursor-pointer"
                  >
                    <span>{category.icon}</span>
                    <span>{category.label}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Regions */}
          <div>
            <h4 className="font-medium mb-3">地域</h4>
            <div className="space-y-2">
              {regions.map((region) => (
                <div key={region.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={region.id}
                    checked={selectedRegions.includes(region.id)}
                    onCheckedChange={(checked) => handleRegionChange(region.id, !!checked)}
                  />
                  <label htmlFor={region.id} className="text-sm font-medium cursor-pointer">
                    {region.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="font-medium mb-3">料金</h4>
            <div className="space-y-2">
              {priceRanges.map((price) => (
                <div key={price.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={price.id}
                    checked={selectedPriceRanges.includes(price.id)}
                    onCheckedChange={(checked) => handlePriceChange(price.id, !!checked)}
                  />
                  <label htmlFor={price.id} className="text-sm font-medium cursor-pointer">
                    {price.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <h4 className="font-medium mb-3">評価</h4>
            <div className="space-y-3">
              <div className="px-2">
                <Slider
                  value={ratingFilter}
                  onValueChange={handleRatingChange}
                  max={5}
                  min={0}
                  step={0.5}
                  className="w-full"
                />
              </div>
              <div className="text-sm text-muted-foreground text-center">{ratingFilter[0]}星以上</div>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="mt-6 pt-6 border-t border-border">
            <h4 className="font-medium mb-3">適用中のフィルター</h4>
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((categoryId) => {
                const category = categories.find((c) => c.id === categoryId)
                return (
                  <Badge
                    key={categoryId}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => handleCategoryChange(categoryId, false)}
                  >
                    {category?.icon} {category?.label} ×
                  </Badge>
                )
              })}
              {selectedRegions.map((regionId) => {
                const region = regions.find((r) => r.id === regionId)
                return (
                  <Badge
                    key={regionId}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => handleRegionChange(regionId, false)}
                  >
                    {region?.label} ×
                  </Badge>
                )
              })}
              {selectedPriceRanges.map((priceId) => {
                const price = priceRanges.find((p) => p.id === priceId)
                return (
                  <Badge
                    key={priceId}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => handlePriceChange(priceId, false)}
                  >
                    {price?.label} ×
                  </Badge>
                )
              })}
              {ratingFilter[0] > 0 && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => handleRatingChange([0])}>
                  {ratingFilter[0]}星以上 ×
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
