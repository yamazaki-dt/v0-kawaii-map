import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, Plus, MapPin } from "lucide-react"

interface SpotCardProps {
  spot: {
    id: string
    name: string
    nameEn: string
    categoryIcon: string
    categoryLabel: string
    rating: number
    reviewCount: number
    description: string
    address: string
    price: string
    image: string
    distance?: string
  }
  variant?: "default" | "compact"
  showActions?: boolean
}

export function SpotCard({ spot, variant = "default", showActions = true }: SpotCardProps) {
  if (variant === "compact") {
    return (
      <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="text-2xl group-hover:scale-110 transition-transform">{spot.categoryIcon}</div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm truncate">{spot.name}</h3>
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
    )
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1">
      <CardContent className="p-0">
        {/* Image */}
        <div className="aspect-video bg-muted overflow-hidden rounded-t-lg relative">
          <img
            src={spot.image || "/placeholder.svg"}
            alt={spot.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="bg-white/90 text-foreground">
              {spot.categoryLabel}
            </Badge>
          </div>
          {spot.distance && (
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-white/90 text-foreground">
                <MapPin className="h-3 w-3 mr-1" />
                {spot.distance}
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1 line-clamp-1">{spot.name}</h3>
              <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{spot.nameEn}</p>
            </div>
            <div className="text-2xl ml-2">{spot.categoryIcon}</div>
          </div>

          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{spot.description}</p>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="font-medium">{spot.rating}</span>
              <span className="text-muted-foreground text-sm ml-1">({spot.reviewCount})</span>
            </div>
            <span className="font-medium text-primary">{spot.price}</span>
          </div>

          <p className="text-xs text-muted-foreground mb-4 line-clamp-1">{spot.address}</p>

          {showActions && (
            <div className="flex space-x-2">
              <Button asChild className="flex-1">
                <a href={`/spot/${spot.id}`}>詳細</a>
              </Button>
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
