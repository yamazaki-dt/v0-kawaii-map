"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Clock,
  Star,
  Calendar,
  Heart,
  Share2,
  Download,
  ChevronLeft,
  Navigation,
  Camera,
  Utensils,
  Train,
} from "lucide-react"

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const [isFavorited, setIsFavorited] = useState(false)

  // Mock data - in real app, fetch based on params.id
  const course = {
    id: 1,
    title: "京都の古都を巡る3日間",
    description:
      "伝統的な寺院と美しい庭園を楽しむ定番コース。京都の魅力を効率よく回れるように設計された初心者にもおすすめのプランです。",
    duration: "3日間",
    region: "関西",
    theme: "文化・歴史",
    difficulty: "初級",
    rating: 4.8,
    reviewCount: 124,
    price: "¥45,000〜",
    image: "/kyoto-traditional-course.jpg",
    highlights: ["清水寺", "金閣寺", "嵐山", "祇園"],
    tags: ["寺院", "庭園", "伝統文化", "写真映え"],
    totalDistance: "約25km",
    estimatedCost: "¥45,000 - ¥65,000",
    bestSeason: "春・秋",
    author: {
      name: "京都観光ガイド 田中",
      avatar: "/guide-avatar.jpg",
      experience: "10年以上",
    },
  }

  const itinerary = [
    {
      day: 1,
      title: "東山エリア散策",
      spots: [
        {
          time: "09:00",
          name: "清水寺",
          duration: "90分",
          description: "京都を代表する寺院で朝の静寂を楽しむ",
          image: "/kiyomizu-temple-kyoto.jpg",
          category: "寺院",
          tips: "朝早めの訪問がおすすめ。混雑を避けられます。",
        },
        {
          time: "11:00",
          name: "三年坂・二年坂",
          duration: "60分",
          description: "伝統的な街並みでお土産探し",
          image: "/kyoto-traditional-street.jpg",
          category: "街歩き",
          tips: "石畳は滑りやすいので歩きやすい靴で。",
        },
        {
          time: "12:30",
          name: "祇園でランチ",
          duration: "90分",
          description: "京料理を味わう",
          image: "/kyoto-kaiseki.jpg",
          category: "グルメ",
          tips: "予約推奨。湯豆腐や京懐石がおすすめ。",
        },
        {
          time: "15:00",
          name: "八坂神社",
          duration: "45分",
          description: "縁結びで有名な神社",
          image: "/yasaka-shrine.jpg",
          category: "神社",
          tips: "夕方の参拝も美しいです。",
        },
      ],
    },
    {
      day: 2,
      title: "金閣寺と嵐山",
      spots: [
        {
          time: "09:00",
          name: "金閣寺",
          duration: "60分",
          description: "黄金に輝く美しい寺院",
          image: "/kinkaku-temple.jpg",
          category: "寺院",
          tips: "朝の光で金閣が美しく輝きます。",
        },
        {
          time: "11:00",
          name: "龍安寺",
          duration: "45分",
          description: "石庭で有名な禅寺",
          image: "/ryoan-temple.jpg",
          category: "寺院",
          tips: "静寂の中で石庭を眺める時間を大切に。",
        },
        {
          time: "13:00",
          name: "嵐山竹林",
          duration: "60分",
          description: "幻想的な竹林の小径",
          image: "/arashiyama-bamboo.jpg",
          category: "自然",
          tips: "午後の柔らかい光が竹林を美しく照らします。",
        },
        {
          time: "15:00",
          name: "天龍寺",
          duration: "75分",
          description: "美しい庭園で有名な寺院",
          image: "/tenryu-temple.jpg",
          category: "寺院",
          tips: "庭園からの嵐山の眺めは絶景です。",
        },
      ],
    },
    {
      day: 3,
      title: "伏見稲荷と宇治",
      spots: [
        {
          time: "09:00",
          name: "伏見稲荷大社",
          duration: "120分",
          description: "千本鳥居で有名な神社",
          image: "/fushimi-inari.jpg",
          category: "神社",
          tips: "山頂まで登ると約2時間。体力に合わせて調整を。",
        },
        {
          time: "12:00",
          name: "宇治平等院",
          duration: "90分",
          description: "10円硬貨でおなじみの寺院",
          image: "/byodo-in.jpg",
          category: "寺院",
          tips: "庭園も美しいので時間に余裕を持って。",
        },
        {
          time: "14:30",
          name: "宇治茶体験",
          duration: "60分",
          description: "本場の抹茶を味わう",
          image: "/uji-matcha.jpg",
          category: "体験",
          tips: "茶道体験もできる店舗があります。",
        },
      ],
    },
  ]

  const reviews = [
    {
      id: 1,
      user: "旅行好きさん",
      avatar: "/user1-avatar.jpg",
      rating: 5,
      date: "2024年3月10日",
      comment:
        "初めての京都旅行でしたが、このコースのおかげで効率よく回れました！特に清水寺の朝の静けさは感動的でした。",
    },
    {
      id: 2,
      user: "京都リピーター",
      avatar: "/user2-avatar.jpg",
      rating: 4,
      date: "2024年2月28日",
      comment:
        "定番スポットを押さえた良いコースです。ただし、春の桜シーズンは混雑するので時間に余裕を持った方が良いです。",
    },
  ]

  return (
    <div className="min-h-screen bg-kawaii-cream">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/courses">
            <Button variant="ghost" className="mb-6">
              <ChevronLeft className="w-4 h-4 mr-2" />
              コース一覧に戻る
            </Button>
          </Link>

          {/* Hero Section */}
          <Card className="mb-8 overflow-hidden">
            <div className="aspect-video overflow-hidden">
              <img
                src={course.image || "/placeholder.svg?height=400&width=800&query=kyoto traditional temples"}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="bg-kawaii-mint text-kawaii-forest">
                      {course.region}
                    </Badge>
                    <Badge variant="outline">{course.theme}</Badge>
                    <Badge variant="outline">{course.difficulty}</Badge>
                  </div>
                  <h1 className="text-3xl font-bold text-kawaii-forest mb-4">{course.title}</h1>
                  <p className="text-kawaii-sage mb-4">{course.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-kawaii-sage" />
                      <div>
                        <div className="text-sm text-kawaii-sage">期間</div>
                        <div className="font-medium text-kawaii-forest">{course.duration}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Navigation className="w-5 h-5 text-kawaii-sage" />
                      <div>
                        <div className="text-sm text-kawaii-sage">総距離</div>
                        <div className="font-medium text-kawaii-forest">{course.totalDistance}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <div>
                        <div className="text-sm text-kawaii-sage">評価</div>
                        <div className="font-medium text-kawaii-forest">
                          {course.rating} ({course.reviewCount})
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-kawaii-sage" />
                      <div>
                        <div className="text-sm text-kawaii-sage">ベストシーズン</div>
                        <div className="font-medium text-kawaii-forest">{course.bestSeason}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={course.author.avatar || "/placeholder.svg"} />
                      <AvatarFallback>田中</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-kawaii-forest">{course.author.name}</div>
                      <div className="text-sm text-kawaii-sage">ガイド歴 {course.author.experience}</div>
                    </div>
                  </div>
                </div>

                <div className="lg:w-80">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center mb-4">
                        <div className="text-2xl font-bold text-kawaii-coral mb-1">{course.estimatedCost}</div>
                        <div className="text-sm text-kawaii-sage">推定費用（1人あたり）</div>
                      </div>
                      <div className="space-y-3">
                        <Button className="w-full bg-kawaii-coral hover:bg-kawaii-coral/90">
                          このコースで旅行を計画
                        </Button>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-transparent"
                            onClick={() => setIsFavorited(!isFavorited)}
                          >
                            <Heart className={`w-4 h-4 mr-2 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
                            保存
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            <Share2 className="w-4 h-4 mr-2" />
                            シェア
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Tabs */}
          <Tabs defaultValue="itinerary" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="itinerary">詳細スケジュール</TabsTrigger>
              <TabsTrigger value="info">旅行情報</TabsTrigger>
              <TabsTrigger value="reviews">レビュー ({course.reviewCount})</TabsTrigger>
            </TabsList>

            <TabsContent value="itinerary">
              <div className="space-y-6">
                {itinerary.map((day) => (
                  <Card key={day.day}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge className="bg-kawaii-coral text-white">Day {day.day}</Badge>
                        {day.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {day.spots.map((spot, index) => (
                          <div key={index} className="flex gap-4 p-4 rounded-lg bg-kawaii-cream border">
                            <div className="flex-shrink-0 w-16 text-center">
                              <div className="text-sm font-medium text-kawaii-forest">{spot.time}</div>
                              <div className="text-xs text-kawaii-sage">{spot.duration}</div>
                            </div>
                            <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                              <img
                                src={spot.image || "/placeholder.svg?height=80&width=80&query=kyoto temple"}
                                alt={spot.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-medium text-kawaii-forest">{spot.name}</h4>
                                <Badge variant="outline" className="text-xs">
                                  {spot.category}
                                </Badge>
                              </div>
                              <p className="text-sm text-kawaii-sage mb-2">{spot.description}</p>
                              <div className="flex items-start gap-2">
                                <Camera className="w-4 h-4 text-kawaii-sage mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-kawaii-sage">{spot.tips}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="info">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Train className="w-5 h-5" />
                      交通・アクセス
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-kawaii-forest mb-2">推奨交通手段</h4>
                      <ul className="text-sm text-kawaii-sage space-y-1">
                        <li>• 京都市バス1日券（600円）</li>
                        <li>• 地下鉄・私鉄の1日券</li>
                        <li>• 徒歩での移動も含む</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-kawaii-forest mb-2">主要駅からのアクセス</h4>
                      <ul className="text-sm text-kawaii-sage space-y-1">
                        <li>• 京都駅から清水寺：バス約15分</li>
                        <li>• 京都駅から金閣寺：バス約40分</li>
                        <li>• 京都駅から伏見稲荷：JR約5分</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Utensils className="w-5 h-5" />
                      グルメ・お土産
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-kawaii-forest mb-2">おすすめグルメ</h4>
                      <ul className="text-sm text-kawaii-sage space-y-1">
                        <li>• 湯豆腐（嵐山・清水寺周辺）</li>
                        <li>• 京懐石（祇園エリア）</li>
                        <li>• 抹茶スイーツ（宇治）</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-kawaii-forest mb-2">人気のお土産</h4>
                      <ul className="text-sm text-kawaii-sage space-y-1">
                        <li>• 宇治茶・抹茶菓子</li>
                        <li>• 京都の伝統工芸品</li>
                        <li>• 清水焼・京扇子</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              <div className="space-y-6">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={review.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{review.user[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-kawaii-forest">{review.user}</span>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-kawaii-sage">{review.date}</span>
                          </div>
                          <p className="text-kawaii-sage">{review.comment}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
