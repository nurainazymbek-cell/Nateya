"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { OnboardingFlow } from "./onboarding-flow"
import { RoadmapView } from "./roadmap-view"
import { Navbar } from "./navbar"
import { Sparkles, ArrowRight, CheckCircle2, Globe, GraduationCap, Users, Award } from "lucide-react"

export function LandingPage() {
    const [showOnboarding, setShowOnboarding] = useState(false)
    const [roadmapData, setRoadmapData] = useState<any>(null)

    useEffect(() => {
        const hash = window.location.hash
        if (hash) {
            const id = hash.replace("#", "")
            const element = document.getElementById(id)
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: "smooth" })
                }, 100)
            }
        }
    }, [])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.04, 0.62, 0.23, 0.98] as any
            }
        },
    }

    if (roadmapData) {
        return (
            <div className="pt-14">
                <Navbar />
                <RoadmapView data={roadmapData} />
            </div>
        )
    }

    if (showOnboarding) {
        return (
            <div className="min-h-screen bg-[#F5F5F7] flex flex-col pt-14">
                <Navbar />
                <div className="flex-1 flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-xl"
                    >
                        <OnboardingFlow onComplete={(data) => setRoadmapData(data)} />
                    </motion.div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] selection:bg-[#0071E3]/20 font-sans">
            <Navbar />

            {/* Hero Section */}
            <main id="planner" className="max-w-7xl mx-auto px-6 pt-32 pb-32">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-8"
                    >
                        <motion.h1
                            variants={itemVariants}
                            className="text-6xl md:text-7xl font-bold tracking-tight leading-[1.05]"
                        >
                            Your Journey to <br />
                            <span className="text-[#0071E3]">Global Universities.</span>
                        </motion.h1>
                        <motion.p
                            variants={itemVariants}
                            className="text-xl md:text-2xl text-[#6E6E73] max-w-lg leading-relaxed font-medium"
                        >
                            Master <span className="text-[#1D1D1F]">ЕНТ, IELTS, SAT, TOLC, and CSCA</span> with AI. The most advanced preparation hub for Kazakhstani students.
                        </motion.p>
                        <motion.div variants={itemVariants} className="pt-4 flex flex-col sm:flex-row gap-4">
                            <Button
                                size="lg"
                                className="bg-[#0071E3] hover:bg-[#0071E3]/90 text-white rounded-full px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                                onClick={() => setShowOnboarding(true)}
                            >
                                Start Free Trial
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="rounded-full px-8 py-6 text-lg font-medium border-[#1D1D1F]/10 hover:bg-white transition-all shadow-sm"
                            >
                                Watch Demo
                            </Button>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.5, ease: [0.04, 0.62, 0.23, 0.98] as any }}
                        className="relative"
                    >
                        <div className="group relative rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-[#1D1D1F]/5 bg-white aspect-square flex items-center justify-center p-12 hover:translate-y-[-8px] transition-transform duration-700 ease-[0.23,1,0.32,1]">
                            <Image
                                src="/branding/nateya-logo.png"
                                alt="Nateya Academy Logo"
                                width={800}
                                height={800}
                                className="w-full h-full object-contain"
                                priority
                            />
                        </div>
                    </motion.div>
                </div>
            </main>

            {/* IELTS Deep Dive Section */}
            <section className="bg-white py-32 overflow-hidden border-y border-[#1D1D1F]/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Comprehensive IELTS Mastery.</h2>
                            <p className="text-xl text-[#6E6E73] leading-relaxed">
                                We don't just teach tricks. We build the core competencies required for a Band 7.5+ score through recursive AI feedback.
                            </p>

                            <div className="grid gap-4">
                                {[
                                    {
                                        title: "Writing Section",
                                        desc: "Recursive feedback on Task 1 & 2. We analyze Task Response, Cohesion, Lexical Resource, and Grammatical Range with 99% accuracy vs real examiners.",
                                        icon: <GraduationCap className="w-5 h-5" />
                                    },
                                    {
                                        title: "Speaking AI Tutor",
                                        desc: "Practice 24/7 with a voice-activated AI that simulates Parts 1, 2, and 3. Get instant feedback on pronunciation and fluency without the pressure of a human examiner.",
                                        icon: <Globe className="w-5 h-5" />
                                    },
                                    {
                                        title: "Pattern Recognition",
                                        desc: "Our engine identifies if you struggle with 'True/False/Not Given' or 'Multiple Choice' in Reading and builds a custom drill set just for you.",
                                        icon: <Sparkles className="w-5 h-5" />
                                    }
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        id={item.title.toLowerCase().includes("writing") ? "writing" : item.title.toLowerCase().includes("speaking") ? "speaking" : undefined}
                                        className="group p-6 rounded-[2rem] bg-[#F5F5F7] border border-[#1D1D1F]/5 hover:bg-white hover:shadow-xl transition-all duration-500"
                                    >
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-[#0071E3] flex items-center justify-center text-white shadow-lg shadow-[#0071E3]/20 shrink-0">
                                                {item.icon}
                                            </div>
                                            <div className="space-y-2">
                                                <h4 className="font-bold text-lg group-hover:text-[#0071E3] transition-colors">{item.title}</h4>
                                                <p className="text-[#6E6E73] text-sm leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="relative p-12 bg-gradient-to-br from-[#F5F5F7] to-white rounded-[4rem] border border-[#1D1D1F]/5 shadow-sm"
                        >
                            <div className="space-y-8 scale-105">
                                <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-[#1D1D1F]/5 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 px-4 py-1 bg-[#0071E3] text-white text-[10px] font-bold rounded-bl-xl">LIVE FEEDBACK</div>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-10 h-10 rounded-full bg-[#0071E3]/10 flex items-center justify-center">
                                            <Users className="w-5 h-5 text-[#0071E3]" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-[#6E6E73] uppercase tracking-tighter">AI Analysis</span>
                                            <span className="text-sm font-semibold">Writing Task 2</span>
                                        </div>
                                    </div>
                                    <p className="text-sm leading-relaxed text-[#1D1D1F] border-l-2 border-[#0071E3] pl-4 italic mb-6">
                                        "Your argument about globalization is well-developed, however, the transition between paragraph 2 and 3 lacks a clear cohesive device. Try using 'Furthermore' or 'In contrast' to improve your Coherence score."
                                    </p>
                                    <div className="flex justify-between items-center text-xs font-bold pt-4 border-t border-[#1D1D1F]/5">
                                        <span className="text-[#0071E3]">PROJECTED SCORE: 7.5</span>
                                        <span className="text-[#6E6E73]">84% PROBABILITY</span>
                                    </div>
                                </div>

                                <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-[#1D1D1F]/5 translate-x-8">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                                            <span className="text-sm font-bold">Speaking Fluency</span>
                                        </div>
                                        <Globe className="w-5 h-5 text-[#0071E3]" />
                                    </div>
                                    <div className="h-2 w-full bg-[#F5F5F7] rounded-full overflow-hidden mb-2">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "85%" }}
                                            transition={{ duration: 1.5, delay: 0.5 }}
                                            className="h-full bg-[#0071E3]"
                                        />
                                    </div>
                                    <div className="flex justify-between text-[10px] font-bold text-[#6E6E73]">
                                        <span>FLUENCY: 8.5</span>
                                        <span>HESITATIONS: LOW</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Scholarship Preview Section */}
            <section className="py-32 bg-[#F5F5F7] relative overflow-hidden h-full border-b border-[#1D1D1F]/5">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0071E3]/5 blur-[120px] rounded-full" />
                <div className="max-w-7xl mx-auto px-6 relative z-10 h-full">
                    <div className="grid lg:grid-cols-2 gap-16 items-center h-full">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0071E3]/10 text-[#0071E3] text-xs font-bold uppercase tracking-wider">
                                <Globe className="w-3 h-3" />
                                Global Opportunities
                            </div>
                            <h2 className="text-5xl font-bold tracking-tight leading-tight">
                                Unlock 10,000+ <br />
                                <span className="text-[#0071E3]">Scholarships.</span>
                            </h2>
                            <p className="text-xl text-[#6E6E73] leading-relaxed max-w-lg font-medium">
                                From Chevening to Fulbright, our database scans every major global fund to find your perfect match.
                            </p>
                            <div className="flex flex-col gap-4">
                                {[
                                    "Full Tuition Coverage",
                                    "Monthly Living Stipends",
                                    "Travel \u0026 Healthcare Support"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center text-green-600">
                                            <CheckCircle2 className="w-4 h-4" />
                                        </div>
                                        <span className="font-semibold text-sm">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <Button className="h-14 bg-[#0071E3] hover:bg-[#0071E3]/90 text-white rounded-full px-8 py-6 text-lg font-bold shadow-xl transition-all active:scale-95 group" asChild>
                                <Link href="/scholarships">
                                    Explore Scholarship Finder
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                        </div>
                        <div className="relative">
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { name: "Chevening", country: "UK", icon: <Globe className="w-6 h-6" /> },
                                    { name: "Fulbright", country: "USA", icon: <GraduationCap className="w-6 h-6" /> },
                                    { name: "DAAD", country: "Germany", icon: <Award className="w-6 h-6" /> },
                                    { name: "MEXT", country: "Japan", icon: <Sparkles className="w-6 h-6" /> },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-8 bg-white rounded-[2.5rem] border border-[#1D1D1F]/5 shadow-sm hover:shadow-xl transition-all duration-500 group cursor-default"
                                    >
                                        <div className="w-12 h-12 rounded-2xl bg-[#0071E3]/10 flex items-center justify-center text-[#0071E3] mb-4 group-hover:bg-[#0071E3] group-hover:text-white transition-colors duration-500">
                                            {item.icon}
                                        </div>
                                        <h4 className="font-bold text-lg">{item.name}</h4>
                                        <p className="text-[10px] font-bold text-[#6E6E73] uppercase tracking-widest">{item.country}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Nateya Section */}
            <section className="py-32">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">The Nateya Difference.</h2>
                        <p className="text-xl text-[#6E6E73]">We focus on the unique challenges faced by students in Central Asia.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Local Excellence",
                                desc: "Integrated with local school curricula (NIS, KTL) to help you balance school and IELTS prep.",
                                bg: "bg-[#0071E3] text-white"
                            },
                            {
                                title: "Ivy-League Strategy",
                                desc: "Our roadmaps are designed by alumni from Harvard, MIT, and Oxford who were in your shoes.",
                                bg: "bg-white text-[#1D1D1F]"
                            },
                            {
                                title: "All-in-One Hub",
                                desc: "Save 10+ hours a week by having your calendar, portfolio, and tutor in one premium dashboard.",
                                bg: "bg-white text-[#1D1D1F]"
                            }
                        ].map((card, i) => (
                            <div key={i} className={`p-10 rounded-[3rem] ${card.bg} border border-[#1D1D1F]/5 shadow-sm space-y-6 hover:translate-y-[-10px] transition-all duration-500`}>
                                <h3 className="text-2xl font-bold">{card.title}</h3>
                                <p className={`${i === 0 ? "text-white/80" : "text-[#6E6E73]"} leading-relaxed`}>{card.desc}</p>
                                <div className="pt-4">
                                    <ArrowRight className={`w-6 h-6 ${i === 0 ? "text-white" : "text-[#0071E3]"}`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Program Summary CTA */}
            <section id="pricing" className="bg-[#1D1D1F] py-32 text-center text-white overflow-hidden relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#0071E3]/20 blur-[150px] rounded-full pointer-events-none" />
                <div className="max-w-4xl mx-auto px-6 space-y-12 relative z-10">
                    <div className="space-y-4">
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">Your future starts today.</h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">Join 1,000+ students already using AI to secure their dream university admissions.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Button
                            size="lg"
                            className="bg-[#0071E3] hover:bg-[#0071E3]/90 text-white rounded-full px-12 py-8 text-xl font-bold shadow-2xl transition-all hover:scale-105 active:scale-95"
                            onClick={() => setShowOnboarding(true)}
                        >
                            Start Free Trial
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="rounded-full px-12 py-8 text-xl font-bold bg-transparent border-white/20 hover:bg-white/10 transition-all"
                        >
                            Contact Advisor
                        </Button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/10">
                        {[
                            { label: "Founded", val: "2024" },
                            { label: "Students", val: "1,200+" },
                            { label: "Success Rate", val: "94%" },
                            { label: "AI Feedback", val: "Instant" }
                        ].map((stat, i) => (
                            <div key={i} className="space-y-2 text-center">
                                <div className="text-3xl font-bold">{stat.val}</div>
                                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
