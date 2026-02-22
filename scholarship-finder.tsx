"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Search,
    BookOpen,
    GraduationCap,
    Globe,
    Clock,
    ArrowRight,
    Sparkles,
    Award,
    ChevronRight,
    Filter,
    CheckCircle2
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const scholarships = [
    {
        id: "s1",
        name: "Chevening Scholarship",
        country: "United Kingdom",
        coverage: "Full Funding",
        deadline: "Nov 2, 2026",
        degree: "Master's",
        tags: ["Leadership", "Global"],
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80\u0026w=1000\u0026auto=format\u0026fit=crop",
        requirements: ["2 years experience", "Return to home country"]
    },
    {
        id: "s2",
        name: "Fulbright Program",
        country: "USA",
        coverage: "Full Funding",
        deadline: "Oct 15, 2026",
        degree: "Graduate",
        tags: ["Exchange", "Research"],
        image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80\u0026w=1000\u0026auto=format\u0026fit=crop",
        requirements: ["Must be non-US citizen", "Excellent academic record"]
    },
    {
        id: "s3",
        name: "DAAD Scholarship",
        country: "Germany",
        coverage: "Monthly Stipend",
        deadline: "Dec 31, 2026",
        degree: "PhD / Research",
        tags: ["STEM", "Academic"],
        image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80\u0026w=1000\u0026auto=format\u0026fit=crop",
        requirements: ["Master's degree", "German language optional"]
    },
    {
        id: "s4",
        name: "MEXT Scholarship",
        country: "Japan",
        coverage: "Full Funding + Airfare",
        deadline: "June 15, 2026",
        degree: "Undergraduate / Graduate",
        tags: ["Culture", "High Tech"],
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80\u0026w=1000\u0026auto=format\u0026fit=crop",
        requirements: ["Willingness to learn Japanese"]
    }
]

export function ScholarshipFinder() {
    const [search, setSearch] = useState("")
    const [activeTab, setActiveTab] = useState("all")

    const filtered = scholarships.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.country.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-3">
                    <Badge className="bg-[#0071E3]/10 text-[#0071E3] border-none hover:bg-[#0071E3]/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                        Scholarship Engine v1.0
                    </Badge>
                    <h2 className="text-4xl font-bold tracking-tight">Find Your Future.</h2>
                    <p className="text-[#6E6E73] text-lg font-medium max-w-xl">
                        Our AI scans 10,000+ global funds to find the ones you're actually eligible for.
                    </p>
                </div>
                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6E6E73] group-focus-within:text-[#0071E3] transition-colors" />
                    <Input
                        placeholder="Search by country or name..."
                        className="pl-12 h-14 rounded-2xl border-[#1D1D1F]/5 bg-white shadow-sm focus:ring-[#0071E3] transition-all"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                    {filtered.map((s, i) => (
                        <motion.div
                            key={s.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                        >
                            <Card className="group h-full flex flex-col rounded-[2.5rem] border-[#1D1D1F]/5 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden bg-white">
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={s.image}
                                        alt={s.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                        <Badge className="bg-white/20 backdrop-blur-md text-white border-white/20 rounded-full font-bold text-[10px] tracking-wide uppercase">
                                            {s.country}
                                        </Badge>
                                        <div className="p-2 rounded-full bg-white text-[#1D1D1F] shadow-lg scale-0 group-hover:scale-100 transition-transform duration-500">
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col space-y-4">
                                    <div className="space-y-1">
                                        <h3 className="font-bold text-lg leading-tight group-hover:text-[#0071E3] transition-colors">{s.name}</h3>
                                        <p className="text-[11px] font-bold text-[#6E6E73] uppercase tracking-wider">{s.degree} \ {s.coverage}</p>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {s.tags.map(tag => (
                                            <span key={tag} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F5F5F7] text-[#6E6E73]">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="pt-4 border-t border-[#1D1D1F]/5 mt-auto">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-[10px] font-bold text-[#6E6E73] uppercase tracking-widest">Deadline</span>
                                            <span className="text-xs font-bold text-red-500">{s.deadline}</span>
                                        </div>
                                        <Button variant="outline" className="w-full rounded-2xl h-11 border-[#1D1D1F]/5 bg-[#F5F5F7] hover:bg-[#0071E3] hover:text-white hover:border-[#0071E3] text-xs font-bold transition-all group/btn">
                                            View Details
                                            <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Advisor CTA */}
            <Card className="p-12 rounded-[3.5rem] bg-[#1D1D1F] text-white border-none shadow-2xl relative overflow-hidden text-center space-y-8">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0071E3]/20 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#0071E3]/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 space-y-4">
                    <div className="flex justify-center flex-wrap gap-4 mb-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                                <CheckCircle2 className="w-4 h-4 text-[#0071E3]" />
                                <span className="text-xs font-bold">Strategy {i}</span>
                            </div>
                        ))}
                    </div>
                    <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight">Get the <span className="text-[#0071E3]">Admission.</span></h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
                        Our advisors have helped 400+ students secure full rides to Ivy League and Russell Group universities.
                    </p>
                </div>

                <div className="relative z-10 pt-4">
                    <Button size="lg" className="bg-[#0071E3] hover:bg-[#0071E3]/90 text-white rounded-full px-12 py-8 text-xl font-bold shadow-2xl transition-all hover:scale-[1.05] active:scale-95 group">
                        Book Free Consulting Session
                        <Sparkles className="w-6 h-6 ml-3 group-hover:rotate-12 transition-transform" />
                    </Button>
                </div>
            </Card>
        </div>
    )
}
