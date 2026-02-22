"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Calendar,
    CheckCircle2,
    Clock,
    Target,
    Trophy,
    ArrowRight,
    Sparkles,
    TrendingUp,
    BookOpen,
    Users,
    Bell
} from "lucide-react"

type OnboardingData = {
    grade: string
    destination: string
    major: string
    universities?: string
}

export function DashboardView() {
    const [data, setData] = useState<OnboardingData | null>(null)

    useEffect(() => {
        const savedData = localStorage.getItem("nateya-onboarding")
        if (savedData) {
            setData(JSON.parse(savedData))
        }
    }, [])

    if (!data) return null

    const stats = [
        { label: "Predicted Band", value: "7.5", icon: <Target className="w-5 h-5" />, trend: "+0.5 growth" },
        { label: "Days to Exam", value: "114", icon: <Calendar className="w-5 h-5" />, trend: "Next: May 12" },
        { label: "Study Streak", value: "12", icon: <Trophy className="w-5 h-5" />, trend: "Keep it up!" },
        { label: "Tasks Done", value: "84%", icon: <CheckCircle2 className="w-5 h-5" />, trend: "Top 5% student" },
    ]

    const deadlines = [
        { date: "Oct 15", school: "Oxford University", type: "Early Application", status: "upcoming" },
        { date: "Jan 1", school: "MIT / Stanford", type: "Regular Decision", status: "future" },
        { date: "Feb 15", school: "Nazarbayev University", type: "Local Admission", status: "future" },
    ]

    const dailyTasks = [
        { title: "Writing Task 1", desc: "Analyze the 'Population Growth' line graph.", duration: "20 min" },
        { title: "Speaking Practice", desc: "Simulate Part 2 with AI Tutor on the topic 'Travel'.", duration: "15 min" },
        { title: "Vocabulary Drill", desc: "Master 20 academic collocations for Education.", duration: "10 min" },
    ]

    return (
        <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] p-6 lg:p-12 font-sans selection:bg-[#0071E3]/20">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Top Navigation / Header */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Welcome back, Student</h1>
                        <p className="text-[#6E6E73] font-medium">Your {data.major} journey to {data.destination} is on track.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" className="rounded-full h-12 w-12 p-0 border-[#1D1D1F]/5 bg-white shadow-sm relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-3 right-3 w-2 h-2 bg-[#0071E3] rounded-full border-2 border-white" />
                        </Button>
                        <Button className="bg-[#0071E3] hover:bg-[#0071E3]/90 text-white rounded-full h-12 px-6 font-semibold shadow-lg transition-all active:scale-95">
                            New Practice Test
                        </Button>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className="p-6 rounded-[2rem] border-[#1D1D1F]/5 shadow-sm bg-white hover:shadow-md transition-all group overflow-hidden relative">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-[#0071E3]/10 flex items-center justify-center text-[#0071E3] group-hover:bg-[#0071E3] group-hover:text-white transition-colors duration-500">
                                        {stat.icon}
                                    </div>
                                    <span className="text-xs font-bold text-[#6E6E73] uppercase tracking-wider">{stat.label}</span>
                                </div>
                                <div className="flex items-end gap-3">
                                    <span className="text-3xl font-bold">{stat.value}</span>
                                    <span className="text-[10px] font-bold text-green-600 mb-1 flex items-center">
                                        <TrendingUp className="w-3 h-3 mr-0.5" />
                                        {stat.trend}
                                    </span>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Focused Goal */}
                    <div className="lg:col-span-2 space-y-8">
                        <Card className="p-8 rounded-[2.5rem] bg-[#1D1D1F] text-white border-none shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-[#0071E3]/30 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
                            <div className="relative z-10 space-y-6">
                                <div className="flex items-center gap-3">
                                    <Sparkles className="w-6 h-6 text-[#0071E3]" />
                                    <span className="text-sm font-bold uppercase tracking-widest text-[#0071E3]">Today's Focus</span>
                                </div>
                                <h2 className="text-4xl font-bold leading-tight">Master the <span className="text-[#0071E3]">Academic Writing</span> Part 1.</h2>
                                <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                                    Based on your previous attempt, focusing on "Cohesion and Coherence" will likely bump your band score from 7.0 to 7.5.
                                </p>
                                <Button size="lg" className="bg-[#0071E3] hover:bg-[#0071E3]/90 text-white rounded-full px-8 py-6 text-lg font-bold shadow-xl transition-all hover:scale-[1.05] active:scale-95 group">
                                    Start Session
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </Card>

                        {/* Daily Routine */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold tracking-tight px-2">Your Daily Routine</h3>
                            <div className="grid gap-4">
                                {dailyTasks.map((task, i) => (
                                    <div key={i} className="flex items-center justify-between p-6 bg-white rounded-3xl border border-[#1D1D1F]/5 shadow-sm hover:shadow-md transition-all group cursor-pointer">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 rounded-2xl bg-[#F5F5F7] flex items-center justify-center text-[#6E6E73] group-hover:bg-[#0071E3]/10 group-hover:text-[#0071E3] transition-colors">
                                                <BookOpen className="w-6 h-6" />
                                            </div>
                                            <div className="space-y-0.5">
                                                <h4 className="font-bold text-lg">{task.title}</h4>
                                                <p className="text-[#6E6E73] text-sm font-medium">{task.desc}</p>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className="bg-[#F5F5F7] border-none text-[10px] font-bold tracking-wider rounded-full px-3 py-1">
                                            {task.duration}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar: Deadlines & Engine */}
                    <div className="space-y-8">
                        {/* Deadlines Widget */}
                        <Card className="p-8 rounded-[2.5rem] bg-white border-[#1D1D1F]/5 shadow-sm space-y-8">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold">Deadlines</h3>
                                <Button variant="ghost" size="sm" className="text-[10px] font-bold text-[#0071E3] uppercase tracking-wider">View All</Button>
                            </div>
                            <div className="space-y-8 relative">
                                <div className="absolute left-[11px] top-6 bottom-6 w-0.5 bg-[#F5F5F7]" />
                                {deadlines.map((item, i) => (
                                    <div key={i} className="flex gap-6 relative">
                                        <div className={`w-6 h-6 rounded-full border-4 border-white shadow-md shrink-0 z-10 ${item.status === 'upcoming' ? 'bg-[#0071E3]' : 'bg-gray-200'}`} />
                                        <div className="space-y-1 -mt-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold text-[#6E6E73] uppercase tracking-tighter">{item.date}</span>
                                                {item.status === 'upcoming' && <div className="w-1.5 h-1.5 rounded-full bg-[#0071E3] animate-pulse" />}
                                            </div>
                                            <p className="font-bold leading-tight">{item.school}</p>
                                            <p className="text-[11px] font-medium text-[#6E6E73]">{item.type}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button variant="outline" className="w-full rounded-2xl h-12 border-[#1D1D1F]/5 bg-[#F5F5F7] hover:bg-white text-[13px] font-bold transition-all">
                                Sync with Calendar
                            </Button>
                        </Card>

                        {/* Nateya Engine Info */}
                        <Card className="p-8 rounded-[2.5rem] bg-gradient-to-br from-[#0071E3] to-[#0071E3]/80 text-white border-none shadow-xl space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
                                    <Users className="w-5 h-5" />
                                </div>
                                <span className="text-sm font-bold uppercase tracking-wider">AI Strategy Engine</span>
                            </div>
                            <div className="space-y-2">
                                <p className="text-xs font-medium text-white/80">Current Goal:</p>
                                <p className="text-lg font-bold">Admission to University in {data.destination}</p>
                            </div>
                            <div className="pt-2">
                                <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-white w-2/3" />
                                </div>
                                <p className="text-[10px] font-bold text-white/80 mt-2 uppercase tracking-widest text-right">Progress: 64%</p>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
