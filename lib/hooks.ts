import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from './api'
import { SalaryData, SalarySubmitRequest, SalaryUpdateRequest } from './types'
import { toast } from 'sonner'

// Query keys
export const queryKeys = {
  salaries: ['salaries'] as const,
  salary: (id: number) => ['salary', id] as const,
}

// Get all salaries
export const useSalaries = () => {
  return useQuery({
    queryKey: queryKeys.salaries,
    queryFn: async () => {
      const response = await api.getAllSalaries()
      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch salaries')
      }
      return response.data || []
    },
  })
}

// Submit salary
export const useSubmitSalary = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: SalarySubmitRequest) => {
      const response = await api.submitSalary(data)
      if (!response.success) {
        throw new Error(response.message || 'Failed to submit salary')
      }
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.salaries })
      toast.success('Salary submitted successfully!')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to submit salary')
    },
  })
}

// Update salary
export const useUpdateSalary = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: SalaryUpdateRequest }) => {
      const response = await api.updateSalary(id, data)
      if (!response.success) {
        throw new Error(response.message || 'Failed to update salary')
      }
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.salaries })
      toast.success('Salary updated successfully!')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update salary')
    },
  })
}

// Delete salary
export const useDeleteSalary = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.deleteSalary(id)
      if (!response.success) {
        throw new Error(response.message || 'Failed to delete salary')
      }
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.salaries })
      toast.success('Salary deleted successfully!')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete salary')
    },
  })
}
