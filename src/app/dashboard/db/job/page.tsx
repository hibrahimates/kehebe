'use client'

import { DataTable } from '@/shared/components/ui/data-table'
import { useState } from 'react'

type ColumnType = 'string' | 'integer' | 'float' | 'date' | 'boolean'

const columns: { key: string; title: string; type: ColumnType }[] = [
  { key: 'id', title: 'ID', type: 'integer' },
  { key: 'Job_Code', title: 'İş Kodu', type: 'string' },
  { key: 'Fac_Name', title: 'Tesis', type: 'string' },
  { key: 'Contract_Code', title: 'Sözleşme Kodu', type: 'string' },
  { key: 'User_Code', title: 'Kullanıcı', type: 'string' },
  { key: 'area', title: 'm²', type: 'float' },
  { key: 'Surveyor', title: 'Ölçümcü', type: 'string' },
  { key: 'T0', title: 'Başlangıç', type: 'date' },
  { key: 'Job_Dur', title: 'Süre', type: 'string' },
  { key: 'T1', title: 'Bitiş', type: 'date' },
]

const initialData = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  Job_Code: `JOB${String(i + 1).padStart(3, '0')}`,
  Fac_Name: `Tesis ${Math.floor(Math.random() * 14) + 1}`,
  Contract_Code: `CNT${String(Math.floor(Math.random() * 100) + 1).padStart(3, '0')}`,
  User_Code: `GMY ${Math.floor(Math.random() * 8) + 1}`,
  Area: (Math.random() * 10000).toFixed(2),
  Surveyor: ['SAYAR', 'NKY', 'RS', 'DD'][Math.floor(Math.random() * 4)],
  T0: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
  Job_Dur: `${Math.floor(Math.random() * 365) + 30} Gün`,
  T1: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0]
}))

export default function JobPage() {
  const [data] = useState(initialData)

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Job
        </h1>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          İş bilgilerini görüntüleyin ve yönetin
        </p>
      </div>

      <DataTable 
        columns={columns} 
        initialData={data} 
        searchKey="Job_Code"
      />
    </div>
  )
} 