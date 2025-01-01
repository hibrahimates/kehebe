'use client'

import { useTheme } from '@/shared/contexts/theme-context'
import { Switch } from '@/shared/components/ui/switch'
import {
  Cog6ToothIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline'

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Ayarlar
      </h1>

      <div className="rounded-lg bg-white dark:bg-gray-800 shadow-sm ring-1 ring-gray-900/5">
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {/* Tema Ayarı */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <div className="flex items-center gap-x-3">
              {theme === 'dark' ? (
                <MoonIcon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
              ) : (
                <SunIcon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
              )}
              <div>
                <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-white">
                  Tema
                </dt>
                <dd className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {theme === 'dark' ? 'Koyu' : 'Açık'} tema kullanılıyor
                </dd>
              </div>
            </div>
            <div className="mt-4 sm:col-span-2 sm:mt-0 flex items-center justify-end">
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={toggleTheme}
                aria-label="Tema değiştir"
              />
            </div>
          </div>

          {/* Diğer Ayarlar */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <div className="flex items-center gap-x-3">
              <Cog6ToothIcon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
              <div>
                <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-white">
                  Diğer Ayarlar
                </dt>
                <dd className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Yakında daha fazla ayar seçeneği eklenecektir
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 