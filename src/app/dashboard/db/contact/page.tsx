'use client'

import { DataTable } from '@/shared/components/ui/data-table'
import { useState } from 'react'

type ColumnType = 'string' | 'integer' | 'float' | 'date' | 'boolean'

const columns: { key: string; title: string; type: ColumnType }[] = [
  { key: 'id', title: 'ID', type: 'integer' },
  { key: 'Contact_Name', title: 'İletişim Adı', type: 'string' },
  { key: 'Company_Name', title: 'Şirket', type: 'string' },
  { key: 'Phone', title: 'Telefon', type: 'string' },
  { key: 'Email', title: 'E-posta', type: 'string' },
  { key: 'Department', title: 'Departman', type: 'string' }
]

const companies = [
  'Aselsan', 'Türk Hava Yolları', 'Koç Holding', 'Sabancı Holding', 'Tüpraş',
  'Ereğli Demir Çelik', 'Ford Otosan', 'Garanti BBVA', 'Akbank', 'İş Bankası',
  'Turkcell', 'BİM', 'Yapı Kredi', 'Tofaş', 'Arçelik',
  'Şişe Cam', 'Migros', 'Tekfen Holding', 'TAV Havalimanları', 'Enka İnşaat',
  'Kardemir', 'Ülker', 'Vestel', 'Doğuş Otomotiv', 'Petkim',
  'Türk Telekom', 'Pegasus', 'Koza Altın', 'Anadolu Efes', 'Coca Cola İçecek',
  'Kordsa', 'Zorlu Enerji', 'Aksa Enerji', 'Alarko Holding', 'Aygaz',
  'Çimsa', 'Soda Sanayii', 'Kartonsan', 'Logo Yazılım', 'Netaş'
]

const departments = [
  'Yönetim Kurulu', 'Genel Müdürlük', 'Finans', 'İnsan Kaynakları', 'Operasyon',
  'Satış', 'Pazarlama', 'Bilgi Teknolojileri', 'Hukuk', 'İdari İşler'
]

const initialData = Array.from({ length: 100 }, (_, i) => {
  const company = companies[Math.floor(Math.random() * companies.length)]
  const department = departments[Math.floor(Math.random() * departments.length)]
  const companyCode = company.toLowerCase().replace(/\s+/g, '')
  
  return {
    id: i + 1,
    Contact_Name: `${company} ${department} Yetkilisi`,
    Company_Name: company,
    Phone: `+90 ${Math.floor(Math.random() * 1000).toString().padStart(3, '0')} ${Math.floor(Math.random() * 1000).toString().padStart(3, '0')} ${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
    Email: `contact@${companyCode}.com.tr`,
    Department: department
  }
})

export default function ContactPage() {
  const [data] = useState(initialData)

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          İletişim Kişileri
        </h1>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          İletişim kişilerini görüntüleyin ve yönetin
        </p>
      </div>

      <DataTable 
        columns={columns} 
        initialData={data}
        searchKey="Contact_Name"
      />
    </div>
  )
} 