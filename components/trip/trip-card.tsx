import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, DollarSign, MoreHorizontal, Edit, Trash2, Share } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface TripCardProps {
  trip: {
    id: string
    title: string
    description: string
    startDate: string
    endDate: string
    days: number
    spots: number
    estimatedBudget: number
    status: "planned" | "ongoing" | "completed"
    image: string
    createdAt: string
    lastModified: string
  }
}

const statusConfig = {
  planned: { label: "計画中", color: "bg-blue-100 text-blue-800" },
  ongoing: { label: "進行中", color: "bg-green-100 text-green-800" },
  completed: { label: "完了済み", color: "bg-gray-100 text-gray-800" },
}

export function TripCard({ trip }: TripCardProps) {
  const status = statusConfig[trip.status]

  return (
    <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
      <CardContent className="p-0">
        {/* Image */}
        <div className="aspect-video bg-muted overflow-hidden rounded-t-lg relative">
          <img
            src={trip.image || "/placeholder.svg"}
            alt={trip.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2">
            <Badge className={status.color}>{status.label}</Badge>
          </div>
          <div className="absolute top-2 right-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="bg-white/90 hover:bg-white">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Edit className="h-4 w-4 mr-2" />
                  編集
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share className="h-4 w-4 mr-2" />
                  共有
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  削除
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-1">{trip.title}</h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{trip.description}</p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>
                {trip.startDate} - {trip.endDate}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{trip.spots}スポット</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>¥{trip.estimatedBudget.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button asChild className="flex-1">
              <a href={`/trip/${trip.id}`}>詳細を見る</a>
            </Button>
            <Button variant="outline" asChild>
              <a href={`/trip/${trip.id}/edit`}>編集</a>
            </Button>
          </div>

          <div className="mt-3 text-xs text-muted-foreground">
            最終更新: {new Date(trip.lastModified).toLocaleDateString("ja-JP")}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
