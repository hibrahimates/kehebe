'use client'

import { useAppSelector } from '@/shared/hooks/use-app-selector'
import { cn } from '@/shared/utils/cn'
import {
  ChartBarIcon,
  ClockIcon,
  UserGroupIcon,
  FolderIcon,
} from '@heroicons/react/24/outline'

const stats = [
  {
    name: 'Toplam Görev',
    value: '24',
    change: '+4.75%',
    changeType: 'positive',
    icon: FolderIcon,
  },
  {
    name: 'Aktif Projeler',
    value: '12',
    change: '+54.02%',
    changeType: 'positive',
    icon: ChartBarIcon,
  },
  {
    name: 'Ekip Üyeleri',
    value: '16',
    change: '+12.30%',
    changeType: 'positive',
    icon: UserGroupIcon,
  },
  {
    name: 'Ortalama Tamamlama',
    value: '3.2 gün',
    change: '-10.34%',
    changeType: 'negative',
    icon: ClockIcon,
  },
]

export default function DashboardPage() {
  const tasks = useAppSelector((state) => state.tasks.tasks)
  const teams = useAppSelector((state) => state.teams.teams)

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
      
      {/* Stats */}
      <dl className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                {stat.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
              <p
                className={cn(
                  stat.changeType === 'positive'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400',
                  'ml-2 flex items-baseline text-sm font-semibold'
                )}
              >
                {stat.change}
              </p>
            </dd>
          </div>
        ))}
      </dl>

      {/* Recent Tasks */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Son Görevler</h2>
        <div className="mt-4 overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow">
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            {tasks.slice(0, 5).map((task) => (
              <li key={task.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{task.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{task.description}</p>
                  </div>
                  <div className="flex items-center">
                    <span
                      className={cn(
                        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                        {
                          'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400': task.status === 'done',
                          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400': task.status === 'in_progress',
                          'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300': task.status === 'todo',
                        }
                      )}
                    >
                      {task.status === 'done'
                        ? 'Tamamlandı'
                        : task.status === 'in_progress'
                        ? 'Devam Ediyor'
                        : 'Bekliyor'}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Teams Overview */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Ekip Durumu</h2>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <div
              key={team.id}
              className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <UserGroupIcon
                      className="h-8 w-8 text-gray-400 dark:text-gray-500"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {team.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{team.description}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {team.members.slice(0, 5).map((member) => (
                        <img
                          key={member.id}
                          className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800"
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                            member.name
                          )}&background=random`}
                          alt={member.name}
                        />
                      ))}
                    </div>
                    {team.members.length > 5 && (
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        +{team.members.length - 5} kişi
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 