"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Calendar, Users, Clock } from "lucide-react"

interface TripPlannerFormProps {
  tripData: any
  onDataChange: (data: any) => void
  onNext: () => void
}

export function TripPlannerForm({ tripData, onDataChange, onNext }: TripPlannerFormProps) {
  const [formData, setFormData] = useState({
    title: tripData.title || "",
    description: tripData.description || "",
    startDate: tripData.startDate || "",
    endDate: tripData.endDate || "",
    travelers: tripData.travelers || 1,
    budget: tripData.budget || "",
  })

  const handleInputChange = (field: string, value: any) => {
    const newData = { ...formData, [field]: value }
    setFormData(newData)
    onDataChange(newData)
  }

  const calculateDays = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate)
      const end = new Date(formData.endDate)
      const diffTime = Math.abs(end.getTime() - start.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
      return diffDays
    }
    return 0
  }

  const handleNext = () => {
    const days = calculateDays()
    const daysArray = Array.from({ length: days }, (_, i) => ({
      dayNumber: i + 1,
      date: new Date(new Date(formData.startDate).getTime() + i * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      spots: [],
    }))

    onDataChange({
      ...formData,
      days: daysArray,
    })
    onNext()
  }

  const isFormValid = formData.title && formData.startDate && formData.endDate && calculateDays() > 0

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🗾</div>
            <h2 className="text-2xl font-bold mb-2">旅程の基本情報</h2>
            <p className="text-muted-foreground">まずは旅行の基本的な情報を入力してください</p>
          </div>

          <div className="space-y-6">
            {/* Trip Title */}
            <div>
              <Label htmlFor="title" className="text-base font-medium">
                旅程タイトル *
              </Label>
              <Input
                id="title"
                placeholder="例: 京都3日間の旅"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="mt-2"
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-base font-medium">
                旅行の説明
              </Label>
              <Textarea
                id="description"
                placeholder="この旅行について簡単に説明してください..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="mt-2"
                rows={3}
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate" className="text-base font-medium flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  出発日 *
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="endDate" className="text-base font-medium flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  帰国日 *
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  className="mt-2"
                  min={formData.startDate}
                />
              </div>
            </div>

            {/* Trip Duration Display */}
            {calculateDays() > 0 && (
              <div className="bg-primary/10 p-4 rounded-lg">
                <div className="flex items-center text-primary">
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="font-medium">旅行期間: {calculateDays()}日間</span>
                </div>
              </div>
            )}

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="travelers" className="text-base font-medium flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  旅行者数
                </Label>
                <Input
                  id="travelers"
                  type="number"
                  min="1"
                  max="20"
                  value={formData.travelers}
                  onChange={(e) => handleInputChange("travelers", Number.parseInt(e.target.value))}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="budget" className="text-base font-medium">
                  予算 (円)
                </Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="例: 50000"
                  value={formData.budget}
                  onChange={(e) => handleInputChange("budget", e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>

            {/* Next Button */}
            <div className="pt-6">
              <Button onClick={handleNext} disabled={!isFormValid} className="w-full" size="lg">
                次へ: スケジュール作成
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
