"use client"

import { useState, useEffect } from "react"

interface UseFetchOptions {
  immediate?: boolean
}

interface UseFetchReturn<T> {
  data: T | null
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

/**
 * Generic data fetching hook with loading, error, and data states
 * @param url - API endpoint URL
 * @param options - Optional configuration
 * @returns Object containing data, loading state, error, and refetch function
 */
export function useFetch<T>(
  url: string | null,
  options: UseFetchOptions = { immediate: true }
): UseFetchReturn<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(options.immediate ?? true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = async () => {
    if (!url) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      // TODO: Replace with actual API call
      // const response = await fetch(url)
      // if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      // const result = await response.json()
      // setData(result)

      // Placeholder: Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      setData(null) // Replace with actual data
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (options.immediate !== false) {
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  }
}

