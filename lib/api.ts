import { SalaryData, SalarySubmitRequest, SalaryUpdateRequest, ApiResponse } from './types'
import axios from 'axios'

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Helper function to get auth token from session
const getAuthToken = async (): Promise<string | null> => {
  try {
    // Try to get token from session
    const response = await axios.get('/api/auth/session')
    return response.data?.accessToken || null
  } catch (error) {
    console.error('Error getting session:', error)
    return null
  }
}

export const api = {
  // Submit salary data
  async submitSalary(data: SalarySubmitRequest): Promise<ApiResponse<SalaryData>> {
    try {
      const response = await apiClient.post('/salary/submit', data)
      return response.data
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
      const config = token ? {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      } : {}
      
      const response = await apiClient.get('/admin/salary/list', config)
      return response.data
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
      const config = token ? {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      } : {}
      
      const response = await apiClient.put(`/admin/salary/${id}`, data, config)
      return response.data
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
      const config = token ? {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      } : {}
      
      const response = await apiClient.delete(`/admin/salary/${id}`, config)
      return response.data
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete salary data',
      }
    }
  },

  // Logout user
  async logout(): Promise<ApiResponse<void>> {
    try {
      const token = await getAuthToken()
      const config = token ? {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      } : {}
      
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/logout`, {}, config)
      return response.data
    } catch (error) {
      return {
        success: false,
        message: 'Failed to logout',
      }
    }
  },
}
