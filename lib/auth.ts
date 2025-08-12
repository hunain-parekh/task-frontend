import { useSession } from 'next-auth/react'

// Store token in localStorage when user logs in
export const setAuthToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth-token', token)
  }
}

// Get token from localStorage
export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth-token')
  }
  return null
}

// Remove token when user logs out
export const removeAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth-token')
  }
}

// Custom hook to get auth headers
export const useAuthHeaders = () => {
  const { data: session } = useSession()
  const token = getAuthToken() || session?.accessToken

  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  }
}
