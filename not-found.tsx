import Link from "next/link"
import { FileQuestion } from "lucide-react"

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F5F5F7] p-4 text-center relative overflow-hidden">
            {/* Top Brand Link */}
            <div className="absolute top-8 left-8 z-20">
                <Link href="/" className="text-xl font-semibold tracking-tight hover:opacity-80 transition-opacity">
                    Nateya
                </Link>
            </div>

            {/* Background decoration */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#0071E3]/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#0071E3]/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <FileQuestion className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Page Not Found</h2>
            <p className="max-w-md text-muted-foreground">
                Could not find the requested resource. The page you are looking for might have been removed or relocated.
            </p>
            <Link
                href="/"
                className="mt-4 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
                Return Home
            </Link>
        </div>
    )
}
