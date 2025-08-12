'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { AdminPanel } from '@/components/admin-panel'
import { Loader2 } from 'lucide-react'
import { Header } from '@/components/ui/header'
import { setAuthToken } from '@/lib/auth'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Redirect to login if no session
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    }
  }, [status, router])

  // Store token when session is available
  useEffect(() => {
    if (session?.accessToken) {
      setAuthToken(session.accessToken)
    }
  }, [session])

  // Show loading while checking session
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    )
  }

  // Don't render anything if not authenticated (will redirect)
  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
        <AdminPanel />
      </main>
    </div>
  )
}
