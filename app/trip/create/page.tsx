"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { TripPlannerForm } from "@/components/trip/trip-planner-form"
import { TripSchedule } from "@/components/trip/trip-schedule"
import { TripSummary } from "@/components/trip/trip-summary"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Save, Share, Printer } from "lucide-react"

export default function CreateTripPage() {
  const [tripData, setTripData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    days: [],
  })

  const [currentStep, setCurrentStep] = useState(1) // 1: Basic Info, 2: Planning, 3: Review

  const handleTripDataChange = (newData) => {
    setTripData({ ...tripData, ...newData })
  }

  const handleSaveTrip = () => {
    // Save trip logic
    console.log("Saving trip:", tripData)
    // Redirect to trip detail page
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Header */}
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <a href="/trip/my" className="flex items-center">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  戻る
                </a>
              </Button>
              <div>
                <h1 className="text-2xl font-bold">新しい旅程を作成</h1>
                <p className="text-muted-foreground">あなただけの特別な日本旅行を計画しましょう</p>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" disabled={!tripData.title}>
                <Save className="h-4 w-4 mr-2" />
                保存
              </Button>
              <Button variant="outline" disabled={!tripData.title}>
                <Share className="h-4 w-4 mr-2" />
                共有
              </Button>
              <Button variant="outline" disabled={!tripData.title}>
                <Printer className="h-4 w-4 mr-2" />
                印刷
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center space-x-4 mb-8">
          {[
            { step: 1, label: "基本情報", labelEn: "Basic Info" },
            { step: 2, label: "スケジュール", labelEn: "Schedule" },
            { step: 3, label: "確認", labelEn: "Review" },
          ].map((item) => (
            <div key={item.step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= item.step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {item.step}
              </div>
              <div className="ml-2 text-sm">
                <div className="font-medium">{item.label}</div>
                <div className="text-muted-foreground text-xs">{item.labelEn}</div>
              </div>
              {item.step < 3 && <div className="w-8 h-px bg-border mx-4" />}
            </div>
          ))}
        </div>

        {/* Step Content */}
        {currentStep === 1 && (
          <TripPlannerForm tripData={tripData} onDataChange={handleTripDataChange} onNext={() => setCurrentStep(2)} />
        )}

        {currentStep === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <TripSchedule
                tripData={tripData}
                onDataChange={handleTripDataChange}
                onBack={() => setCurrentStep(1)}
                onNext={() => setCurrentStep(3)}
              />
            </div>
            <div className="lg:col-span-1">
              <TripSummary tripData={tripData} />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">🎉</div>
                  <h2 className="text-2xl font-bold mb-2">旅程が完成しました！</h2>
                  <p className="text-muted-foreground">素晴らしい日本旅行をお楽しみください</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-lg mb-2">{tripData.title}</h3>
                    <p className="text-muted-foreground">{tripData.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">期間:</span>
                      <span className="ml-2 font-medium">
                        {tripData.startDate} - {tripData.endDate}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">日数:</span>
                      <span className="ml-2 font-medium">{tripData.days.length}日間</span>
                    </div>
                  </div>

                  <div className="flex space-x-4 pt-6">
                    <Button onClick={handleSaveTrip} className="flex-1">
                      旅程を保存
                    </Button>
                    <Button variant="outline" onClick={() => setCurrentStep(2)} className="bg-transparent">
                      編集に戻る
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
