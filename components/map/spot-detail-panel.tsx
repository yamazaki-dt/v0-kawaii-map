"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { X, Star, MapPin, Clock, DollarSign, Heart, Calendar, Share, Navigation } from "lucide-react"

export function SpotDetailPanel({ spot, onClose }) {
  if (!spot) return null

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="text-center">
          <div className="text-4xl mb-2">{spot.categoryIcon}</div>
          <h1 className="text-xl font-bold mb-1">{spot.name}</h1>
          <p className="text-muted-foreground text-sm">{spot.nameEn}</p>

          <div className="flex items-center justify-center mt-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="font-medium">{spot.rating}</span>
            <span className="text-muted-foreground ml-1">({spot.reviewCount}件)</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Image */}
        <div className="aspect-video bg-muted rounded-lg overflow-hidden">
          <img src={spot.images[0] || "/placeholder.svg"} alt={spot.name} className="w-full h-full object-cover" />
        </div>

        {/* Basic Info */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-start space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <span className="text-sm">{spot.address}</span>
            </div>

            <div className="flex items-start space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <span className="text-sm">{spot.openingHours}</span>
            </div>

            <div className="flex items-start space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <span className="text-sm">{spot.price}</span>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">説明</h3>
            <p className="text-sm text-muted-foreground mb-3">{spot.description}</p>
            <p className="text-sm text-muted-foreground">{spot.descriptionEn}</p>
          </CardContent>
        </Card>

        {/* Access */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-3">アクセス</h3>
            <div className="aspect-video bg-muted rounded-lg mb-3 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">小さな地図</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                <Navigation className="h-4 w-4 mr-1" />
                ルートを見る
              </Button>
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                ナビアプリで開く
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Nearby Recommendations */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-3">近くのおすすめ</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                🍜 湯豆腐料理
              </Badge>
              <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                🏮 祇園
              </Badge>
              <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                🎋 竹林の道
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-border space-y-2">
        <Button className="w-full">
          <Calendar className="h-4 w-4 mr-2" />
          旅程に追加
        </Button>
        <Button variant="outline" className="w-full bg-transparent">
          <Heart className="h-4 w-4 mr-2" />
          お気に入り
        </Button>
      </div>
    </div>
  )
}
