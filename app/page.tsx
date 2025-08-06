"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Library, Maximize2, Minimize2, Download } from "lucide-react"
import PostcardCreator from "./components/postcard-creator"
import PostcardLibrary from "./components/postcard-library"
import Postcard from "./components/postcard"
import html2canvas from "html2canvas"

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

export default function DigitalCorkboard() {
  const [postcards, setPostcards] = useState<PostcardData[]>([])

  const [showCreator, setShowCreator] = useState(false)
  const [showLibrary, setShowLibrary] = useState(false)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isFullscreen, setIsFullscreen] = useState(false)

  const corkboardRef = useRef<HTMLDivElement>(null)

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault()
      const delta = e.deltaY * -0.001
      const newScale = Math.min(Math.max(0.5, scale + delta), 3)
      setScale(newScale)
    },
    [scale],
  )

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === corkboardRef.current) {
        setIsDragging(true)
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
      }
    },
    [position],
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        })
      }
    },
    [isDragging, dragStart],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const downloadCorkboard = useCallback(async () => {
    if (!corkboardRef.current) return

    try {
      // Temporarily reset transform to capture full corkboard
      const originalTransform = corkboardRef.current.style.transform
      const originalScale = scale
      const originalPosition = position
      
      // Reset to default view for capture
      corkboardRef.current.style.transform = 'scale(1) translate(0px, 0px)'
      
      // Capture the corkboard
      const canvas = await html2canvas(corkboardRef.current, {
        backgroundColor: null,
        scale: 2, // Higher quality
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: corkboardRef.current.scrollWidth,
        height: corkboardRef.current.scrollHeight,
      })

      // Restore original transform
      corkboardRef.current.style.transform = originalTransform

      // Create download link
      const link = document.createElement('a')
      link.download = `corkboard-${new Date().toISOString().split('T')[0]}.png`
      link.href = canvas.toDataURL('image/png')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error downloading corkboard:', error)
      // Restore original transform in case of error
      if (corkboardRef.current) {
        corkboardRef.current.style.transform = `scale(${scale}) translate(${position.x}px, ${position.y}px)`
      }
    }
  }, [scale, position])

  const addPostcard = useCallback((newPostcard: { message: string; author: string; color: string; font: string; effect: string }) => {
    const postcard: PostcardData = {
      ...newPostcard,
      id: Date.now().toString(),
      timestamp: new Date(),
      x: Math.random() * 600 + 100,
      y: Math.random() * 400 + 100,
      rotation: (Math.random() - 0.5) * 20,
    }
    setPostcards((prev) => [...prev, postcard])
    setShowCreator(false)
  }, [])



  return (
    <div
      className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-25 to-yellow-50 relative overflow-hidden"
      style={{ backgroundColor: "#faf7f2" }}
    >
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 relative">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={downloadCorkboard}
                className="text-amber-700 hover:text-amber-900"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowLibrary(!showLibrary)}
                className="text-amber-700 hover:text-amber-900"
              >
                Library
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="text-amber-700 hover:text-amber-900"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </Button>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <h1 className="text-2xl font-bold text-amber-900">Digital Corkboard</h1>
            </div>
            <div className="flex items-center space-x-4 invisible">
              <Button
                variant="ghost"
                size="sm"
                onClick={downloadCorkboard}
                className="text-amber-700 hover:text-amber-900"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowLibrary(!showLibrary)}
                className="text-amber-700 hover:text-amber-900"
              >
                Library
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="text-amber-700 hover:text-amber-900"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Corkboard */}
      <div
        className={`${isFullscreen ? "fixed inset-0 z-40" : "pt-16"} flex flex-col items-center justify-center min-h-screen`}
      >
        <div className="text-center mb-6">
          <p className="text-lg text-amber-800 font-medium">Add your memories and notes on a digital corkboard</p>
        </div>
        <div
          ref={corkboardRef}
          className="w-[800px] h-[600px] relative overflow-hidden rounded-lg"
          style={{
            background: `
      linear-gradient(135deg, #d4a574 0%, #c49464 25%, #b8855a 50%, #a67c52 75%, #8b6f47 100%),
      radial-gradient(circle at 20% 30%, rgba(139, 111, 71, 0.4) 2px, transparent 2px),
      radial-gradient(circle at 80% 70%, rgba(196, 148, 100, 0.5) 1px, transparent 1px),
      radial-gradient(circle at 40% 80%, rgba(184, 133, 90, 0.3) 1.5px, transparent 1.5px),
      radial-gradient(circle at 70% 20%, rgba(212, 165, 116, 0.4) 1px, transparent 1px),
      radial-gradient(circle at 60% 40%, rgba(139, 111, 71, 0.2) 3px, transparent 3px),
      radial-gradient(circle at 30% 60%, rgba(196, 148, 100, 0.25) 2px, transparent 2px)
    `,
            backgroundSize: "100% 100%, 45px 45px, 60px 60px, 35px 35px, 50px 50px, 80px 80px, 70px 70px",
            boxShadow: `
      inset 0 0 120px rgba(139, 111, 71, 0.15),
      inset 20px 0 50px rgba(139, 111, 71, 0.08),
      inset -20px 0 50px rgba(139, 111, 71, 0.08),
      inset 0 20px 50px rgba(139, 111, 71, 0.08),
      inset 0 -20px 50px rgba(139, 111, 71, 0.08),
      0 8px 32px rgba(0, 0, 0, 0.12),
      0 4px 16px rgba(0, 0, 0, 0.08)
    `,
          }}
        >
          {/* Wooden frame */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Top frame */}
            <div
              className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-amber-800 via-amber-700 to-amber-600"
              style={{
                boxShadow: `
          0 4px 12px rgba(0,0,0,0.2),
          inset 0 2px 0 rgba(255,255,255,0.1),
          inset 0 -2px 0 rgba(0,0,0,0.3)
        `,
                background: `
          linear-gradient(180deg, #92400e 0%, #a16207 20%, #92400e 80%, #78350f 100%),
          repeating-linear-gradient(90deg, transparent 0px, rgba(0,0,0,0.1) 1px, transparent 3px),
          repeating-linear-gradient(0deg, transparent 0px, rgba(255,255,255,0.05) 1px, transparent 2px)
        `,
              }}
            >
              {/* Wood grain details */}
              <div className="absolute top-2 left-8 w-6 h-1 bg-amber-900 rounded-sm opacity-40"></div>
              <div className="absolute top-4 right-16 w-4 h-1 bg-amber-900 rounded-sm opacity-30"></div>
              <div className="absolute bottom-2 left-1/4 w-8 h-1 bg-amber-900 rounded-sm opacity-35"></div>
              <div className="absolute top-6 left-1/2 w-3 h-1 bg-amber-900 rounded-sm opacity-25"></div>
            </div>

            {/* Bottom frame */}
            <div
              className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-amber-800 via-amber-700 to-amber-600"
              style={{
                boxShadow: `
          0 -4px 12px rgba(0,0,0,0.2),
          inset 0 2px 0 rgba(0,0,0,0.3),
          inset 0 -2px 0 rgba(255,255,255,0.1)
        `,
                background: `
          linear-gradient(0deg, #92400e 0%, #a16207 20%, #92400e 80%, #78350f 100%),
          repeating-linear-gradient(90deg, transparent 0px, rgba(0,0,0,0.1) 1px, transparent 3px),
          repeating-linear-gradient(0deg, transparent 0px, rgba(255,255,255,0.05) 1px, transparent 2px)
        `,
              }}
            >
              <div className="absolute top-2 left-16 w-3 h-2 bg-amber-900 rounded-sm opacity-40"></div>
              <div className="absolute bottom-4 right-12 w-2 h-1 bg-amber-900 rounded-sm opacity-35"></div>
              <div className="absolute top-6 left-1/3 w-5 h-1 bg-amber-900 rounded-sm opacity-30"></div>
            </div>

            {/* Left frame */}
            <div
              className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600"
              style={{
                boxShadow: `
          4px 0 12px rgba(0,0,0,0.2),
          inset 2px 0 0 rgba(255,255,255,0.1),
          inset -2px 0 0 rgba(0,0,0,0.3)
        `,
                background: `
          linear-gradient(90deg, #92400e 0%, #a16207 20%, #92400e 80%, #78350f 100%),
          repeating-linear-gradient(0deg, transparent 0px, rgba(0,0,0,0.1) 1px, transparent 3px),
          repeating-linear-gradient(90deg, transparent 0px, rgba(255,255,255,0.05) 1px, transparent 2px)
        `,
              }}
            >
              <div className="absolute top-1/4 left-3 w-2 h-6 bg-amber-900 rounded-sm opacity-35"></div>
              <div className="absolute top-2/3 right-2 w-3 h-3 bg-amber-900 rounded-sm opacity-30"></div>
              <div className="absolute bottom-1/4 left-2 w-1 h-4 bg-amber-900 rounded-sm opacity-25"></div>
            </div>

            {/* Right frame */}
            <div
              className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-amber-800 via-amber-700 to-amber-600"
              style={{
                boxShadow: `
          -4px 0 12px rgba(0,0,0,0.2),
          inset 2px 0 0 rgba(0,0,0,0.3),
          inset -2px 0 0 rgba(255,255,255,0.1)
        `,
                background: `
          linear-gradient(270deg, #92400e 0%, #a16207 20%, #92400e 80%, #78350f 100%),
          repeating-linear-gradient(0deg, transparent 0px, rgba(0,0,0,0.1) 1px, transparent 3px),
          repeating-linear-gradient(90deg, transparent 0px, rgba(255,255,255,0.05) 1px, transparent 2px)
        `,
              }}
            >
              <div className="absolute top-1/3 left-2 w-4 h-2 bg-amber-900 rounded-sm opacity-30"></div>
              <div className="absolute bottom-1/4 right-3 w-2 h-5 bg-amber-900 rounded-sm opacity-35"></div>
              <div className="absolute top-2/3 left-1 w-1 h-3 bg-amber-900 rounded-sm opacity-25"></div>
            </div>
          </div>

          {/* Cork texture overlay */}
          {/*<div
            className="absolute inset-0 opacity-20 bg-gradient-to-br from-amber-200 to-yellow-200"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23d97706' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />*/}

          {/* Postcards */}
          {postcards.map((postcard) => (
            <Postcard key={postcard.id} postcard={postcard} />
          ))}


        </div>
      </div>

      {/* Floating Action Button */}
      <Button
        onClick={() => setShowCreator(true)}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-amber-600 hover:bg-amber-700 shadow-lg hover:shadow-xl transition-all duration-300"
        size="lg"
      >
        <Plus className="w-6 h-6" />
      </Button>



      {/* Postcard Creator Modal */}
      {showCreator && <PostcardCreator onClose={() => setShowCreator(false)} onSave={addPostcard} />}

      {/* Library Sidebar */}
      {showLibrary && <PostcardLibrary postcards={postcards} onClose={() => setShowLibrary(false)} />}
    </div>
  )
}
