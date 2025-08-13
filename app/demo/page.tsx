"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Mic,
  Upload,
  Radio,
  Play,
  Square,
  Volume2,
  Languages,
  Users,
  Heart,
  Frown,
  Meh,
  Smile,
  ArrowLeft,
  FileAudio,
  FileText,
  Pause,
  SkipBack,
  SkipForward,
} from "lucide-react"
import Link from "next/link"

// Mock data for demonstration
const mockTranscript = [
  {
    speaker: "John Smith",
    text: "Hello everyone, welcome to today's meeting. I'm excited to discuss our quarterly progress and the new initiatives we've been working on.",
    timestamp: "00:01",
    sentiment: "positive",
    language: "en",
  },
  {
    speaker: "Maria Garcia",
    text: "Thank you John. I'm also excited to share our team's achievements. We've made significant progress on the project milestones.",
    timestamp: "00:15",
    sentiment: "positive",
    language: "en",
  },
  {
    speaker: "John Smith",
    text: "That's fantastic to hear Maria. Let's dive into the details and see what challenges we might face moving forward.",
    timestamp: "00:28",
    sentiment: "neutral",
    language: "en",
  },
]

const mockSummary = {
  keyPoints: [
    "Quarterly progress meeting initiated by John Smith",
    "Team achievements and project milestones discussed by Maria Garcia",
    "Focus on upcoming challenges and strategic planning",
  ],
  actionItems: [
    "Review detailed project milestones",
    "Identify potential challenges for next quarter",
    "Prepare strategic planning session",
  ],
  duration: "2:45",
  wordCount: 156,
}

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "te", name: "Telugu" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "es", name: "Spanish" },
]

// Waveform Animation Component
function LiveWaveform({ isActive }: { isActive: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = 80
    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (isActive) {
        // Draw animated waveform circle
        const time = Date.now() * 0.005
        const segments = 60

        ctx.strokeStyle = "#3b82f6"
        ctx.lineWidth = 3

        for (let i = 0; i < segments; i++) {
          const angle = (i / segments) * Math.PI * 2
          const waveHeight = Math.sin(time + i * 0.3) * 20 + Math.sin(time * 2 + i * 0.1) * 10
          const innerRadius = radius + waveHeight
          const outerRadius = radius + waveHeight + 10

          const x1 = centerX + Math.cos(angle) * innerRadius
          const y1 = centerY + Math.sin(angle) * innerRadius
          const x2 = centerX + Math.cos(angle) * outerRadius
          const y2 = centerY + Math.sin(angle) * outerRadius

          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
          ctx.stroke()
        }
      } else {
        // Draw static circle
        ctx.strokeStyle = "#6b7280"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
        ctx.stroke()
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isActive])

  return <canvas ref={canvasRef} width={200} height={200} className="rounded-full" />
}

