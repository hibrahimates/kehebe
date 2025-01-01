'use client'

import { useState, useEffect } from 'react'
import { DataTable } from '@/shared/components/ui/data-table'
import { useBuildingTypeStore } from '@/features/buildingTypes/store'

type ColumnType = 'string' | 'integer' | 'float' | 'date' | 'boolean' | 'select'

interface Column {
  key: string
  title: string
  type: ColumnType
  options?: { value: string; label: string }[]
}

export default function BuildingPage() {
  const { getBuildingTypeOptions, setUsedBuildingTypes } = useBuildingTypeStore()
  const [buildingData, setBuildingData] = useState(initialData)

  const columns: Column[] = [
    { key: 'Building_ID', title: 'Bina ID', type: 'integer' },
    { key: 'Building_Name', title: 'Bina Adı', type: 'string' },
    { key: 'Building_Code', title: 'Bina Kodu', type: 'string' },
    { key: 'NB_Code', title: 'NB Kodu', type: 'string' },
    { key: 'm2', title: 'm²', type: 'float' },
    { 
      key: 'Building_Type', 
      title: 'Bina Tipi', 
      type: 'select',
      options: getBuildingTypeOptions()
    },
    { key: 'Fac_Name', title: 'Tesis Adı', type: 'string' },
    { key: 'Contract_Code', title: 'Sözleşme Kodu', type: 'string' },
    { key: 'User_Code', title: 'Kullanıcı Kodu', type: 'string' },
    { key: 'RS_Contact', title: 'RS İletişim', type: 'string' },
    { key: 'Op_Date', title: 'Operasyon Tarihi', type: 'date' },
    { key: 'Ex', title: 'Ex', type: 'boolean' },
    { key: 'Comment', title: 'Açıklama', type: 'string' },
    { key: 'TP_Contact', title: 'TP İletişim', type: 'string' },
    { key: 'As_Built', title: 'As Built', type: 'boolean' },
  ]

  useEffect(() => {
    // Update the used building types in the store
    const usedTypes = buildingData.map(building => building.Building_Type)
    setUsedBuildingTypes(usedTypes)
  }, [buildingData, setUsedBuildingTypes])

  const handleSubmit = (formData: any, isEdit: boolean) => {
    if (isEdit) {
      setBuildingData(prev => prev.map(item => 
        item.Building_ID === formData.Building_ID ? formData : item
      ))
    } else {
      const newId = Math.max(...buildingData.map(b => b.Building_ID)) + 1
      setBuildingData(prev => [...prev, { ...formData, Building_ID: newId }])
    }
  }

  const handleDelete = (row: any) => {
    setBuildingData(prev => prev.filter(item => item.Building_ID !== row.Building_ID))
    return true
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Binalar
        </h1>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Bina kayıtlarını görüntüleyin ve yönetin
        </p>
      </div>

      <DataTable 
        columns={columns} 
        initialData={buildingData}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
      />
    </div>
  )
}

const initialData = [
  {
    Building_ID: 1,
    Building_Name: 'A Blok',
    Building_Code: 'A001',
    NB_Code: 'NB001',
    m2: 1500.50,
    Building_Type: 'Ofis',
    Fac_Name: 'Merkez Kampüs',
    Contract_Code: 'CNT001',
    User_Code: 'USR001',
    RS_Contact: 'John Doe',
    Op_Date: '2023-01-01',
    Ex: true,
    Comment: 'Test açıklama',
    TP_Contact: 'Jane Smith',
    As_Built: false,
  },
  {
    Building_ID: 2,
    Building_Name: 'B Blok',
    Building_Code: 'B001',
    NB_Code: 'NB002',
    m2: 2000.75,
    Building_Type: 'Depo',
    Fac_Name: 'Lojistik Merkezi',
    Contract_Code: 'CNT002',
    User_Code: 'USR002',
    RS_Contact: 'Alice Johnson',
    Op_Date: '2023-02-15',
    Ex: false,
    Comment: 'İkinci test açıklama',
    TP_Contact: 'Bob Wilson',
    As_Built: true,
  },
] 