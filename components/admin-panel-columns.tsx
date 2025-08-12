'use client'

import { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ArrowUpDown, ArrowUp, ArrowDown} from 'lucide-react'
import { SalaryData } from '@/lib/types'
import { EditSalaryDialog } from './edit-salary-dialog'
import { DeleteSalaryDialog } from './delete-salary-dialog'

interface UseAdminColumnsProps {
  onDelete: (id: number) => void
  deleteSalary: any
}

export function useAdminColumns({ onDelete, deleteSalary }: UseAdminColumnsProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const formatCurrency = (amount: number | string, currency: string) => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(numAmount || 0)
  }

  const columns: ColumnDef<SalaryData>[] = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="flex items-center space-x-1 p-0 h-auto font-semibold"
            >
              Employee
              {column.getIsSorted() === "asc" ? (
                <ArrowUp className="ml-2 h-4 w-4" />
              ) : column.getIsSorted() === "desc" ? (
                <ArrowDown className="ml-2 h-4 w-4" />
              ) : (
                <ArrowUpDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          )
        },
        cell: ({ row }) => {
          const salary = row.original
          return (
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                <AvatarFallback className="text-xs">
                  {getInitials(salary.name)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm sm:text-base truncate">{salary.name}</p>
                <Badge variant="secondary" className="text-xs">
                  {salary.local_currency_code}
                </Badge>
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: 'email',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="flex items-center space-x-1 p-0 h-auto font-semibold"
            >
              Email
              {column.getIsSorted() === "asc" ? (
                <ArrowUp className="ml-2 h-4 w-4" />
              ) : column.getIsSorted() === "desc" ? (
                <ArrowDown className="ml-2 h-4 w-4" />
              ) : (
                <ArrowUpDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          )
        },
        cell: ({ row }) => (
          <span className="text-xs sm:text-sm text-gray-600 truncate">{row.getValue('email')}</span>
        ),
      },
      {
        accessorKey: 'salary_local_currency',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="flex items-center space-x-1 p-0 h-auto font-semibold"
            >
              Local Salary
              {column.getIsSorted() === "asc" ? (
                <ArrowUp className="ml-2 h-4 w-4" />
              ) : column.getIsSorted() === "desc" ? (
                <ArrowDown className="ml-2 h-4 w-4" />
              ) : (
                <ArrowUpDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          )
        },
        cell: ({ row }) => {
          const salary = row.original
          return (
            <span className="font-medium text-xs sm:text-sm">
              {formatCurrency(salary.salary_local_currency, salary.local_currency_code)}
            </span>
          )
        },
      },
      {
        accessorKey: 'salary_in_euros',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="flex items-center space-x-1 p-0 h-auto font-semibold"
            >
              Salary (EUR)
              {column.getIsSorted() === "asc" ? (
                <ArrowUp className="ml-2 h-4 w-4" />
              ) : column.getIsSorted() === "desc" ? (
                <ArrowDown className="ml-2 h-4 w-4" />
              ) : (
                <ArrowUpDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          )
        },
        cell: ({ row }) => {
          const salary = row.original
          const amount = parseFloat(salary.salary_in_euros?.toString() || '0')
          return (
            <span className="font-medium text-xs sm:text-sm">
              €{amount.toLocaleString() || '—'}
            </span>
          )
        },
      },
      {
        accessorKey: 'commission',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="flex items-center space-x-1 p-0 h-auto font-semibold"
            >
              Commission
              {column.getIsSorted() === "asc" ? (
                <ArrowUp className="ml-2 h-4 w-4" />
              ) : column.getIsSorted() === "desc" ? (
                <ArrowDown className="ml-2 h-4 w-4" />
              ) : (
                <ArrowUpDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          )
        },
        cell: ({ row }) => {
          const salary = row.original
          const amount = parseFloat(salary.commission?.toString() || '500')
          return (
            <span className="font-medium text-xs sm:text-sm">
              €{amount.toLocaleString()}
            </span>
          )
        },
      },
      {
        accessorKey: 'displayed_salary',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="flex items-center space-x-1 p-0 h-auto font-semibold"
            >
              Displayed Salary
              {column.getIsSorted() === "asc" ? (
                <ArrowUp className="ml-2 h-4 w-4" />
              ) : column.getIsSorted() === "desc" ? (
                <ArrowDown className="ml-2 h-4 w-4" />
              ) : (
                <ArrowUpDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          )
        },
        cell: ({ row }) => {
          const salary = row.original
          const amount = parseFloat(salary.displayed_salary?.toString() || '0')
          return (
            <span className="font-bold text-green-600 text-xs sm:text-sm">
              €{amount.toLocaleString() || '—'}
            </span>
          )
        },
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
          const salary = row.original
          return (
            <div className="flex items-center space-x-2">
              <EditSalaryDialog salary={salary} />
              <DeleteSalaryDialog salary={salary} />
            </div>
          )
        },
      },
    ],
    [deleteSalary.isPending]
  )

  return columns
}
