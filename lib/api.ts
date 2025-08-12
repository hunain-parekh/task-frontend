import { SalaryData, SalarySubmitRequest, SalaryUpdateRequest, ApiResponse } from './types'

const API_BASE_URL = 'http://localhost:8000/api'

// Helper function to get auth token from session
const getAuthToken = async (): Promise<string | null> => {
  try {
    // Try to get token from session
    const response = await fetch('/api/auth/session')
    const session = await response.json()
    return session?.accessToken || null
  } catch (error) {
    console.error('Error getting session:', error)
    return null
  }
}

export const api = {
  // Submit salary data
  async submitSalary(data: SalarySubmitRequest): Promise<ApiResponse<SalaryData>> {
    try {
      const response = await fetch(`${API_BASE_URL}/salary/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      return result
    } catch (error) {
      return {
        success: false,
        message: 'Failed to submit salary data',
      }
    }
  },

  // Get all salary records (admin only)
  async getAllSalaries(): Promise<ApiResponse<SalaryData[]>> {
    try {
      const token = await getAuthToken()
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }

      const response = await fetch(`${API_BASE_URL}/admin/salary/list`, {
        method: 'GET',
        headers,
      })

      const result = await response.json()
      return result
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch salary data',
      }
    }
  },

  // Update salary record (admin only)
  async updateSalary(id: number, data: SalaryUpdateRequest): Promise<ApiResponse<SalaryData>> {
    try {
      const token = await getAuthToken()
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }

      const response = await fetch(`${API_BASE_URL}/admin/salary/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data),
      })

      const result = await response.json()
      return result
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update salary data',
      }
    }
  },

  // Delete salary record (admin only)
  async deleteSalary(id: number): Promise<ApiResponse<void>> {
    try {
      const token = await getAuthToken()
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }

      const response = await fetch(`${API_BASE_URL}/admin/salary/${id}`, {
        method: 'DELETE',
        headers,
      })

      const result = await response.json()
      return result
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete salary data',
      }
    }
  },
}
