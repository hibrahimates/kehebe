'use client'

import { DataTable } from '@/shared/components/ui/data-table'
import { useContractorStore } from '@/features/contractors/store'

type ColumnType = 'string' | 'integer' | 'float' | 'date' | 'boolean'

const columns: { key: string; title: string; type: ColumnType }[] = [
  { key: 'Contractor_ID', title: 'Yüklenici ID', type: 'integer' },
  { key: 'Contractor_Name', title: 'Yüklenici Adı', type: 'string' },
  { key: 'Contractor_Code', title: 'Yüklenici Kodu', type: 'string' },
]

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