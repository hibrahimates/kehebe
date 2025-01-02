'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/shared/utils/cn'
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  CalendarIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ServerIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  BuildingOffice2Icon,
  BuildingStorefrontIcon,
  DocumentTextIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
  CurrencyDollarIcon,
  CircleStackIcon,
  BuildingLibraryIcon,
  BuildingOfficeIcon,
  ClockIcon,
  BriefcaseIcon,
  DocumentDuplicateIcon,
  UsersIcon,
  ArrowLeftCircleIcon,
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Görevler', href: '/dashboard/tasks', icon: ClipboardDocumentListIcon },
  { name: 'Ekipler', href: '/dashboard/teams', icon: UserGroupIcon },
  { name: 'Takvim', href: '/dashboard/calendar', icon: CalendarIcon },
  { name: 'Raporlar', href: '/dashboard/reports', icon: ChartBarIcon },
  { name: 'Ayarlar', href: '/dashboard/settings', icon: Cog6ToothIcon },
]

const databases = [
  { name: 'Facility', href: '/dashboard/db/facility', icon: BuildingOffice2Icon },
  { name: 'Building', href: '/dashboard/db/building', icon: BuildingOfficeIcon },
  { name: 'Building_Type', href: '/dashboard/db/building-type', icon: BuildingLibraryIcon },
  { name: 'Case', href: '/dashboard/db/case', icon: DocumentTextIcon },
  { name: 'City', href: '/dashboard/db/city', icon: MapPinIcon },
  { name: 'Contact', href: '/dashboard/db/contact', icon: PhoneIcon },
  { name: 'Contract', href: '/dashboard/db/contract', icon: DocumentDuplicateIcon },
  { name: 'Contractor', href: '/dashboard/db/contractor', icon: BriefcaseIcon },
  { name: 'Currency', href: '/dashboard/db/currency', icon: CurrencyDollarIcon },
  { name: 'Domain', href: '/dashboard/db/domain', icon: CircleStackIcon },
  { name: 'Domain_Type', href: '/dashboard/db/domain-type', icon: CircleStackIcon },
  { name: 'Floor', href: '/dashboard/db/floor', icon: BuildingOffice2Icon },
  { name: 'Job', href: '/dashboard/db/job', icon: BriefcaseIcon },
  { name: 'Rs', href: '/dashboard/db/rs', icon: DocumentDuplicateIcon },
  { name: 'Seat', href: '/dashboard/db/seat', icon: ClockIcon },
  { name: 'State', href: '/dashboard/db/state', icon: MapPinIcon },
  { name: 'Team', href: '/dashboard/db/team', icon: UserGroupIcon },
  { name: 'GMY', href: '/dashboard/db/gmy', icon: UsersIcon },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isDbOpen, setIsDbOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={cn(
        "flex h-full flex-col bg-[#1A1C1E] transition-all duration-300 border-r border-gray-800",
        "w-[240px]"
      )}>
        <div className="flex h-16 shrink-0 items-center justify-between px-4 border-b border-gray-800">
          <div className="h-8 w-8" />
        </div>
      </div>
    )
  }

  return (
    <div 
      className={cn(
        "flex h-full flex-col bg-[#1A1C1E] transition-all duration-300 border-r border-gray-800",
        isCollapsed ? "w-[72px]" : "w-[240px]"
      )}
    >
      {/* Logo ve Toggle */}
      <div className="flex h-16 shrink-0 items-center justify-between px-4 border-b border-gray-800">
        <img
          className={cn("h-8 w-auto transition-all duration-300", isCollapsed && "w-8")}
          src="/logo.svg"
          alt="KHB Dashboard"
        />
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="rounded-lg p-1.5 hover:bg-gray-800 text-gray-400"
        >
          <ArrowLeftCircleIcon 
            className={cn(
              "h-5 w-5 transition-transform duration-300",
              isCollapsed && "rotate-180"
            )}
          />
        </button>
      </div>

      <nav className="flex-1 space-y-0 px-2 py-1 overflow-y-auto">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'flex items-center px-3 py-1 text-sm font-medium rounded-md transition-colors',
              pathname === item.href
                ? 'text-white bg-gray-800'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            )}
          >
            <item.icon className={cn("h-4 w-4 flex-shrink-0", !isCollapsed && "mr-3")} />
            {!isCollapsed && <span>{item.name}</span>}
          </Link>
        ))}

        {/* Database Section */}
        <div className="mt-0">
          <button
            onClick={() => setIsDbOpen(!isDbOpen)}
            className={cn(
              'w-full flex items-center justify-between px-3 py-1 text-sm font-medium rounded-md transition-colors',
              pathname.startsWith('/dashboard/db')
                ? 'text-white bg-gray-800'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            )}
          >
            <div className="flex items-center">
              <ServerIcon className={cn("h-5 w-5 flex-shrink-0", !isCollapsed && "mr-3")} />
              {!isCollapsed && (
                <>
                  <span>Veritabanı</span>
                  {isDbOpen ? (
                    <ChevronDownIcon className="ml-auto h-4 w-4" />
                  ) : (
                    <ChevronRightIcon className="ml-auto h-4 w-4" />
                  )}
                </>
              )}
            </div>
          </button>
          {isDbOpen && (
            <div className="mt-0 space-y-0">
              {databases.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center transition-colors rounded-md',
                    isCollapsed ? 'px-3 py-1' : 'pl-10 pr-3 py-1',
                    pathname === item.href
                      ? 'text-white bg-gray-800'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  )}
                >
                  <item.icon className={cn("h-4 w-4 flex-shrink-0", !isCollapsed && "mr-3")} />
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
    </div>
  )
} 