'use client'

import { useAppSelector } from '@/shared/hooks/use-app-selector'
import {
  ChartBarIcon,
  ClockIcon,
  UserGroupIcon,
  FolderIcon,
} from '@heroicons/react/24/outline'

export default function ReportsPage() {
  const tasks = useAppSelector((state) => state.tasks.tasks)
  const teams = useAppSelector((state) => state.teams.teams)

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter((task) => task.status === 'done').length,
    inProgress: tasks.filter((task) => task.status === 'in_progress').length,
    todo: tasks.filter((task) => task.status === 'todo').length,
  }

  const teamStats = {
    total: teams.length,
    totalMembers: teams.reduce((acc, team) => acc + team.members.length, 0),
    averageMembers:
      teams.length > 0
        ? Math.round(
            teams.reduce((acc, team) => acc + team.members.length, 0) /
              teams.length
          )
        : 0,
  }

  const stats = [
    {
      name: 'Toplam Görev',
      value: taskStats.total,
      description: `${taskStats.completed} tamamlandı, ${taskStats.inProgress} devam ediyor`,
      icon: FolderIcon,
    },
    {
      name: 'Tamamlanma Oranı',
      value: `${Math.round((taskStats.completed / taskStats.total) * 100)}%`,
      description: `${taskStats.todo} görev bekliyor`,
      icon: ChartBarIcon,
    },
    {
      name: 'Toplam Ekip',
      value: teamStats.total,
      description: `${teamStats.totalMembers} toplam üye`,
      icon: UserGroupIcon,
    },
    {
      name: 'Ortalama Ekip Büyüklüğü',
      value: teamStats.averageMembers,
      description: 'Ekip başına üye',
      icon: ClockIcon,
    },
  ]

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Raporlar</h1>

      <dl className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {stat.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <span className="text-gray-500">{stat.description}</span>
                </div>
              </div>
            </dd>
          </div>
        ))}
      </dl>

      {/* Task Status Distribution */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">
          Görev Durumu Dağılımı
        </h2>
        <div className="mt-4 rounded-lg bg-white shadow">
          <div className="p-6">
            <div className="relative h-8 w-full rounded-full bg-gray-200">
              <div
                className="absolute left-0 top-0 h-full rounded-full bg-green-500"
                style={{
                  width: `${Math.round(
                    (taskStats.completed / taskStats.total) * 100
                  )}%`,
                }}
              />
              <div
                className="absolute h-full rounded-full bg-yellow-500"
                style={{
                  left: `${Math.round(
                    (taskStats.completed / taskStats.total) * 100
                  )}%`,
                  width: `${Math.round(
                    (taskStats.inProgress / taskStats.total) * 100
                  )}%`,
                }}
              />
            </div>
            <div className="mt-4 flex justify-between text-sm">
              <div className="flex items-center">
                <span className="h-3 w-3 rounded-full bg-green-500" />
                <span className="ml-2 text-gray-600">
                  Tamamlandı ({taskStats.completed})
                </span>
              </div>
              <div className="flex items-center">
                <span className="h-3 w-3 rounded-full bg-yellow-500" />
                <span className="ml-2 text-gray-600">
                  Devam Ediyor ({taskStats.inProgress})
                </span>
              </div>
              <div className="flex items-center">
                <span className="h-3 w-3 rounded-full bg-gray-200" />
                <span className="ml-2 text-gray-600">
                  Bekliyor ({taskStats.todo})
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 