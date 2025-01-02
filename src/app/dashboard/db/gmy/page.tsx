'use client'

import { DataTable } from '@/shared/components/ui/data-table'
import { useState } from 'react'

type ColumnType = 'string' | 'integer' | 'float' | 'date' | 'boolean'

const columns: { key: string; title: string; type: ColumnType }[] = [
  { key: 'id', title: 'ID', type: 'integer' },
  { key: 'GMY_Code', title: 'GMY Kodu', type: 'string' },
  { key: 'GMY_Desc', title: 'Görev Tanımı', type: 'string' },
]

const initialData = [
  { 
    id: 1, 
    GMY_Code: 'GMY 1',
    GMY_Desc: 'XYZ İşlerine bakan GMY'
  },
  { 
    id: 2, 
    GMY_Code: 'GMY 2',
    GMY_Desc: 'ABC işlerine bakan GMY'
  },
  { 
    id: 3, 
    GMY_Code: 'GMY 3',
    GMY_Desc: 'Operasyon ve Teknik İşler GMY'
  },
  { 
    id: 4, 
    GMY_Code: 'GMY 4',
    GMY_Desc: 'Mali İşler ve Finans GMY'
  },
  { 
    id: 5, 
    GMY_Code: 'GMY 5',
    GMY_Desc: 'İnsan Kaynakları ve İdari İşler GMY'
  },
  { 
    id: 6, 
    GMY_Code: 'GMY 6',
    GMY_Desc: 'Strateji ve İş Geliştirme GMY'
  },
  { 
    id: 7, 
    GMY_Code: 'GMY 7',
    GMY_Desc: 'Bilgi Teknolojileri GMY'
  },
  { 
    id: 8, 
    GMY_Code: 'GMY 8',
    GMY_Desc: 'Kurumsal İletişim ve Pazarlama GMY'
  }
]

export default function GmyPage() {
  const [data] = useState(initialData)

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          GMY
        </h1>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Genel Müdür Yardımcıları bilgilerini görüntüleyin ve yönetin
        </p>
      </div>

      <DataTable 
        columns={columns} 
        initialData={data} 
        searchKey="GMY_Code"
      />
    </div>
  )
} 