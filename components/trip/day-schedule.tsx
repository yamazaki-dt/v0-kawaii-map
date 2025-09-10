"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Trash2, GripVertical, Car, Train, Plus } from "lucide-react"

interface DayScheduleProps {
  day: any
  onAddSpot: (spot: any) => void
  onRemoveSpot: (spotIndex: number) => void
  onUpdateSpot: (spotIndex: number, updates: any) => void
}

export function DaySchedule({ day, onAddSpot, onRemoveSpot, onUpdateSpot }: DayScheduleProps) {
  const calculateTravelTime = (fromIndex: number, toIndex: number) => {
    // Mock travel time calculation
    if (fromIndex >= 0 && toIndex < day.spots.length) {
      return Math.floor(Math.random() * 30) + 10 // 10-40 minutes
    }
    return 0
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold">{day.dayNumber}日目</h3>
              <p className="text-sm text-muted-foreground">{day.date}</p>
            </div>
            <Badge variant="secondary">{day.spots.length}スポット</Badge>
          </div>

          {day.spots.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📍</div>
              <p className="text-muted-foreground mb-4">まだスポットが追加されていません</p>
              <Button onClick={() => onAddSpot({})} variant="outline">
                最初のスポットを追加
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {day.spots.map((spot, index) => (
                <div key={spot.id || index}>
                  {/* Spot Card */}
                  <Card className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        {/* Drag Handle */}
                        <div className="flex-shrink-0 mt-2">
                          <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                        </div>

                        {/* Spot Icon */}
                        <div className="flex-shrink-0">
                          <div className="text-2xl">{spot.categoryIcon || "📍"}</div>
                        </div>

                        {/* Spot Details */}
                        <div className="flex-1 space-y-3">
                          <div>
                            <h4 className="font-medium">{spot.name || "新しいスポット"}</h4>
                            <p className="text-sm text-muted-foreground">{spot.nameEn}</p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div>
                              <label className="text-xs text-muted-foreground">開始時間</label>
                              <Input
                                type="time"
                                value={spot.startTime || ""}
                                onChange={(e) => onUpdateSpot(index, { startTime: e.target.value })}
                                className="mt-1"
                                size="sm"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-muted-foreground">滞在時間 (分)</label>
                              <Input
                                type="number"
                                min="15"
                                max="480"
                                step="15"
                                value={spot.duration || 60}
                                onChange={(e) => onUpdateSpot(index, { duration: Number.parseInt(e.target.value) })}
                                className="mt-1"
                                size="sm"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-muted-foreground">予算</label>
                              <Input
                                type="text"
                                placeholder="¥1,000"
                                value={spot.budget || ""}
                                onChange={(e) => onUpdateSpot(index, { budget: e.target.value })}
                                className="mt-1"
                                size="sm"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-xs text-muted-foreground">メモ</label>
                            <Textarea
                              placeholder="このスポットについてのメモ..."
                              value={spot.notes || ""}
                              onChange={(e) => onUpdateSpot(index, { notes: e.target.value })}
                              className="mt-1"
                              rows={2}
                            />
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex-shrink-0">
                          <Button variant="ghost" size="sm" onClick={() => onRemoveSpot(index)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Travel Time */}
                  {index < day.spots.length - 1 && (
                    <div className="flex items-center justify-center py-2">
                      <div className="flex items-center space-x-2 bg-muted px-3 py-1 rounded-full text-sm">
                        <Car className="h-3 w-3" />
                        <span>{calculateTravelTime(index, index + 1)}分</span>
                        <div className="w-8 h-px bg-border" />
                        <Train className="h-3 w-3" />
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Add Spot Button */}
              <Button variant="outline" className="w-full border-dashed bg-transparent" onClick={() => onAddSpot({})}>
                <Plus className="h-4 w-4 mr-2" />
                スポットを追加
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
