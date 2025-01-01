'use client'

import { DataTable } from '@/shared/components/ui/data-table'
import { useDomainStore, domainTypes } from '@/features/domains/store'

type ColumnType = 'string' | 'integer' | 'float' | 'date' | 'boolean' | 'select'

const columns: { key: string; title: string; type: ColumnType; options?: { value: string; label: string }[]; editable?: boolean }[] = [
  { key: 'Domain_ID', title: 'ID', type: 'integer' },
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

export default function DomainPage() {
  const { 
    domains, 
    addDomain, 
    updateDomain, 
    deleteDomain 
  } = useDomainStore()

  const calculateUsageRatio = (use: number, capacity: number): string => {
    if (capacity === 0) return '-'
    const ratio = (use / capacity) * 100
    return `${use}/${capacity} = %${ratio.toFixed(2)}`
  }

  const handleSubmit = (formData: any, isEdit: boolean) => {
    const staffCap = parseInt(formData.Domain_Staff_Cap) || 0
    const use = parseInt(formData.Domain_Use) || 0
    
    const domainData = {
      Building_Code: formData.Building_Code,
      Floor_Code: formData.Floor_Code,
      Domain_Type: formData.Domain_Type,
      Domain_Name: formData.Domain_Name,
      Domain_Code: formData.Domain_Code,
      Domain_Area: parseFloat(formData.Domain_Area),
      RS_Contact: formData.RS_Contact,
      Domain_Staff_Cap: staffCap,
      Domain_Use: use,
      Domain_Usage_Ratio: calculateUsageRatio(use, staffCap),
      Domain_Tel_Num: formData.Domain_Tel_Num
    }

    if (isEdit) {
      updateDomain({ ...domainData, Domain_ID: formData.Domain_ID })
    } else {
      addDomain(domainData)
    }
  }

  // Görüntüleme için domain tiplerini açıklamalarıyla değiştir ve kullanım oranını hesapla
  const displayData = domains.map(domain => {
    const domainType = domainTypes.find(t => t.value === domain.Domain_Type)
    return {
      ...domain,
      Domain_Type: domainType ? domainType.label : domain.Domain_Type,
      Domain_Usage_Ratio: calculateUsageRatio(domain.Domain_Use, domain.Domain_Staff_Cap)
    }
  })

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
        initialData={displayData}
        onDelete={deleteDomain}
        onSubmit={handleSubmit}
      />
    </div>
  )
} 