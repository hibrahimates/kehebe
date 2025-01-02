'use client'

import { DataTable } from '@/shared/components/ui/data-table'
import { useState } from 'react'

type ColumnType = 'string' | 'integer' | 'float' | 'date' | 'boolean'

const columns: { key: string; title: string; type: ColumnType }[] = [
  { key: 'id', title: 'ID', type: 'integer' },
  { key: 'Floor_Def', title: 'Kat', type: 'string' },
  { key: 'Floor_Code', title: 'Kat Kodu', type: 'string' },
]

const initialData = [
  { id: 1, Floor_Def: 'Bodrum Kat', Floor_Code: '-1' },
  { id: 2, Floor_Def: 'Zemin Kat', Floor_Code: '0' },
  { id: 3, Floor_Def: '1. Kat', Floor_Code: '1' },
  { id: 4, Floor_Def: '2. Kat', Floor_Code: '2' },
  { id: 5, Floor_Def: '3. Kat', Floor_Code: '3' },
  { id: 6, Floor_Def: '4. Kat', Floor_Code: '4' },
  { id: 7, Floor_Def: '5. Kat', Floor_Code: '5' },
  { id: 8, Floor_Def: '6. Kat', Floor_Code: '6' },
  { id: 9, Floor_Def: '7. Kat', Floor_Code: '7' },
  { id: 10, Floor_Def: '8. Kat', Floor_Code: '8' },
  { id: 11, Floor_Def: '9. Kat', Floor_Code: '9' },
  { id: 12, Floor_Def: '10. Kat', Floor_Code: '10' },
]

export default function FloorPage() {
  const [data] = useState(initialData)

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Floor
        </h1>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Kat bilgilerini görüntüleyin
        </p>
      </div>

      <DataTable 
        columns={columns} 
        initialData={data} 
        searchKey="Floor_Def"
      />
    </div>
  )
} 