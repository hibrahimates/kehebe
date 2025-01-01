'use client'

import { DataTable } from '@/shared/components/ui/data-table'
import { useContractStore } from '@/features/contracts/store'
import { useContractorStore } from '@/features/contractors/store'

type ColumnType = 'string' | 'integer' | 'float' | 'date' | 'boolean' | 'select'

const columns: { key: string; title: string; type: ColumnType; options?: { value: string; label: string }[] }[] = [
  { key: 'Contract_ID', title: 'ID', type: 'integer' },
  { key: 'Contract_Code', title: 'Sözleşme Kodu', type: 'string' },
  { key: 'Contract_Date', title: 'Sözleşme Tarihi', type: 'date' },
  { key: 'Contract_Number', title: 'Sözleşme Numarası', type: 'string' },
  { 
    key: 'Contractor_Code', 
    title: 'Yüklenici', 
    type: 'select',
    options: [] // Bu kısım contractor verisiyle doldurulacak
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

export default function ContractPage() {
  const { 
    contracts, 
    addContract, 
    updateContract, 
    deleteContract 
  } = useContractStore()

  const { contractors } = useContractorStore()

  // Contractor seçeneklerini columns'a ekle
  columns[4].options = contractors.map(contractor => ({
    value: contractor.Contractor_Code,
    label: `${contractor.Contractor_Name} (${contractor.Contractor_Code})`
  }))

  const handleSubmit = (formData: any, isEdit: boolean) => {
    if (isEdit) {
      updateContract(formData)
    } else {
      addContract({
        Contract_Code: formData.Contract_Code,
        Contract_Date: formData.Contract_Date,
        Contract_Number: formData.Contract_Number,
        Contractor_Code: formData.Contractor_Code,
        Contract_Duration: formData.Contract_Duration,
        Team_Members: formData.Team_Members,
        In_Charge: formData.In_Charge,
        Case_Code: formData.Case_Code,
        Current_Contract: formData.Current_Contract,
        Contract_Name: formData.Contract_Name
      })
    }
  }

  // Görüntüleme için yüklenici kodlarını firma isimleriyle değiştir
  const displayData = contracts.map(contract => {
    const contractor = contractors.find(c => c.Contractor_Code === contract.Contractor_Code)
    return {
      ...contract,
      Contractor_Code: contractor ? `${contractor.Contractor_Name} (${contractor.Contractor_Code})` : contract.Contractor_Code,
      Case_Code: columns[8].options?.find(opt => opt.value === contract.Case_Code)?.label || contract.Case_Code
    }
  })

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
        initialData={displayData}
        onDelete={deleteContract}
        onSubmit={handleSubmit}
      />
    </div>
  )
} 