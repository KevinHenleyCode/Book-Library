'use client'
import { useEffect, useState } from 'react'

/**
 * Custom hook for Session Storage + State
 */
export function useSessionStorageState<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = sessionStorage.getItem(key)
        return stored ? (JSON.parse(stored) as T) : defaultValue
      } catch (err) {
        console.error(`Error reading sessionStorage key ${err}`)
        return defaultValue
      }
    }
    return defaultValue
  })

  useEffect(() => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.error(`Error setting sessionStorage key ${err}`)
    }
  }, [key, value])

  return [value, setValue] as const
}
