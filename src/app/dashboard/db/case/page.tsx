'use client'

import { DataTable } from '@/shared/components/ui/data-table'

type ColumnType = 'string' | 'integer' | 'float' | 'date' | 'boolean'

const columns: { key: string; title: string; type: ColumnType }[] = [
  { key: 'Case_ID', title: 'Vaka ID', type: 'integer' },
  { key: 'Case_Code', title: 'Vaka Kodu', type: 'string' },
  { key: 'Case_Description', title: 'Vaka Açıklaması', type: 'string' },
]

const initialData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  Case_Name: `Durum ${i + 1}`,
  Case_Code: `CASE${String(i + 1).padStart(3, '0')}`,
  Description: `Durum ${i + 1} açıklaması`,
  Status: ['Aktif', 'Pasif', 'Beklemede'][Math.floor(Math.random() * 3)]
}))

export default function CasePage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Vakalar
        </h1>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Vaka kayıtlarını görüntüleyin ve yönetin
        </p>
      </div>

      <DataTable columns={columns} initialData={initialData} />
    </div>
  )
} 