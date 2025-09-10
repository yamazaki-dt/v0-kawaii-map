"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SpotCard } from "@/components/spots/spot-card"
import { Search, X } from "lucide-react"

// Mock spots for search
const mockSpots = [
  {
    id: "1",
    name: "清水寺",
    nameEn: "Kiyomizu-dera Temple",
    categoryIcon: "🏯",
    categoryLabel: "観光",
    rating: 4.8,
    reviewCount: 1234,
    description: "京都の代表的な観光地で、美しい木造建築と絶景で有名です。",
    address: "京都府京都市東山区清水1-294",
    price: "¥400",
    image: "/kiyomizu-temple-kyoto.jpg",
  },
  {
    id: "2",
    name: "東京タワー",
    nameEn: "Tokyo Tower",
    categoryIcon: "🗼",
    categoryLabel: "ランドマーク",
    rating: 4.6,
    reviewCount: 2156,
    description: "東京のシンボルタワーで、展望台からの景色が素晴らしいです。",
    address: "東京都港区芝公園4-2-8",
    price: "¥1,200",
    image: "/tokyo-tower.jpg",
  },
]

interface SpotSearchModalProps {
  onClose: () => void
  onSelectSpot: (spot: any) => void
}

export function SpotSearchModal({ onClose, onSelectSpot }: SpotSearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState(mockSpots)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      const filtered = mockSpots.filter(
        (spot) =>
          spot.name.toLowerCase().includes(query.toLowerCase()) ||
          spot.nameEn.toLowerCase().includes(query.toLowerCase()) ||
          spot.description.toLowerCase().includes(query.toLowerCase()),
      )
      setSearchResults(filtered)
    } else {
      setSearchResults(mockSpots)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>スポットを検索</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="スポット名、カテゴリ、地域で検索..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchResults.map((spot) => (
                  <div key={spot.id} onClick={() => onSelectSpot(spot)}>
                    <SpotCard spot={spot} variant="compact" showActions={false} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🔍</div>
                <p className="text-muted-foreground">検索結果が見つかりません</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
