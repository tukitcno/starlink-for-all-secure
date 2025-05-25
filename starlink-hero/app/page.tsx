"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useScroll, useTransform, useInView } from "framer-motion"
import Image from "next/image"
import { Globe, Satellite, Calculator, TrendingUp, Users, Clock, DollarSign, Target } from "lucide-react"
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge"
import Navbar from "../../components/Navbar"

// Particle component (keeping existing)
const Particle = ({
  delay,
  duration,
  startX,
  startY,
}: { delay: number; duration: number; startX: number; startY: number }) => {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-30"
      initial={{
        x: startX,
        y: startY,
        scale: 0,
        opacity: 0,
      }}
      animate={{
        x: [startX, startX + Math.random() * 400 - 200, startX + Math.random() * 600 - 300],
        y: [startY, startY + Math.random() * 400 - 200, startY + Math.random() * 600 - 300],
        scale: [0, 1, 0],
        opacity: [0, 0.6, 0],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      style={{
        boxShadow: "0 0 6px #FFD700, 0 0 12px #FFD700",
      }}
    />
  )
}

// Light ray component (keeping existing)
const LightRay = ({ angle, delay }: { angle: number; delay: number }) => {
  return (
    <motion.div
      className="absolute w-px h-32 bg-gradient-to-t from-cyan-400/20 to-transparent origin-bottom"
      style={{
        left: "50%",
        bottom: "20%",
        transform: `rotate(${angle}deg)`,
      }}
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{
        opacity: [0, 0.4, 0],
        scaleY: [0, 1, 0],
      }}
      transition={{
        duration: 3,
        delay: delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
  );
}

// Animated section component
const AnimatedSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  )
}

