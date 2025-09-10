"use client"

import { useParams } from "next/navigation"
import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SpotCard } from "@/components/spots/spot-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"

// Mock category data
const categories = {
  food: {
    name: "グルメスポット",
    nameEn: "Food Spots",
    icon: "🍜",
    description: "日本全国の美味しいグルメスポットを探索しよう",
    descriptionEn: "Explore delicious food spots across Japan",
    subcategories: [
      { id: "all", label: "全て", labelEn: "All" },
      { id: "sushi", label: "寿司", labelEn: "Sushi", icon: "🍣" },
      { id: "ramen", label: "ラーメン", labelEn: "Ramen", icon: "🍜" },
      { id: "yakiniku", label: "焼肉", labelEn: "Yakiniku", icon: "🥩" },
      { id: "bento", label: "弁当", labelEn: "Bento", icon: "🍱" },
      { id: "sweets", label: "スイーツ", labelEn: "Sweets", icon: "🍰" },
      { id: "sake", label: "日本酒", labelEn: "Sake", icon: "🍶" },
    ],
    spots: [
      {
        id: "food1",
        name: "一蘭ラーメン",
        nameEn: "Ichiran Ramen",
        categoryIcon: "🍜",
        categoryLabel: "ラーメン",
        rating: 4.5,
        reviewCount: 2156,
        description: "とんこつラーメンで有名な一蘭の本店です。",
        address: "東京都渋谷区道玄坂2-29-11",
        price: "¥800-1,200",
        image: "/ichiran-ramen.png",
        openingHours: "24時間",
        budget: "¥800-1,200",
      },
      {
        id: "food2",
        name: "すきやばし次郎",
        nameEn: "Sukiyabashi Jiro",
        categoryIcon: "🍣",
        categoryLabel: "寿司",
        rating: 4.9,
        reviewCount: 892,
        description: "世界的に有名な寿司の名店です。",
        address: "東京都中央区銀座4-2-15",
        price: "¥30,000",
        image: "/high-end-sushi-restaurant.jpg",
        openingHours: "11:30-14:00",
        budget: "¥30,000",
      },
    ],
  },
  sightseeing: {
    name: "観光スポット",
    nameEn: "Sightseeing",
    icon: "🏯",
    description: "日本の美しい観光地を発見しよう",
    descriptionEn: "Discover Japan's beautiful tourist destinations",
    subcategories: [
      { id: "all", label: "全て", labelEn: "All" },
      { id: "temples", label: "寺院", labelEn: "Temples", icon: "🏯" },
      { id: "shrines", label: "神社", labelEn: "Shrines", icon: "⛩️" },
      { id: "castles", label: "城", labelEn: "Castles", icon: "🏰" },
      { id: "gardens", label: "庭園", labelEn: "Gardens", icon: "🌸" },
    ],
    spots: [
      {
        id: "sight1",
        name: "清水寺",
        nameEn: "Kiyomizu-dera Temple",
        categoryIcon: "🏯",
        categoryLabel: "寺院",
        rating: 4.8,
        reviewCount: 1234,
        description: "京都の代表的な観光地で、美しい木造建築と絶景で有名です。",
        address: "京都府京都市東山区清水1-294",
        price: "¥400",
        image: "/kiyomizu-temple-kyoto.jpg",
        openingHours: "6:00-18:00",
        budget: "¥400",
      },
    ],
  },
}

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const category = categories[slug]

  const [selectedSubcategory, setSelectedSubcategory] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [regionFilter, setRegionFilter] = useState("all")

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">カテゴリが見つかりません</h1>
          <p className="text-muted-foreground mb-8">お探しのカテゴリは存在しません。</p>
          <Button asChild>
            <a href="/">ホームに戻る</a>
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  const filteredSpots = category.spots.filter((spot) => {
    if (selectedSubcategory === "all") return true
    return spot.categoryLabel.toLowerCase().includes(selectedSubcategory)
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Category Header */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto text-center">
          <div className="text-6xl mb-4">{category.icon}</div>
          <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
          <p className="text-xl text-muted-foreground mb-2">{category.nameEn}</p>
          <p className="text-muted-foreground max-w-2xl mx-auto">{category.description}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Subcategories */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">サブカテゴリ:</h2>
          <div className="flex flex-wrap gap-2">
            {category.subcategories.map((sub) => (
              <Badge
                key={sub.id}
                variant={selectedSubcategory === sub.id ? "default" : "secondary"}
                className="cursor-pointer px-4 py-2 text-sm"
                onClick={() => setSelectedSubcategory(sub.id)}
              >
                {sub.icon && <span className="mr-1">{sub.icon}</span>}
                {sub.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">地域:</span>
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="border border-border rounded-md px-3 py-1 text-sm bg-background"
              >
                <option value="all">全国</option>
                <option value="kanto">関東</option>
                <option value="kansai">関西</option>
                <option value="kyushu">九州</option>
                <option value="hokkaido">北海道</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">並び:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-border rounded-md px-3 py-1 text-sm bg-background"
              >
                <option value="popular">人気順</option>
                <option value="rating">評価順</option>
                <option value="price-low">料金安い順</option>
                <option value="price-high">料金高い順</option>
              </select>
            </div>
            <Button variant="outline" size="sm">
              <MapPin className="h-4 w-4 mr-1" />
              地図
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">{filteredSpots.length}件のスポットが見つかりました</p>
        </div>

        {/* Spots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredSpots.map((spot) => (
            <SpotCard key={spot.id} spot={spot} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2">
          <Button variant="outline" disabled>
            前へ
          </Button>
          <Button variant="default" className="w-10 h-10">
            1
          </Button>
          <Button variant="outline" className="w-10 h-10 bg-transparent">
            2
          </Button>
          <Button variant="outline" className="w-10 h-10 bg-transparent">
            3
          </Button>
          <span className="text-muted-foreground">...</span>
          <Button variant="outline" className="w-10 h-10 bg-transparent">
            25
          </Button>
          <Button variant="outline">次へ</Button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
