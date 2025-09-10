"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Camera, MapPin, Calendar, Heart, Plane, Settings, Edit } from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "山田太郎",
    email: "yamada@example.com",
    bio: "日本の美しい場所を探索するのが大好きです！",
    location: "東京, 日本",
    joinDate: "2024年1月",
    favoriteRegions: ["関東", "関西", "九州"],
    travelStyle: ["文化・歴史", "自然・景色", "グルメ"],
  })

  const stats = {
    visitedSpots: 42,
    savedSpots: 128,
    createdTrips: 8,
    sharedTrips: 3,
  }

  const recentActivity = [
    { type: "visit", spot: "清水寺", date: "2024年3月15日" },
    { type: "save", spot: "富士山", date: "2024年3月14日" },
    { type: "trip", name: "京都3日間の旅", date: "2024年3月10日" },
    { type: "save", spot: "奈良公園", date: "2024年3月8日" },
  ]

  return (
    <div className="min-h-screen bg-kawaii-cream">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/japanese-person-avatar.jpg" />
                    <AvatarFallback className="text-2xl bg-kawaii-mint text-kawaii-forest">山田</AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-transparent"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                    <h1 className="text-3xl font-bold text-kawaii-forest">{profile.name}</h1>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                      <Edit className="w-4 h-4 mr-2" />
                      プロフィール編集
                    </Button>
                  </div>

                  <p className="text-kawaii-sage mb-4">{profile.bio}</p>

                  <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-kawaii-sage">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {profile.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {profile.joinDate}参加
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-kawaii-coral">{stats.visitedSpots}</div>
                  <div className="text-sm text-kawaii-sage">訪問済みスポット</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-kawaii-coral">{stats.savedSpots}</div>
                  <div className="text-sm text-kawaii-sage">保存済みスポット</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-kawaii-coral">{stats.createdTrips}</div>
                  <div className="text-sm text-kawaii-sage">作成した旅行</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-kawaii-coral">{stats.sharedTrips}</div>
                  <div className="text-sm text-kawaii-sage">シェアした旅行</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Tabs */}
          <Tabs defaultValue="activity" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="activity">アクティビティ</TabsTrigger>
              <TabsTrigger value="favorites">お気に入り</TabsTrigger>
              <TabsTrigger value="trips">旅行プラン</TabsTrigger>
              <TabsTrigger value="settings">設定</TabsTrigger>
            </TabsList>

            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>最近のアクティビティ</CardTitle>
                  <CardDescription>あなたの最近の活動履歴</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-kawaii-cream">
                        <div className="w-10 h-10 rounded-full bg-kawaii-mint flex items-center justify-center">
                          {activity.type === "visit" && <MapPin className="w-5 h-5 text-kawaii-forest" />}
                          {activity.type === "save" && <Heart className="w-5 h-5 text-kawaii-forest" />}
                          {activity.type === "trip" && <Plane className="w-5 h-5 text-kawaii-forest" />}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-kawaii-forest">
                            {activity.type === "visit" && `${activity.spot}を訪問しました`}
                            {activity.type === "save" && `${activity.spot}を保存しました`}
                            {activity.type === "trip" && `${activity.name}を作成しました`}
                          </div>
                          <div className="text-sm text-kawaii-sage">{activity.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="favorites">
              <Card>
                <CardHeader>
                  <CardTitle>お気に入りスポット</CardTitle>
                  <CardDescription>保存したスポットと興味のあるカテゴリ</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-kawaii-forest mb-3">好きな地域</h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.favoriteRegions.map((region) => (
                          <Badge key={region} variant="secondary" className="bg-kawaii-mint text-kawaii-forest">
                            {region}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium text-kawaii-forest mb-3">旅行スタイル</h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.travelStyle.map((style) => (
                          <Badge key={style} variant="secondary" className="bg-kawaii-peach text-kawaii-forest">
                            {style}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trips">
              <Card>
                <CardHeader>
                  <CardTitle>旅行プラン</CardTitle>
                  <CardDescription>作成した旅行プランと保存したプラン</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-kawaii-sage">
                    <Plane className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>旅行プランがまだありません</p>
                    <Button className="mt-4 bg-kawaii-coral hover:bg-kawaii-coral/90">新しい旅行を計画する</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>アカウント設定</CardTitle>
                  <CardDescription>プロフィール情報と設定を管理</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">名前</Label>
                      <Input id="name" value={profile.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">メールアドレス</Label>
                      <Input id="email" type="email" value={profile.email} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">自己紹介</Label>
                      <Input id="bio" value={profile.bio} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">所在地</Label>
                      <Input id="location" value={profile.location} />
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between">
                    <Button variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      詳細設定
                    </Button>
                    <Button className="bg-kawaii-coral hover:bg-kawaii-coral/90">変更を保存</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
