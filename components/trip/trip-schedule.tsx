"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DaySchedule } from "./day-schedule"
import { SpotSearchModal } from "./spot-search-modal"
import { ArrowLeft, ArrowRight, Plus } from "lucide-react"

interface TripScheduleProps {
  tripData: any
  onDataChange: (data: any) => void
  onBack: () => void
  onNext: () => void
}

export function TripSchedule({ tripData, onDataChange, onBack, onNext }: TripScheduleProps) {
  const [selectedDay, setSelectedDay] = useState(1)
  const [showSpotSearch, setShowSpotSearch] = useState(false)

  const handleAddSpot = (dayNumber: number, spot: any) => {
    const updatedDays = tripData.days.map((day) => {
      if (day.dayNumber === dayNumber) {
        return {
          ...day,
          spots: [
            ...day.spots,
            {
              id: `${dayNumber}-${day.spots.length + 1}`,
              spotId: spot.id,
              name: spot.name,
              nameEn: spot.nameEn,
              categoryIcon: spot.categoryIcon,
              startTime: "",
              duration: 60, // minutes
              notes: "",
              ...spot,
            },
          ],
        }
      }
      return day
    })

    onDataChange({ ...tripData, days: updatedDays })
  }

  const handleRemoveSpot = (dayNumber: number, spotIndex: number) => {
    const updatedDays = tripData.days.map((day) => {
      if (day.dayNumber === dayNumber) {
        return {
          ...day,
          spots: day.spots.filter((_, index) => index !== spotIndex),
        }
      }
      return day
    })

    onDataChange({ ...tripData, days: updatedDays })
  }

  const handleUpdateSpot = (dayNumber: number, spotIndex: number, updates: any) => {
    const updatedDays = tripData.days.map((day) => {
      if (day.dayNumber === dayNumber) {
        return {
          ...day,
          spots: day.spots.map((spot, index) => (index === spotIndex ? { ...spot, ...updates } : spot)),
        }
      }
      return day
    })

    onDataChange({ ...tripData, days: updatedDays })
  }

  const currentDay = tripData.days.find((day) => day.dayNumber === selectedDay)

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">スケジュール作成</h2>
            <Button onClick={() => setShowSpotSearch(true)} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              スポット追加
            </Button>
          </div>

          {/* Day Tabs */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {tripData.days.map((day) => (
              <Button
                key={day.dayNumber}
                variant={selectedDay === day.dayNumber ? "default" : "outline"}
                onClick={() => setSelectedDay(day.dayNumber)}
                className="flex-shrink-0"
              >
                <Badge variant="secondary" className="mr-2">
                  {day.dayNumber}
                </Badge>
                {day.dayNumber}日目
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Day Schedule */}
      {currentDay && (
        <DaySchedule
          day={currentDay}
          onAddSpot={(spot) => handleAddSpot(selectedDay, spot)}
          onRemoveSpot={(spotIndex) => handleRemoveSpot(selectedDay, spotIndex)}
          onUpdateSpot={(spotIndex, updates) => handleUpdateSpot(selectedDay, spotIndex, updates)}
        />
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          基本情報に戻る
        </Button>
        <Button onClick={onNext}>
          確認画面へ
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* Spot Search Modal */}
      {showSpotSearch && (
        <SpotSearchModal
          onClose={() => setShowSpotSearch(false)}
          onSelectSpot={(spot) => {
            handleAddSpot(selectedDay, spot)
            setShowSpotSearch(false)
          }}
        />
      )}
    </div>
  )
}
