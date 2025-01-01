'use client'

import { useAppSelector } from '@/shared/hooks/use-app-selector'
import { useAppDispatch } from '@/shared/hooks/use-app-dispatch'
import { Button } from '@/shared/components/ui/button'
import { PlusIcon, UserPlusIcon, TrashIcon, EyeIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { type Team, addTeam, deleteTeam, addTeamMember, removeTeamMember } from '@/features/teams/store'
import { DataTable } from '@/shared/components/ui/data-table'
import { useEffect, useState } from 'react'
import { cn } from '@/shared/utils/cn'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip'

const personnelColumns = [
  {
    accessorKey: 'fullName',
    header: 'Adı Soyadı',
    cell: ({ row }) => row.getValue('fullName'),
  },
  {
    accessorKey: 'registrationNumber',
    header: 'Sicil No',
    cell: ({ row }) => row.getValue('registrationNumber'),
  },
  {
    accessorKey: 'idbNo',
    header: 'IDB No',
    cell: ({ row }) => row.getValue('idbNo'),
  },
  {
    accessorKey: 'title',
    header: 'Ünvan',
    cell: ({ row }) => row.getValue('title'),
  },
  {
    accessorKey: 'email',
    header: 'E-posta',
    cell: ({ row }) => row.getValue('email'),
  },
]

// Generate 50 sample personnel records
const generateSamplePersonnel = () => {
  const titles = ['Yazılım Mühendisi', 'Sistem Uzmanı', 'Veri Analisti', 'Proje Yöneticisi', 'İş Analisti', 'Teknik Uzman', 'Koordinatör']
  const names = [
    'Ahmet Yılmaz', 'Mehmet Demir', 'Ayşe Kaya', 'Fatma Çelik', 'Ali Öztürk',
    'Zeynep Şahin', 'Mustafa Aydın', 'Emine Yıldız', 'Hüseyin Arslan', 'Hatice Güneş',
    'İbrahim Koç', 'Elif Doğan', 'Murat Şen', 'Zehra Yalçın', 'Osman Kurt',
    'Hacer Özdemir', 'Hasan Kılıç', 'Merve Özkan', 'Ömer Aksoy', 'Esra Erdoğan',
    'Süleyman Aslan', 'Fadime Yavuz', 'İsmail Polat', 'Emine Şimşek', 'Ramazan Kara',
    'Ayşegül Çetin', 'Yusuf Aktaş', 'Fatih Korkmaz', 'Sevgi Yılmaz', 'Mehmet Ali Öz',
    'Hatice Nur Şahin', 'Ahmet Can Demir', 'Zeynep Nur Kaya', 'Mustafa Kemal Çelik', 'Ayşe Gül Öztürk',
    'Mehmet Emin Arslan', 'Fatma Betül Yıldız', 'Ali Rıza Güneş', 'Zehra Betül Koç', 'Hüseyin Cahit Doğan',
    'Emine Nur Şen', 'İbrahim Ethem Yalçın', 'Hatice Kübra Kurt', 'Ömer Faruk Özdemir', 'Elif Naz Kılıç',
    'Murat Can Özkan', 'Esra Nur Aksoy', 'Süleyman Çağrı Erdoğan', 'Hacer Naz Aslan', 'Hasan Basri Yavuz'
  ]
  return Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    fullName: names[i],
    registrationNumber: `SC${String(i + 1).padStart(5, '0')}`,
    idbNo: `IDB${String(Math.floor(Math.random() * 10000)).padStart(5, '0')}`,
    email: `${names[i].toLowerCase().replace(' ', '.')}@khb.gov.tr`,
    title: titles[Math.floor(Math.random() * titles.length)],
  }))
}

const personnel = generateSamplePersonnel()

