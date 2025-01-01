import { create } from 'zustand'

interface Contact {
  Contact_ID: number
  Contact_Name: string
  Contact_Title: string
  Contact_Phone: string
  Contact_Email: string
  Contact_Company: string
  Contact_Department: string
}

interface ContactStore {
  contacts: Contact[]
  addContact: (contact: Omit<Contact, 'Contact_ID'>) => void
  updateContact: (contact: Contact) => void
  deleteContact: (id: number) => boolean
  getContactOptions: () => { value: string; label: string }[]
}

const initialContacts: Contact[] = [
  {
    Contact_ID: 1,
    Contact_Name: 'Ahmet Yılmaz',
    Contact_Title: 'Proje Müdürü',
    Contact_Phone: '0532 111 2233',
    Contact_Email: 'ahmet.yilmaz@example.com',
    Contact_Company: 'ABT',
    Contact_Department: 'Proje Yönetimi'
  },
  {
    Contact_ID: 2,
    Contact_Name: 'Mehmet Demir',
    Contact_Title: 'Saha Mühendisi',
    Contact_Phone: '0533 222 3344',
    Contact_Email: 'mehmet.demir@example.com',
    Contact_Company: 'TEKFEN',
    Contact_Department: 'Saha Operasyonları'
  },
  {
    Contact_ID: 3,
    Contact_Name: 'Ayşe Kaya',
    Contact_Title: 'İK Müdürü',
    Contact_Phone: '0534 333 4455',
    Contact_Email: 'ayse.kaya@example.com',
    Contact_Company: 'GAMA',
    Contact_Department: 'İnsan Kaynakları'
  }
]

export const useContactStore = create<ContactStore>((set, get) => ({
  contacts: initialContacts,

  addContact: (contact) => {
    set((state) => {
      const newId = Math.max(...state.contacts.map(c => c.Contact_ID)) + 1
      return {
        contacts: [...state.contacts, { ...contact, Contact_ID: newId }]
      }
    })
  },

  updateContact: (contact) => {
    set((state) => ({
      contacts: state.contacts.map(c => 
        c.Contact_ID === contact.Contact_ID ? contact : c
      )
    }))
  },

  deleteContact: (id) => {
    set((state) => ({
      contacts: state.contacts.filter(c => c.Contact_ID !== id)
    }))
    return true
  },

  getContactOptions: () => {
    const { contacts } = get()
    return contacts.map(contact => ({
      value: contact.Contact_ID.toString(),
      label: `${contact.Contact_Name} (${contact.Contact_Title})`
    }))
  }
})) 