import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Search, MapPin, Calendar, Star, Users, Route, Clock } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 text-balance">
              🗾 かわいいマップで
              <br />
              日本旅行
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
              Discover Japan's hidden gems with our cute and interactive travel map. Plan your perfect itinerary and
              explore amazing spots!
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search for places, food, experiences..." className="pl-10 h-12 text-base" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/map">
              <Button size="lg" className="h-12 px-8">
                <MapPin className="mr-2 h-5 w-5" />
                今すぐ地図を見る
              </Button>
            </Link>
            <Link href="/trip/create">
              <Button variant="outline" size="lg" className="h-12 px-8 bg-transparent">
                <Calendar className="mr-2 h-5 w-5" />
                旅程作成
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-primary/5">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="text-3xl mb-2">🏯</div>
              <div className="text-2xl font-bold text-foreground">10,000+</div>
              <div className="text-foreground/70">Tourist Spots</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl mb-2">👥</div>
              <div className="text-2xl font-bold text-foreground">50,000+</div>
              <div className="text-foreground/70">Happy Travelers</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl mb-2">⭐</div>
              <div className="text-2xl font-bold text-foreground">4.9/5</div>
              <div className="text-foreground/70">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Model Courses Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">人気のモデルコース</h2>
            <p className="text-muted-foreground">Curated travel itineraries for the perfect Japan experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              {
                title: "京都の古都を巡る3日間",
                region: "関西",
                duration: "3日間",
                rating: 4.8,
                reviews: "124",
                highlights: ["清水寺", "金閣寺", "嵐山"],
                price: "¥45,000〜",
              },
              {
                title: "富士山周辺自然満喫コース",
                region: "関東",
                duration: "2日間",
                rating: 4.9,
                reviews: "89",
                highlights: ["富士山", "河口湖", "箱根温泉"],
                price: "¥38,000〜",
              },
              {
                title: "大阪グルメ食べ歩きツアー",
                region: "関西",
                duration: "1日間",
                rating: 4.7,
                reviews: "156",
                highlights: ["道頓堀", "新世界", "黒門市場"],
                price: "¥12,000〜",
              },
            ].map((course, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {course.region}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{course.rating}</span>
                      <span className="text-xs text-muted-foreground">({course.reviews})</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{course.title}</h3>

                  <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="font-medium text-primary">{course.price}</div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {course.highlights.map((highlight) => (
                      <Badge key={highlight} variant="outline" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/courses">
              <Button variant="outline" size="lg" className="bg-transparent">
                <Route className="mr-2 h-5 w-5" />
                すべてのモデルコースを見る
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Spots Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">人気の観光スポット TOP 6</h2>
            <p className="text-muted-foreground">Most loved destinations by our travelers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🏯", name: "京都", nameEn: "Kyoto", rating: 4.9, reviews: "2.1k" },
              { icon: "🗼", name: "東京", nameEn: "Tokyo", rating: 4.8, reviews: "3.5k" },
              { icon: "🗻", name: "富士山", nameEn: "Mt. Fuji", rating: 4.9, reviews: "1.8k" },
              { icon: "🦌", name: "奈良", nameEn: "Nara", rating: 4.7, reviews: "1.2k" },
              { icon: "🏮", name: "大阪", nameEn: "Osaka", rating: 4.8, reviews: "2.8k" },
              { icon: "🌸", name: "上野", nameEn: "Ueno", rating: 4.6, reviews: "950" },
            ].map((spot, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {spot.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-1">{spot.name}</h3>
                  <p className="text-muted-foreground mb-3">{spot.nameEn}</p>
                  <div className="flex items-center justify-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-medium">{spot.rating}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{spot.reviews}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Region Selection */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">地域で選ぶ</h2>

          <div className="flex flex-wrap justify-center gap-4">
            {["関東", "関西", "九州", "北海道", "東北", "中部", "中国", "四国"].map((region) => (
              <Badge
                key={region}
                variant="secondary"
                className="px-6 py-3 text-base cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {region}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Category Selection */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">カテゴリで選ぶ</h2>
            <p className="text-muted-foreground">Explore Japan by your interests</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "🏯", label: "観光", labelEn: "Sightseeing", count: "2,500+" },
              { icon: "🍜", label: "グルメ", labelEn: "Food", count: "1,800+" },
              { icon: "🚗", label: "ドライブ", labelEn: "Drive", count: "450+" },
              { icon: "🎌", label: "体験", labelEn: "Experience", count: "680+" },
            ].map((category, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="font-bold mb-1">{category.label}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{category.labelEn}</p>
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
