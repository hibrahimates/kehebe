'use client'

import { DataTable } from '@/shared/components/ui/data-table'
import { useState } from 'react'

type ColumnType = 'string' | 'integer' | 'float' | 'date' | 'boolean' | 'select'

const domainTypes = [
  { value: 'OFFICE', label: 'Ofis' },
  { value: 'MEETING', label: 'Toplantı Salonu' },
  { value: 'STORAGE', label: 'Depo' },
  { value: 'SOCIAL', label: 'Sosyal Alan' },
  { value: 'TECHNICAL', label: 'Teknik Alan' }
]

const columns: { key: string; title: string; type: ColumnType; options?: { value: string; label: string }[]; editable?: boolean }[] = [
  { key: 'id', title: 'ID', type: 'integer' },
  { key: 'Building_Code', title: 'Bina Kodu', type: 'string' },
  { key: 'Floor_Code', title: 'Kat', type: 'string' },
  { 
    key: 'Domain_Type', 
    title: 'Alan Tipi', 
    type: 'select',
    options: domainTypes
  },
  { key: 'Domain_Name', title: 'Alan Adı', type: 'string' },
  { key: 'Domain_Code', title: 'Alan Kodu', type: 'string' },
  { key: 'Domain_Area', title: 'Alan (m²)', type: 'float' },
  { key: 'RS_Contact', title: 'RS İletişim', type: 'string' },
  { key: 'Domain_Staff_Cap', title: 'Personel Kapasitesi', type: 'integer' },
  { key: 'Domain_Use', title: 'Kullanım', type: 'integer' },
  { key: 'Domain_Usage_Ratio', title: 'Kullanım Oranı', type: 'string', editable: false },
  { key: 'Domain_Tel_Num', title: 'Telefon', type: 'string' },
]

const initialData = Array.from({ length: 150 }, (_, i) => {
  const staffCap = Math.floor(Math.random() * 50) + 5
  const use = Math.floor(Math.random() * 40) + 1
  const ratio = (use / staffCap) * 100

  return {
    id: i + 1,
    Building_Code: `BLD${String(Math.floor(Math.random() * 50) + 1).padStart(3, '0')}`,
    Floor_Code: `F${Math.floor(Math.random() * 10) - 2}`,
    Domain_Type: domainTypes[Math.floor(Math.random() * domainTypes.length)].value,
    Domain_Name: `Alan ${i + 1}`,
    Domain_Code: `DOM${String(i + 1).padStart(3, '0')}`,
    Domain_Area: (Math.random() * 1000 + 20).toFixed(2),
    RS_Contact: `RS${String(Math.floor(Math.random() * 50) + 1).padStart(3, '0')}`,
    Domain_Staff_Cap: staffCap,
    Domain_Use: use,
    Domain_Tel_Num: `${Math.floor(Math.random() * 9000) + 1000}`,
    Domain_Usage_Ratio: `${use}/${staffCap} = %${ratio.toFixed(2)}`
  }
})

export default function DomainPage() {
  const [data] = useState(initialData)

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Alanlar
        </h1>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Alan kayıtlarını görüntüleyin ve yönetin
        </p>
      </div>

      <DataTable 
        columns={columns} 
        initialData={data}
      />
    </div>
  )
} 