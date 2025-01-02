'use client'

import { DataTable } from '@/shared/components/ui/data-table'
import { useState } from 'react'

type ColumnType = 'string' | 'integer' | 'float' | 'date' | 'boolean' | 'select'

const columns: { key: string; title: string; type: ColumnType; options?: { value: string; label: string }[] }[] = [
  { key: 'id', title: 'ID', type: 'integer' },
  { key: 'Contract_Code', title: 'Sözleşme Kodu', type: 'string' },
  { key: 'Contract_Date', title: 'Sözleşme Tarihi', type: 'date' },
  { key: 'Contract_Number', title: 'Sözleşme Numarası', type: 'string' },
  { 
    key: 'Contractor_Code', 
    title: 'Yüklenici', 
    type: 'select',
    options: Array.from({ length: 20 }, (_, i) => ({
      value: `CONT${String(i + 1).padStart(3, '0')}`,
      label: `Yüklenici ${i + 1}`
    }))
  },
  { key: 'Contract_Duration', title: 'Süre', type: 'string' },
  { key: 'Team_Members', title: 'İşle İlgilenen Takım', type: 'string' },
  { key: 'In_Charge', title: 'Sorumlu', type: 'string' },
  { 
    key: 'Case_Code', 
    title: 'Durum Kodu', 
    type: 'select',
    options: [
      { value: 'D', label: 'D - Devam Eden' },
      { value: 'E', label: 'E - Ertelenen' },
      { value: 'T', label: 'T - Tamamlanan' },
      { value: 'İ', label: 'İ - İptal Edilen' }
    ]
  },
  { key: 'Current_Contract', title: 'Güncel Sözleşme', type: 'boolean' },
  { key: 'Contract_Name', title: 'Sözleşme Adı', type: 'string' },
]

const initialData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  Contract_Code: `CNT${String(i + 1).padStart(3, '0')}`,
  Contract_Name: `Sözleşme ${i + 1}`,
  Contract_Date: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
  Contract_Number: `SOZ-${String(i + 1).padStart(5, '0')}`,
  Contractor_Code: `CONT${String(Math.floor(Math.random() * 20) + 1).padStart(3, '0')}`,
  Contract_Duration: `${Math.floor(Math.random() * 365) + 30} Gün`,
  Team_Members: `Takım ${Math.floor(Math.random() * 10) + 1}`,
  In_Charge: `Sorumlu ${Math.floor(Math.random() * 20) + 1}`,
  Case_Code: ['D', 'E', 'T', 'İ'][Math.floor(Math.random() * 4)],
  Current_Contract: Math.random() > 0.3
}))

export default function ContractPage() {
  const [data] = useState(initialData)

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Sözleşmeler
        </h1>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Sözleşme kayıtlarını görüntüleyin ve yönetin
        </p>
      </div>

      <DataTable 
        columns={columns} 
        initialData={data}
      />
    </div>
  )
} 