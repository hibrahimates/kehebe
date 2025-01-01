'use client'

import { DataTable } from '@/shared/components/ui/data-table'
import { useCityStore } from '@/features/cities/store'

type ColumnType = 'string' | 'integer' | 'float' | 'date' | 'boolean'

const columns: { key: string; title: string; type: ColumnType }[] = [
  { key: 'City_ID', title: 'Şehir ID', type: 'integer' },
  { key: 'City_Name', title: 'Şehir Adı', type: 'string' },
  { key: 'State_Name', title: 'Ülke', type: 'string' },
]

export default function CityPage() {
  const { 
    cities, 
    addCity, 
    updateCity, 
    deleteCity 
  } = useCityStore()

  const handleSubmit = (formData: any, isEdit: boolean) => {
    if (isEdit) {
      updateCity(formData)
    } else {
      addCity({
        City_Name: formData.City_Name,
        State_Name: formData.State_Name
      })
    }
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Şehirler
        </h1>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Şehir kayıtlarını görüntüleyin ve yönetin
        </p>
      </div>

      <DataTable 
        columns={columns} 
        initialData={cities}
        onDelete={deleteCity}
        onSubmit={handleSubmit}
      />
    </div>
  )
} 