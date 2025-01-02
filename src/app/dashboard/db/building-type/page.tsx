'use client'

import { DataTable } from '@/shared/components/ui/data-table'
import { useState } from 'react'

type ColumnType = 'string' | 'integer' | 'float' | 'date' | 'boolean'

const columns: { key: string; title: string; type: ColumnType }[] = [
  { key: 'id', title: 'ID', type: 'integer' },
  { key: 'Building_Type', title: 'Bina Tipi', type: 'string' },
]

const initialData = [
  { id: 1, Building_Type: 'Üretim' },
  { id: 2, Building_Type: 'Ofis' },
  { id: 3, Building_Type: 'Altyapı' },
  { id: 4, Building_Type: 'Depo' },
  { id: 5, Building_Type: 'Sosyal' }
]

export default function BuildingTypePage() {
  const [data] = useState(initialData)

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Building Type
        </h1>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Bina tipi kayıtlarını görüntüleyin ve yönetin
        </p>
      </div>

      <DataTable 
        columns={columns} 
        initialData={data} 
        searchKey="Building_Type"
      />
    </div>
  )
} 