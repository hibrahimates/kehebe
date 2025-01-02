'use client'

import { DataTable } from '@/shared/components/ui/data-table'
import { useState } from 'react'

type ColumnType = 'string' | 'integer' | 'float' | 'date' | 'boolean'

const columns: { key: string; title: string; type: ColumnType }[] = [
  { key: 'id', title: 'ID', type: 'integer' },
  { key: 'RS_Name', title: 'Ad', type: 'string' },
  { key: 'RS_Surname', title: 'Soyad', type: 'string' },
  { key: 'RS_Reg_Num', title: 'Sicil No', type: 'string' },
]

const initialData = [
  { id: 1, RS_Name: 'Ahmet', RS_Surname: 'Rıza', RS_Reg_Num: '18654' },
  { id: 2, RS_Name: 'Mehmet', RS_Surname: 'Cavid', RS_Reg_Num: '18655' },
  { id: 3, RS_Name: 'Hüseyin', RS_Surname: 'Hilmi', RS_Reg_Num: '18656' },
  { id: 4, RS_Name: 'Enver', RS_Surname: 'Paşa', RS_Reg_Num: '18657' },
  { id: 5, RS_Name: 'Talat', RS_Surname: 'Paşa', RS_Reg_Num: '18658' },
  { id: 6, RS_Name: 'Cemal', RS_Surname: 'Paşa', RS_Reg_Num: '18659' },
  { id: 7, RS_Name: 'Abdullah', RS_Surname: 'Cevdet', RS_Reg_Num: '18660' },
  { id: 8, RS_Name: 'İsmail', RS_Surname: 'Enver', RS_Reg_Num: '18661' },
  { id: 9, RS_Name: 'Hüseyin', RS_Surname: 'Avni', RS_Reg_Num: '18662' },
  { id: 10, RS_Name: 'Ali', RS_Surname: 'Fethi', RS_Reg_Num: '18663' },
  { id: 11, RS_Name: 'Halil', RS_Surname: 'Menteşe', RS_Reg_Num: '18664' },
  { id: 12, RS_Name: 'Rıza', RS_Surname: 'Nur', RS_Reg_Num: '18665' },
  { id: 13, RS_Name: 'Mahmud', RS_Surname: 'Şevket', RS_Reg_Num: '18666' },
  { id: 14, RS_Name: 'Mehmet', RS_Surname: 'Arif', RS_Reg_Num: '18667' },
  { id: 15, RS_Name: 'Naci', RS_Surname: 'Kaşif', RS_Reg_Num: '18668' },
  { id: 16, RS_Name: 'Abdurrahman', RS_Surname: 'Şeref', RS_Reg_Num: '18669' },
  { id: 17, RS_Name: 'Mehmet', RS_Surname: 'Ali', RS_Reg_Num: '18670' },
  { id: 18, RS_Name: 'Sadık', RS_Surname: 'Bey', RS_Reg_Num: '18671' },
  { id: 19, RS_Name: 'Hasan', RS_Surname: 'Tahsin', RS_Reg_Num: '18672' },
  { id: 20, RS_Name: 'Mustafa', RS_Surname: 'Fazıl', RS_Reg_Num: '18673' },
  { id: 21, RS_Name: 'İsmail', RS_Surname: 'Hakkı', RS_Reg_Num: '18674' },
  { id: 22, RS_Name: 'Süleyman', RS_Surname: 'Askeri', RS_Reg_Num: '18675' },
  { id: 23, RS_Name: 'Ali', RS_Surname: 'İhsan', RS_Reg_Num: '18676' },
  { id: 24, RS_Name: 'Salih', RS_Surname: 'Hulusi', RS_Reg_Num: '18677' },
  { id: 25, RS_Name: 'Reşat', RS_Surname: 'Hikmet', RS_Reg_Num: '18678' },
  { id: 26, RS_Name: 'Ahmet', RS_Surname: 'Muhtar', RS_Reg_Num: '18679' },
  { id: 27, RS_Name: 'Ali', RS_Surname: 'Rıza', RS_Reg_Num: '18680' },
  { id: 28, RS_Name: 'Mehmet', RS_Surname: 'Nuri', RS_Reg_Num: '18681' },
  { id: 29, RS_Name: 'Halil', RS_Surname: 'Fikret', RS_Reg_Num: '18682' },
  { id: 30, RS_Name: 'İbrahim', RS_Surname: 'Talat', RS_Reg_Num: '18683' },
  { id: 31, RS_Name: 'Osman', RS_Surname: 'Behiç', RS_Reg_Num: '18684' },
  { id: 32, RS_Name: 'Celal', RS_Surname: 'Bay', RS_Reg_Num: '18685' },
  { id: 33, RS_Name: 'Yakup', RS_Surname: 'Cemil', RS_Reg_Num: '18686' },
  { id: 34, RS_Name: 'Selim', RS_Surname: 'Sami', RS_Reg_Num: '18687' },
  { id: 35, RS_Name: 'Kazım', RS_Surname: 'Karabekir', RS_Reg_Num: '18688' },
  { id: 36, RS_Name: 'Fethi', RS_Surname: 'Okyar', RS_Reg_Num: '18689' },
  { id: 37, RS_Name: 'Hüseyin', RS_Surname: 'Hakki', RS_Reg_Num: '18690' },
  { id: 38, RS_Name: 'Mehmet', RS_Surname: 'Fuat', RS_Reg_Num: '18691' },
  { id: 39, RS_Name: 'Şerif', RS_Surname: 'Bey', RS_Reg_Num: '18692' },
  { id: 40, RS_Name: 'İbrahim', RS_Surname: 'Ethem', RS_Reg_Num: '18693' },
  { id: 41, RS_Name: 'Abdullah', RS_Surname: 'Fuat', RS_Reg_Num: '18694' },
  { id: 42, RS_Name: 'Şükrü', RS_Surname: 'Saracoğlu', RS_Reg_Num: '18695' },
  { id: 43, RS_Name: 'Mahmut', RS_Surname: 'Esat', RS_Reg_Num: '18696' },
  { id: 44, RS_Name: 'Ahmet', RS_Surname: 'İzzet', RS_Reg_Num: '18697' },
  { id: 45, RS_Name: 'Ziya', RS_Surname: 'Gökalp', RS_Reg_Num: '18698' },
  { id: 46, RS_Name: 'Nazım', RS_Surname: 'Hikmet', RS_Reg_Num: '18699' },
  { id: 47, RS_Name: 'Hakkı', RS_Surname: 'Behiç', RS_Reg_Num: '18700' },
  { id: 48, RS_Name: 'Cemal', RS_Surname: 'Küçük', RS_Reg_Num: '18701' },
  { id: 49, RS_Name: 'Ali', RS_Surname: 'Rıza', RS_Reg_Num: '18702' },
  { id: 50, RS_Name: 'Şerif', RS_Surname: 'İsmail', RS_Reg_Num: '18703' }
]

export default function RsPage() {
  const [data] = useState(initialData)

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          RS
        </h1>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Ölçümcü bilgilerini görüntüleyin ve yönetin
        </p>
      </div>

      <DataTable 
        columns={columns} 
        initialData={data} 
        searchKey="RS_Name"
      />
    </div>
  )
} 