// ROI Calculator Component
const ROICalculator = () => {
  const [investment, setInvestment] = useState(1900)
  const [timeframe, setTimeframe] = useState(3) // Changed from 12 to 3 months

  const calculateROI = (amount: number, months: number) => {
    const commission = amount <= 15000 ? 0.019 : 0.05
    const monthlyCommission = amount * commission
    const totalReturn = monthlyCommission * months
    const roi = (totalReturn / amount) * 100

    // Assuming 8 hours average rental per day
    const dailyRental = 8 * 30 // 8 hours * 30 BDT
    const monthlyRental = dailyRental * 30 // 30 days
    const totalRental = monthlyRental * months

    return {
      commission: commission * 100,
      monthlyCommission,
      totalReturn,
      roi,
      dailyRental,
      monthlyRental,
      totalRental,
      totalProfit: totalReturn + totalRental,
    }
  }

  const results = calculateROI(investment, timeframe)

  return (
    <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Calculator className="w-5 h-5 text-cyan-400" />
          ROI Calculator
        </CardTitle>
        <CardDescription className="text-gray-400">
          Calculate your potential returns from Starlink device investments (showing minimum investment scenario)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Investment Amount (BDT)</label>
            <Input
              type="number"
              value={investment}
              onChange={(e) => setInvestment(Math.max(1900, Number(e.target.value)))}
              min={1900}
              className="bg-black/50 border-gray-700 text-white"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Timeframe (Months)</label>
            <Input
              type="number"
              value={timeframe}
              onChange={(e) => setTimeframe(Math.max(3, Number(e.target.value)))}
              min={3}
              max={60}
              className="bg-black/50 border-gray-700 text-white"
            />
          </div>
        </div>

        <div className="text-sm text-gray-500 mt-2">
          <p>* Minimum investment: ৳1,900 | Minimum timeframe: 3 months</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-black/30 p-4 rounded-lg">
            <div className="text-cyan-400 text-2xl font-bold">{results.commission.toFixed(1)}%</div>
            <div className="text-gray-400 text-sm">Commission Rate</div>
          </div>
          <div className="bg-black/30 p-4 rounded-lg">
            <div className="text-green-400 text-2xl font-bold">৳{results.monthlyCommission.toLocaleString()}</div>
            <div className="text-gray-400 text-sm">Monthly Commission</div>
          </div>
          <div className="bg-black/30 p-4 rounded-lg">
            <div className="text-yellow-400 text-2xl font-bold">৳{results.monthlyRental.toLocaleString()}</div>
            <div className="text-gray-400 text-sm">Monthly Rental Income</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-cyan-500/20 to-yellow-500/20 p-6 rounded-lg border border-cyan-500/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-white text-3xl font-bold">৳{results.totalProfit.toLocaleString()}</div>
              <div className="text-gray-300">Total Projected Profit ({timeframe} months)</div>
            </div>
            <div>
              <div className="text-cyan-400 text-3xl font-bold">{results.roi.toFixed(1)}%</div>
              <div className="text-gray-300">Total ROI</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Investment Plan Component
const InvestmentPlan = ({
  title,
  amount,
  commission,
  features,
  isPopular = false,
}: {
  title: string
  amount: number
  commission: number
  features: string[]
  isPopular?: boolean
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      className={`relative ${isPopular ? "scale-105" : ""}`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: isPopular ? 1.08 : 1.03 }}
    >
      <Card
        className={`bg-gray-900/50 border-gray-800 backdrop-blur-sm h-full ${
          isPopular ? "border-cyan-500 shadow-lg shadow-cyan-500/20" : ""
        }`}
      >
        {isPopular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-cyan-500 text-black font-semibold">Most Popular</Badge>
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-white text-xl">{title}</CardTitle>
          <div className="text-3xl font-bold text-cyan-400">৳{amount.toLocaleString()}</div>
          <div className="text-green-400 font-semibold">{commission}% Commission</div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 mb-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-gray-300">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3" />
                {feature}
              </li>
            ))}
          </ul>
          <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">Start Investment</Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function StarlinkInvestmentPlatform() {
  const terminalRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const terminalScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  useEffect(() => {
    // Ambient rotation animation
    controls.start({
      rotateY: [0, 360],
      transition: {
        duration: 20,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      },
    })
  }, [controls])

  // Generate particles
  const particles = Array.from({ length: 300 }, (_, i) => ({
    id: i,
    delay: Math.random() * 10,
    duration: 8 + Math.random() * 4,
    startX: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
    startY: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
  }))

  // Generate light rays
  const lightRays = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    angle: i * 45 + Math.random() * 20 - 10,
    delay: Math.random() * 2,
  }))

  const investmentPlans = [
    {
      title: "Starter Plan",
      amount: 1900,
      commission: 1.9,
      features: [
        "Minimum investment entry",
        "1.9% monthly commission",
        "Device rental income",
        "24/7 support",
        "Flexible withdrawal",
      ],
    },
    {
      title: "Growth Plan",
      amount: 10000,
      commission: 1.9,
      features: [
        "Higher rental potential",
        "1.9% monthly commission",
        "Priority device allocation",
        "Monthly performance reports",
        "Dedicated support",
      ],
      isPopular: true,
    },
    {
      title: "Premium Plan",
      amount: 25000,
      commission: 5.0,
      features: [
        "Maximum returns",
        "5% monthly commission",
        "Multiple device allocation",
        "VIP support",
        "Quarterly bonus rewards",
      ],
    },
  ]

  const bangladeshStats = [
    { icon: Users, label: "Rural Population", value: "65%", description: "Without reliable internet" },
    { icon: Globe, label: "Internet Penetration", value: "38%", description: "Current coverage rate" },
    { icon: TrendingUp, label: "Digital Growth", value: "15%", description: "Annual increase in demand" },
    { icon: Target, label: "Target Areas", value: "50+", description: "Districts to be covered" },
  ]

  return (
    <div className="bg-black">
      <Navbar />
      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        className="relative w-full h-screen bg-black overflow-hidden"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        {/* Particle System */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle) => (
            <Particle
              key={particle.id}
              delay={particle.delay}
              duration={particle.duration}
              startX={particle.startX}
              startY={particle.startY}
            />
          ))}
        </div>

        {/* Depth Fog */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 70% 50%, rgba(50,50,50,0.1) 0%, transparent 70%)",
          }}
        />

        {/* Main Content Container */}
        <div className="relative w-full h-full flex items-center">
          {/* Left Side - Investment CTA */}
          <div className="w-2/5 h-full flex items-center justify-center px-8">
            <motion.div
              className="text-left max-w-md"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Invest in
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-yellow-400">
                  Bangladesh's
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-cyan-400">
                  Digital Future
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Earn up to 5% monthly returns by investing in Starlink devices that provide high-speed internet to
                underserved communities across Bangladesh.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 text-lg">Start Investing</Button>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3 text-lg">
                  Learn More
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Product Zone (60% width) */}
          <div className="w-3/5 h-full flex items-center justify-center relative">
            {/* Light Rays */}
            <div className="absolute inset-0">
              {lightRays.map((ray) => (
                <LightRay key={ray.id} angle={ray.angle} delay={ray.delay} />
              ))}
            </div>

            {/* Starlink Terminal */}
            <motion.div
              ref={terminalRef}
              className="product-slot relative z-10"
              animate={controls}
              style={{ scale: terminalScale }}
              whileHover={{
                y: -20,
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
            >
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(0,245,255,0.3) 0%, rgba(0,245,255,0.1) 40%, transparent 70%)",
                  filter: "blur(20px)",
                  transform: "scale(1.5)",
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1.5, 1.8, 1.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />

              {/* Terminal Image */}
              <motion.div
                className="relative z-10"
                whileHover={{
                  rotateX: 5,
                  rotateY: 5,
                }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/starlink-terminal.png"
                  alt="Starlink Terminal"
                  width={400}
                  height={400}
                  className="w-80 h-80 md:w-96 md:h-96 object-contain"
                  style={{
                    filter: "drop-shadow(0 0 20px rgba(0,245,255,0.5))",
                  }}
                />
              </motion.div>

              {/* Investment Stats Overlay */}
              <motion.div
                className="absolute -bottom-16 -left-16 bg-black/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                <div className="text-cyan-400 text-2xl font-bold">৳30/hour</div>
                <div className="text-gray-300 text-sm">Rental Rate</div>
              </motion.div>

              <motion.div
                className="absolute -top-16 -right-16 bg-black/80 backdrop-blur-sm border border-yellow-500/30 rounded-lg p-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2, duration: 0.5 }}
              >
                <div className="text-yellow-400 text-2xl font-bold">5%</div>
                <div className="text-gray-300 text-sm">Max Commission</div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Ambient Lighting */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 70% 50%, rgba(0,245,255,0.05) 0%, transparent 50%)",
          }}
        />
      </motion.div>

      {/* Investment Plans Section */}
      <AnimatedSection className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Investment
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-yellow-400">
                Plans
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Choose the investment plan that suits your financial goals and start earning from Starlink device rentals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {investmentPlans.map((plan, index) => (
              <InvestmentPlan
                key={index}
                title={plan.title}
                amount={plan.amount}
                commission={plan.commission}
                features={plan.features}
                isPopular={plan.isPopular}
              />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ROI Calculator Section */}
      <AnimatedSection className="relative py-24 px-6 bg-gray-900/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">Calculate Your Returns</h3>
            <p className="text-lg text-gray-400">
              Use our ROI calculator to see potential earnings from your Starlink device investment
            </p>
          </motion.div>

          <ROICalculator />
        </div>
      </AnimatedSection>

      {/* How It Works Section */}
      <AnimatedSection className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">How It Works</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Invest",
                description: "Choose your investment amount starting from ৳1,900",
                icon: DollarSign,
              },
              {
                step: "02",
                title: "Deploy",
                description: "We deploy Starlink devices to underserved areas in Bangladesh",
                icon: Satellite,
              },
              {
                step: "03",
                title: "Rent",
                description: "Devices are rented at ৳30/hour to local communities",
                icon: Clock,
              },
              {
                step: "04",
                title: "Earn",
                description: "Receive monthly commissions and rental income",
                icon: TrendingUp,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-black" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-black border-2 border-cyan-400 rounded-full flex items-center justify-center text-cyan-400 text-sm font-bold">
                    {item.step}
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-white mb-3">{item.title}</h4>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Bangladesh Impact Section */}
      <AnimatedSection className="relative py-24 px-6 bg-gray-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Transforming
                <span className="block text-cyan-400">Bangladesh's</span>
                <span className="block text-yellow-400">Digital Landscape</span>
              </h3>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Your investment directly contributes to bridging the digital divide in Bangladesh, providing high-speed
                internet access to rural and underserved communities while generating sustainable returns.
              </p>

              <div className="space-y-6">
                <div className="bg-black/30 p-4 rounded-lg">
                  <h4 className="text-cyan-400 font-semibold mb-2">Economic Impact</h4>
                  <p className="text-gray-300">Creating jobs and enabling digital entrepreneurship in rural areas</p>
                </div>
                <div className="bg-black/30 p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-2">Educational Access</h4>
                  <p className="text-gray-300">Enabling online education and skill development programs</p>
                </div>
                <div className="bg-black/30 p-4 rounded-lg">
                  <h4 className="text-green-400 font-semibold mb-2">Healthcare Connectivity</h4>
                  <p className="text-gray-300">Supporting telemedicine and remote healthcare services</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-6"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {bangladeshStats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-black/50 p-6 rounded-xl border border-gray-800 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, borderColor: "rgba(6, 182, 212, 0.5)" }}
                >
                  <stat.icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-cyan-400 font-semibold mb-2">{stat.label}</div>
                  <div className="text-gray-400 text-sm">{stat.description}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Call to Action Section */}
      <AnimatedSection className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-yellow-400">
                Investment Journey?
              </span>
            </h3>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of investors who are earning sustainable returns while making a positive impact on
              Bangladesh's digital future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-4 text-lg">
                Start Investing Now
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg">
                Download Prospectus
              </Button>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <AnimatedSection className="relative py-16 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-semibold mb-4">Investment Platform</h4>
              <p className="text-gray-400 text-sm">
                Connecting investors with Bangladesh's digital infrastructure needs through Starlink technology.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="/dashboard" className="hover:text-cyan-400">Dashboard</a></li>
                <li><a href="/faq" className="hover:text-cyan-400">FAQ</a></li>
                <li><a href="/how-it-works" className="hover:text-cyan-400">How It Works</a></li>
                <li><a href="/login" className="hover:text-cyan-400">Login</a></li>
                <li><a href="/" className="hover:text-cyan-400">Home</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
                <li>Risk Disclosure</li>
                <li>Compliance</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>support@starlinkinvest.bd</li>
                <li>+880 1XXX-XXXXXX</li>
                <li>Dhaka, Bangladesh</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500">
              © 2024 Starlink Investment Platform Bangladesh. All rights reserved. | Investment involves risk. Past
              performance does not guarantee future results.
            </p>
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}
