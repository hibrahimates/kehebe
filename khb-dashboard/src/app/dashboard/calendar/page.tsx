'use client'

import { useAppSelector } from '@/shared/hooks/use-app-selector'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/utils/cn'
import { useState } from 'react'
import { AddEventModal } from '@/features/calendar/components/add-event-modal'

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

export default function CalendarPage() {
  const tasks = useAppSelector((state) => state.tasks.tasks)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

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

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    setIsAddModalOpen(true)
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Takvim
        </h1>
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
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
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
        <div className="grid grid-cols-7 gap-px rounded-lg bg-gray-200 dark:bg-gray-700 text-center text-xs font-semibold leading-6 text-gray-700 dark:text-gray-300">
          <div className="bg-white dark:bg-gray-800 py-2">Pzt</div>
          <div className="bg-white dark:bg-gray-800 py-2">Sal</div>
          <div className="bg-white dark:bg-gray-800 py-2">Çar</div>
          <div className="bg-white dark:bg-gray-800 py-2">Per</div>
          <div className="bg-white dark:bg-gray-800 py-2">Cum</div>
          <div className="bg-white dark:bg-gray-800 py-2">Cmt</div>
          <div className="bg-white dark:bg-gray-800 py-2">Paz</div>
        </div>
        <div className="grid grid-cols-7 gap-px rounded-lg bg-gray-200 dark:bg-gray-700 text-sm">
          {emptyDays.map((day) => (
            <div key={`empty-${day}`} className="bg-white dark:bg-gray-800 py-8" />
          ))}
          {days.map((day) => {
            const date = new Date(year, month, day)
            const dateKey = date.toISOString().split('T')[0]
            const dayTasks = tasksByDate[dateKey] || []
            const isToday =
              date.toDateString() === new Date().toDateString()

            return (
              <button
                key={day}
                onClick={() => handleDateClick(date)}
                className={cn(
                  'relative bg-white dark:bg-gray-800 py-8 px-3 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-10 focus:outline-none',
                  {
                    'bg-blue-50 dark:bg-blue-900': isToday,
                  }
                )}
              >
                <time
                  dateTime={date.toISOString()}
                  className={cn(
                    'mx-auto flex h-6 w-6 items-center justify-center rounded-full',
                    {
                      'bg-blue-600 font-semibold text-white': isToday,
                      'text-gray-900 dark:text-white': !isToday,
                    }
                  )}
                >
                  {day}
                </time>
                {dayTasks.length > 0 && (
                  <ol className="mt-2">
                    {dayTasks.slice(0, 2).map((task) => (
                      <li key={task.id}>
                        <div className="group flex">
                          <p className="flex-auto truncate font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                            {task.title}
                          </p>
                        </div>
                      </li>
                    ))}
                    {dayTasks.length > 2 && (
                      <li className="text-gray-500 dark:text-gray-400">
                        + {dayTasks.length - 2} daha
                      </li>
                    )}
                  </ol>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <AddEventModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false)
          setSelectedDate(null)
        }}
        selectedDate={selectedDate}
      />
    </div>
  )
} 