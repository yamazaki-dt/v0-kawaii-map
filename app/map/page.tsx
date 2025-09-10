"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { MapContainer } from "@/components/map/map-container"
import { MapSidebar } from "@/components/map/map-sidebar"
import { SpotDetailPanel } from "@/components/map/spot-detail-panel"
import { Button } from "@/components/ui/button"
import { PanelLeftClose, PanelLeftOpen } from "lucide-react"

// Mock data for spots
const mockSpots = [
  {
    id: "1",
    name: "清水寺",
    nameEn: "Kiyomizu-dera Temple",
    category: "temple",
    categoryIcon: "🏯",
    latitude: 34.9949,
    longitude: 135.7851,
    rating: 4.8,
    reviewCount: 1234,
    description: "京都の代表的な観光地で、美しい木造建築と絶景で有名です。",
    descriptionEn: "A famous wooden temple in Kyoto known for its stunning architecture and panoramic views.",
    address: "京都府京都市東山区清水1-294",
    openingHours: "6:00-18:00",
    price: "¥400",
    images: ["/kiyomizu-temple-kyoto.jpg"],
  },
  {
    id: "2",
    name: "東京タワー",
    nameEn: "Tokyo Tower",
    category: "landmark",
    categoryIcon: "🗼",
    latitude: 35.6586,
    longitude: 139.7454,
    rating: 4.6,
    reviewCount: 2156,
    description: "東京のシンボルタワーで、展望台からの景色が素晴らしいです。",
    descriptionEn: "Tokyo's iconic tower offering spectacular views from its observation decks.",
    address: "東京都港区芝公園4-2-8",
    openingHours: "9:00-23:00",
    price: "¥1,200",
    images: ["/tokyo-tower.jpg"],
  },
  {
    id: "3",
    name: "富士山",
    nameEn: "Mount Fuji",
    category: "nature",
    categoryIcon: "🗻",
    latitude: 35.3606,
    longitude: 138.7274,
    rating: 4.9,
    reviewCount: 3421,
    description: "日本最高峰の美しい山で、登山や観光で人気です。",
    descriptionEn: "Japan's highest and most beautiful mountain, popular for climbing and sightseeing.",
    address: "静岡県・山梨県",
    openingHours: "24時間",
    price: "無料",
    images: ["/majestic-mount-fuji.png"],
  },
  {
    id: "4",
    name: "奈良公園",
    nameEn: "Nara Park",
    category: "nature",
    categoryIcon: "🦌",
    latitude: 34.685,
    longitude: 135.843,
    rating: 4.7,
    reviewCount: 1876,
    description: "野生の鹿と触れ合える美しい公園です。",
    descriptionEn: "A beautiful park where you can interact with wild deer.",
    address: "奈良県奈良市雑司町",
    openingHours: "24時間",
    price: "無料",
    images: ["/nara-park-deer.jpg"],
  },
  {
    id: "5",
    name: "道頓堀",
    nameEn: "Dotonbori",
    category: "food",
    categoryIcon: "🍜",
    latitude: 34.6686,
    longitude: 135.5023,
    rating: 4.5,
    reviewCount: 2987,
    description: "大阪の有名なグルメ街で、たこ焼きやお好み焼きが楽しめます。",
    descriptionEn: "Osaka's famous food district known for takoyaki and okonomiyaki.",
    address: "大阪府大阪市中央区道頓堀",
    openingHours: "店舗により異なる",
    price: "¥500-2,000",
    images: ["/dotonbori-osaka-food.jpg"],
  },
]

export default function MapPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedSpot, setSelectedSpot] = useState(null)
  const [filteredSpots, setFilteredSpots] = useState(mockSpots)
  const [mapCenter, setMapCenter] = useState([35.6762, 139.6503]) // Tokyo center
  const [mapZoom, setMapZoom] = useState(6)

  const handleSpotClick = (spot) => {
    setSelectedSpot(spot)
    setMapCenter([spot.latitude, spot.longitude])
    setMapZoom(15)
  }

  const handleFilterChange = (filters) => {
    let filtered = mockSpots

    // Filter by categories
    if (filters.categories.length > 0) {
      filtered = filtered.filter((spot) => filters.categories.includes(spot.category))
    }

    // Filter by regions (simplified - in real app would use proper region data)
    if (filters.regions.length > 0) {
      // Mock region filtering based on coordinates
      filtered = filtered.filter((spot) => {
        if (filters.regions.includes("kanto") && spot.latitude > 35 && spot.latitude < 37) return true
        if (filters.regions.includes("kansai") && spot.latitude > 34 && spot.latitude < 35.5) return true
        return filters.regions.length === 0
      })
    }

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (spot) =>
          spot.name.toLowerCase().includes(query) ||
          spot.nameEn.toLowerCase().includes(query) ||
          spot.description.toLowerCase().includes(query) ||
          spot.descriptionEn.toLowerCase().includes(query),
      )
    }

    setFilteredSpots(filtered)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div
          className={`transition-all duration-300 ${sidebarOpen ? "w-80" : "w-0"} overflow-hidden border-r border-border bg-background`}
        >
          <MapSidebar
            spots={filteredSpots}
            onFilterChange={handleFilterChange}
            onSpotClick={handleSpotClick}
            selectedSpot={selectedSpot}
          />
        </div>

        {/* Map Container */}
        <div className="flex-1 relative">
          {/* Sidebar Toggle */}
          <Button
            variant="outline"
            size="sm"
            className="absolute top-4 left-4 z-[1000] bg-background/95 backdrop-blur"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeftOpen className="h-4 w-4" />}
          </Button>

          <MapContainer
            spots={filteredSpots}
            center={mapCenter}
            zoom={mapZoom}
            onSpotClick={handleSpotClick}
            selectedSpot={selectedSpot}
          />
        </div>

        {/* Spot Detail Panel */}
        {selectedSpot && (
          <div className="w-80 border-l border-border bg-background overflow-y-auto">
            <SpotDetailPanel spot={selectedSpot} onClose={() => setSelectedSpot(null)} />
          </div>
        )}
      </div>
    </div>
  )
}
