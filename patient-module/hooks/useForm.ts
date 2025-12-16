"use client"

import { useState, useCallback } from "react"

interface UseFormOptions<T> {
  initialValues: T
  onSubmit?: (values: T) => Promise<void> | void
  validate?: (values: T) => Partial<Record<keyof T, string>>
}

interface UseFormReturn<T> {
  values: T
  errors: Partial<Record<keyof T, string>>
  touched: Partial<Record<keyof T, boolean>>
  isSubmitting: boolean
  handleChange: (name: keyof T) => (value: any) => void
  handleBlur: (name: keyof T) => () => void
  handleSubmit: (e?: React.FormEvent) => Promise<void>
  reset: () => void
  setValue: (name: keyof T, value: any) => void
  setValues: (values: Partial<T>) => void
}

/**
 * Form handling hook with validation support
 * Can be integrated with react-hook-form if needed
 */
export function useForm<T extends Record<string, any>>(
  options: UseFormOptions<T>
): UseFormReturn<T> {
  const { initialValues, onSubmit, validate } = options

  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = useCallback(
    (name: keyof T) => (value: any) => {
      setValues((prev) => ({ ...prev, [name]: value }))
      // Clear error when user starts typing
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors[name]
          return newErrors
        })
      }
    },
    [errors]
  )

  const handleBlur = useCallback((name: keyof T) => () => {
    setTouched((prev) => ({ ...prev, [name]: true }))
    // Validate on blur
    if (validate) {
      const validationErrors = validate(values)
      if (validationErrors[name]) {
        setErrors((prev) => ({ ...prev, [name]: validationErrors[name] }))
      }
    }
  }, [values, validate])

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault()

      // Validate
      if (validate) {
        const validationErrors = validate(values)
        setErrors(validationErrors)
        setTouched(
          Object.keys(values).reduce(
            (acc, key) => ({ ...acc, [key]: true }),
            {} as Partial<Record<keyof T, boolean>>
          )
        )

        if (Object.keys(validationErrors).length > 0) {
          return
        }
      }

      // Submit
      if (onSubmit) {
        setIsSubmitting(true)
        try {
          await onSubmit(values)
        } catch (error) {
          console.error("Form submission error:", error)
        } finally {
          setIsSubmitting(false)
        }
      }
    },
    [values, validate, onSubmit]
  )

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
  }, [initialValues])

  const setValue = useCallback((name: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }))
  }, [])

  const setValuesPartial = useCallback((newValues: Partial<T>) => {
    setValues((prev) => ({ ...prev, ...newValues }))
  }, [])

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setValue,
    setValues: setValuesPartial,
  }
}

