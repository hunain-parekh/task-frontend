import * as yup from 'yup'

export const salarySubmitSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  salary_local_currency: yup
    .number()
    .required('Salary is required')
    .positive('Salary must be positive')
    .min(1, 'Salary must be at least 1'),
  local_currency_code: yup
    .string()
    .required('Currency code is required')
    .length(3, 'Currency code must be 3 characters'),
})

export const salaryUpdateSchema = yup.object({
  salary_local_currency: yup
    .number()
    .required('Salary is required')
    .positive('Salary must be positive')
    .min(1, 'Salary must be at least 1'),
  salary_in_euros: yup
    .number()
    .required('Salary in Euros is required')
    .positive('Salary in Euros must be positive')
    .min(1, 'Salary in Euros must be at least 1'),
  commission: yup
    .number()
    .required('Commission is required')
    .positive('Commission must be positive')
    .min(0, 'Commission must be at least 0'),
})

export type SalarySubmitFormData = yup.InferType<typeof salarySubmitSchema>
export type SalaryUpdateFormData = yup.InferType<typeof salaryUpdateSchema>
