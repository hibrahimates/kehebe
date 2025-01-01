import { create } from 'zustand'

interface City {
  City_ID: number
  City_Name: string
  State_Name: string
}

interface CityStore {
  cities: City[]
  addCity: (city: Omit<City, 'City_ID'>) => void
  updateCity: (city: City) => void
  deleteCity: (id: number) => boolean
  getCityOptions: () => { value: string; label: string }[]
}

const initialCities: City[] = [
  { City_ID: 1, City_Name: 'ADANA', State_Name: 'Türkiye' },
  { City_ID: 2, City_Name: 'ADIYAMAN', State_Name: 'Türkiye' },
  { City_ID: 3, City_Name: 'AFYONKARAHISAR', State_Name: 'Türkiye' },
  { City_ID: 4, City_Name: 'AĞRI', State_Name: 'Türkiye' },
  { City_ID: 5, City_Name: 'AMASYA', State_Name: 'Türkiye' },
  { City_ID: 6, City_Name: 'ANKARA', State_Name: 'Türkiye' },
  { City_ID: 7, City_Name: 'ANTALYA', State_Name: 'Türkiye' },
  { City_ID: 8, City_Name: 'ARTVİN', State_Name: 'Türkiye' },
  { City_ID: 9, City_Name: 'AYDIN', State_Name: 'Türkiye' },
  { City_ID: 10, City_Name: 'BALIKESİR', State_Name: 'Türkiye' },
  { City_ID: 11, City_Name: 'BİLECİK', State_Name: 'Türkiye' },
  { City_ID: 12, City_Name: 'BİNGÖL', State_Name: 'Türkiye' },
  { City_ID: 13, City_Name: 'BİTLİS', State_Name: 'Türkiye' },
  { City_ID: 14, City_Name: 'BOLU', State_Name: 'Türkiye' },
  { City_ID: 15, City_Name: 'BURDUR', State_Name: 'Türkiye' },
  { City_ID: 16, City_Name: 'BURSA', State_Name: 'Türkiye' },
  { City_ID: 17, City_Name: 'ÇANAKKALE', State_Name: 'Türkiye' },
  { City_ID: 18, City_Name: 'ÇANKIRI', State_Name: 'Türkiye' },
  { City_ID: 19, City_Name: 'ÇORUM', State_Name: 'Türkiye' },
  { City_ID: 20, City_Name: 'DENİZLİ', State_Name: 'Türkiye' },
  { City_ID: 21, City_Name: 'DİYARBAKIR', State_Name: 'Türkiye' },
  { City_ID: 22, City_Name: 'EDİRNE', State_Name: 'Türkiye' },
  { City_ID: 23, City_Name: 'ELAZIĞ', State_Name: 'Türkiye' },
  { City_ID: 24, City_Name: 'ERZİNCAN', State_Name: 'Türkiye' },
  { City_ID: 25, City_Name: 'ERZURUM', State_Name: 'Türkiye' },
  { City_ID: 26, City_Name: 'ESKİŞEHİR', State_Name: 'Türkiye' },
  { City_ID: 27, City_Name: 'GAZİANTEP', State_Name: 'Türkiye' },
  { City_ID: 28, City_Name: 'GİRESUN', State_Name: 'Türkiye' },
  { City_ID: 29, City_Name: 'GÜMÜŞHANE', State_Name: 'Türkiye' },
  { City_ID: 30, City_Name: 'HAKKARİ', State_Name: 'Türkiye' },
  { City_ID: 31, City_Name: 'HATAY', State_Name: 'Türkiye' },
  { City_ID: 32, City_Name: 'ISPARTA', State_Name: 'Türkiye' },
  { City_ID: 33, City_Name: 'MERSİN', State_Name: 'Türkiye' },
  { City_ID: 34, City_Name: 'İSTANBUL', State_Name: 'Türkiye' },
  { City_ID: 35, City_Name: 'İZMİR', State_Name: 'Türkiye' },
  { City_ID: 36, City_Name: 'KARS', State_Name: 'Türkiye' },
  { City_ID: 37, City_Name: 'KASTAMONU', State_Name: 'Türkiye' },
  { City_ID: 38, City_Name: 'KAYSERİ', State_Name: 'Türkiye' },
  { City_ID: 39, City_Name: 'KIRKLARELİ', State_Name: 'Türkiye' },
  { City_ID: 40, City_Name: 'KIRŞEHİR', State_Name: 'Türkiye' },
  { City_ID: 41, City_Name: 'KOCAELİ', State_Name: 'Türkiye' },
  { City_ID: 42, City_Name: 'KONYA', State_Name: 'Türkiye' },
  { City_ID: 43, City_Name: 'KÜTAHYA', State_Name: 'Türkiye' },
  { City_ID: 44, City_Name: 'MALATYA', State_Name: 'Türkiye' },
  { City_ID: 45, City_Name: 'MANİSA', State_Name: 'Türkiye' },
  { City_ID: 46, City_Name: 'KAHRAMANMARAŞ', State_Name: 'Türkiye' },
  { City_ID: 47, City_Name: 'MARDİN', State_Name: 'Türkiye' },
  { City_ID: 48, City_Name: 'MUĞLA', State_Name: 'Türkiye' },
  { City_ID: 49, City_Name: 'MUŞ', State_Name: 'Türkiye' },
  { City_ID: 50, City_Name: 'NEVŞEHİR', State_Name: 'Türkiye' },
  { City_ID: 51, City_Name: 'NİĞDE', State_Name: 'Türkiye' },
  { City_ID: 52, City_Name: 'ORDU', State_Name: 'Türkiye' },
  { City_ID: 53, City_Name: 'RİZE', State_Name: 'Türkiye' },
  { City_ID: 54, City_Name: 'SAKARYA', State_Name: 'Türkiye' },
  { City_ID: 55, City_Name: 'SAMSUN', State_Name: 'Türkiye' },
  { City_ID: 56, City_Name: 'SİİRT', State_Name: 'Türkiye' },
  { City_ID: 57, City_Name: 'SİNOP', State_Name: 'Türkiye' },
  { City_ID: 58, City_Name: 'SİVAS', State_Name: 'Türkiye' },
  { City_ID: 59, City_Name: 'TEKİRDAĞ', State_Name: 'Türkiye' },
  { City_ID: 60, City_Name: 'TOKAT', State_Name: 'Türkiye' },
  { City_ID: 61, City_Name: 'TRABZON', State_Name: 'Türkiye' },
  { City_ID: 62, City_Name: 'TUNCELİ', State_Name: 'Türkiye' },
  { City_ID: 63, City_Name: 'ŞANLIURFA', State_Name: 'Türkiye' },
  { City_ID: 64, City_Name: 'UŞAK', State_Name: 'Türkiye' },
  { City_ID: 65, City_Name: 'VAN', State_Name: 'Türkiye' },
  { City_ID: 66, City_Name: 'YOZGAT', State_Name: 'Türkiye' },
  { City_ID: 67, City_Name: 'ZONGULDAK', State_Name: 'Türkiye' },
  { City_ID: 68, City_Name: 'AKSARAY', State_Name: 'Türkiye' },
  { City_ID: 69, City_Name: 'BAYBURT', State_Name: 'Türkiye' },
  { City_ID: 70, City_Name: 'KARAMAN', State_Name: 'Türkiye' },
  { City_ID: 71, City_Name: 'KIRIKKALE', State_Name: 'Türkiye' },
  { City_ID: 72, City_Name: 'BATMAN', State_Name: 'Türkiye' },
  { City_ID: 73, City_Name: 'ŞIRNAK', State_Name: 'Türkiye' },
  { City_ID: 74, City_Name: 'BARTIN', State_Name: 'Türkiye' },
  { City_ID: 75, City_Name: 'ARDAHAN', State_Name: 'Türkiye' },
  { City_ID: 76, City_Name: 'IĞDIR', State_Name: 'Türkiye' },
  { City_ID: 77, City_Name: 'YALOVA', State_Name: 'Türkiye' },
  { City_ID: 78, City_Name: 'KARABÜK', State_Name: 'Türkiye' },
  { City_ID: 79, City_Name: 'KİLİS', State_Name: 'Türkiye' },
  { City_ID: 80, City_Name: 'OSMANİYE', State_Name: 'Türkiye' },
  { City_ID: 81, City_Name: 'DÜZCE', State_Name: 'Türkiye' }
]

export const useCityStore = create<CityStore>((set, get) => ({
  cities: initialCities,

  addCity: (city) => {
    set((state) => {
      const newId = Math.max(...state.cities.map(c => c.City_ID)) + 1
      return {
        cities: [...state.cities, { ...city, City_ID: newId }]
      }
    })
  },

  updateCity: (city) => {
    set((state) => ({
      cities: state.cities.map(c => 
        c.City_ID === city.City_ID ? city : c
      )
    }))
  },

  deleteCity: (id) => {
    set((state) => ({
      cities: state.cities.filter(c => c.City_ID !== id)
    }))
    return true
  },

  getCityOptions: () => {
    const { cities } = get()
    return cities.map(city => ({
      value: city.City_Name,
      label: city.City_Name
    }))
  }
})) 