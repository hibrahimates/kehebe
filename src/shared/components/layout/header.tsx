'use client'

import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

export function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex h-16 items-center justify-end px-4 border-b dark:border-gray-800">
        <div className="w-9 h-9" /> {/* Placeholder for theme toggle */}
      </div>
    )
  }

  return (
    <div className="flex h-16 items-center justify-end px-4 border-b dark:border-gray-800">
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        {theme === 'dark' ? (
          <SunIcon className="h-5 w-5 text-gray-500" />
        ) : (
          <MoonIcon className="h-5 w-5 text-gray-500" />
        )}
      </button>
    </div>
  )
} 