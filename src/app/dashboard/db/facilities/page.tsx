'use client'

import { useEffect } from 'react'
import { useAppSelector } from '@/shared/hooks/use-app-selector'
import { useAppDispatch } from '@/shared/hooks/use-app-dispatch'
import { DataTable } from '@/shared/components/ui/data-table'
import { Button } from '@/shared/components/ui/button'
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { type Facility, addFacility, deleteFacility } from '@/features/facilities/store'

// Define columns for the facilities table
const columns = [
  {
    accessorKey: 'name',
    header: 'Tesis Adı',
    cell: ({ row }) => row.getValue('name'),
  },
  {
    accessorKey: 'cityName',
    header: 'Şehir',
    cell: ({ row }) => row.getValue('cityName'),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const facility = row.original as Facility
      const dispatch = useAppDispatch()

      return (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (window.confirm(`"${facility.name}" tesisini silmek istediğinizden emin misiniz?`)) {
                dispatch(deleteFacility(facility.id))
              }
            }}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/50"
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]

// Sample facility data
const initialFacilities: Facility[] = [
  { id: '1', name: 'Tesis 1', cityName: 'ANKARA', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '2', name: 'Tesis 2', cityName: 'ANKARA', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '3', name: 'Tesis 3', cityName: 'KIRIKKALE', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '4', name: 'Tesis 4', cityName: 'YOZGAT', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '5', name: 'Tesis 5', cityName: 'SAMSUN', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '6', name: 'Tesis 6', cityName: 'AĞRI', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '7', name: 'Tesis 7', cityName: 'İSTANBUL', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '8', name: 'Tesis 8', cityName: 'MERSİN', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '9', name: 'Tesis 9', cityName: 'ORDU', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '10', name: 'Tesis 10', cityName: 'BURSA', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '11', name: 'Tesis 11', cityName: 'HATAY', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '12', name: 'Tesis 12', cityName: 'ANKARA', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '13', name: 'Tesis 13', cityName: 'KÜTAHYA', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '14', name: 'Tesis 14', cityName: 'AKSARAY', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
]

export default function FacilitiesPage() {
  const facilities = useAppSelector((state) => state.facilities.facilities)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (facilities.length === 0) {
      initialFacilities.forEach(facility => {
        dispatch(addFacility(facility))
      })
    }
  }, [dispatch, facilities.length])

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Tesisler</h1>
        <Button
          onClick={() => {
            const newFacility: Facility = {
              id: (facilities.length + 1).toString(),
              name: `Tesis ${facilities.length + 1}`,
              cityName: 'ANKARA',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }
            dispatch(addFacility(newFacility))
          }}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Yeni Tesis
        </Button>
      </div>

      <div className="mt-8">
        <DataTable
          columns={columns}
          data={facilities}
          searchKey="name"
        />
      </div>
    </div>
  )
} 