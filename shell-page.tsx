"use client"

import Link from "next/link"
import { Navbar } from "./navbar"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowLeft, Sparkles } from "lucide-react"

export function ShellPage({ title, description }: { title: string, description: string }) {
    return (
        <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans pt-14 flex flex-col">
            <Navbar />

            <main className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#0071E3]/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#0071E3]/10 blur-[120px] rounded-full pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                    className="text-center max-w-2xl bg-white/50 backdrop-blur-xl p-12 rounded-[3.5rem] border border-[#1D1D1F]/5 shadow-sm relative z-10"
                >
                    <div className="w-16 h-16 rounded-[2rem] bg-[#0071E3]/10 flex items-center justify-center mb-8 mx-auto">
                        <Sparkles className="w-8 h-8 text-[#0071E3]" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{title}</h1>
                    <p className="text-[#6E6E73] text-xl mb-10 leading-relaxed font-medium">
                        {description}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button size="lg" className="bg-[#0071E3] hover:bg-[#0071E3]/90 text-white rounded-full px-8 h-12 text-base font-semibold shadow-lg active:scale-95 transition-all" asChild>
                            <Link href="/">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Home
                            </Link>
                        </Button>
                        <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base font-semibold border-[#1D1D1F]/10 hover:bg-white transition-all shadow-sm">
                            Notify Me
                        </Button>
                    </div>
                </motion.div>
            </main>
        </div>
    )
}