// Audio Progress Bar Component
function AudioProgressBar({
  currentTime,
  duration,
  onSeek,
}: {
  currentTime: number
  duration: number
  onSeek: (time: number) => void
}) {
  const progressRef = useRef<HTMLDivElement>(null)

  const handleClick = (e: React.MouseEvent) => {
    if (progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const percentage = clickX / rect.width
      onSeek(percentage * duration)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-2">
      <div ref={progressRef} className="w-full h-2 bg-gray-700 rounded-full cursor-pointer" onClick={handleClick}>
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
      </div>
      <div className="flex justify-between text-sm text-gray-400">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  )
}

// Sentiment Icon Component
function SentimentIcon({ sentiment }: { sentiment: string }) {
  switch (sentiment) {
    case "positive":
      return <Smile className="text-green-400" size={16} />
    case "negative":
      return <Frown className="text-red-400" size={16} />
    default:
      return <Meh className="text-yellow-400" size={16} />
  }
}

// Demo Options Page
function DemoOptions({ onSelectOption }: { onSelectOption: (option: string) => void }) {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8">
          <ArrowLeft className="mr-2" size={20} />
          Back to Home
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-bold mb-6"
        >
          Choose Your Demo Experience
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-400 mb-12"
        >
          Select how you would like to experience our Phoenix audio analysis ^_^
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Live Audio */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -10 }}
          >
            <Card
              className="bg-white/5 backdrop-blur-sm border-white/10 p-8 hover:bg-white/10 transition-all duration-300 cursor-pointer h-full flex flex-col"
              onClick={() => onSelectOption("live")}
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <Radio size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Live Audio</h3>
              <p className="text-gray-400 mb-6">
                Real-time audio processing with live transcription, translation, and speaker identification
              </p>
              <div className="flex-grow" />
              <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                Start Live Demo
              </Button>
            </Card>
          </motion.div>

          {/* Record Now */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -10 }}
          >
            <Card
              className="bg-white/5 backdrop-blur-sm border-white/10 p-8 hover:bg-white/10 transition-all duration-300 cursor-pointer h-full flex flex-col"
              onClick={() => onSelectOption("record")}
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                <Mic size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Record Now</h3>
              <p className="text-gray-400 mb-6">
                Record audio directly in your browser and analyze it with our AI-powered tools
              </p>
              <div className="flex-grow" />
              <Button className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700">
                Start Recording
              </Button>
            </Card>
          </motion.div>

          {/* Upload Audio */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -10 }}
          >
            <Card
              className="bg-white/5 backdrop-blur-sm border-white/10 p-8 hover:bg-white/10 transition-all duration-300 cursor-pointer h-full flex flex-col"
              onClick={() => onSelectOption("upload")}
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                <Upload size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Upload Audio</h3>
              <p className="text-gray-400 mb-6">
                Upload pre-recorded audio files in any format for comprehensive analysis
              </p>
              <div className="flex-grow" />
              <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                Upload File
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}


