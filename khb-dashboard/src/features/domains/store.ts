import { create } from 'zustand'

interface Domain {
  Domain_ID: number
  Building_Code: string
  Floor_Code: string
  Domain_Type: string
  Domain_Name: string
  Domain_Code: string
  Domain_Area: number
  RS_Contact: string
  Domain_Staff_Cap: number
  Domain_Use: number
  Domain_Usage_Ratio: string
  Domain_Tel_Num: string
}

interface DomainStore {
  domains: Domain[]
  addDomain: (domain: Omit<Domain, 'Domain_ID'>) => void
  updateDomain: (domain: Domain) => void
  deleteDomain: (id: number) => boolean
  getDomainOptions: () => { value: string; label: string }[]
}

const initialDomains: Domain[] = [
  {
    Domain_ID: 1,
    Building_Code: '2020',
    Floor_Code: '3. Kat',
    Domain_Type: 'O',
    Domain_Name: 'Yönetici ofisi',
    Domain_Code: '338',
    Domain_Area: 16.00,
    RS_Contact: '6063',
    Domain_Staff_Cap: 2,
    Domain_Use: 2,
    Domain_Usage_Ratio: '100,00%',
    Domain_Tel_Num: '4883'
  },
  {
    Domain_ID: 2,
    Building_Code: '2020',
    Floor_Code: '3. Kat',
    Domain_Type: 'U',
    Domain_Name: '3. Kat Yönetici Ofisi',
    Domain_Code: '339',
    Domain_Area: 16.00,
    RS_Contact: '4226',
    Domain_Staff_Cap: 1,
    Domain_Use: 1,
    Domain_Usage_Ratio: '100,00%',
    Domain_Tel_Num: '2556'
  },
  {
    Domain_ID: 3,
    Building_Code: '2020',
    Floor_Code: 'Zemin Kat',
    Domain_Type: 'U',
    Domain_Name: 'Zemin Kat Ofis',
    Domain_Code: '6',
    Domain_Area: 50.00,
    RS_Contact: '2860',
    Domain_Staff_Cap: 12,
    Domain_Use: 5,
    Domain_Usage_Ratio: '41,67%',
    Domain_Tel_Num: '3222'
  }
  // Diğer domain verileri buraya eklenebilir
]

const domainTypes = [
  { value: 'O', label: 'O - Ofis' },
  { value: 'U', label: 'U - Üretim' },
  { value: 'K', label: 'K - Koridor' },
  { value: 'IH', label: 'IH - İç Hacim' },
  { value: 'TH', label: 'TH - Teknik Hacim' },
  { value: 'S', label: 'S - Sosyal Alan' }
]

export const useDomainStore = create<DomainStore>((set, get) => ({
  domains: initialDomains,

  addDomain: (domain) => {
    set((state) => {
      const newId = Math.max(...state.domains.map(d => d.Domain_ID)) + 1
      return {
        domains: [...state.domains, { ...domain, Domain_ID: newId }]
      }
    })
  },

  updateDomain: (domain) => {
    set((state) => ({
      domains: state.domains.map(d => 
        d.Domain_ID === domain.Domain_ID ? domain : d
      )
    }))
  },

  deleteDomain: (id) => {
    set((state) => ({
      domains: state.domains.filter(d => d.Domain_ID !== id)
    }))
    return true
  },

  getDomainOptions: () => {
    const { domains } = get()
    return domains.map(domain => ({
      value: domain.Domain_Code,
      label: `${domain.Domain_Name} (${domain.Domain_Code})`
    }))
  }
}))

export { domainTypes } 