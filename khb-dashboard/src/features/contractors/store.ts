import { create } from 'zustand'

interface Contractor {
  Contractor_ID: number
  Contractor_Name: string
  Contractor_Code: string
}

interface ContractorStore {
  contractors: Contractor[]
  addContractor: (contractor: Omit<Contractor, 'Contractor_ID'>) => void
  updateContractor: (contractor: Contractor) => void
  deleteContractor: (id: number) => boolean
  getContractorOptions: () => { value: string; label: string }[]
}

const initialContractors: Contractor[] = [
  { Contractor_ID: 1, Contractor_Name: 'Abt - Endüstriyel  Tesis Firması', Contractor_Code: 'ABT' },
  { Contractor_ID: 2, Contractor_Name: 'Altek Mühendislik - İstanbul', Contractor_Code: 'AM' },
  { Contractor_ID: 3, Contractor_Name: 'Ant İnşaat Maden San. A.Ş.', Contractor_Code: 'ANT' },
  { Contractor_ID: 4, Contractor_Name: 'Aras İnşaat', Contractor_Code: 'ARAS' },
  { Contractor_ID: 5, Contractor_Name: 'Arb Global Enerji İnş. Taah. San. ve Tic. A.Ş.', Contractor_Code: 'ARB' },
  { Contractor_ID: 6, Contractor_Name: 'Arstek İnş. Tic. A.Ş.', Contractor_Code: 'ARS' },
  { Contractor_ID: 7, Contractor_Name: 'Aselsan Net', Contractor_Code: 'ASN' },
  { Contractor_ID: 8, Contractor_Name: 'Asma Mimarlık İnşaat Sanayi ve Ticaret A.Ş.', Contractor_Code: 'ASMA' },
  { Contractor_ID: 9, Contractor_Name: 'Atak Mühendislik İnşaat Sanayi ve Ticaret A.Ş.', Contractor_Code: 'ATAK' },
  { Contractor_ID: 10, Contractor_Name: 'Begüm Yapı - Begüm Yapı Turizm San. ve Tic.Ltd.Şti.', Contractor_Code: 'BEG' },
  { Contractor_ID: 11, Contractor_Name: 'Beta Group', Contractor_Code: 'BETA' },
  { Contractor_ID: 12, Contractor_Name: 'Cengiz İnşaat Sanayi ve Ticaret A.Ş.', Contractor_Code: 'CNG' },
  { Contractor_ID: 13, Contractor_Name: 'Cevahir Yapı Sanayi Turizm ve Ticaret A.Ş.', Contractor_Code: 'CEV' },
  { Contractor_ID: 14, Contractor_Name: 'Çolakoğlu İnşaat Turizm Enerji Üretim San. ve Tic. A.Ş.', Contractor_Code: 'COL' },
  { Contractor_ID: 15, Contractor_Name: 'Dekom İnş. A.Ş.', Contractor_Code: 'DEK' },
  { Contractor_ID: 16, Contractor_Name: 'Deniz Yapı', Contractor_Code: 'DY' },
  { Contractor_ID: 17, Contractor_Name: 'Des Mimarlık Mühendislik İnşaat Ltd. Şti.', Contractor_Code: 'DES' },
  { Contractor_ID: 18, Contractor_Name: 'Dizayn Müh. Ltd.Şti.', Contractor_Code: 'DM' },
  { Contractor_ID: 19, Contractor_Name: 'Doğuş İnşaat', Contractor_Code: 'DOG' },
  { Contractor_ID: 20, Contractor_Name: 'Dorçe Prefabrik Çelik & İnşaat', Contractor_Code: 'DOR' },
  { Contractor_ID: 21, Contractor_Name: 'Dost İnşaat ve Proje Yönetimi A.Ş.', Contractor_Code: 'DOST' },
  { Contractor_ID: 22, Contractor_Name: 'Ekart Enerji Yapı A.Ş.', Contractor_Code: 'EKART' },
  { Contractor_ID: 23, Contractor_Name: 'Ekon Endüstri İnşaat ve Ticaret A.Ş.', Contractor_Code: 'EKON' },
  { Contractor_ID: 24, Contractor_Name: 'Epik  Holding A.Ş.', Contractor_Code: 'EPİK' },
  { Contractor_ID: 25, Contractor_Name: 'Erbora Mimarlık Yapı Endüstrisi Turizm ve Ticaret A.Ş.', Contractor_Code: 'ERB' },
  { Contractor_ID: 26, Contractor_Name: 'Ersis Enerji Müh. Müş. İnş. Ltd. Şti.', Contractor_Code: 'ERSİS' },
  { Contractor_ID: 27, Contractor_Name: 'Gama Endüstri Tesisleri İmalat ve Montaj A.Ş.', Contractor_Code: 'GAMA' },
  { Contractor_ID: 28, Contractor_Name: 'Gintek Group', Contractor_Code: 'GİNTEK' },
  { Contractor_ID: 29, Contractor_Name: 'Günkon İnşaat San.ve Tic.', Contractor_Code: 'GÜNKON' },
  { Contractor_ID: 30, Contractor_Name: 'Gürbağ İnşaat', Contractor_Code: 'GÜR' },
  { Contractor_ID: 31, Contractor_Name: 'Gvs Yapı İnşaat - İstanbul', Contractor_Code: 'GVS' },
  { Contractor_ID: 32, Contractor_Name: 'Hadeka İnşaat', Contractor_Code: 'HAD' },
  { Contractor_ID: 33, Contractor_Name: 'Hdm Enerji ve Metal A.Ş.', Contractor_Code: 'HDM' },
  { Contractor_ID: 34, Contractor_Name: 'His Mühendislik A.Ş.', Contractor_Code: 'HİS' },
  { Contractor_ID: 35, Contractor_Name: 'İçtaş', Contractor_Code: 'İÇTAŞ' },
  { Contractor_ID: 36, Contractor_Name: 'İleri Enerji Teknolojileri Müh. - İet', Contractor_Code: 'İET' },
  { Contractor_ID: 37, Contractor_Name: 'Ketu İnşaat Pazarlama ve Ticaret Ltd.Şti.', Contractor_Code: 'KETU' },
  { Contractor_ID: 38, Contractor_Name: 'Kolin İnş. Turizm San. ve Tic. A.Ş.', Contractor_Code: 'KOL' },
  { Contractor_ID: 39, Contractor_Name: 'Koryon Enginnering - Endüstriyel Tesis', Contractor_Code: 'KOR' },
  { Contractor_ID: 40, Contractor_Name: 'Ksk Grup Taahhut İnş. Turizm. San. ve Tic. A.Ş', Contractor_Code: 'KSK' },
  { Contractor_ID: 41, Contractor_Name: 'Kuark Endüstri A.Ş. - Endüstriyel Tesis', Contractor_Code: 'KUARK' },
  { Contractor_ID: 42, Contractor_Name: 'Limak  İnşaat A.Ş.', Contractor_Code: 'LİMAK' },
  { Contractor_ID: 43, Contractor_Name: 'Major Group İnş. ve Tic. A.Ş.', Contractor_Code: 'MAJOR' },
  { Contractor_ID: 44, Contractor_Name: 'Makyol İnşaat San. Turizm ve Tic. A.Ş.', Contractor_Code: 'MAKYOL' },
  { Contractor_ID: 45, Contractor_Name: 'Metron Yapı Proje İnş. Taah. Tic. ve Beton  San. A.Ş.', Contractor_Code: 'METRON' },
  { Contractor_ID: 46, Contractor_Name: 'Mgb İnşaat - İstanbul Bütün İşlere Çağırabiliriz', Contractor_Code: 'MGB' },
  { Contractor_ID: 47, Contractor_Name: 'N.K.Y. Mimarlık Mühendislik İnş. ve Tic. Ltd. Şti.', Contractor_Code: 'NKY' },
  { Contractor_ID: 48, Contractor_Name: 'Nurol İnşaat ve Ticaret A.Ş.', Contractor_Code: 'NUROL' },
  { Contractor_ID: 49, Contractor_Name: 'O.N.E. Osman Nuri Esen İnşaat ve Ticaret Ltd.Şti.', Contractor_Code: 'ONE' },
  { Contractor_ID: 50, Contractor_Name: 'Odacıgrup İnşaat Taah Müh.Mim', Contractor_Code: 'ODA' },
  { Contractor_ID: 51, Contractor_Name: 'Özbek İnşaat Taahhüt Sanayi ve Ticaret Ltd.Şti.', Contractor_Code: 'ÖZB' },
  { Contractor_ID: 52, Contractor_Name: 'Profen İnşaat ve Mühendislik A.Ş.', Contractor_Code: 'PROFEN' },
  { Contractor_ID: 53, Contractor_Name: 'Rec Uluslararası İnşaat Yatırım Sanayi ve Ticaret A.Ş.', Contractor_Code: 'REC' },
  { Contractor_ID: 54, Contractor_Name: 'Rf Analiz Teknolojileri - Samsun', Contractor_Code: 'RF' },
  { Contractor_ID: 55, Contractor_Name: 'Roketsan', Contractor_Code: 'RS' },
  { Contractor_ID: 56, Contractor_Name: 'Sayar Müşavirlik', Contractor_Code: 'SAYAR' },
  { Contractor_ID: 57, Contractor_Name: 'Serban İnşaat Sanayi ve Ticaret A.Ş.', Contractor_Code: 'SRB' },
  { Contractor_ID: 58, Contractor_Name: 'Sistemas Teknoloji ve Sistem Üretimi', Contractor_Code: 'SİSAS' },
  { Contractor_ID: 59, Contractor_Name: 'Siyahkalem Mühendislik İnşaat Sanayi ve Tic. A.Ş', Contractor_Code: 'SK' },
  { Contractor_ID: 60, Contractor_Name: 'Sms İnş. Müh. Mad. Tur. San. ve Tic. Ltd. Şti.', Contractor_Code: 'SMS' },
  { Contractor_ID: 61, Contractor_Name: 'Teğet Mimarlık İnş. San. ve Tic. Ltd. Şti.', Contractor_Code: 'TGT' },
  { Contractor_ID: 62, Contractor_Name: 'Tekfen Mühendislik A.Ş.', Contractor_Code: 'TEKFEN' },
  { Contractor_ID: 63, Contractor_Name: 'Teknokon Endüstri Tesisleri İnş', Contractor_Code: 'TEKNO' },
  { Contractor_ID: 64, Contractor_Name: 'Temelkon Mühendislik İnşaat San. ve Tic. Ltd. Şti', Contractor_Code: 'TKON' },
  { Contractor_ID: 65, Contractor_Name: 'Tepe İnşaat A.Ş.', Contractor_Code: 'TEPE' },
  { Contractor_ID: 66, Contractor_Name: 'Tera Enerji A.Ş.', Contractor_Code: 'TERA' },
  { Contractor_ID: 67, Contractor_Name: 'İnan Proje Mekanik İnşaat Sanayi ve Ticaret Ltd. Şti.', Contractor_Code: 'İNAN' },
  { Contractor_ID: 68, Contractor_Name: 'Tora İnşaat', Contractor_Code: 'TORA' },
  { Contractor_ID: 69, Contractor_Name: 'Tur İl Gıda Tekstil - Engin Mühendislik -Rize', Contractor_Code: 'TURİL' },
  { Contractor_ID: 70, Contractor_Name: 'Türker Mimarlık Mühendislik Planlama İnşaat Sanayi ve Ticaret Limited Şirketi', Contractor_Code: 'TRK' },
  { Contractor_ID: 71, Contractor_Name: 'Türkseven Turizm İnşaat A.Ş.', Contractor_Code: 'TS' },
  { Contractor_ID: 72, Contractor_Name: 'Yapı Merkezi İnşaat ve Sanayi A.Ş ', Contractor_Code: 'YM' },
  { Contractor_ID: 73, Contractor_Name: 'Yda İnşaat San. ve Tic. A.Ş.', Contractor_Code: 'YDA' },
  { Contractor_ID: 74, Contractor_Name: 'Yenigün  İnşaat San. ve Tic. A.Ş.', Contractor_Code: 'YG' },
  { Contractor_ID: 75, Contractor_Name: 'Yp İnşaat A.Ş.', Contractor_Code: 'YP' },
  { Contractor_ID: 76, Contractor_Name: 'Yüksel İnşaat A.Ş.', Contractor_Code: 'YÜKSEL' },
  { Contractor_ID: 77, Contractor_Name: 'Yükselen İnş. Taah. ve Tic. A.Ş.', Contractor_Code: 'YÜKSELEN' },
  { Contractor_ID: 78, Contractor_Name: 'Divan Taahhüt İnş. San. ve Tic. Ltd. Şti', Contractor_Code: 'DİVAN' },
  { Contractor_ID: 79, Contractor_Name: 'Okur İnşaat Haf. Nak. Tic. Ltd. Şti', Contractor_Code: 'OKUR' },
  { Contractor_ID: 80, Contractor_Name: 'Osey Mek. Elk. İnş. Tes. Taah. Müş. Müh. Proje Hiz. ve Tic. Ltd. Şti.', Contractor_Code: 'OSEY' },
  { Contractor_ID: 81, Contractor_Name: 'Demirdağlar Mimarlık Müşavirlik Mühendislik Müt. Tar. Hay. San. Tic. Ltd. Şti.', Contractor_Code: 'DD' },
  { Contractor_ID: 82, Contractor_Name: 'Tümaş Türk Mühendislik Müşavirlik ve Müteahhitlik A.Ş.', Contractor_Code: 'TÜMAŞ' },
  { Contractor_ID: 83, Contractor_Name: 'Emay Uluslararası Mühendislik Müşavirlik A.Ş.', Contractor_Code: 'EMAY' },
  { Contractor_ID: 84, Contractor_Name: 'Metroplan Müşavirlik Müh. Tic. ve San. Ltd. Şti.', Contractor_Code: 'MP' },
  { Contractor_ID: 85, Contractor_Name: 'Prokon Mühendislik ve Müşavirlik A.Ş.', Contractor_Code: 'PROKON' },
  { Contractor_ID: 86, Contractor_Name: 'Kentler İnşaat Proje Yönetim A.Ş.', Contractor_Code: 'KENT' },
  { Contractor_ID: 87, Contractor_Name: 'Entegre Proje Yönetim Danışmanlık Mühendislik Tic. A.Ş.', Contractor_Code: 'EPY' },
  { Contractor_ID: 88, Contractor_Name: 'Erya Mühendislik ve Proje Yönetimi', Contractor_Code: 'ERYA' },
  { Contractor_ID: 89, Contractor_Name: 'KAREA Bilgi Teknolojileri A.Ş.', Contractor_Code: 'KAREA' },
  { Contractor_ID: 90, Contractor_Name: 'MERPA İletişim Sistemleri LTD. ŞTİ.', Contractor_Code: 'MERPA' },
  { Contractor_ID: 91, Contractor_Name: 'UniCom Universal Bilgisayar Hizmetleri Tic Ltd. Şti.', Contractor_Code: 'UNICOM' },
  { Contractor_ID: 92, Contractor_Name: 'Umut Zemin ve Yapı Sistemleri İnşaat San Tic Ltd Şti', Contractor_Code: 'UMUT' },
  { Contractor_ID: 93, Contractor_Name: 'İşbir Elektrik Sanayi A.Ş.', Contractor_Code: 'ISBR' },
  { Contractor_ID: 94, Contractor_Name: 'FGR Elektrik Sanayi ve Ticaret Limited Şirketi', Contractor_Code: 'FGR' }
]

export const useContractorStore = create<ContractorStore>((set, get) => ({
  contractors: initialContractors,

  addContractor: (contractor) => {
    set((state) => {
      const newId = Math.max(...state.contractors.map(c => c.Contractor_ID)) + 1
      return {
        contractors: [...state.contractors, { ...contractor, Contractor_ID: newId }]
      }
    })
  },

  updateContractor: (contractor) => {
    set((state) => ({
      contractors: state.contractors.map(c => 
        c.Contractor_ID === contractor.Contractor_ID ? contractor : c
      )
    }))
  },

  deleteContractor: (id) => {
    set((state) => ({
      contractors: state.contractors.filter(c => c.Contractor_ID !== id)
    }))
    return true
  },

  getContractorOptions: () => {
    const { contractors } = get()
    return contractors.map(contractor => ({
      value: contractor.Contractor_Code,
      label: `${contractor.Contractor_Name} (${contractor.Contractor_Code})`
    }))
  }
})) 