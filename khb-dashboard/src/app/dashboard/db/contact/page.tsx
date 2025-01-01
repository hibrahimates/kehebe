'use client'

import { DataTable } from '@/shared/components/ui/data-table'
import { useContactStore } from '@/features/contacts/store'
import { useContractorStore } from '@/features/contractors/store'

type ColumnType = 'string' | 'integer' | 'float' | 'date' | 'boolean' | 'select'

const columns: { key: string; title: string; type: ColumnType; options?: { value: string; label: string }[] }[] = [
  { key: 'Contact_ID', title: 'İletişim ID', type: 'integer' },
  { key: 'Contact_Name', title: 'Ad Soyad', type: 'string' },
  { key: 'Contact_Title', title: 'Ünvan', type: 'string' },
  { key: 'Contact_Phone', title: 'Telefon', type: 'string' },
  { key: 'Contact_Email', title: 'E-posta', type: 'string' },
  { 
    key: 'Contact_Company', 
    title: 'Firma', 
    type: 'select',
    options: [] // Bu kısım useEffect ile doldurulacak
  },
  { key: 'Contact_Department', title: 'Departman', type: 'string' },
]

export default function ContactPage() {
  const { 
    contacts, 
    addContact, 
    updateContact, 
    deleteContact 
  } = useContactStore()

  const { contractors } = useContractorStore()

  // Contractor seçeneklerini columns'a ekle
  columns[5].options = contractors.map(contractor => ({
    value: contractor.Contractor_Code,
    label: `${contractor.Contractor_Name} (${contractor.Contractor_Code})`
  }))

  const handleSubmit = (formData: any, isEdit: boolean) => {
    if (isEdit) {
      updateContact(formData)
    } else {
      addContact({
        Contact_Name: formData.Contact_Name,
        Contact_Title: formData.Contact_Title,
        Contact_Phone: formData.Contact_Phone,
        Contact_Email: formData.Contact_Email,
        Contact_Company: formData.Contact_Company,
        Contact_Department: formData.Contact_Department
      })
    }
  }

  // Görüntüleme için firma kodlarını firma isimleriyle değiştir
  const displayData = contacts.map(contact => {
    const contractor = contractors.find(c => c.Contractor_Code === contact.Contact_Company)
    return {
      ...contact,
      Contact_Company: contractor ? `${contractor.Contractor_Name} (${contractor.Contractor_Code})` : contact.Contact_Company
    }
  })

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
        initialData={displayData}
        onDelete={deleteContact}
        onSubmit={handleSubmit}
      />
    </div>
  )
} 