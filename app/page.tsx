'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'

export default function HomePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return

    if (session) {
      // If user is authenticated, redirect to dashboard
      router.push('/dashboard')
    } else {
      // If user is not authenticated, redirect to login
      router.push('/salary')
    }
  }, [session, status, router])

  // Show loading while checking session
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex items-center space-x-2">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span>Redirecting...</span>
      </div>
    </div>
  )
}
