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

const initialData = Array.from({ length: 100 }, (_, i) => {
  const buildingTypes = ['Üretim', 'Ofis', 'Altyapı', 'Depo', 'Sosyal']
  const facilities = ['Ankara Merkez', 'İstanbul Avrupa', 'İstanbul Anadolu', 'İzmir Merkez', 'Bursa OSB', 'Antalya Merkez']
  const users = ['GMY 1', 'GMY 2', 'GMY 3', 'GMY 4', 'GMY 5']
  const rsContacts = [
    'Ahmet Rıza', 'Mehmet Cavid', 'Hüseyin Hilmi', 'Enver Paşa', 'Talat Paşa',
    'Cemal Paşa', 'Abdullah Cevdet', 'İsmail Enver', 'Hüseyin Avni', 'Ali Fethi'
  ]
  const tpContacts = [
    'Halil Menteşe', 'Rıza Nur', 'Mahmud Şevket', 'Mehmet Arif', 'Naci Kaşif',
    'Abdurrahman Şeref', 'Mehmet Ali', 'Sadık Bey', 'Hasan Tahsin', 'Mustafa Fazıl'
  ]

  const buildingType = buildingTypes[Math.floor(Math.random() * buildingTypes.length)]
  const facility = facilities[Math.floor(Math.random() * facilities.length)]
  const user = users[Math.floor(Math.random() * users.length)]
  const rsContact = rsContacts[Math.floor(Math.random() * rsContacts.length)]
  const tpContact = tpContacts[Math.floor(Math.random() * tpContacts.length)]
  
  // Rastgele tarih oluştur (son 5 yıl içinde)
  const date = new Date()
  date.setFullYear(date.getFullYear() - Math.floor(Math.random() * 5))
  date.setMonth(Math.floor(Math.random() * 12))
  date.setDate(Math.floor(Math.random() * 28) + 1)
  
  return {
    Building_ID: i + 1,
    Building_Name: `${facility} - ${String.fromCharCode(65 + (i % 26))} Blok`,
    Building_Code: `B${(i + 1).toString().padStart(3, '0')}`,
    NB_Code: `NB${(i + 1).toString().padStart(3, '0')}`,
    m2: Math.floor(Math.random() * 5000) + 500 + Math.random().toFixed(2),
    Building_Type: buildingType,
    Fac_Name: facility,
    Contract_Code: `CNT${(i + 1).toString().padStart(3, '0')}`,
    User_Code: user,
    RS_Contact: rsContact,
    Op_Date: date.toISOString().split('T')[0],
    Ex: Math.random() > 0.7,
    Comment: `${facility} ${buildingType} binası`,
    TP_Contact: tpContact,
    As_Built: Math.random() > 0.5
  }
}) 