"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, Plus, Minus, Navigation } from "lucide-react"

// Simple map implementation without external dependencies
export function MapContainer({ spots, center, zoom, onSpotClick, selectedSpot }) {
  const mapRef = useRef(null)

  // Mock map implementation - in a real app, you'd use Leaflet or similar
  useEffect(() => {
    // This would initialize the actual map library
    console.log("Map initialized with center:", center, "zoom:", zoom)
  }, [center, zoom])

  const handleSpotMarkerClick = (spot) => {
    onSpotClick(spot)
  }

  return (
    <div className="relative w-full h-full bg-green-50">
      {/* Mock Map Background */}
      <div
        ref={mapRef}
        className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 relative overflow-hidden"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.05) 0%, transparent 50%)
          `,
        }}
      >
        {/* Mock Japan Outline */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl opacity-20 select-none">🗾</div>
        </div>

        {/* Spot Markers */}
        {spots.map((spot) => {
          // Convert lat/lng to screen coordinates (mock implementation)
          const x = ((spot.longitude - 130) / 15) * 100 // Rough conversion for Japan
          const y = ((40 - spot.latitude) / 10) * 100

          return (
            <div
              key={spot.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110 ${
                selectedSpot?.id === spot.id ? "scale-125 z-10" : "z-5"
              }`}
              style={{
                left: `${Math.max(10, Math.min(90, x))}%`,
                top: `${Math.max(10, Math.min(90, y))}%`,
              }}
              onClick={() => handleSpotMarkerClick(spot)}
            >
              <div className={`relative ${selectedSpot?.id === spot.id ? "animate-bounce" : ""}`}>
                {/* Kawaii Marker */}
                <div className="bg-white rounded-full p-2 shadow-lg border-2 border-primary">
                  <span className="text-2xl">{spot.categoryIcon}</span>
                </div>

                {/* Marker Pin */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-primary"></div>
                </div>

                {/* Spot Name Label */}
                {selectedSpot?.id === spot.id && (
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg border text-xs font-medium whitespace-nowrap">
                    {spot.name}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Map Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
        <Button size="sm" variant="outline" className="bg-background/95 backdrop-blur">
          <Plus className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="outline" className="bg-background/95 backdrop-blur">
          <Minus className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="outline" className="bg-background/95 backdrop-blur">
          <Navigation className="h-4 w-4" />
        </Button>
      </div>

      {/* Current Location Button */}
      <Button size="sm" className="absolute bottom-4 left-4 bg-primary text-primary-foreground">
        <MapPin className="h-4 w-4 mr-1" />
        現在地
      </Button>
    </div>
  )
}
