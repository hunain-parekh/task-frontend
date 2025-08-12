'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Loader2, Edit, Euro, TrendingUp, User } from 'lucide-react'
import { useUpdateSalary } from '@/lib/hooks'
import { salaryUpdateSchema, SalaryUpdateFormData } from '@/lib/validation'
import { SalaryData } from '@/lib/types'

interface EditSalaryDialogProps {
  salary: SalaryData
}

export function EditSalaryDialog({ salary }: EditSalaryDialogProps) {
  const [open, setOpen] = useState(false)
  const updateSalary = useUpdateSalary()

  const form = useForm<SalaryUpdateFormData>({
    resolver: yupResolver(salaryUpdateSchema),
    defaultValues: {
      salary_local_currency: parseFloat(salary.salary_local_currency?.toString() || '0'),
      salary_in_euros: parseFloat(salary.salary_in_euros?.toString() || '0'),
      commission: parseFloat(salary.commission?.toString() || '500'),
    },
  })

  // Update form values when dialog opens or salary data changes
  useEffect(() => {
    if (open) {
      form.reset({
        salary_local_currency: parseFloat(salary.salary_local_currency?.toString() || '0'),
        salary_in_euros: parseFloat(salary.salary_in_euros?.toString() || '0'),
        commission: parseFloat(salary.commission?.toString() || '500'),
      })
    }
  }, [open, salary, form])

  const onSubmit = (data: SalaryUpdateFormData) => {
    updateSalary.mutate(
      { id: salary.id!, data },
      {
        onSuccess: () => {
          setOpen(false)
          form.reset()
        },
      }
    )
  }

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

  const currentDisplayedSalary = parseFloat(salary.salary_in_euros?.toString() || '0') + parseFloat(salary.commission?.toString() || '500')
  const newDisplayedSalary = (form.watch('salary_in_euros') || 0) + (form.watch('commission') || 500)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Salary Details</DialogTitle>
          <DialogDescription>
            Update salary information for {salary.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Employee Info */}
          <Card className="bg-gray-50">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="text-sm">
                    {getInitials(salary.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{salary.name}</h3>
                  <p className="text-sm text-gray-600">{salary.email}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="secondary">{salary.local_currency_code}</Badge>
                    <span className="text-sm text-gray-600">
                      Current: {formatCurrency(salary.salary_local_currency, salary.local_currency_code)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Edit Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Local Salary */}
                <FormField
                  control={form.control}
                  name="salary_local_currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Local Salary ({salary.local_currency_code})</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="50000"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Salary in Euros */}
                <FormField
                  control={form.control}
                  name="salary_in_euros"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2">
                        <Euro className="h-4 w-4" />
                        <span>Salary (EUR)</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="45000"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Commission */}
              <FormField
                control={form.control}
                name="commission"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4" />
                      <span>Commission (EUR)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="500"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Displayed Salary Preview */}
              <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-green-900">Displayed Salary Preview</h4>
                      <p className="text-xs text-green-700">
                        Salary in EUR + Commission
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-green-600">Current:</p>
                      <p className="text-lg font-bold text-green-900">
                        €{currentDisplayedSalary.toLocaleString()}
                      </p>
                      <p className="text-sm text-green-600">New:</p>
                      <p className="text-lg font-bold text-green-900">
                        €{newDisplayedSalary.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  disabled={updateSalary.isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={updateSalary.isPending}
                >
                  {updateSalary.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Update Salary'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
