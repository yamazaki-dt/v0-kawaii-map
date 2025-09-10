"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SpotCard } from "@/components/spots/spot-card"
import { SearchFilters } from "@/components/search/search-filters"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, SlidersHorizontal } from "lucide-react"

// Mock search results
const mockSearchResults = [
  {
    id: "1",
    name: "清水寺",
    nameEn: "Kiyomizu-dera Temple",
    category: "temple",
    categoryIcon: "🏯",
    categoryLabel: "観光",
    rating: 4.8,
    reviewCount: 1234,
    description: "京都の代表的な観光地で、美しい木造建築と絶景で有名です。",
    address: "京都府京都市東山区清水1-294",
    price: "¥400",
    image: "/kiyomizu-temple-kyoto.jpg",
    distance: "2.3km",
  },
  {
    id: "2",
    name: "金閣寺",
    nameEn: "Kinkaku-ji Temple",
    category: "temple",
    categoryIcon: "🏯",
    categoryLabel: "観光",
    rating: 4.9,
    reviewCount: 2156,
    description: "金色に輝く美しい寺院で、京都の象徴的な建物です。",
    address: "京都府京都市北区金閣寺町1",
    price: "¥500",
    image: "/golden-pavilion-temple.jpg",
    distance: "5.1km",
  },
  {
    id: "3",
    name: "銀閣寺",
    nameEn: "Ginkaku-ji Temple",
    category: "temple",
    categoryIcon: "🏯",
    categoryLabel: "観光",
    rating: 4.7,
    reviewCount: 1876,
    description: "静寂な美しさで知られる銀閣寺は、日本庭園も見どころです。",
    address: "京都府京都市左京区銀閣寺町2",
    price: "¥500",
    image: "/silver-pavilion-temple.jpg",
    distance: "3.8km",
  },
]

const relatedKeywords = ["京都 神社", "京都 庭園", "奈良 寺", "大阪 観光", "東京 寺院"]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [results, setResults] = useState(mockSearchResults)
  const [sortBy, setSortBy] = useState("popular")
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const resultsPerPage = 10

  useEffect(() => {
    // Simulate search API call
    if (searchQuery) {
      // Filter results based on search query
      const filtered = mockSearchResults.filter(
        (spot) =>
          spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          spot.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
          spot.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setResults(filtered)
    } else {
      setResults(mockSearchResults)
    }
  }, [searchQuery])

  const handleSearch = (e) => {
    e.preventDefault()
    // Update URL with search query
    const url = new URL(window.location.href)
    url.searchParams.set("q", searchQuery)
    window.history.pushState({}, "", url)
  }

  const handleSortChange = (newSort) => {
    setSortBy(newSort)
    // Sort results based on selection
    const sorted = [...results].sort((a, b) => {
      switch (newSort) {
        case "rating":
          return b.rating - a.rating
        case "price-low":
          return Number.parseInt(a.price.replace(/[¥,]/g, "")) - Number.parseInt(b.price.replace(/[¥,]/g, ""))
        case "price-high":
          return Number.parseInt(b.price.replace(/[¥,]/g, "")) - Number.parseInt(a.price.replace(/[¥,]/g, ""))
        case "distance":
          return Number.parseFloat(a.distance) - Number.parseFloat(b.distance)
        default: // popular
          return b.reviewCount - a.reviewCount
      }
    })
    setResults(sorted)
  }

  const totalPages = Math.ceil(results.length / resultsPerPage)
  const startIndex = (currentPage - 1) * resultsPerPage
  const endIndex = startIndex + resultsPerPage
  const currentResults = results.slice(startIndex, endIndex)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="スポット、グルメ、体験を検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
              <Button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                検索
              </Button>
            </div>
          </form>

          {searchQuery && (
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold mb-2">
                "{searchQuery}" の検索結果 ({results.length}件)
              </h1>
            </div>
          )}
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="bg-transparent">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            フィルター
          </Button>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">並び替え:</span>
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="border border-border rounded-md px-3 py-1 text-sm bg-background"
            >
              <option value="popular">人気順</option>
              <option value="rating">評価順</option>
              <option value="price-low">料金安い順</option>
              <option value="price-high">料金高い順</option>
              <option value="distance">距離順</option>
            </select>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mb-6">
            <SearchFilters onFilterChange={(filters) => console.log("Filters:", filters)} />
          </div>
        )}

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentResults.map((spot) => (
            <SpotCard key={spot.id} spot={spot} />
          ))}
        </div>

        {/* No Results */}
        {results.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-xl font-bold mb-2">検索結果が見つかりません</h2>
            <p className="text-muted-foreground mb-6">別のキーワードで検索してみてください</p>
            <div className="flex flex-wrap justify-center gap-2">
              {relatedKeywords.map((keyword) => (
                <Badge
                  key={keyword}
                  variant="secondary"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => setSearchQuery(keyword)}
                >
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Related Keywords */}
        {results.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">関連キーワード</h3>
            <div className="flex flex-wrap gap-2">
              {relatedKeywords.map((keyword) => (
                <Badge
                  key={keyword}
                  variant="secondary"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => setSearchQuery(keyword)}
                >
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <Button variant="outline" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
              前へ
            </Button>

            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i + 1}
                variant={currentPage === i + 1 ? "default" : "outline"}
                onClick={() => setCurrentPage(i + 1)}
                className="w-10 h-10"
              >
                {i + 1}
              </Button>
            ))}

            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              次へ
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
