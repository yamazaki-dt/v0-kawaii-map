"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Star, MapPin, Clock, DollarSign, Heart, Share, Calendar, Navigation, Camera } from "lucide-react"

// Mock spot data - in real app would fetch from API
const mockSpots = {
  "1": {
    id: "1",
    name: "清水寺",
    nameEn: "Kiyomizu-dera Temple",
    category: "temple",
    categoryIcon: "🏯",
    categoryLabel: "観光",
    categoryLabelEn: "Sightseeing",
    latitude: 34.9949,
    longitude: 135.7851,
    rating: 4.8,
    reviewCount: 1234,
    description:
      "京都の代表的な観光地で、美しい木造建築と絶景で有名です。清水の舞台から京都市内を一望できる素晴らしい景色が楽しめます。",
    descriptionEn:
      "A famous wooden temple in Kyoto known for its stunning architecture and panoramic views. The wooden stage offers breathtaking views of Kyoto city.",
    address: "京都府京都市東山区清水1-294",
    addressEn: "1-294 Kiyomizu, Higashiyama Ward, Kyoto",
    openingHours: "6:00-18:00",
    openingHoursEn: "6:00 AM - 6:00 PM",
    price: "¥400 (大人)",
    priceEn: "¥400 (Adult)",
    access: "清水五条駅から徒歩10分",
    accessEn: "10 min walk from Kiyomizu-Gojo Station",
    images: [
      "/kiyomizu-temple-kyoto.jpg",
      "/kiyomizu-temple-interior.jpg",
      "/kiyomizu-temple-garden.jpg",
      "/kiyomizu-temple-night-view.jpg",
    ],
    nearbySpots: [
      { id: "nearby1", name: "湯豆腐料理", nameEn: "Yudofu Restaurant", icon: "🍜", distance: "200m" },
      { id: "nearby2", name: "祇園", nameEn: "Gion District", icon: "🏮", distance: "800m" },
      { id: "nearby3", name: "竹林の道", nameEn: "Bamboo Grove", icon: "🎋", distance: "1.2km" },
    ],
    reviews: [
      {
        id: "r1",
        user: "田中さん",
        userEn: "Tanaka-san",
        rating: 5,
        comment: "素晴らしい景色でした！桜の季節に行くのがおすすめです。",
        commentEn: "Amazing views! I recommend visiting during cherry blossom season.",
        date: "2024-03-15",
      },
      {
        id: "r2",
        user: "山田さん",
        userEn: "Yamada-san",
        rating: 4,
        comment: "歴史を感じる美しい建物です。少し混雑していましたが、行く価値があります。",
        commentEn: "Beautiful historic building. A bit crowded but worth the visit.",
        date: "2024-03-10",
      },
    ],
  },
}

export default function SpotDetailPage() {
  const params = useParams()
  const spotId = params.id as string
  const spot = mockSpots[spotId]
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  if (!spot) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">スポットが見つかりません</h1>
          <p className="text-muted-foreground mb-8">お探しのスポットは存在しないか、削除された可能性があります。</p>
          <Button asChild>
            <a href="/map">地図に戻る</a>
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Button variant="ghost" asChild>
          <a href="/map" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            戻る
          </a>
        </Button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="text-center">
              <div className="text-6xl mb-4">{spot.categoryIcon}</div>
              <h1 className="text-3xl font-bold mb-2">{spot.name}</h1>
              <p className="text-xl text-muted-foreground mb-4">{spot.nameEn}</p>

              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-medium text-lg">{spot.rating}</span>
                  <span className="text-muted-foreground ml-1">({spot.reviewCount}件)</span>
                </div>
                <Badge variant="secondary">{spot.categoryLabel}</Badge>
              </div>

              <div className="flex justify-center space-x-2">
                <Button variant={isFavorite ? "default" : "outline"} onClick={() => setIsFavorite(!isFavorite)}>
                  <Heart className={`h-4 w-4 mr-2 ${isFavorite ? "fill-current" : ""}`} />
                  お気に入り
                </Button>
                <Button variant="outline">
                  <Share className="h-4 w-4 mr-2" />
                  共有
                </Button>
              </div>
            </div>

            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video bg-muted overflow-hidden rounded-t-lg">
                  <img
                    src={spot.images[selectedImageIndex] || "/placeholder.svg"}
                    alt={spot.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex space-x-2 overflow-x-auto">
                    {spot.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImageIndex === index ? "border-primary" : "border-transparent"
                        }`}
                      >
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`${spot.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-muted-foreground">
                      {selectedImageIndex + 1} / {spot.images.length}
                    </span>
                    <Button variant="ghost" size="sm">
                      <Camera className="h-4 w-4 mr-1" />
                      もっと見る
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">説明</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">{spot.description}</p>
                <p className="text-muted-foreground leading-relaxed">{spot.descriptionEn}</p>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">レビュー</h2>
                <div className="space-y-4">
                  {spot.reviews.map((review) => (
                    <div key={review.id} className="border-b border-border pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">{review.user[0]}</span>
                          </div>
                          <span className="font-medium">{review.user}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{review.comment}</p>
                      <p className="text-sm text-muted-foreground">{review.commentEn}</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  すべてのレビューを見る
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Details and Actions */}
          <div className="space-y-6">
            {/* Basic Info */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-bold mb-4">基本情報</h2>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm">{spot.address}</p>
                      <p className="text-sm text-muted-foreground">{spot.addressEn}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm">{spot.openingHours}</p>
                      <p className="text-sm text-muted-foreground">{spot.openingHoursEn}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <DollarSign className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm">{spot.price}</p>
                      <p className="text-sm text-muted-foreground">{spot.priceEn}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Access */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">アクセス</h2>

                <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">小さな地図</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-sm">{spot.access}</p>
                  <p className="text-sm text-muted-foreground">{spot.accessEn}</p>
                </div>

                <div className="space-y-2">
                  <Button variant="outline" className="w-full bg-transparent">
                    <Navigation className="h-4 w-4 mr-2" />
                    ルートを見る
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    ナビアプリで開く
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Nearby Spots */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">近くのおすすめ</h2>
                <div className="space-y-3">
                  {spot.nearbySpots.map((nearbySpot) => (
                    <div
                      key={nearbySpot.id}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    >
                      <div className="text-2xl">{nearbySpot.icon}</div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{nearbySpot.name}</p>
                        <p className="text-xs text-muted-foreground">{nearbySpot.nameEn}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {nearbySpot.distance}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button className="w-full" size="lg">
                <Calendar className="h-5 w-5 mr-2" />
                旅程に追加
              </Button>
              <Button variant="outline" className="w-full bg-transparent" size="lg">
                <Heart className="h-5 w-5 mr-2" />
                お気に入りに追加
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
