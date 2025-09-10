"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Plane, Calendar, Star, ArrowRight, Plus } from "lucide-react"

export default function MyPage() {
  const user = {
    name: "山田太郎",
    avatar: "/japanese-person-avatar.jpg",
    level: "トラベラー",
    points: 1250,
  }

  const quickStats = {
    savedSpots: 24,
    visitedSpots: 12,
    plannedTrips: 3,
    completedTrips: 2,
  }

  const recentSaves = [
    { id: 1, name: "清水寺", category: "寺院・神社", image: "/kiyomizu-temple-kyoto.jpg", rating: 4.8 },
    { id: 2, name: "富士山", category: "自然・景色", image: "/majestic-mount-fuji.png", rating: 4.9 },
    { id: 3, name: "奈良公園", category: "公園", image: "/nara-park-deer.jpg", rating: 4.7 },
  ]

  const upcomingTrips = [
    { id: 1, name: "京都3日間の旅", startDate: "2024年4月15日", spots: 8, status: "planned" },
    { id: 2, name: "大阪グルメツアー", startDate: "2024年5月20日", spots: 12, status: "draft" },
  ]

  const recommendations = [
    { id: 1, name: "金閣寺", category: "寺院・神社", reason: "清水寺を保存したため" },
    { id: 2, name: "箱根温泉", category: "温泉", reason: "自然・景色がお好みのため" },
    { id: 3, name: "築地市場", category: "グルメ", reason: "大阪グルメツアーを計画中のため" },
  ]

  return (
    <div className="min-h-screen bg-kawaii-cream">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="w-16 h-16">
                <AvatarImage src={user.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-xl bg-kawaii-mint text-kawaii-forest">山田</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-kawaii-forest">おかえりなさい、{user.name}さん！</h1>
                <div className="flex items-center gap-4 mt-2">
                  <Badge variant="secondary" className="bg-kawaii-peach text-kawaii-forest">
                    {user.level}
                  </Badge>
                  <span className="text-kawaii-sage">{user.points} ポイント</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="text-center">
                <CardContent className="pt-4">
                  <Heart className="w-8 h-8 mx-auto mb-2 text-kawaii-coral" />
                  <div className="text-2xl font-bold text-kawaii-forest">{quickStats.savedSpots}</div>
                  <div className="text-sm text-kawaii-sage">保存済み</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-4">
                  <MapPin className="w-8 h-8 mx-auto mb-2 text-kawaii-coral" />
                  <div className="text-2xl font-bold text-kawaii-forest">{quickStats.visitedSpots}</div>
                  <div className="text-sm text-kawaii-sage">訪問済み</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-4">
                  <Plane className="w-8 h-8 mx-auto mb-2 text-kawaii-coral" />
                  <div className="text-2xl font-bold text-kawaii-forest">{quickStats.plannedTrips}</div>
                  <div className="text-sm text-kawaii-sage">計画中</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-4">
                  <Calendar className="w-8 h-8 mx-auto mb-2 text-kawaii-coral" />
                  <div className="text-2xl font-bold text-kawaii-forest">{quickStats.completedTrips}</div>
                  <div className="text-sm text-kawaii-sage">完了</div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Recent Saves */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>最近保存したスポット</CardTitle>
                    <CardDescription>気になるスポットをチェック</CardDescription>
                  </div>
                  <Link href="/favorites">
                    <Button variant="ghost" size="sm">
                      すべて見る
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {recentSaves.map((spot) => (
                      <div key={spot.id} className="group cursor-pointer">
                        <div className="aspect-video rounded-lg overflow-hidden mb-3">
                          <img
                            src={spot.image || "/placeholder.svg"}
                            alt={spot.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <h3 className="font-medium text-kawaii-forest group-hover:text-kawaii-coral transition-colors">
                          {spot.name}
                        </h3>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-sm text-kawaii-sage">{spot.category}</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-kawaii-sage">{spot.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Trips */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>予定の旅行</CardTitle>
                    <CardDescription>計画中・予定の旅行プラン</CardDescription>
                  </div>
                  <Link href="/trip/create">
                    <Button size="sm" className="bg-kawaii-coral hover:bg-kawaii-coral/90">
                      <Plus className="w-4 h-4 mr-2" />
                      新規作成
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingTrips.map((trip) => (
                      <div
                        key={trip.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-kawaii-cream border"
                      >
                        <div>
                          <h3 className="font-medium text-kawaii-forest">{trip.name}</h3>
                          <div className="flex items-center gap-4 mt-1 text-sm text-kawaii-sage">
                            <span>{trip.startDate}</span>
                            <span>{trip.spots}スポット</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={trip.status === "planned" ? "default" : "secondary"}>
                            {trip.status === "planned" ? "計画済み" : "下書き"}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            編集
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>クイックアクション</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/map">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <MapPin className="w-4 h-4 mr-2" />
                      マップを見る
                    </Button>
                  </Link>
                  <Link href="/trip/create">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Plane className="w-4 h-4 mr-2" />
                      旅行を計画する
                    </Button>
                  </Link>
                  <Link href="/search">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Star className="w-4 h-4 mr-2" />
                      スポットを探す
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle>おすすめスポット</CardTitle>
                  <CardDescription>あなたにぴったりの場所</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recommendations.map((rec) => (
                      <div key={rec.id} className="p-3 rounded-lg bg-kawaii-cream border">
                        <h4 className="font-medium text-kawaii-forest">{rec.name}</h4>
                        <p className="text-sm text-kawaii-sage mt-1">{rec.category}</p>
                        <p className="text-xs text-kawaii-sage mt-2">{rec.reason}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
