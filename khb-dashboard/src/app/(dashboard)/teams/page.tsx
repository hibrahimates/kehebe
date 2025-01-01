'use client'

import { useAppSelector } from '@/shared/hooks/use-app-selector'
import { useAppDispatch } from '@/shared/hooks/use-app-dispatch'
import { Button } from '@/shared/components/ui/button'
import { PlusIcon, UserPlusIcon } from '@heroicons/react/24/outline'
import { type Team, addTeam } from '@/features/teams/store'

export default function TeamsPage() {
  const teams = useAppSelector((state) => state.teams.teams)
  const dispatch = useAppDispatch()

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Ekipler</h1>
        <Button
          onClick={() => {
            // TODO: Add team modal
            const newTeam: Team = {
              id: Math.random().toString(),
              name: 'Yeni Ekip',
              description: 'Ekip açıklaması',
              members: [],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }
            dispatch(addTeam(newTeam))
          }}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Yeni Ekip
        </Button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => (
          <div
            key={team.id}
            className="relative flex flex-col overflow-hidden rounded-lg bg-white shadow"
          >
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    {team.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{team.description}</p>
                </div>
                <Button variant="outline" size="sm">
                  <UserPlusIcon className="mr-2 h-4 w-4" />
                  Üye Ekle
                </Button>
              </div>
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {team.members.slice(0, 5).map((member) => (
                      <img
                        key={member.id}
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                          member.name
                        )}&background=random`}
                        alt={member.name}
                      />
                    ))}
                  </div>
                  {team.members.length > 5 && (
                    <span className="text-sm text-gray-500">
                      +{team.members.length - 5} kişi
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-4">
              <div className="text-sm">
                <span className="text-gray-500">Oluşturulma: </span>
                <time dateTime={team.createdAt} className="text-gray-900">
                  {new Date(team.createdAt).toLocaleDateString('tr-TR')}
                </time>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 