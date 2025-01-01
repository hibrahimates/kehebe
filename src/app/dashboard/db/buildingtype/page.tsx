'use client'

import { DataTable } from '@/shared/components/ui/data-table'
import { useBuildingTypeStore } from '@/features/buildingTypes/store'

type ColumnType = 'string' | 'integer' | 'float' | 'date' | 'boolean'

const columns: { key: string; title: string; type: ColumnType }[] = [
  { key: 'BuildingType_ID', title: 'Bina Tipi ID', type: 'integer' },
  { key: 'BuildingType_Name', title: 'Bina Tipi Adı', type: 'string' },
  { key: 'Description', title: 'Açıklama', type: 'string' },
]

export default function BuildingTypePage() {
  const { 
    buildingTypes, 
    isBuildingTypeInUse, 
    addBuildingType, 
    updateBuildingType, 
    deleteBuildingType 
  } = useBuildingTypeStore()

  const handleDelete = (row: any) => {
    if (isBuildingTypeInUse(row.BuildingType_ID)) {
      alert(`"${row.BuildingType_Name}" bina tipi kullanımda olduğu için silinemez!`)
      return false
    }
    return deleteBuildingType(row.BuildingType_ID)
  }

  const handleSubmit = (formData: any, isEdit: boolean) => {
    if (isEdit) {
      updateBuildingType(formData)
    } else {
      addBuildingType({
        BuildingType_Name: formData.BuildingType_Name,
        Description: formData.Description
      })
    }
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Bina Tipleri
        </h1>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Bina tipi kayıtlarını görüntüleyin ve yönetin
        </p>
      </div>

      <DataTable 
        columns={columns} 
        initialData={buildingTypes}
        onDelete={handleDelete}
        onSubmit={handleSubmit}
      />
    </div>
  )
} 