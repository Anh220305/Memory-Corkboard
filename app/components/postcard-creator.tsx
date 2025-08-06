"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X, Sparkles, Heart, Zap } from "lucide-react"

interface PostcardCreatorProps {
  onClose: () => void
  onSave: (postcard: {
    message: string
    author: string
    color: string
    font: string
    effect: string
  }) => void
}

export default function PostcardCreator({ onClose, onSave }: PostcardCreatorProps) {
  const [message, setMessage] = useState("")
  const [author, setAuthor] = useState("")
  const [color, setColor] = useState("rose")
  const [font, setFont] = useState("handwritten")
  const [effect, setEffect] = useState("glow")

  const colors = [
    { name: "rose", class: "bg-gradient-to-br from-rose-200 to-rose-300", label: "Rose" },
    { name: "blue", class: "bg-gradient-to-br from-blue-200 to-blue-300", label: "Ocean" },
    { name: "purple", class: "bg-gradient-to-br from-purple-200 to-purple-300", label: "Lavender" },
    { name: "green", class: "bg-gradient-to-br from-green-200 to-green-300", label: "Sage" },
    { name: "yellow", class: "bg-gradient-to-br from-yellow-200 to-yellow-300", label: "Sunshine" },
    { name: "orange", class: "bg-gradient-to-br from-orange-200 to-orange-300", label: "Sunset" },
  ]

  const fonts = [
    { name: "handwritten", class: "font-mono", label: "Handwritten" },
    { name: "elegant", class: "font-serif", label: "Elegant" },
    { name: "casual", class: "font-sans", label: "Casual" },
  ]

  const effects = [
    { name: "glow", icon: Sparkles, label: "Gentle Glow" },
    { name: "shimmer", icon: Heart, label: "Warm Shimmer" },
    { name: "float", icon: Zap, label: "Soft Float" },
  ]

  const handleSave = () => {
    if (message.trim() && author.trim()) {
      onSave({ message, author, color, font, effect })
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl text-amber-900">Create Your Postcard</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Preview */}
          <div className="flex justify-center">
            <div className="relative">
              <div
                className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-5 h-5 z-20"
                style={{
                  background: "radial-gradient(circle at 30% 30%, #ff6b6b, #e74c3c, #c0392b)",
                  borderRadius: "50%",
                  boxShadow: `
                    0 2px 4px rgba(0,0,0,0.3),
                    inset 0 1px 0 rgba(255,255,255,0.3),
                    inset 0 -1px 0 rgba(0,0,0,0.2)
                  `,
                }}
              >
                <div
                  className="absolute inset-1 rounded-full"
                  style={{
                    background: "radial-gradient(circle at 40% 40%, rgba(255,255,255,0.4), transparent 60%)",
                  }}
                ></div>
              </div>
              <Card
                className="w-64 h-40 p-4 border-0 shadow-lg relative overflow-hidden"
                style={{
                  background: getPreviewBackground(color),
                }}
              >
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    background: `
                      repeating-linear-gradient(45deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, rgba(255,255,255,0.1) 2px),
                      repeating-linear-gradient(-45deg, transparent, transparent 1px, rgba(0,0,0,0.02) 1px, rgba(0,0,0,0.02) 2px)
                    `,
                  }}
                ></div>
                <div
                  className={`h-full flex flex-col justify-between relative z-10 ${fonts.find((f) => f.name === font)?.class}`}
                >
                  <p className="text-sm text-gray-800 line-clamp-4 leading-relaxed drop-shadow-sm">
                    {message || "Your message will appear here..."}
                  </p>
                  <div className="flex justify-between items-end">
                    <p className="text-xs text-gray-600 italic drop-shadow-sm">— {author || "Your name"}</p>
                    <p className="text-xs text-gray-500 drop-shadow-sm">{new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Your Message</Label>
            <Textarea
              id="message"
              placeholder="Share a memory, leave a note, confess to the void..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[100px] resize-none"
              maxLength={280}
            />
            <p className="text-xs text-gray-500 text-right">{message.length}/280</p>
          </div>

          {/* Author */}
          <div className="space-y-2">
            <Label htmlFor="author">Sign as</Label>
            <Input
              id="author"
              placeholder="Anonymous Wanderer, A Friend, Your Name..."
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              maxLength={50}
            />
          </div>

          {/* Color Selection */}
          <div className="space-y-3">
            <Label>Choose a Color</Label>
            <div className="grid grid-cols-3 gap-3">
              {colors.map((colorOption) => (
                <button
                  key={colorOption.name}
                  onClick={() => setColor(colorOption.name)}
                  className={`
                    p-4 rounded-lg border-2 transition-all duration-200
                    ${colorOption.class}
                    ${color === colorOption.name ? "border-amber-600 ring-2 ring-amber-200" : "border-gray-300 hover:border-gray-400"}
                  `}
                >
                </button>
              ))}
            </div>
          </div>

          {/* Font Selection */}
          <div className="space-y-3">
            <Label>Choose a Font Style</Label>
            <div className="grid grid-cols-3 gap-3">
              {fonts.map((fontOption) => (
                <button
                  key={fontOption.name}
                  onClick={() => setFont(fontOption.name)}
                  className={`
                    p-4 rounded-lg border-2 transition-all duration-200 bg-white
                    ${font === fontOption.name ? "border-amber-600 ring-2 ring-amber-200" : "border-gray-300 hover:border-gray-400"}
                  `}
                >
                  <span className={`text-sm font-medium text-gray-800 ${fontOption.class}`}>{fontOption.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Effect Selection */}
          <div className="space-y-3">
            <Label>Choose an Ambient Effect</Label>
            <div className="grid grid-cols-3 gap-3">
              {effects.map((effectOption) => {
                const Icon = effectOption.icon
                return (
                  <button
                    key={effectOption.name}
                    onClick={() => setEffect(effectOption.name)}
                    className={`
                      p-4 rounded-lg border-2 transition-all duration-200 bg-white flex flex-col items-center space-y-2
                      ${effect === effectOption.name ? "border-amber-600 ring-2 ring-amber-200" : "border-gray-300 hover:border-gray-400"}
                    `}
                  >
                    <Icon className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-800">{effectOption.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!message.trim() || !author.trim()}
              className="bg-amber-600 hover:bg-amber-700"
            >
              Pin to Corkboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function getPreviewBackground(color: string) {
  const backgrounds = {
    rose: `
      linear-gradient(135deg, #fdf2f8 0%, #fce7f3 25%, #fbcfe8 75%, #f9a8d4 100%),
      radial-gradient(circle at 20% 20%, rgba(244, 114, 182, 0.1) 0%, transparent 50%)
    `,
    blue: `
      linear-gradient(135deg, #eff6ff 0%, #dbeafe 25%, #bfdbfe 75%, #93c5fd 100%),
      radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
    `,
    purple: `
      linear-gradient(135deg, #faf5ff 0%, #f3e8ff 25%, #e9d5ff 75%, #d8b4fe 100%),
      radial-gradient(circle at 25% 25%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)
    `,
    green: `
      linear-gradient(135deg, #f0fdf4 0%, #dcfce7 25%, #bbf7d0 75%, #86efac 100%),
      radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)
    `,
    yellow: `
      linear-gradient(135deg, #fffbeb 0%, #fef3c7 25%, #fde68a 75%, #fcd34d 100%),
      radial-gradient(circle at 40% 40%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)
    `,
    orange: `
      linear-gradient(135deg, #fff7ed 0%, #ffedd5 25%, #fed7aa 75%, #fdba74 100%),
      radial-gradient(circle at 30% 70%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)
    `,
  }

  return backgrounds[color as keyof typeof backgrounds] || backgrounds.rose
}
