'use client'

import { DataTable } from '@/shared/components/ui/data-table'
import { useState } from 'react'

type ColumnType = 'string' | 'integer' | 'float' | 'date' | 'boolean'

const columns: { key: string; title: string; type: ColumnType }[] = [
  { key: 'id', title: 'ID', type: 'integer' },
  { key: 'Domain_Type', title: 'Domain Type', type: 'string' },
  { key: 'Domain_Type_Code', title: 'Kod', type: 'string' },
  { key: 'Domain_Def', title: 'Açıklama', type: 'string' },
]

const initialData = [
  { id: 1, Domain_Type: 'Ofis', Domain_Type_Code: 'O', Domain_Def: 'Ofis alanını ifade eder.' },
  { id: 2, Domain_Type: 'Toplantı Odası', Domain_Type_Code: 'TO', Domain_Def: 'Toplantı alanlarını ifade eder.' },
  { id: 3, Domain_Type: 'Makam Odası', Domain_Type_Code: 'MO', Domain_Def: 'Makam odalarını ifade eder.' },
  { id: 4, Domain_Type: 'Teknik Alan', Domain_Type_Code: 'TH', Domain_Def: 'Isı merkezi, trafo, bilgi işlem vb. odalarını ifade eder.' },
  { id: 5, Domain_Type: 'Üretim Alanı', Domain_Type_Code: 'U', Domain_Def: 'İmalat alanlarını ifade eder.' },
  { id: 6, Domain_Type: 'Sosyal Alan', Domain_Type_Code: 'S', Domain_Def: 'Yemekhane, spor vb. alanları ifade eder.' },
  { id: 7, Domain_Type: 'Koridor', Domain_Type_Code: 'K', Domain_Def: 'Mahalleri bağlayan geçiş alanlarını ifade eder.' },
  { id: 8, Domain_Type: 'Islak Hacim', Domain_Type_Code: 'IH', Domain_Def: 'WC, banyo, temizlik odası vb.' },
  { id: 9, Domain_Type: 'Depo', Domain_Type_Code: 'D', Domain_Def: 'Depo hacimlerini ifade eder.' },
  { id: 10, Domain_Type: 'Yardımcı Hacim', Domain_Type_Code: 'YH', Domain_Def: 'Yardımcı hacimleri ifade eder.' },
  { id: 11, Domain_Type: 'Arşiv', Domain_Type_Code: 'A', Domain_Def: 'Arşiv yapılan alanları ifade eder.' },
  { id: 12, Domain_Type: 'Uzaktan Komuta', Domain_Type_Code: 'UK', Domain_Def: 'Uzaktan komuta yapılan alanları ifade eder.' },
]

export default function DomainTypePage() {
  const [data] = useState(initialData)

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Domain_Type
        </h1>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Alan tiplerini görüntüleyin ve yönetin
        </p>
      </div>

      <DataTable 
        columns={columns} 
        initialData={data} 
        searchKey="Domain_Type"
      />
    </div>
  )
} 