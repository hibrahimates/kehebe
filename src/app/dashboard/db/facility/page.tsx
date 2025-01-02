'use client'

import { DataTable } from '@/shared/components/ui/data-table'
import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'

type ColumnType = 'string' | 'integer' | 'float' | 'date' | 'boolean'

// Şehir listesi
const cities = [
  { City_ID: 1, City_Name: 'ADANA' },
  { City_ID: 2, City_Name: 'ADIYAMAN' },
  { City_ID: 3, City_Name: 'AFYONKARAHİSAR' },
  { City_ID: 4, City_Name: 'AĞRI' },
  { City_ID: 5, City_Name: 'AKSARAY' },
  { City_ID: 6, City_Name: 'AMASYA' },
  { City_ID: 7, City_Name: 'ANKARA' },
  { City_ID: 8, City_Name: 'ANTALYA' },
  { City_ID: 9, City_Name: 'ARDAHAN' },
  { City_ID: 10, City_Name: 'ARTVİN' },
  { City_ID: 11, City_Name: 'AYDIN' },
  { City_ID: 12, City_Name: 'BALIKESİR' },
  { City_ID: 13, City_Name: 'BARTIN' },
  { City_ID: 14, City_Name: 'BATMAN' },
  { City_ID: 15, City_Name: 'BAYBURT' },
  { City_ID: 16, City_Name: 'BİLECİK' },
  { City_ID: 17, City_Name: 'BİNGÖL' },
  { City_ID: 18, City_Name: 'BİTLİS' },
  { City_ID: 19, City_Name: 'BOLU' },
  { City_ID: 20, City_Name: 'BURDUR' },
  { City_ID: 21, City_Name: 'BURSA' },
  { City_ID: 22, City_Name: 'ÇANAKKALE' },
  { City_ID: 23, City_Name: 'ÇANKIRI' },
  { City_ID: 24, City_Name: 'ÇORUM' },
  { City_ID: 25, City_Name: 'DENİZLİ' },
  { City_ID: 26, City_Name: 'DİYARBAKIR' },
  { City_ID: 27, City_Name: 'DÜZCE' },
  { City_ID: 28, City_Name: 'EDİRNE' },
  { City_ID: 29, City_Name: 'ELAZIĞ' },
  { City_ID: 30, City_Name: 'ERZİNCAN' },
  { City_ID: 31, City_Name: 'ERZURUM' },
  { City_ID: 32, City_Name: 'ESKİŞEHİR' },
  { City_ID: 33, City_Name: 'GAZİANTEP' },
  { City_ID: 34, City_Name: 'GİRESUN' },
  { City_ID: 35, City_Name: 'GÜMÜŞHANE' },
  { City_ID: 36, City_Name: 'HAKKARİ' },
  { City_ID: 37, City_Name: 'HATAY' },
  { City_ID: 38, City_Name: 'IĞDIR' },
  { City_ID: 39, City_Name: 'ISPARTA' },
  { City_ID: 40, City_Name: 'İSTANBUL' },
  { City_ID: 41, City_Name: 'İZMİR' },
  { City_ID: 42, City_Name: 'KAHRAMANMARAŞ' },
  { City_ID: 43, City_Name: 'KARABÜK' },
  { City_ID: 44, City_Name: 'KARAMAN' },
  { City_ID: 45, City_Name: 'KARS' },
  { City_ID: 46, City_Name: 'KASTAMONU' },
  { City_ID: 47, City_Name: 'KAYSERİ' },
  { City_ID: 48, City_Name: 'KIRIKKALE' },
  { City_ID: 49, City_Name: 'KIRKLARELİ' },
  { City_ID: 50, City_Name: 'KIRŞEHİR' },
  { City_ID: 51, City_Name: 'KİLİS' },
  { City_ID: 52, City_Name: 'KOCAELİ' },
  { City_ID: 53, City_Name: 'KONYA' },
  { City_ID: 54, City_Name: 'KÜTAHYA' },
  { City_ID: 55, City_Name: 'MALATYA' },
  { City_ID: 56, City_Name: 'MANİSA' },
  { City_ID: 57, City_Name: 'MARDİN' },
  { City_ID: 58, City_Name: 'MERSİN' },
  { City_ID: 59, City_Name: 'MUĞLA' },
  { City_ID: 60, City_Name: 'MUŞ' },
  { City_ID: 61, City_Name: 'NEVŞEHİR' },
  { City_ID: 62, City_Name: 'NİĞDE' },
  { City_ID: 63, City_Name: 'ORDU' },
  { City_ID: 64, City_Name: 'OSMANİYE' },
  { City_ID: 65, City_Name: 'RİZE' },
  { City_ID: 66, City_Name: 'SAKARYA' },
  { City_ID: 67, City_Name: 'SAMSUN' },
  { City_ID: 68, City_Name: 'SİİRT' },
  { City_ID: 69, City_Name: 'SİNOP' },
  { City_ID: 70, City_Name: 'SİVAS' },
  { City_ID: 71, City_Name: 'ŞANLIURFA' },
  { City_ID: 72, City_Name: 'ŞIRNAK' },
  { City_ID: 73, City_Name: 'TEKİRDAĞ' },
  { City_ID: 74, City_Name: 'TOKAT' },
  { City_ID: 75, City_Name: 'TRABZON' },
  { City_ID: 76, City_Name: 'TUNCELİ' },
  { City_ID: 77, City_Name: 'UŞAK' },
  { City_ID: 78, City_Name: 'VAN' },
  { City_ID: 79, City_Name: 'YALOVA' },
  { City_ID: 80, City_Name: 'YOZGAT' },
  { City_ID: 81, City_Name: 'ZONGULDAK' }
]

