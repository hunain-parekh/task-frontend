'use client'

import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { User, LogOut, ChevronDown } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { removeAuthToken } from '@/lib/auth'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface HeaderProps {
  title?: string
  onSignOut?: () => void
  children?: React.ReactNode
}

export function Header({ 
  title = "Salary Management System",
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
            
            {/* Submit Salary Button - Always visible */}
            <Link href="/salary">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <User className="h-4 w-4" />
                <span>Submit Salary</span>
              </Button>
            </Link>
            
            {session && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-2 hover:bg-gray-100"
                  >
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">
                      {session.user.name}
                    </span>
                    <ChevronDown className="h-3 w-3 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center space-x-2 cursor-pointer">
                      <User className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 cursor-pointer text-red-600 hover:text-red-700"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
