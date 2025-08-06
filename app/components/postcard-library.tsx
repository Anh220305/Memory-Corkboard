"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { X, Search, Calendar, User, Palette } from "lucide-react"

interface PostcardData {
  id: string
  message: string
  author: string
  color: string
  font: string
  effect: string
  x: number
  y: number
  rotation: number
  timestamp: Date
}

interface PostcardLibraryProps {
  postcards: PostcardData[]
  onClose: () => void
}

export default function PostcardLibrary({ postcards, onClose }: PostcardLibraryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPostcard, setSelectedPostcard] = useState<PostcardData | null>(null)
  const [sortBy, setSortBy] = useState<"date" | "author" | "color">("date")

  const filteredPostcards = postcards
    .filter(
      (postcard) =>
        postcard.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        postcard.author.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return b.timestamp.getTime() - a.timestamp.getTime()
        case "author":
          return a.author.localeCompare(b.author)
        case "color":
          return a.color.localeCompare(b.color)
        default:
          return 0
      }
    })

  const colorClasses = {
    rose: "bg-gradient-to-br from-rose-200 to-rose-300 border-rose-400",
    blue: "bg-gradient-to-br from-blue-200 to-blue-300 border-blue-400",
    purple: "bg-gradient-to-br from-purple-200 to-purple-300 border-purple-400",
    green: "bg-gradient-to-br from-green-200 to-green-300 border-green-400",
    yellow: "bg-gradient-to-br from-yellow-200 to-yellow-300 border-yellow-400",
    orange: "bg-gradient-to-br from-orange-200 to-orange-300 border-orange-400",
  }

  const fontClasses = {
    handwritten: "font-mono",
    elegant: "font-serif",
    casual: "font-sans",
  }

  return (
    <>
      <div className="fixed right-0 top-16 bottom-0 w-96 bg-white/95 backdrop-blur-sm border-l border-amber-200 z-40 overflow-hidden flex flex-col">
        <div className="p-6 border-b border-amber-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-amber-900">Memory Library</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search memories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Sort Options */}
          <div className="flex space-x-2">
            <Button
              variant={sortBy === "date" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("date")}
              className="flex-1"
            >
              <Calendar className="w-3 h-3 mr-1" />
              Date
            </Button>
            <Button
              variant={sortBy === "author" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("author")}
              className="flex-1"
            >
              <User className="w-3 h-3 mr-1" />
              Author
            </Button>
            <Button
              variant={sortBy === "color" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("color")}
              className="flex-1"
            >
              <Palette className="w-3 h-3 mr-1" />
              Color
            </Button>
          </div>
        </div>

        {/* Postcards List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {filteredPostcards.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No memories found</p>
            </div>
          ) : (
            filteredPostcards.map((postcard) => (
              <Card
                key={postcard.id}
                className={`
                  cursor-pointer transition-all duration-200 hover:shadow-md border
                  ${colorClasses[postcard.color as keyof typeof colorClasses]}
                `}
                onClick={() => setSelectedPostcard(postcard)}
              >
                <CardContent className="p-4">
                  <div className={`${fontClasses[postcard.font as keyof typeof fontClasses]}`}>
                    <p className="text-sm text-gray-800 line-clamp-3 mb-2">{postcard.message}</p>
                    <div className="flex justify-between items-center text-xs text-gray-600">
                      <span className="italic">— {postcard.author}</span>
                      <span>{postcard.timestamp.toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Stats */}
        <div className="p-4 border-t border-amber-200 bg-amber-50/50">
          <p className="text-sm text-amber-700 text-center">{postcards.length} memories in the collection</p>
        </div>
      </div>

      {/* Expanded Postcard Modal */}
      {selectedPostcard && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPostcard(null)}
        >
          <Card
            className={`
              w-full max-w-lg p-8 border-2 transform transition-all duration-300
              ${colorClasses[selectedPostcard.color as keyof typeof colorClasses]}
            `}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`${fontClasses[selectedPostcard.font as keyof typeof fontClasses]}`}>
              <p className="text-lg text-gray-800 leading-relaxed mb-6 whitespace-pre-wrap">
                {selectedPostcard.message}
              </p>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-sm text-gray-600 italic mb-1">— {selectedPostcard.author}</p>
                  <p className="text-xs text-gray-500">
                    {selectedPostcard.timestamp.toLocaleDateString()} at{" "}
                    {selectedPostcard.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
