export interface SalaryData {
  id?: number
  name: string
  email: string
  salary_local_currency: number
  local_currency_code: string
  salary_in_euros?: number
  commission?: number
  displayed_salary?: number
  created_at?: string
  updated_at?: string
}

export interface SalarySubmitRequest {
  name: string
  email: string
  salary_local_currency: number
  local_currency_code: string
}

export interface SalaryUpdateRequest {
  salary_local_currency?: number
  salary_in_euros?: number
  commission?: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  errors?: Record<string, string[]>
}

// Laravel Backend User Interface
export interface LaravelUser {
  id: number
  name: string
  email: string
  email_verified_at: string | null
  is_admin: boolean
  created_at: string
  updated_at: string
}

// Laravel Login Response
export interface LaravelLoginResponse {
  success: boolean
  message: string
  data: {
    user: LaravelUser
    token: string
  }
}

// Frontend User Interface (for NextAuth)
export interface User {
  id: string
  email: string
  name: string
  role: string
  token?: string
}

declare module "next-auth" {
  interface Session {
    user: User
    accessToken?: string
  }
  
  interface User {
    role: string
    token?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string
    accessToken?: string
  }
}
