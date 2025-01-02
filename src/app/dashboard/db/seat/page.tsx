'use client'

import { DataTable } from '@/shared/components/ui/data-table'
import { useState } from 'react'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'

type ColumnType = 'string' | 'integer' | 'float' | 'date' | 'boolean'

const rsPersonnel = [
  { id: 1, fullName: 'Ahmet Rıza', regNum: '18654' },
  { id: 2, fullName: 'Mehmet Cavid', regNum: '18655' },
  { id: 3, fullName: 'Hüseyin Hilmi', regNum: '18656' },
  { id: 4, fullName: 'Enver Paşa', regNum: '18657' },
  { id: 5, fullName: 'Talat Paşa', regNum: '18658' }
]

const columns: { key: string; title: string; type: ColumnType }[] = [
  { key: 'id', title: 'ID', type: 'integer' },
  { key: 'Domain_Code', title: 'Alan Kodu', type: 'string' },
  { 
    key: 'RS_Contact', 
    title: 'RS İletişim', 
    type: 'string',
    cell: ({ row }) => (
      <Select defaultValue={row.getValue('RS_Contact')}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="RS Seçiniz" />
        </SelectTrigger>
        <SelectContent>
          {rsPersonnel.map((person) => (
            <SelectItem key={person.id} value={person.regNum}>
              {person.fullName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  },
  { key: 'Seat_Tel_Num', title: 'Telefon No', type: 'string' },
  { 
    key: 'Seat_Usage', 
    title: 'Kullanım Durumu', 
    type: 'boolean',
    cell: ({ row }) => (
      <Checkbox 
        checked={row.getValue('Seat_Usage') === 'DOĞRU'} 
        onCheckedChange={(checked) => {
          row.setValue('Seat_Usage', checked ? 'DOĞRU' : 'YANLIŞ')
        }}
      />
    )
  },
]

const initialData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  Domain_Code: Math.floor(Math.random() * 400) + 1,
  RS_Contact: Math.floor(Math.random() * 10000) + 1000,
  Seat_Tel_Num: Math.floor(Math.random() * 10000) + 1000,
  Seat_Usage: Math.random() > 0.2 ? 'DOĞRU' : 'YANLIŞ'
}))

export default function SeatPage() {
  const [data] = useState(initialData)

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Seat
        </h1>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Koltuk bilgilerini görüntüleyin ve yönetin
        </p>
      </div>

      <DataTable 
        columns={columns} 
        initialData={data} 
        searchKey="Domain_Code"
      />
    </div>
  )
} 