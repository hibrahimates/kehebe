'use client'

import { DataTable } from '@/shared/components/ui/data-table'
import { useState } from 'react'

type ColumnType = 'string' | 'integer' | 'float' | 'date' | 'boolean'

const columns: { key: string; title: string; type: ColumnType }[] = [
  { key: 'id', title: 'ID', type: 'integer' },
  { key: 'State_Name', title: 'Ülke', type: 'string' },
  { key: 'State_Code', title: 'Ülke Kodu', type: 'string' },
]

const initialData = [
  { id: 1, State_Name: 'Türkiye', State_Code: 'TR' },
  { id: 2, State_Name: 'Amerika Birleşik Devletleri', State_Code: 'US' },
  { id: 3, State_Name: 'Almanya', State_Code: 'DE' },
  { id: 4, State_Name: 'Fransa', State_Code: 'FR' },
  { id: 5, State_Name: 'İngiltere', State_Code: 'GB' },
  { id: 6, State_Name: 'İtalya', State_Code: 'IT' },
  { id: 7, State_Name: 'İspanya', State_Code: 'ES' },
  { id: 8, State_Name: 'Japonya', State_Code: 'JP' },
  { id: 9, State_Name: 'Çin', State_Code: 'CN' },
  { id: 10, State_Name: 'Rusya', State_Code: 'RU' },
  { id: 11, State_Name: 'Kanada', State_Code: 'CA' },
  { id: 12, State_Name: 'Avustralya', State_Code: 'AU' },
  { id: 13, State_Name: 'Brezilya', State_Code: 'BR' },
  { id: 14, State_Name: 'Hindistan', State_Code: 'IN' },
  { id: 15, State_Name: 'Güney Kore', State_Code: 'KR' },
  { id: 16, State_Name: 'Meksika', State_Code: 'MX' },
  { id: 17, State_Name: 'Endonezya', State_Code: 'ID' },
  { id: 18, State_Name: 'Hollanda', State_Code: 'NL' },
  { id: 19, State_Name: 'Suudi Arabistan', State_Code: 'SA' },
  { id: 20, State_Name: 'İsviçre', State_Code: 'CH' },
  { id: 21, State_Name: 'İsveç', State_Code: 'SE' },
  { id: 22, State_Name: 'Polonya', State_Code: 'PL' },
  { id: 23, State_Name: 'Belçika', State_Code: 'BE' },
  { id: 24, State_Name: 'Norveç', State_Code: 'NO' },
  { id: 25, State_Name: 'Avusturya', State_Code: 'AT' },
  { id: 26, State_Name: 'İrlanda', State_Code: 'IE' },
  { id: 27, State_Name: 'Danimarka', State_Code: 'DK' },
  { id: 28, State_Name: 'Finlandiya', State_Code: 'FI' },
  { id: 29, State_Name: 'Singapur', State_Code: 'SG' },
  { id: 30, State_Name: 'Hong Kong', State_Code: 'HK' }
]

export default function StatePage() {
  const [data] = useState(initialData)

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          State
        </h1>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Ülke bilgilerini görüntüleyin ve yönetin
        </p>
      </div>

      <DataTable 
        columns={columns} 
        initialData={data} 
        searchKey="State_Name"
      />
    </div>
  )
} 