import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, DollarSign, Clock } from "lucide-react"

interface TripSummaryProps {
  tripData: any
}

export function TripSummary({ tripData }: TripSummaryProps) {
  const totalSpots = tripData.days?.reduce((sum, day) => sum + day.spots.length, 0) || 0
  const totalDuration =
    tripData.days?.reduce(
      (sum, day) => sum + day.spots.reduce((daySum, spot) => daySum + (spot.duration || 0), 0),
      0,
    ) || 0

  const estimatedBudget =
    tripData.days?.reduce(
      (sum, day) =>
        sum +
        day.spots.reduce((daySum, spot) => {
          const budget = spot.budget ? Number.parseInt(spot.budget.replace(/[¥,]/g, "")) || 0 : 0
          return daySum + budget
        }, 0),
      0,
    ) || 0

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-6">
          <h3 className="font-bold text-lg mb-4">旅程サマリー</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">総日数</span>
              </div>
              <Badge variant="secondary">{tripData.days?.length || 0}日</Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">スポット数</span>
              </div>
              <Badge variant="secondary">{totalSpots}個</Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">総滞在時間</span>
              </div>
              <Badge variant="secondary">{Math.round(totalDuration / 60)}時間</Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">予想予算</span>
              </div>
              <Badge variant="secondary">¥{estimatedBudget.toLocaleString()}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Route Map Placeholder */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-bold text-lg mb-4">ルートマップ</h3>
          <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapPin className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm">ルートマップ</p>
              <p className="text-xs">🏯 → 🗼 → 🍜</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
