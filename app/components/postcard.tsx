"use client"

import React, { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"

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

interface PostcardProps {
  postcard: PostcardData
}

export default function Postcard({ postcard }: PostcardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

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

  const effectClasses = {
    glow: "shadow-lg hover:shadow-xl",
    shimmer: "shadow-md hover:shadow-lg",
    float: "shadow-sm hover:shadow-md",
  }

  const getAnimationClass = () => {
    switch (postcard.effect) {
      case "glow":
        return "animate-pulse"
      case "shimmer":
        return "hover:animate-bounce"
      case "float":
        return "hover:animate-pulse"
      default:
        return ""
    }
  }

  return (
    <>
      <div
        className={`absolute ${isHovered ? "z-30" : "z-10"}`}
        style={{
          left: postcard.x + 48, // Account for frame
          top: postcard.y + 48, // Account for frame
          transform: `rotate(${postcard.rotation}deg) ${isHovered ? "scale(1.05)" : "scale(1)"}`,
          transformOrigin: "center center",
          cursor: "pointer",
          transition: "transform 0.2s ease-out",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsExpanded(true)}
      >
        {/* Realistic Pushpin */}
        <div
          className={`absolute -top-3 left-1/2 transform -translate-x-1/2 w-5 h-5 z-20 transition-all duration-200 ${isHovered ? "scale-110" : ""}`}
          style={{
            background:
              postcard.id === "1"
                ? "radial-gradient(circle at 30% 30%, #ff6b6b, #e74c3c, #c0392b)"
                : postcard.id === "2"
                  ? "radial-gradient(circle at 30% 30%, #ffd93d, #f39c12, #d68910)"
                  : "radial-gradient(circle at 30% 30%, #ff6b6b, #e74c3c, #c0392b)",
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
          {/* Pin shadow on cork */}
          <div
            className="absolute top-5 left-1/2 transform -translate-x-1/2 w-3 h-2 rounded-full opacity-20"
            style={{
              background: "radial-gradient(ellipse, rgba(0,0,0,0.4), transparent)",
              filter: "blur(1px)",
            }}
          ></div>
        </div>

        <Card
          className={`
          w-64 h-40 p-4 border-0 transition-all duration-300 relative overflow-hidden postcard-content
          ${isHovered ? "shadow-2xl" : "shadow-lg"}
        `}
          style={{
            background: getPostcardBackground(postcard),
            transform: isHovered ? "translateY(-2px)" : "translateY(0)",
            boxShadow: `
            0 ${isHovered ? "8px 25px" : "4px 15px"} rgba(0,0,0,0.15),
            0 ${isHovered ? "4px 10px" : "2px 6px"} rgba(0,0,0,0.1)
          `,
          }}
        >
          {/* Postcard texture overlay */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background: `
              repeating-linear-gradient(45deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, rgba(255,255,255,0.1) 2px),
              repeating-linear-gradient(-45deg, transparent, transparent 1px, rgba(0,0,0,0.02) 1px, rgba(0,0,0,0.02) 2px)
            `,
            }}
          ></div>

          <div
            className={`h-full flex flex-col justify-between relative z-10 ${fontClasses[postcard.font as keyof typeof fontClasses]}`}
          >
            <p className="text-sm text-gray-800 line-clamp-4 leading-relaxed drop-shadow-sm">{postcard.message}</p>
            <div className="flex justify-between items-end">
              <p className="text-xs text-gray-600 italic drop-shadow-sm">— {postcard.author}</p>
              <p className="text-xs text-gray-500 drop-shadow-sm">{postcard.timestamp.toLocaleDateString()}</p>
            </div>
          </div>

          {/* Vintage postcard elements */}
          {postcard.id === "1" && (
            <div className="absolute top-2 right-2 w-8 h-6 opacity-20">
              <div className="w-full h-full border border-gray-400 bg-white/50"></div>
              <div className="absolute inset-0.5 border border-gray-300"></div>
            </div>
          )}

          {postcard.id === "2" && (
            <div className="absolute bottom-2 left-2 opacity-30">
              <div className="w-12 h-0.5 bg-gray-400 mb-0.5"></div>
              <div className="w-8 h-0.5 bg-gray-400 mb-0.5"></div>
              <div className="w-10 h-0.5 bg-gray-400"></div>
            </div>
          )}
        </Card>
      </div>

      {/* Expanded Modal with same styling */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsExpanded(false)}
        >
          <Card
            className="w-full max-w-lg p-8 border-0 transform transition-all duration-300 relative overflow-hidden"
            style={{
              background: getPostcardBackground(postcard),
              boxShadow: "0 20px 60px rgba(0,0,0,0.3), 0 10px 30px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
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

            <div className={`relative z-10 ${fontClasses[postcard.font as keyof typeof fontClasses]}`}>
              <p className="text-lg text-gray-800 leading-relaxed mb-6 whitespace-pre-wrap drop-shadow-sm">
                {postcard.message}
              </p>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-sm text-gray-600 italic mb-1 drop-shadow-sm">— {postcard.author}</p>
                  <p className="text-xs text-gray-500 drop-shadow-sm">
                    {postcard.timestamp.toLocaleDateString()} at {postcard.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  )

  // Helper function for postcard backgrounds
  function getPostcardBackground(postcard: PostcardData) {
    const backgrounds = {
      rose: `
      linear-gradient(135deg, #fdf2f8 0%, #fce7f3 25%, #fbcfe8 75%, #f9a8d4 100%),
      radial-gradient(circle at 20% 20%, rgba(244, 114, 182, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.08) 0%, transparent 50%)
    `,
      blue: `
      linear-gradient(135deg, #eff6ff 0%, #dbeafe 25%, #bfdbfe 75%, #93c5fd 100%),
      radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 70% 70%, rgba(37, 99, 235, 0.08) 0%, transparent 50%)
    `,
      purple: `
      linear-gradient(135deg, #faf5ff 0%, #f3e8ff 25%, #e9d5ff 75%, #d8b4fe 100%),
      radial-gradient(circle at 25% 25%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.08) 0%, transparent 50%)
    `,
      green: `
      linear-gradient(135deg, #f0fdf4 0%, #dcfce7 25%, #bbf7d0 75%, #86efac 100%),
      radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(22, 163, 74, 0.08) 0%, transparent 50%)
    `,
      yellow: `
      linear-gradient(135deg, #fffbeb 0%, #fef3c7 25%, #fde68a 75%, #fcd34d 100%),
      radial-gradient(circle at 40% 40%, rgba(245, 158, 11, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 60% 60%, rgba(217, 119, 6, 0.08) 0%, transparent 50%)
    `,
      orange: `
      linear-gradient(135deg, #fff7ed 0%, #ffedd5 25%, #fed7aa 75%, #fdba74 100%),
      radial-gradient(circle at 30% 70%, rgba(249, 115, 22, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 70% 30%, rgba(234, 88, 12, 0.08) 0%, transparent 50%)
    `,
    }

    return backgrounds[postcard.color as keyof typeof backgrounds] || backgrounds.rose
  }
}
