"use client"

import { useState, useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Upload,
  Cpu,
  MessageSquare,
  Mic,
  Globe,
  Shield,
  Zap,
  Users,
  Play,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import * as THREE from "three";
//3Dwaveform animation component
function AnimatedWaveform() {
  const pointsRef = useRef<THREE.Points>(null!);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  // Generate waveform-like points
  const points = new Float32Array(2000 * 3)
  for (let i = 0; i < 2000; i++) {
    const x = (Math.random() - 0.5) * 10
    const y = Math.sin(x * 0.5) * 2 + (Math.random() - 0.5) * 0.5
    const z = (Math.random() - 0.5) * 10

    points[i * 3] = x
    points[i * 3 + 1] = y
    points[i * 3 + 2] = z
  }

  return (
    <Points ref={pointsRef} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#3b82f6" size={0.05} sizeAttenuation={true} depthWrite={false} opacity={0.6} />
    </Points>
  )
}

// Navigation Component
function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <a href="#hero">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Phoenix
          </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">
              How It Works
            </Link>
            <Link href="#demo" className="text-gray-300 hover:text-white transition-colors">
              See it in action
            </Link>
            <Link href="#features" className="text-gray-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#team" className="text-gray-300 hover:text-white transition-colors">
              Team
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <Link href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">
                How It Works
              </Link>
              <Link href="#demo" className="text-gray-300 hover:text-white transition-colors">
                See it in action
              </Link>
              <Link href="#features" className="text-gray-300 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="#team" className="text-gray-300 hover:text-white transition-colors">
                Team
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
// Hero Section
function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse" />
      </div>

      {/* 3D Waveform */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <AnimatedWaveform />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6"
        >
          From Speech to{" "}
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Insight
          </span>{" "}
          — Instantly
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
        >
          Identify speakers, detect languages, transcribe & translate in seconds, even in noisy, multilingual audio.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
        <a href="#demo">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            Start Exploring
          </Button>
          </a>
          
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
}

// How It Works Section
function HowItWorksSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const steps = [
    {
      icon: Upload,
      title: "Upload Audio",
      description: "Drop your audio file or record directly in the browser. Supports all major formats.",
    },
    {
      icon: Cpu,
      title: "AI Processing",
      description: "Our advanced AI analyzes speech patterns, identifies speakers, and detects languages.",
    },
    {
      icon: MessageSquare,
      title: "Speaker-Aware Transcript & Translation",
      description: "Get accurate transcripts with speaker identification and real-time translation.",
    },
  ]

  return (
    <section id="how-it-works" className="py-24 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">How It Works</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Three simple steps to transform your audio into actionable insights
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group h-full"
            >
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8 text-center hover:bg-white/10 transition-all duration-300 h-full flex flex-col">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <step.icon size={32} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-white mb-4">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


// Demo Preview Section
function DemoSection() {
  const [isPlaying] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="demo" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">See It In Action</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">Experience the power of AI-driven audio analysis</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-white/10"
        >
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Center Mic */}
            <div className="lg:col-start-2 flex flex-col items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open("/demo", "_blank")}
                className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-6 shadow-2xl"
              >
                {isPlaying ? (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Mic size={48} className="text-white" />
                  </motion.div>
                ) : (
                  <Play size={48} className="text-white ml-2" />
                )}
              </motion.button>
              <p className="text-gray-400 text-center">Click to open demo</p>
            </div>

            {/* Left Panel - Transcript */}
            <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <MessageSquare className="mr-2" size={20} />
                Live Transcript
              </h3>
              <div className="space-y-3 text-sm">
                <div className="text-blue-400">
                  <span className="font-medium">Speaker 1:</span>
                  <span className="text-gray-300 ml-2">Hello, how are you today?</span>
                </div>
                <div className="text-purple-400">
                  <span className="font-medium">Speaker 2:</span>
                  <span className="text-gray-300 ml-2">¡Hola! Estoy muy bien, gracias.</span>
                </div>
                {isPlaying && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400">
                    <span className="font-medium">Speaker 1:</span>
                    <span className="text-gray-300 ml-2">That is great to hear...</span>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Right Panel - Translation */}
            <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <Globe className="mr-2" size={20} />
                Translation
              </h3>
              <div className="space-y-3 text-sm">
                <div className="text-blue-400">
                  <span className="font-medium">Speaker 1 (EN):</span>
                  <span className="text-gray-300 ml-2">Hello, how are you today?</span>
                </div>
                <div className="text-purple-400">
                  <span className="font-medium">Speaker 2 (ES→EN):</span>
                  <span className="text-gray-300 ml-2">Hello! I am very well, thank you.</span>
                </div>
                {isPlaying && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400">
                    <span className="font-medium">Speaker 1 (EN):</span>
                    <span className="text-gray-300 ml-2">That is great to hear...</span>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Features Section
function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const features = [
    {
      icon: Globe,
      title: "Language-Agnostic",
      description: "Supports 100+ languages with automatic detection",
    },
    {
      icon: Shield,
      title: "Noise Robust",
      description: "Advanced filtering handles background noise and poor audio quality",
    },
    {
      icon: Zap,
      title: "Real-Time Ready",
      description: "Process audio streams in real-time with minimal latency",
    },
    {
      icon: Users,
      title: "Speaker Identification",
      description: "Distinguish between multiple speakers automatically",
    },
    {
      icon: MessageSquare,
      title: "Multilingual Translation",
      description: "Instant translation between any supported language pairs",
    },
    {
      icon: Cpu,
      title: "AI-Powered",
      description: "State-of-the-art neural networks for maximum accuracy",
    },
  ]

  return (
    <section id="features" className="py-24 bg-gray-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Powerful Features</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Everything you need for comprehensive audio analysis
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="bg-white/5 backdrop-blur-md border-white/10 p-6 hover:bg-white/10 transition-all duration-300 h-full">
                <div className="w-12 h-12 mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
// Team Section
function TeamSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const team = [
    {
      name: "Siddharth Paul",
      role: "Team Leader, R&D, Model Trainer",
      bio: "Aspiring AI research engineer and someone passionate about AI and deep learning ",
      image: "/siddharth.png",
    },
    {
      name: "Akshat Sinha",
      role: "Backend Engineer , R&D",
      bio: "Aspiring AI engineer and Passionate about how software works and is also a web developer  ",
      image: "/akshat.png",
    },
    {
      name: "Mayank Kumar",
      role: "UI/UX designer",
      bio: "Interested in making scalable and stunning designs",
      image: "/mayank.png",
    },
    {
      name: "Pratik Kumar Sinha",
      role: "Database Manager",
      bio: "Querying through life and stuff",
      image: "/pratik.jpg",
    },
  ]

  return (
    <section id="team" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}} 
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Meet Our Team</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A Squad of passionate upcoming Engineers who are looking for methods to change the world by making innovative tech scalable
          </p>
        </motion.div>

        {/* Force 4 cards per row on lg+ screens */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group h-full"
            >
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 text-center hover:bg-white/10 transition-all duration-300 h-full flex flex-col">
                <div className="relative mb-6">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="w-32 h-32 rounded-full mx-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                  <p className="text-blue-400 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 md:mb-0">
            Phoenix
          </div>

          <div className="flex space-x-6">
            <Link
              href="https://github.com"
              className="text-gray-400 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={24} />
            </Link>
            <Link
              href="https://linkedin.com"
              className="text-gray-400 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={24} />
            </Link>
            <Link href="mailto:contact@Phoenix.com" className="text-gray-400 hover:text-white transition-colors">
              <Mail size={24} />
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Phoenix. All rights reserved. So please dont copy stuff ^_~ </p>
        </div>
      </div>
    </footer>
  )
}

// Main Component
export default function LandingPage() {
  return (
    <div className="bg-black text-white overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <HowItWorksSection />
      <DemoSection />
      <FeaturesSection />
      <TeamSection />
      <Footer />
    </div>
  )
}
