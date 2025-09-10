"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Filter, RotateCcw, Star } from "lucide-react"

const categories = [
  { id: "temple", label: "観光", labelEn: "Sightseeing", icon: "🏯" },
  { id: "food", label: "グルメ", labelEn: "Food", icon: "🍜" },
  { id: "nature", label: "自然", labelEn: "Nature", icon: "🌸" },
  { id: "landmark", label: "ランドマーク", labelEn: "Landmarks", icon: "🗼" },
  { id: "experience", label: "体験", labelEn: "Experience", icon: "🎌" },
]

const regions = [
  { id: "kanto", label: "関東", labelEn: "Kanto" },
  { id: "kansai", label: "関西", labelEn: "Kansai" },
  { id: "kyushu", label: "九州", labelEn: "Kyushu" },
  { id: "hokkaido", label: "北海道", labelEn: "Hokkaido" },
  { id: "tohoku", label: "東北", labelEn: "Tohoku" },
  { id: "chubu", label: "中部", labelEn: "Chubu" },
]

export function MapSidebar({ spots, onFilterChange, onSpotClick, selectedSpot }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedRegions, setSelectedRegions] = useState([])

  const handleFilterUpdate = () => {
    onFilterChange({
      searchQuery,
      categories: selectedCategories,
      regions: selectedRegions,
    })
  }

  const handleCategoryChange = (categoryId, checked) => {
    const newCategories = checked
      ? [...selectedCategories, categoryId]
      : selectedCategories.filter((id) => id !== categoryId)

    setSelectedCategories(newCategories)
    onFilterChange({
      searchQuery,
      categories: newCategories,
      regions: selectedRegions,
    })
  }

  const handleRegionChange = (regionId, checked) => {
    const newRegions = checked ? [...selectedRegions, regionId] : selectedRegions.filter((id) => id !== regionId)

    setSelectedRegions(newRegions)
    onFilterChange({
      searchQuery,
      categories: selectedCategories,
      regions: newRegions,
    })
  }

  const handleSearchChange = (value) => {
    setSearchQuery(value)
    onFilterChange({
      searchQuery: value,
      categories: selectedCategories,
      regions: selectedRegions,
    })
  }

  const handleReset = () => {
    setSearchQuery("")
    setSelectedCategories([])
    setSelectedRegions([])
    onFilterChange({
      searchQuery: "",
      categories: [],
      regions: [],
    })
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            フィルター
          </h2>
          <Button variant="ghost" size="sm" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-1" />
            リセット
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="スポットを検索..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Categories */}
        <div>
          <h3 className="font-medium mb-3">カテゴリ</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={(checked) => handleCategoryChange(category.id, checked)}
                />
                <label
                  htmlFor={category.id}
                  className="flex items-center space-x-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
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
          <h3 className="font-medium mb-3">地域フィルター</h3>
          <div className="space-y-2">
            {regions.map((region) => (
              <div key={region.id} className="flex items-center space-x-2">
                <Checkbox
                  id={region.id}
                  checked={selectedRegions.includes(region.id)}
                  onCheckedChange={(checked) => handleRegionChange(region.id, checked)}
                />
                <label
                  htmlFor={region.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {region.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Spot List */}
      <div className="border-t border-border p-4">
        <h3 className="font-medium mb-3">検索結果 ({spots.length}件)</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {spots.map((spot) => (
            <Card
              key={spot.id}
              className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                selectedSpot?.id === spot.id ? "bg-primary/10 border-primary" : ""
              }`}
              onClick={() => onSpotClick(spot)}
            >
              <CardContent className="p-3">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{spot.categoryIcon}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{spot.name}</h4>
                    <p className="text-xs text-muted-foreground truncate">{spot.nameEn}</p>
                    <div className="flex items-center mt-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-xs">{spot.rating}</span>
                      <span className="text-xs text-muted-foreground ml-1">({spot.reviewCount})</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