// Live Dashboard Component
function LiveDashboard({ onBack }: { onBack: () => void }) {
  const [isRecording, setIsRecording] = useState(false)
  const [targetLanguage, setTargetLanguage] = useState("hi")
  const [currentTranscript, setCurrentTranscript] = useState(mockTranscript)
  const [showTranslation, setShowTranslation] = useState(false)

  const toggleRecording = () => {
    setIsRecording(!isRecording)

    // Simulate adding new transcript entries when recording
    if (!isRecording) {
      const interval = setInterval(() => {
        const speakers = ["John Smith", "Maria Garcia"]
        const newEntry = {
          speaker: speakers[Math.floor(Math.random() * speakers.length)],
          text: "This is a simulated live transcription with real-time processing...",
          timestamp: new Date().toLocaleTimeString().slice(0, 5),
          sentiment: ["positive", "neutral", "negative"][Math.floor(Math.random() * 3)],
          language: "en",
        }

        setCurrentTranscript((prev) => [...prev, newEntry].slice(-8)) // Keep last 8 entries
      }, 4000)

      // Clear interval when component unmounts or recording stops
      setTimeout(() => clearInterval(interval), 20000)
    }
  }

  const translateText = (text: string, fromLang: string) => {
    // Mock translation - in real app this would call translation API
    const translations: { [key: string]: { [key: string]: string } } = {
      "Hello everyone, welcome to today's meeting. I'm excited to discuss our quarterly progress and the new initiatives we've been working on.":
        {
          hi: "नमस्ते सभी, आज की बैठक में आपका स्वागत है। मैं हमारी तिमाही प्रगति और नई पहलों पर चर्चा करने के लिए उत्साहित हूं।",
          es: "Hola a todos, bienvenidos a la reunión de hoy. Estoy emocionado de discutir nuestro progreso trimestral y las nuevas iniciativas.",
          ja: "皆さん、こんにちは。今日の会議へようこそ。四半期の進捗と新しい取り組みについて話し合うことを楽しみにしています。",
          ko: "안녕하세요 여러분, 오늘 회의에 오신 것을 환영합니다. 분기별 진행 상황과 새로운 이니셔티브에 대해 논의하게 되어 기쁩니다.",
          te: "అందరికీ నమస్కారం, నేటి సమావేశానికి స్వాగతం. మా త్రైమాసిక పురోగతి మరియు కొత్త కార్యక్రమాలను చర్చించడానికి నేను ఉత్సాహంగా ఉన్నాను.",
        },
    }

    return (
      translations[text]?.[targetLanguage] ||
      `[Translated to ${languages.find((l) => l.code === targetLanguage)?.name}]: ${text}`
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button onClick={onBack} className="flex items-center text-blue-400 hover:text-blue-300">
            <ArrowLeft className="mr-2" size={20} />
            Back to Options
          </button>
          <h1 className="text-2xl font-bold">Live Audio Analysis Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Select value={targetLanguage} onValueChange={setTargetLanguage}>
              <SelectTrigger className="w-40 bg-white/10 border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-white/20">
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={() => setShowTranslation(!showTranslation)}
              className={`${
                showTranslation
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  : "bg-white/10 hover:bg-white/20 border border-white/20"
              }`}
            >
              <Languages className="mr-2" size={16} />
              Translate
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Left Panel - Live Waveform */}
          <div className="lg:col-span-1">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 h-fit">
              <h3 className="text-xl font-semibold mb-6 text-center text-white">Live Audio Input</h3>

              <div className="flex flex-col items-center space-y-6">
                <LiveWaveform isActive={isRecording} />

                <Button
                  onClick={toggleRecording}
                  size="lg"
                  className={`w-20 h-20 rounded-full ${
                    isRecording
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  }`}
                >
                  {isRecording ? <Square size={32} /> : <Mic size={32} />}
                </Button>

                <p className="text-center text-gray-400">
                  {isRecording ? "Recording... Click to stop" : "Click to start recording"}
                </p>

                {/* Audio Controls */}
                <div className="flex items-center space-x-4 w-full">
                  <Volume2 size={20} className="text-gray-400" />
                  <div className="flex-1 h-2 bg-gray-700 rounded-full">
                    <div className="h-full w-3/4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Speaker Stats */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 mt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-white">
                <Users className="mr-2" size={20} />
                Speaker Statistics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-blue-400">John Smith</span>
                  <span className="text-sm text-gray-400">65% talk time</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-400">Maria Garcia</span>
                  <span className="text-sm text-gray-400">35% talk time</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Center Panel - Live Transcript */}
          <div className="lg:col-span-1">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 h-[600px] flex flex-col">
              <h3 className="text-xl font-semibold mb-4 text-white">Live Transcript</h3>

              <div className="flex-1 overflow-y-auto space-y-4">
                <AnimatePresence>
                  {currentTranscript.map((entry, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="p-3 bg-white/5 rounded-lg border-l-4 border-blue-500"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-blue-400">{entry.speaker}</span>
                          <span className="text-xs text-gray-500 uppercase">{entry.language}</span>
                          <SentimentIcon sentiment={entry.sentiment} />
                        </div>
                        <span className="text-xs text-gray-500">{entry.timestamp}</span>
                      </div>
                      <p className="text-gray-300 text-sm">{entry.text}</p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </Card>
          </div>

          {/* Right Panel - Translation & Analysis */}
          <div className="lg:col-span-2 space-y-6">
            {showTranslation && (
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 h-[280px] flex flex-col">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-white">
                  <Languages className="mr-2" size={20} />
                  Live Translation ({languages.find((l) => l.code === targetLanguage)?.name})
                </h3>

                <div className="flex-1 overflow-y-auto space-y-4">
                  {currentTranscript.slice(-3).map((entry, index) => (
                    <div key={index} className="p-3 bg-white/5 rounded-lg border-l-4 border-purple-500">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-purple-400">{entry.speaker}</span>
                        <span className="text-xs text-gray-500">{entry.timestamp}</span>
                      </div>
                      <p className="text-gray-300 text-sm">{translateText(entry.text, entry.language)}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Summarization */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-white">
                <FileText className="mr-2" size={20} />
                Live Summary
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-blue-400 mb-2">Key Points</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    {mockSummary.keyPoints.slice(0, 2).map((point, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-green-400 mb-2">Action Items</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    {mockSummary.actionItems.slice(0, 2).map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-400 mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            {/* Sentiment Analysis */}
            <Card className="bg-orange/5 backdrop-blur-sm border-white/10 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-white">
                <Heart className="mr-2" size={20} />
                Sentiment Analysis
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Smile className="text-green-400" size={16} />
                    <span className="text-yellow-400">Positive</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-gray-700 rounded-full">
                      <div className="h-full w-4/5 bg-green-400 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-400">75%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Meh className="text-yellow-400" size={16} />
                    <span className="text-yellow-400">Neutral</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-gray-700 rounded-full">
                      <div className="h-full w-1/5 bg-yellow-400 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-400">20%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Frown className="text-red-400" size={16} />
                    <span className="text-yellow-400">Negative</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-gray-700 rounded-full">
                      <div className="h-full w-1/20 bg-red-400 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-400">5%</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Record Dashboard Component
function RecordDashboard({ onBack }: { onBack: () => void }) {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [hasRecording, setHasRecording] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false)
      setHasRecording(true)
    } else {
      setIsRecording(true)
      setRecordingTime(0)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnalyzeAudio = () => {
    // Navigate to analysis dashboard with recorded audio
    onBack() // This will be modified to show analysis dashboard
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button onClick={onBack} className="flex items-center text-blue-400 hover:text-blue-300">
            <ArrowLeft className="mr-2" size={20} />
            Back to Options
          </button>
          <h1 className="text-2xl font-bold">Record Audio</h1>
          <div></div>
        </div>

        <div className="text-center">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-12 max-w-2xl mx-auto">
            <div className="flex flex-col items-center space-y-8">
              <LiveWaveform isActive={isRecording} />

              <div className="text-4xl font-mono text-blue-400">{formatTime(recordingTime)}</div>

              <Button
                onClick={toggleRecording}
                size="lg"
                className={`w-24 h-24 rounded-full ${
                  isRecording
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                }`}
              >
                {isRecording ? <Square size={40} /> : <Mic size={40} />}
              </Button>

              <p className="text-gray-400 text-lg">
                {isRecording
                  ? "Recording in progress..."
                  : hasRecording
                    ? "Recording complete!"
                    : "Click to start recording"}
              </p>

              {hasRecording && (
                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                    onClick={toggleRecording}
                  >
                    <Mic className="mr-2" size={16} />
                    Record Again
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                    onClick={() => onBack()} // This will trigger analysis dashboard
                  >
                    Analyze Audio
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Upload Dashboard Component
function UploadDashboard({ onBack }: { onBack: () => void }) {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0])
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button onClick={onBack} className="flex items-center text-blue-400 hover:text-blue-300">
            <ArrowLeft className="mr-2" size={20} />
            Back to Options
          </button>
          <h1 className="text-2xl font-bold">Upload Audio File</h1>
          <div></div>
        </div>

        <div className="text-center">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-12 max-w-2xl mx-auto">
            {!uploadedFile ? (
              <div
                className={`border-2 border-dashed rounded-lg p-12 transition-colors ${
                  dragActive ? "border-blue-400 bg-blue-400/10" : "border-gray-600"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <FileAudio size={64} className="mx-auto mb-6 text-gray-400" />
                <h3 className="text-xl font-semibold mb-4">Drop your audio file here</h3>
                <p className="text-gray-400 mb-6">Supports MP3, WAV, M4A, FLAC, and more formats</p>
                <input type="file" accept="audio/*" onChange={handleFileSelect} className="hidden" id="file-upload" />
                <label htmlFor="file-upload">
                  <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                    <Upload className="mr-2" size={16} />
                    Choose File
                  </Button>
                </label>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-center space-x-4 p-4 bg-white/5 rounded-lg">
                  <FileAudio size={32} className="text-blue-400" />
                  <div className="text-left">
                    <p className="font-medium">{uploadedFile.name}</p>
                    <p className="text-sm text-gray-400">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setUploadedFile(null)}
                    className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    Choose Different File
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                    onClick={() => onBack()} // This will trigger analysis dashboard
                  >
                    Analyze Audio
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

// Analysis Dashboard Component (for recorded/uploaded audio)
function AnalysisDashboard({
  onBack,
  audioType,
}: {
  onBack: () => void
  audioType: "recorded" | "uploaded"
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(45) // Mock current time
  const [duration] = useState(165) // Mock duration (2:45)
  const [targetLanguage, setTargetLanguage] = useState("hi")
  const [showTranslation, setShowTranslation] = useState(false)

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
    // In real implementation, this would control actual audio playback
  }

  const handleSeek = (time: number) => {
    setCurrentTime(time)
    // In real implementation, this would seek the audio
  }

  const translateText = (text: string, fromLang: string) => {
    // Mock translation - same as live dashboard
    const translations: { [key: string]: { [key: string]: string } } = {
      "Hello everyone, welcome to today's meeting. I'm excited to discuss our quarterly progress and the new initiatives we've been working on.":
        {
          hi: "नमस्ते सभी, आज की बैठक में आपका स्वागत है। मैं हमारी तिमाही प्रगति और नई पहलों पर चर्चा करने के लिए उत्साहित हूं।",
          es: "Hola a todos, bienvenidos a la reunión de hoy. Estoy emocionado de discutir nuestro progreso trimestral y las nuevas iniciativas.",
          ja: "皆さん、こんにちは。今日の会議へようこそ。四半期の進捗と新しい取り組みについて話し合うことを楽しみにしています。",
          ko: "안녕하세요 여러분, 오늘 회의에 오신 것을 환영합니다. 분기별 진행 상황과 새로운 이니셔티브에 대해 논의하게 되어 기쁩니다.",
          te: "అందరికీ నమస్కారం, నేటి సమావేశానికి స్వాగతం. మా త్రైమాసిక పురోగతి మరియు కొత్త కార్యక్రమాలను చర్చించడానికి నేను ఉత్సాహంగా ఉన్నాను.",
        },
    }

    return (
      translations[text]?.[targetLanguage] ||
      `[Translated to ${languages.find((l) => l.code === targetLanguage)?.name}]: ${text}`
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button onClick={onBack} className="flex items-center text-blue-400 hover:text-blue-300">
            <ArrowLeft className="mr-2" size={20} />
            Back to Options
          </button>
          <h1 className="text-2xl font-bold">{audioType === "recorded" ? "Recorded" : "Uploaded"} Audio Analysis</h1>
          <div className="flex items-center space-x-4">
            <Select value={targetLanguage} onValueChange={setTargetLanguage}>
              <SelectTrigger className="w-40 bg-white/10 border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-white/20">
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={() => setShowTranslation(!showTranslation)}
              className={`${
                showTranslation
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  : "bg-white/10 hover:bg-white/20 border border-white/20"
              }`}
            >
              <Languages className="mr-2" size={16} />
              Translate
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Left Panel - Audio Player */}
          <div className="lg:col-span-1">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 h-fit">
              <h3 className="text-xl font-semibold mb-6 text-center">Audio Player</h3>

              <div className="flex flex-col items-center space-y-6">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <FileAudio size={48} className="text-white" />
                </div>

                <AudioProgressBar currentTime={currentTime} duration={duration} onSeek={handleSeek} />

                <div className="flex items-center space-x-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    <SkipBack size={16} />
                  </Button>
                  <Button
                    onClick={togglePlayback}
                    size="lg"
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    <SkipForward size={16} />
                  </Button>
                </div>

                {/* Audio Info */}
                <div className="text-center text-sm text-gray-400">
                  <p>{audioType === "recorded" ? "Recorded Audio" : "meeting_audio.mp3"}</p>
                  <p>
                    Duration: {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, "0")}
                  </p>
                </div>
              </div>
            </Card>

            {/* Speaker Stats */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 mt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Users className="mr-2" size={20} />
                Speaker Statistics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-blue-400">John Smith</span>
                  <span className="text-sm text-gray-400">65% talk time</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-400">Maria Garcia</span>
                  <span className="text-sm text-gray-400">35% talk time</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Center Panel - Transcript */}
          <div className="lg:col-span-1">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 h-[600px] flex flex-col">
              <h3 className="text-xl font-semibold mb-4">Transcript</h3>

              <div className="flex-1 overflow-y-auto space-y-4">
                {mockTranscript.map((entry, index) => (
                  <div key={index} className="p-3 bg-white/5 rounded-lg border-l-4 border-blue-500">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-blue-400">{entry.speaker}</span>
                        <span className="text-xs text-gray-500 uppercase">{entry.language}</span>
                        <SentimentIcon sentiment={entry.sentiment} />
                      </div>
                      <span className="text-xs text-gray-500">{entry.timestamp}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{entry.text}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Panel - Translation & Analysis */}
          <div className="lg:col-span-2 space-y-6">
            {showTranslation && (
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 h-[280px] flex flex-col">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Languages className="mr-2" size={20} />
                  Translation ({languages.find((l) => l.code === targetLanguage)?.name})
                </h3>

                <div className="flex-1 overflow-y-auto space-y-4">
                  {mockTranscript.map((entry, index) => (
                    <div key={index} className="p-3 bg-white/5 rounded-lg border-l-4 border-purple-500">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-purple-400">{entry.speaker}</span>
                        <span className="text-xs text-gray-500">{entry.timestamp}</span>
                      </div>
                      <p className="text-gray-300 text-sm">{translateText(entry.text, entry.language)}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Summarization */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FileText className="mr-2" size={20} />
                Audio Summary
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-blue-400 mb-2">Key Points</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    {mockSummary.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-green-400 mb-2">Action Items</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    {mockSummary.actionItems.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-400 mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between text-sm text-gray-400 pt-2 border-t border-white/10">
                  <span>Duration: {mockSummary.duration}</span>
                  <span>Words: {mockSummary.wordCount}</span>
                </div>
              </div>
            </Card>

            {/* Sentiment Analysis */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Heart className="mr-2" size={20} />
                Sentiment Analysis
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Smile className="text-green-400" size={16} />
                    <span className="text-yellow-400">Positive</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-gray-700 rounded-full">
                      <div className="h-full w-4/5 bg-green-400 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-400">75%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Meh className="text-yellow-400" size={16} />
                    <span className="text-yellow-400">Neutral</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-gray-700 rounded-full">
                      <div className="h-full w-1/5 bg-yellow-400 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-400">20%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Frown className="text-red-400" size={16} />
                    <span className="text-yellow-400">Negative</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-gray-700 rounded-full">
                      <div className="h-full w-1/20 bg-red-400 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-400">5%</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Demo Page Component
export default function DemoPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showAnalysis, setShowAnalysis] = useState<{ show: boolean; type: "recorded" | "uploaded" | null }>({
    show: false,
    type: null,
  })

  const handleSelectOption = (option: string) => {
    if (option === "record" || option === "upload") {
      // For record and upload, we'll show analysis after they complete the action
      setSelectedOption(option)
    } else {
      setSelectedOption(option)
    }
  }

  const handleBackFromRecordUpload = () => {
    // When coming back from record/upload, show analysis dashboard
    if (selectedOption === "record") {
      setShowAnalysis({ show: true, type: "recorded" })
    } else if (selectedOption === "upload") {
      setShowAnalysis({ show: true, type: "uploaded" })
    }
    setSelectedOption(null)
  }

  const handleBackFromAnalysis = () => {
    setShowAnalysis({ show: false, type: null })
    setSelectedOption(null)
  }

  const renderDashboard = () => {
    if (showAnalysis.show && showAnalysis.type) {
      return <AnalysisDashboard onBack={handleBackFromAnalysis} audioType={showAnalysis.type} />
    }

    switch (selectedOption) {
      case "live":
        return <LiveDashboard onBack={() => setSelectedOption(null)} />
      case "record":
        return <RecordDashboard onBack={handleBackFromRecordUpload} />
      case "upload":
        return <UploadDashboard onBack={handleBackFromRecordUpload} />
      default:
        return <DemoOptions onSelectOption={handleSelectOption} />
    }
  }

  return <AnimatePresence mode="wait">{renderDashboard()}</AnimatePresence>
}
 