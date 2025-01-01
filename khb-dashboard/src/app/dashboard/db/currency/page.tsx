'use client'

import { DataTable } from '@/shared/components/ui/data-table'
import { useCurrencyStore } from '@/features/currencies/store'

type ColumnType = 'string' | 'integer' | 'float' | 'date' | 'boolean'

const columns: { key: string; title: string; type: ColumnType }[] = [
  { key: 'Currency_ID', title: 'Para Birimi ID', type: 'integer' },
  { key: 'Currency_Code', title: 'Para Birimi Kodu', type: 'string' },
  { key: 'Currency_Name', title: 'Para Birimi Adı', type: 'string' },
  { key: 'Currency_Symbol', title: 'Sembol', type: 'string' },
]

export default function CurrencyPage() {
  const { 
    currencies, 
    addCurrency, 
    updateCurrency, 
    deleteCurrency 
  } = useCurrencyStore()

  const handleSubmit = (formData: any, isEdit: boolean) => {
    if (isEdit) {
      updateCurrency(formData)
    } else {
      addCurrency({
        Currency_Code: formData.Currency_Code,
        Currency_Name: formData.Currency_Name,
        Currency_Symbol: formData.Currency_Symbol
      })
    }
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Para Birimleri
        </h1>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Para birimi kayıtlarını görüntüleyin ve yönetin
        </p>
      </div>

      <DataTable 
        columns={columns} 
        initialData={currencies}
        onDelete={deleteCurrency}
        onSubmit={handleSubmit}
      />
    </div>
  )
} 