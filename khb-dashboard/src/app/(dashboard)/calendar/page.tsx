'use client'

import { useAppSelector } from '@/shared/hooks/use-app-selector'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/utils/cn'
import { useState } from 'react'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

export default function CalendarPage() {
  const tasks = useAppSelector((state) => state.tasks.tasks)
  const [currentDate, setCurrentDate] = useState(new Date())

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)
  const monthName = currentDate.toLocaleString('tr-TR', { month: 'long' })

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i)

  const tasksByDate = tasks.reduce((acc, task) => {
    const date = new Date(task.dueDate)
    const key = date.toISOString().split('T')[0]
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(task)
    return acc
  }, {} as Record<string, typeof tasks>)

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Takvim</h1>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.setMonth(currentDate.getMonth() - 1))
              )
            }
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </Button>
          <h2 className="text-lg font-medium text-gray-900">
            {monthName} {year}
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.setMonth(currentDate.getMonth() + 1))
              )
            }
          >
            <ChevronRightIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="mt-8">
        <div className="grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700">
          <div className="bg-white py-2">Pzt</div>
          <div className="bg-white py-2">Sal</div>
          <div className="bg-white py-2">Çar</div>
          <div className="bg-white py-2">Per</div>
          <div className="bg-white py-2">Cum</div>
          <div className="bg-white py-2">Cmt</div>
          <div className="bg-white py-2">Paz</div>
        </div>
        <div className="grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm">
          {emptyDays.map((day) => (
            <div key={`empty-${day}`} className="bg-white py-8" />
          ))}
          {days.map((day) => {
            const date = new Date(year, month, day)
            const dateKey = date.toISOString().split('T')[0]
            const dayTasks = tasksByDate[dateKey] || []
            const isToday =
              date.toDateString() === new Date().toDateString()

            return (
              <div
                key={day}
                className={cn('relative bg-white py-8 px-3', {
                  'bg-blue-50': isToday,
                })}
              >
                <time
                  dateTime={date.toISOString()}
                  className={cn(
                    'mx-auto flex h-6 w-6 items-center justify-center rounded-full',
                    {
                      'bg-blue-600 font-semibold text-white': isToday,
                    }
                  )}
                >
                  {day}
                </time>
                {dayTasks.length > 0 && (
                  <ol className="mt-2">
                    {dayTasks.slice(0, 2).map((task) => (
                      <li key={task.id}>
                        <a
                          href="#"
                          className="group flex"
                        >
                          <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-blue-600">
                            {task.title}
                          </p>
                        </a>
                      </li>
                    ))}
                    {dayTasks.length > 2 && (
                      <li className="text-gray-500">
                        + {dayTasks.length - 2} daha
                      </li>
                    )}
                  </ol>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
} 