"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, CheckCircle2, Clock, MapPin, Target, Trophy, ArrowRight, Share2, Sparkles } from "lucide-react"

type RoadmapData = {
    grade: string
    destination: string
    major: string
    universities?: string
}

export function RoadmapView({ data }: { data: RoadmapData }) {
    const timeline = [
        {
            period: "Next 3 Months",
            title: "Foundations & Strategy",
            tasks: [
                "Maintain GPA above 4.0/5.0",
                `Research requirements for ${data.major} in ${data.destination}`,
                "Register for diagnostic SAT/IELTS",
                "Select 2 extracurricular activities"
            ],
            status: "current"
        },
        {
            period: "6 - 12 Months",
            title: "Standardized Testing",
            tasks: [
                "Intensive SAT/IELTS preparation",
                "First attempt at IELTS (Target: 7.5+)",
                "Summer internship or volunteer project",
                "Draft initial list of 10 universities"
            ],
            status: "upcoming"
        },
        {
            period: "Year 2",
            title: "Portfolio & Applications",
            tasks: [
                "Final SAT attempt (Target: 1450+)",
                "Finalize Personal Statement and Essays",
                "Collect Letters of Recommendation",
                "Submit Early Action/Early Decision applications"
            ],
            status: "future"
        }
    ]

    return (
        <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] p-8 md:p-12 selection:bg-[#0071E3]/20 pb-32">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 py-8 border-b border-[#1D1D1F]/5">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Badge className="bg-[#0071E3]/10 text-[#0071E3] hover:bg-[#0071E3]/20 border-none px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                Personalized Strategy
                            </Badge>
                            <div className="flex items-center gap-1.5 text-[#6E6E73] text-sm font-medium">
                                <Target className="w-4 h-4" />
                                Nateya Engine v1.0
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Your Roadmap to Success</h1>
                        <div className="flex flex-wrap gap-4 pt-2">
                            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-[#1D1D1F]/5 shadow-sm">
                                <Calendar className="w-5 h-5 text-[#0071E3]" />
                                <span className="font-semibold">{data.grade}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-[#1D1D1F]/5 shadow-sm">
                                <MapPin className="w-5 h-5 text-[#0071E3]" />
                                <span className="font-semibold">{data.destination}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-[#1D1D1F]/5 shadow-sm">
                                <Trophy className="w-5 h-5 text-[#0071E3]" />
                                <span className="font-semibold">{data.major}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="outline" className="rounded-full shadow-sm hover:translate-y-[-2px] transition-all" {...{ variant: "outline" } as any}>
                            <Share2 className="w-4 h-4 mr-2" />
                            Share with Parents
                        </Button>
                        <Button className="bg-[#0071E3] hover:bg-[#0071E3]/90 text-white rounded-full shadow-lg hover:shadow-xl hover:translate-y-[-2px] active:scale-[0.98] transition-all px-8">
                            Open Full Dashboard
                        </Button>
                    </div>
                </header>

                {/* Roadmap Visualization */}
                <div className="relative pt-12">
                    {/* Timeline Line */}
                    <div className="absolute left-[21px] top-12 bottom-0 w-0.5 bg-[#1D1D1F]/5 md:left-1/2" />

                    <div className="space-y-24">
                        {timeline.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                className={`relative flex flex-col items-start gap-8 md:flex-row md:items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                            >
                                {/* Timeline Dot */}
                                <div className={`absolute left-0 w-11 h-11 rounded-full border-4 border-[#F5F5F7] shadow-xl z-10 flex items-center justify-center md:left-1/2 md:-translate-x-1/2 ${item.status === 'current' ? 'bg-[#0071E3] text-white ring-4 ring-[#0071E3]/20' : 'bg-white text-[#6E6E73]'}`}>
                                    {item.status === 'current' ? <ArrowRight className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                                </div>

                                {/* Content Card */}
                                <div className="w-full md:w-[45%]">
                                    <Card className={`p-8 rounded-[2rem] border-[#1D1D1F]/5 shadow-lg space-y-6 hover:shadow-2xl hover:translate-y-[-8px] transition-all duration-500 bg-white ${item.status === 'current' ? 'ring-2 ring-[#0071E3]/10' : ''}`}>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-bold text-[#0071E3] tracking-widest uppercase">{item.period}</span>
                                                {item.status === 'current' && <Badge className="bg-[#0071E3]/10 text-[#0071E3] border-none">Active Phase</Badge>}
                                            </div>
                                            <h3 className="text-2xl font-bold tracking-tight">{item.title}</h3>
                                        </div>
                                        <ul className="space-y-4">
                                            {item.tasks.map((task, i) => (
                                                <li key={i} className="flex gap-4 group">
                                                    <div className="mt-1 flex-shrink-0">
                                                        <CheckCircle2 className="w-5 h-5 text-[#0071E3]/40 group-hover:text-[#0071E3] transition-colors" />
                                                    </div>
                                                    <p className="text-[#6E6E73] font-medium leading-relaxed group-hover:text-[#1D1D1F] transition-colors">{task}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </Card>
                                </div>

                                {/* Date Side (Hidden on Mobile) */}
                                <div className="hidden md:flex flex-col items-center justify-center w-[45%] text-center">
                                    <span className="text-[10rem] font-bold text-[#1D1D1F]/5 leading-none select-none">{index + 1}</span>
                                    <p className="text-[#6E6E73] font-semibold -mt-8 tracking-widest uppercase">Phase Completion Goal</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <section className="pt-32">
                    <Card className="p-16 rounded-[3rem] bg-[#1D1D1F] text-white flex flex-col items-center text-center space-y-8 overflow-hidden relative">
                        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#0071E3]/20 blur-[120px] rounded-full" />
                        <Sparkles className="w-12 h-12 text-[#0071E3]" />
                        <div className="space-y-4 max-w-2xl relative z-10">
                            <h2 className="text-4xl font-bold tracking-tight">Ready to start your journey?</h2>
                            <p className="text-gray-400 text-lg">Your roadmap is just the beginning. Our AI tutors and experts are here to guide you every step of the way.</p>
                        </div>
                        <Button size="lg" className="bg-[#0071E3] hover:bg-[#0071E3]/90 text-white rounded-full px-12 py-8 text-xl font-semibold shadow-2xl hover:translate-y-[-4px] transition-all relative z-10" {...{ size: "lg" } as any}>
                            Start Studying with AI Tutor
                        </Button>
                    </Card>
                </section>
            </div>
        </div>
    )
}
