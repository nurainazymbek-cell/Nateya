"use client"

import { useEffect } from "react"
import { AlertCircle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
        <AlertCircle className="h-10 w-10 text-destructive" />
      </div>
      <h2 className="text-2xl font-bold text-foreground">Something went wrong!</h2>
      <p className="max-w-md text-muted-foreground">
        We apologize for the inconvenience. An unexpected error has occurred.
      </p>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        className="mt-4 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Try again
      </button>
    </div>
  )
}
