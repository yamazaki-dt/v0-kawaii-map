"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { TripCard } from "@/components/trip/trip-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"

// Mock user trips data
const mockTrips = [
  {
    id: "1",
    title: "京都3日間の旅",
    description: "桜の季節に京都の美しい寺院を巡る旅",
    startDate: "2024-04-01",
    endDate: "2024-04-03",
    days: 3,
    spots: 8,
    estimatedBudget: 25000,
    status: "planned", // planned, ongoing, completed
    image: "/kyoto-trip-cover.jpg",
    createdAt: "2024-03-15",
    lastModified: "2024-03-20",
  },
  {
    id: "2",
    title: "大阪グルメツアー",
    description: "大阪の美味しいグルメを堪能する2日間",
    startDate: "2024-05-15",
    endDate: "2024-05-16",
    days: 2,
    spots: 6,
    estimatedBudget: 18000,
    status: "planned",
    image: "/osaka-food-tour.jpg",
    createdAt: "2024-03-10",
    lastModified: "2024-03-18",
  },
  {
    id: "3",
    title: "東京初回観光",
    description: "東京の主要観光地を効率よく回る旅程",
    startDate: "2024-03-01",
    endDate: "2024-03-03",
    days: 3,
    spots: 12,
    estimatedBudget: 32000,
    status: "completed",
    image: "/tokyo-sightseeing.jpg",
    createdAt: "2024-02-20",
    lastModified: "2024-03-05",
  },
]

export default function MyTripsPage() {
  const [trips, setTrips] = useState(mockTrips)
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredTrips = trips.filter((trip) => {
    if (filterStatus === "all") return true
    return trip.status === filterStatus
  })

  const stats = {
    total: trips.length,
    planned: trips.filter((t) => t.status === "planned").length,
    completed: trips.filter((t) => t.status === "completed").length,
    totalSpots: trips.reduce((sum, trip) => sum + trip.spots, 0),
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">マイ旅程</h1>
            <p className="text-muted-foreground">あなたの旅行計画を管理しましょう</p>
          </div>
          <Button asChild size="lg">
            <a href="/trip/create">
              <Plus className="h-5 w-5 mr-2" />
              新しい旅程を作成
            </a>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{stats.total}</div>
              <div className="text-sm text-muted-foreground">総旅程数</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{stats.planned}</div>
              <div className="text-sm text-muted-foreground">計画中</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">{stats.completed}</div>
              <div className="text-sm text-muted-foreground">完了済み</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">{stats.totalSpots}</div>
              <div className="text-sm text-muted-foreground">訪問予定スポット</div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg w-fit">
          {[
            { id: "all", label: "すべて" },
            { id: "planned", label: "計画中" },
            { id: "ongoing", label: "進行中" },
            { id: "completed", label: "完了済み" },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setFilterStatus(filter.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filterStatus === filter.id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Trips Grid */}
        {filteredTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">✈️</div>
            <h2 className="text-xl font-bold mb-2">旅程がありません</h2>
            <p className="text-muted-foreground mb-6">新しい旅程を作成して、素晴らしい日本旅行を計画しましょう！</p>
            <Button asChild>
              <a href="/trip/create">
                <Plus className="h-4 w-4 mr-2" />
                最初の旅程を作成
              </a>
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
