'use client'

import { DataTable } from '@/shared/components/ui/data-table'
import { useContractorStore } from '@/features/contractors/store'

type ColumnType = 'string' | 'integer' | 'float' | 'date' | 'boolean'

const columns: { key: string; title: string; type: ColumnType }[] = [
  { key: 'Contractor_ID', title: 'Yüklenici ID', type: 'integer' },
  { key: 'Contractor_Name', title: 'Yüklenici Adı', type: 'string' },
  { key: 'Contractor_Code', title: 'Yüklenici Kodu', type: 'string' },
]

const companyPrefixes = ['Yıldız', 'Anadolu', 'Türk', 'Mega', 'Global', 'Ege', 'Akdeniz', 'Karadeniz', 'Marmara', 'İç Anadolu']
const companySuffixes = ['İnşaat', 'Yapı', 'Mühendislik', 'Mimarlık', 'Taahhüt', 'Proje', 'Teknik', 'Altyapı', 'Üstyapı', 'Grup']

const initialData = Array.from({ length: 100 }, (_, i) => {
  const prefix = companyPrefixes[Math.floor(Math.random() * companyPrefixes.length)]
  const suffix = companySuffixes[Math.floor(Math.random() * companySuffixes.length)]
  return {
    id: i + 1,
    Contractor_Name: `${prefix} ${suffix} A.Ş.`,
    Contractor_Code: `CONT${String(i + 1).padStart(3, '0')}`,
    Contact_Person: `Yetkili ${i + 1}`,
    Phone: `+90 ${Math.floor(Math.random() * 1000).toString().padStart(3, '0')} ${Math.floor(Math.random() * 1000).toString().padStart(3, '0')} ${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
    Email: `info@${prefix.toLowerCase()}${suffix.toLowerCase()}.com.tr`
  }
})

export default function ContractorPage() {
  const { 
    contractors, 
    addContractor, 
    updateContractor, 
    deleteContractor 
  } = useContractorStore()

  const handleSubmit = (formData: any, isEdit: boolean) => {
    if (isEdit) {
      updateContractor(formData)
    } else {
      addContractor({
        Contractor_Name: formData.Contractor_Name,
        Contractor_Code: formData.Contractor_Code
      })
    }
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Yükleniciler
        </h1>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Yüklenici kayıtlarını görüntüleyin ve yönetin
        </p>
      </div>

      <DataTable 
        columns={columns} 
        initialData={contractors}
        onDelete={deleteContractor}
        onSubmit={handleSubmit}
      />
    </div>
  )
} 