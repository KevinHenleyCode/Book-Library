'use client'
import { useEffect } from 'react'

const RegisterSW = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((reg) => console.log(`SW registered ${reg.scope}`))
        .catch((err) => console.error(`[SW] register failed ${err}`))
    }
  }, [])

  return null
}

export default RegisterSW
