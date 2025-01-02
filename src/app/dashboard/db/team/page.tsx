'use client'

import { DataTable } from '@/shared/components/ui/data-table'
import { useState } from 'react'

type ColumnType = 'string' | 'integer' | 'float' | 'date' | 'boolean'

const columns: { key: string; title: string; type: ColumnType }[] = [
  { key: 'id', title: 'ID', type: 'integer' },
  { key: 'Teammate_Reg_Num', title: 'Sicil No', type: 'string' },
  { key: 'Teammate_Dis', title: 'Disiplin', type: 'string' },
]

const initialData = [
  { 
    id: 1, 
    Teammate_Reg_Num: '57072',
    Teammate_Dis: 'Elektrik'
  },
  { 
    id: 2, 
    Teammate_Reg_Num: '60336',
    Teammate_Dis: 'İnşaat'
  },
  { 
    id: 3, 
    Teammate_Reg_Num: '60463',
    Teammate_Dis: 'İnşaat'
  },
  { 
    id: 4, 
    Teammate_Reg_Num: '60573',
    Teammate_Dis: 'İnşaat'
  },
  { 
    id: 5, 
    Teammate_Reg_Num: '60685',
    Teammate_Dis: 'Mekanik'
  },
  { 
    id: 6, 
    Teammate_Reg_Num: '26210',
    Teammate_Dis: 'İnşaat'
  },
  { 
    id: 7, 
    Teammate_Reg_Num: '63459',
    Teammate_Dis: 'İnşaat'
  }
]

export default function TeamPage() {
  const [data] = useState(initialData)

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Team
        </h1>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Ekip üyelerini görüntüleyin ve yönetin
        </p>
      </div>

      <DataTable 
        columns={columns} 
        initialData={data} 
        searchKey="Teammate_Reg_Num"
      />
    </div>
  )
} 