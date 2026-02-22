"use client"

import Link from "next/link"
import NextImage from "next/image"
import { useAuth } from "@/context/auth-provider"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, LogOut, LayoutDashboard, Home } from "lucide-react"

export function Navbar() {
    const { user, logout } = useAuth()

    return (
        <nav className="fixed top-0 w-full z-50 bg-[#F5F5F7]/80 backdrop-blur-md border-b border-[#1D1D1F]/5 font-sans">
            <div className="flex items-center justify-between px-6 h-14 max-w-7xl mx-auto">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-[#1D1D1F]/5 bg-white flex items-center justify-center p-1 group-hover:shadow-md transition-all">
                        <NextImage
                            src="/branding/nateya-logo.png"
                            alt="Nateya Logo"
                            width={32}
                            height={32}
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <span className="text-xl font-semibold tracking-tight hover:opacity-80 transition-opacity">
                        Nateya
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8 text-[13px] font-medium text-[#6E6E73]">
                    <Link href="/#writing" className="hover:text-[#1D1D1F] transition-colors">Writing</Link>
                    <Link href="/#speaking" className="hover:text-[#1D1D1F] transition-colors">Speaking</Link>
                    <Link href="/#planner" className="hover:text-[#1D1D1F] transition-colors">Planner</Link>
                    <Link href="/scholarships" className="hover:text-[#1D1D1F] transition-colors">Scholarships</Link>
                    <Link href="/#pricing" className="hover:text-[#1D1D1F] transition-colors">Pricing</Link>
                </div>

                <div className="flex items-center gap-4">
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                                    <Avatar className="h-9 w-9 border border-[#1D1D1F]/5 shadow-sm">
                                        <AvatarFallback className="bg-[#0071E3] text-white text-xs">
                                            {user.name?.charAt(0) || user.email?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 mt-2 rounded-2xl p-2 shadow-xl border-[#1D1D1F]/5" align="end">
                                <div className="flex items-center gap-3 p-3 mb-2 bg-[#F5F5F7] rounded-xl">
                                    <div className="w-8 h-8 rounded-full bg-[#0071E3] flex items-center justify-center text-white text-xs font-bold">
                                        {user.name?.charAt(0)}
                                    </div>
                                    <div className="flex flex-col truncate">
                                        <span className="text-sm font-semibold truncate">{user.name}</span>
                                        <span className="text-[10px] text-[#6E6E73] truncate">{user.email}</span>
                                    </div>
                                </div>
                                <DropdownMenuItem asChild className="rounded-xl focus:bg-[#0071E3] focus:text-white cursor-pointer">
                                    <Link href="/dashboard">
                                        <LayoutDashboard className="w-4 h-4 mr-2" />
                                        Dashboard
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild className="rounded-xl focus:bg-[#0071E3] focus:text-white cursor-pointer">
                                    <Link href="/profile">
                                        <User className="w-4 h-4 mr-2" />
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="my-1 bg-[#1D1D1F]/5" />
                                <DropdownMenuItem
                                    onClick={() => logout()}
                                    className="rounded-xl text-destructive focus:bg-destructive focus:text-white cursor-pointer"
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <>
                            <Button variant="ghost" size="sm" className="text-[13px] font-medium text-[#1D1D1F] rounded-full px-4" asChild>
                                <Link href="/login">Log in</Link>
                            </Button>
                            <Button size="sm" className="bg-[#0071E3] hover:bg-[#0071E3]/90 text-white rounded-full px-5 h-9 text-[13px] font-medium shadow-sm transition-all active:scale-95" asChild>
                                <Link href="/register">Join Free</Link>
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}
