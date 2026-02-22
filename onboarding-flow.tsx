"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronRight, ChevronLeft, Loader2, Sparkles, GraduationCap, Globe, BookOpen } from "lucide-react"

type OnboardingData = {
    grade: string
    destination: string
    major: string
    universities: string
}

export function OnboardingFlow({ onComplete }: { onComplete: (data: OnboardingData) => void }) {
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<OnboardingData>({
        grade: "",
        destination: "",
        major: "",
        universities: ""
    })

    const nextStep = () => {
        if (step === 3) {
            generateStrategy()
        } else {
            setStep(step + 1)
        }
    }

    const prevStep = () => setStep(step - 1)

    const generateStrategy = () => {
        setLoading(true)
        // Persist data to localStorage
        localStorage.setItem("nateya-onboarding", JSON.stringify(data))

        // Simulate AI generation
        setTimeout(() => {
            setLoading(false)
            onComplete(data)
        }, 3000)
    }

    const steps = [
        {
            id: 1,
            title: "Tell us about yourself",
            subtitle: "We'll use this to build your personalized strategy.",
            icon: <GraduationCap className="w-6 h-6 text-[#0071E3]" />,
            fields: (
                <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                        <Label>What grade are you in?</Label>
                        <div className="grid grid-cols-2 gap-3">
                            {["Grade 9", "Grade 10", "Grade 11", "Grade 12"].map((g) => (
                                <Button
                                    key={g}
                                    variant={(data.grade === g ? "default" : "outline") as any}
                                    className={`h-12 rounded-xl text-lg font-medium transition-all ${data.grade === g ? "bg-[#0071E3] text-white" : "hover:border-[#0071E3] hover:text-[#0071E3]"}`}
                                    onClick={() => setData({ ...data, grade: g })}
                                >
                                    {g}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 2,
            title: "Where's your dream destination?",
            subtitle: "We'll track deadlines and requirements for these regions.",
            icon: <Globe className="w-6 h-6 text-[#0071E3]" />,
            fields: (
                <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                        <Label>Target Region</Label>
                        <div className="grid grid-cols-2 gap-3">
                            {["Kazakhstan", "USA", "Europe", "Asia", "UK", "Canada"].map((d) => (
                                <Button
                                    key={d}
                                    variant={(data.destination === d ? "default" : "outline") as any}
                                    className={`h-12 rounded-xl text-lg font-medium transition-all ${data.destination === d ? "bg-[#0071E3] text-white" : "hover:border-[#0071E3] hover:text-[#0071E3]"}`}
                                    onClick={() => setData({ ...data, destination: d })}
                                >
                                    {d}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 3,
            title: "What are your interests?",
            subtitle: "This helps us suggest appropriate extracurriculars and SAT topics.",
            icon: <BookOpen className="w-6 h-6 text-[#0071E3]" />,
            fields: (
                <div className="space-y-6 pt-4">
                    <div className="space-y-2">
                        <Label htmlFor="major">Desired Major</Label>
                        <Input
                            id="major"
                            placeholder="e.g. Computer Science, Medicine, Arts"
                            className="h-12 rounded-xl text-lg border-[#1D1D1F]/10 focus:ring-[#0071E3]"
                            value={data.major}
                            onChange={(e) => setData({ ...data, major: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="unis">Target Universities (optional)</Label>
                        <Input
                            id="unis"
                            placeholder="e.g. Nazarbayev University, MIT, Stanford"
                            className="h-12 rounded-xl text-lg border-[#1D1D1F]/10 focus:ring-[#0071E3]"
                            value={data.universities}
                            onChange={(e) => setData({ ...data, universities: e.target.value })}
                        />
                    </div>
                </div>
            )
        }
    ]

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
                <div className="relative">
                    <Loader2 className="w-16 h-16 text-[#0071E3] animate-spin" />
                    <Sparkles className="w-6 h-6 text-[#0071E3] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">Generating your Nateya Navigator Roadmap...</h2>
                    <p className="text-[#6E6E73]">Analyzing university requirements, exam dates, and your goals.</p>
                </div>
            </div>
        )
    }

    const currentStep = steps[step - 1]

    return (
        <Card className="max-w-xl w-full mx-auto p-10 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border-[#1D1D1F]/5 bg-white overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="space-y-8"
                >
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-2xl bg-[#0071E3]/5">
                                {currentStep.icon}
                            </div>
                            <span className="text-sm font-bold text-[#0071E3] tracking-wider uppercase">Step {step} of 3</span>
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tight text-[#1D1D1F]">{currentStep.title}</h2>
                            <p className="text-[#6E6E73] text-lg leading-relaxed">{currentStep.subtitle}</p>
                        </div>
                    </div>

                    <div className="min-h-[200px]">
                        {currentStep.fields}
                    </div>

                    <div className="flex items-center justify-between pt-8 border-t border-[#1D1D1F]/5">
                        <Button
                            variant={"ghost" as any}
                            onClick={prevStep}
                            className={`rounded-full px-6 py-6 h-12 text-lg font-medium ${step === 1 ? "invisible" : ""}`}
                        >
                            <ChevronLeft className="w-5 h-5 mr-2" />
                            Back
                        </Button>
                        <Button
                            onClick={nextStep}
                            disabled={step === 1 ? !data.grade : step === 2 ? !data.destination : !data.major}
                            className="bg-[#0071E3] hover:bg-[#0071E3]/90 text-white rounded-full px-8 py-6 h-12 text-lg font-medium shadow-lg hover:shadow-xl transition-all"
                        >
                            {step === 3 ? "Generate Roadmap" : "Continue"}
                            <ChevronRight className="w-5 h-5 ml-2" />
                        </Button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </Card>
    )
}
