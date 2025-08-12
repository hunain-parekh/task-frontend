'use client'

import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { User, LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { removeAuthToken } from '@/lib/auth'
import Link from 'next/link'

interface HeaderProps {
  title?: string
  showUserInfo?: boolean
  showSignOut?: boolean
  onSignOut?: () => void
  children?: React.ReactNode
}

export function Header({ 
  title = "Salary Management System", 
  showUserInfo = true, 
  showSignOut = true,
  onSignOut,
  children 
}: HeaderProps) {
  const { data: session } = useSession()

  const handleSignOut = () => {
    removeAuthToken()
    if (onSignOut) {
      onSignOut()
    } else {
      signOut({ callbackUrl: '/auth/login' })
    }
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">
              {title}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {children}
            
            {showUserInfo && session && (
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-500" />
                <Link href="/dashboard">
                  <span className="text-sm text-gray-700 hover:text-blue-600 cursor-pointer transition-colors">
                    {session.user.name}
                  </span>
                </Link>
              </div>
            )}
            
            {showSignOut && session && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </Button>
            )}

            {!session && (
              <Link href="/auth/login">
                <Button
                  variant="default"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <User className="h-4 w-4" />
                  <span>Login</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
