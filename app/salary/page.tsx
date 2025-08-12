'use client'

import { SalaryForm } from '@/components/salary-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/ui/header'

export default function PublicPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <Header/>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Submit Your Salary Details
            </CardTitle>
            <CardDescription>
              Enter your salary information. If you've already submitted with this email, 
              your record will be updated instead of creating a duplicate.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SalaryForm />
          </CardContent>
        </Card>

      </main>
    </div>
  )
}