const columns: { key: string; title: string; type: ColumnType }[] = [
  { key: 'id', title: 'ID', type: 'integer' },
  { key: 'Fac_Name', title: 'Tesis Adı', type: 'string' },
  { 
    key: 'City_Name', 
    title: 'Bulunduğu İl', 
    type: 'string',
    cell: ({ row, getValue, setValue }) => (
      <Select
        value={getValue() as string}
        onValueChange={(value) => setValue(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Şehir seçiniz" />
        </SelectTrigger>
        <SelectContent>
          {cities.map((city) => (
            <SelectItem key={city.City_ID} value={city.City_Name}>
              {city.City_Name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }
]

const initialData = [
  { id: 1, Fac_Name: 'Tesis 1', City_Name: 'ANKARA' },
  { id: 2, Fac_Name: 'Tesis 2', City_Name: 'ANKARA' },
  { id: 3, Fac_Name: 'Tesis 3', City_Name: 'KIRIKKALE' },
  { id: 4, Fac_Name: 'Tesis 4', City_Name: 'YOZGAT' },
  { id: 5, Fac_Name: 'Tesis 5', City_Name: 'SAMSUN' },
  { id: 6, Fac_Name: 'Tesis 6', City_Name: 'AĞRI' },
  { id: 7, Fac_Name: 'Tesis 7', City_Name: 'İSTANBUL' },
  { id: 8, Fac_Name: 'Tesis 8', City_Name: 'MERSİN' },
  { id: 9, Fac_Name: 'Tesis 9', City_Name: 'ORDU' },
  { id: 10, Fac_Name: 'Tesis 10', City_Name: 'BURSA' },
  { id: 11, Fac_Name: 'Tesis 11', City_Name: 'HATAY' },
  { id: 12, Fac_Name: 'Tesis 12', City_Name: 'ANKARA' },
  { id: 13, Fac_Name: 'Tesis 13', City_Name: 'KÜTAHYA' },
  { id: 14, Fac_Name: 'Tesis 14', City_Name: 'AKSARAY' },
]

export default function FacilityPage() {
  const [data, setData] = useState(initialData)

  const handleSubmit = (formData: any, isEdit: boolean) => {
    if (isEdit) {
      const updatedData = data.map(item => 
        item.id === formData.id ? formData : item
      )
      setData(updatedData)
    } else {
      const newId = Math.max(...data.map(item => item.id)) + 1
      setData([...data, { id: newId, ...formData }])
    }
  }

  const handleDelete = (id: number) => {
    const updatedData = data.filter(item => item.id !== id)
    setData(updatedData)
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Facility
        </h1>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Tesis kayıtlarını görüntüleyin ve yönetin
        </p>
      </div>

      <DataTable 
        columns={columns} 
        initialData={data} 
        searchKey="Fac_Name"
        onSubmit={handleSubmit}
        onDelete={handleDelete}
      />
    </div>
  )
} 