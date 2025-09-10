"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, MapPin, Star, Users, Search, Filter } from "lucide-react"

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [selectedDuration, setSelectedDuration] = useState("all")
  const [selectedTheme, setSelectedTheme] = useState("all")

  const modelCourses = [
    {
      id: 1,
      title: "京都の古都を巡る3日間",
      description: "伝統的な寺院と美しい庭園を楽しむ定番コース",
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
    },
    {
      id: 2,
      title: "富士山周辺自然満喫コース",
      description: "富士五湖と温泉を楽しむ癒しの旅",
      duration: "2日間",
      region: "関東",
      theme: "自然・景色",
      difficulty: "中級",
      rating: 4.9,
      reviewCount: 89,
      price: "¥38,000〜",
      image: "/fuji-nature-course.jpg",
      highlights: ["富士山", "河口湖", "箱根温泉", "忍野八海"],
      tags: ["自然", "温泉", "湖", "山"],
    },
    {
      id: 3,
      title: "大阪グルメ食べ歩きツアー",
      description: "本場の大阪グルメを堪能する美食の旅",
      duration: "1日間",
      region: "関西",
      theme: "グルメ",
      difficulty: "初級",
      rating: 4.7,
      reviewCount: 156,
      price: "¥12,000〜",
      image: "/osaka-food-tour.jpg",
      highlights: ["道頓堀", "新世界", "黒門市場", "梅田"],
      tags: ["たこ焼き", "お好み焼き", "串カツ", "市場"],
    },
    {
      id: 4,
      title: "沖縄離島ホッピング",
      description: "美しいビーチと島文化を体験する南国の旅",
      duration: "4日間",
      region: "沖縄",
      theme: "自然・景色",
      difficulty: "中級",
      rating: 4.9,
      reviewCount: 67,
      price: "¥78,000〜",
      image: "/okinawa-islands.jpg",
      highlights: ["石垣島", "竹富島", "西表島", "川平湾"],
      tags: ["ビーチ", "シュノーケル", "離島", "文化体験"],
    },
    {
      id: 5,
      title: "北海道グルメ＆温泉巡り",
      description: "新鮮な海の幸と名湯を楽しむ北の大地の旅",
      duration: "5日間",
      region: "北海道",
      theme: "グルメ",
      difficulty: "初級",
      rating: 4.8,
      reviewCount: 98,
      price: "¥95,000〜",
      image: "/hokkaido-gourmet.jpg",
      highlights: ["札幌", "小樽", "函館", "登別温泉"],
      tags: ["海鮮", "温泉", "雪景色", "夜景"],
    },
    {
      id: 6,
      title: "東京モダン＆トラディショナル",
      description: "最新スポットと伝統文化を両方楽しむ東京満喫コース",
      duration: "3日間",
      region: "関東",
      theme: "文化・歴史",
      difficulty: "初級",
      rating: 4.6,
      reviewCount: 203,
      price: "¥52,000〜",
      image: "/tokyo-modern-traditional.jpg",
      highlights: ["浅草", "渋谷", "銀座", "上野"],
      tags: ["現代文化", "伝統", "ショッピング", "アート"],
    },
  ]

  const filteredCourses = modelCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRegion = selectedRegion === "all" || course.region === selectedRegion
    const matchesDuration = selectedDuration === "all" || course.duration.includes(selectedDuration)
    const matchesTheme = selectedTheme === "all" || course.theme === selectedTheme

    return matchesSearch && matchesRegion && matchesDuration && matchesTheme
  })

  const regions = ["all", "関東", "関西", "北海道", "沖縄", "九州", "東北", "中部"]
  const durations = ["all", "1日", "2日", "3日", "4日", "5日"]
  const themes = ["all", "文化・歴史", "自然・景色", "グルメ", "温泉", "アクティビティ"]

  return (
    <div className="min-h-screen bg-kawaii-cream">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-kawaii-forest mb-4">モデルコース</h1>
            <p className="text-lg text-kawaii-sage mb-6">厳選された旅行プランで、日本の魅力を効率よく楽しもう</p>
          </div>

          {/* Search and Filters */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-kawaii-sage" />
                  <Input
                    placeholder="コースを検索..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="地域を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region === "all" ? "すべての地域" : region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                  <SelectTrigger>
                    <SelectValue placeholder="期間を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {durations.map((duration) => (
                      <SelectItem key={duration} value={duration}>
                        {duration === "all" ? "すべての期間" : `${duration}間`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                  <SelectTrigger>
                    <SelectValue placeholder="テーマを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {themes.map((theme) => (
                      <SelectItem key={theme} value={theme}>
                        {theme === "all" ? "すべてのテーマ" : theme}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-kawaii-sage">{filteredCourses.length}件のモデルコースが見つかりました</p>
          </div>

          {/* Course Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={course.image || "/placeholder.svg?height=200&width=300&query=japan travel course"}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary" className="bg-kawaii-mint text-kawaii-forest">
                      {course.region}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-kawaii-sage">{course.rating}</span>
                      <span className="text-xs text-kawaii-sage">({course.reviewCount})</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg text-kawaii-forest group-hover:text-kawaii-coral transition-colors">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-kawaii-sage">{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-kawaii-sage" />
                          <span className="text-kawaii-sage">{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-kawaii-sage" />
                          <span className="text-kawaii-sage">{course.difficulty}</span>
                        </div>
                      </div>
                      <div className="font-medium text-kawaii-coral">{course.price}</div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {course.highlights.slice(0, 3).map((highlight) => (
                        <Badge key={highlight} variant="outline" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                      {course.highlights.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{course.highlights.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Link href={`/course/${course.id}`} className="flex-1">
                        <Button className="w-full bg-kawaii-coral hover:bg-kawaii-coral/90">詳細を見る</Button>
                      </Link>
                      <Button variant="outline" size="icon">
                        <MapPin className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <Filter className="w-12 h-12 mx-auto mb-4 text-kawaii-sage opacity-50" />
              <h3 className="text-lg font-medium text-kawaii-forest mb-2">条件に合うコースが見つかりませんでした</h3>
              <p className="text-kawaii-sage mb-4">検索条件を変更して再度お試しください</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedRegion("all")
                  setSelectedDuration("all")
                  setSelectedTheme("all")
                }}
              >
                フィルターをリセット
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