// Create initial teams with members
const initialTeams: Team[] = [
  {
    id: '1',
    name: 'KHB',
    description: 'Kamu Hastaneleri Birliği',
    members: personnel.slice(0, 8).map(p => ({
      id: p.id.toString(),
      name: p.fullName,
      role: p.title,
      email: p.email
    })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'TP',
    description: 'Teknik Personel',
    members: personnel.slice(8, 15).map(p => ({
      id: p.id.toString(),
      name: p.fullName,
      role: p.title,
      email: p.email
    })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'PY',
    description: 'Proje Yönetimi',
    members: personnel.slice(15, 23).map(p => ({
      id: p.id.toString(),
      name: p.fullName,
      role: p.title,
      email: p.email
    })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'PYB',
    description: 'Proje Yönetim Birimi',
    members: personnel.slice(23, 31).map(p => ({
      id: p.id.toString(),
      name: p.fullName,
      role: p.title,
      email: p.email
    })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'İTO',
    description: 'İdari ve Teknik Organizasyon',
    members: personnel.slice(31, 39).map(p => ({
      id: p.id.toString(),
      name: p.fullName,
      role: p.title,
      email: p.email
    })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'PB',
    description: 'Proje Birimi',
    members: personnel.slice(39, 47).map(p => ({
      id: p.id.toString(),
      name: p.fullName,
      role: p.title,
      email: p.email
    })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// Add columns for team members table
const teamMemberColumns = [
  { key: 'id', title: 'ID', type: 'integer' },
  { key: 'name', title: 'Adı Soyadı', type: 'string' },
  { key: 'role', title: 'Ünvanı', type: 'string' },
  { key: 'email', title: 'Mail adresi', type: 'string' },
]

export default function TeamsPage() {
  const teams = useAppSelector((state) => state.teams.teams)
  const dispatch = useAppDispatch()
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)
  const [selectedPersonnel, setSelectedPersonnel] = useState<string[]>([])

  useEffect(() => {
    if (teams.length === 0) {
      initialTeams.forEach(team => {
        dispatch(addTeam(team))
      })
    }
  }, [dispatch, teams.length])

  const handleDeleteTeam = (team: Team) => {
    if (window.confirm(`"${team.name}" ekibini silmek istediğinizden emin misiniz?`)) {
      dispatch(deleteTeam(team.id))
      if (selectedTeam?.id === team.id) {
        setSelectedTeam(null)
      }
    }
  }

  const handleDeleteMember = (teamId: string, memberId: string) => {
    if (window.confirm('Bu üyeyi ekipten çıkarmak istediğinizden emin misiniz?')) {
      dispatch(removeTeamMember({ teamId, userId: memberId }))
      // Refresh selected team to update the view
      const updatedTeam = teams.find(t => t.id === teamId)
      setSelectedTeam(updatedTeam || null)
    }
  }

  const handleAddMembers = (teamId: string) => {
    selectedPersonnel.forEach(personId => {
      const person = personnel.find(p => p.id.toString() === personId)
      if (person) {
        dispatch(addTeamMember({
          teamId,
          user: {
            id: person.id.toString(),
            name: person.fullName,
            role: person.title,
            email: person.email
          }
        }))
      }
    })
    // Refresh selected team to update the view
    const updatedTeam = teams.find(t => t.id === teamId)
    setSelectedTeam(updatedTeam || null)
    setIsAddMemberOpen(false)
    setSelectedPersonnel([])
  }

  // Get available personnel (not in current team)
  const getAvailablePersonnel = (team: Team) => {
    return personnel.filter(p => !team.members.some(m => m.id === p.id.toString()))
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Ekipler</h1>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => (
          <div
            key={team.id}
            className="relative flex flex-col overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow transition-colors"
          >
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {team.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{team.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedTeam(selectedTeam?.id === team.id ? null : team)}
                  >
                    <EyeIcon className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteTeam(team)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/50"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    <TooltipProvider>
                      {team.members.slice(0, 5).map((member) => (
                        <Tooltip key={member.id}>
                          <TooltipTrigger>
                            <img
                              className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800"
                              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                member.name
                              )}&background=random`}
                              alt={member.name}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{member.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </TooltipProvider>
                  </div>
                  {team.members.length > 5 && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            +{team.members.length - 5} kişi
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="space-y-1">
                            {team.members.slice(5).map((member) => (
                              <p key={member.id}>{member.name}</p>
                            ))}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-3">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                <span>Oluşturulma: </span>
                <time dateTime={team.createdAt}>
                  {new Date(team.createdAt).toLocaleDateString('tr-TR')}
                </time>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Team Members Dialog */}
      <Dialog open={selectedTeam !== null} onOpenChange={() => setSelectedTeam(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedTeam?.name} Ekip Üyeleri</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <div className="flex justify-end mb-4">
              <Button
                onClick={() => setIsAddMemberOpen(true)}
                disabled={!selectedTeam || getAvailablePersonnel(selectedTeam).length === 0}
              >
                <UserPlusIcon className="mr-2 h-4 w-4" />
                Üye Ekle
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Adı Soyadı
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Ünvanı
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      E-posta
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {selectedTeam?.members.map((member) => (
                    <tr key={member.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {member.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {member.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {member.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => selectedTeam && handleDeleteMember(selectedTeam.id, member.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/50"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Member Dialog */}
      <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Üye Ekle</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <Select
              value={selectedPersonnel[0] || ''}
              onValueChange={(value) => setSelectedPersonnel([value])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Personel seçin" />
              </SelectTrigger>
              <SelectContent>
                {selectedTeam && getAvailablePersonnel(selectedTeam).map((person) => (
                  <SelectItem key={person.id} value={person.id.toString()}>
                    {person.fullName} - {person.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="mt-6 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddMemberOpen(false)
                  setSelectedPersonnel([])
                }}
              >
                İptal
              </Button>
              <Button
                onClick={() => selectedTeam && handleAddMembers(selectedTeam.id)}
                disabled={selectedPersonnel.length === 0}
              >
                Ekle
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Personnel List */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Personel Listesi</h2>
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <DataTable 
            columns={personnelColumns} 
            data={personnel} 
            searchKey="fullName"
          />
        </div>
      </div>
    </div>
  )
} 