import { create } from 'zustand'

interface Contract {
  Contract_ID: number
  Contract_Code: string
  Contract_Date: string
  Contract_Number: string
  Contractor_Code: string
  Contract_Duration: string
  Team_Members: string
  In_Charge: string
  Case_Code: string
  Current_Contract: boolean
  Contract_Name: string
}

interface ContractStore {
  contracts: Contract[]
  addContract: (contract: Omit<Contract, 'Contract_ID'>) => void
  updateContract: (contract: Contract) => void
  deleteContract: (id: number) => boolean
  getContractOptions: () => { value: string; label: string }[]
}

const initialContracts: Contract[] = [
  {
    Contract_ID: 1,
    Contract_Code: 'XYA_SOZ',
    Contract_Date: '2019-05-29',
    Contract_Number: '1232223',
    Contractor_Code: 'DİVAN',
    Contract_Duration: '100 Gün',
    Team_Members: 'Ali Yılmaz, Recep Coz, Metin UZ',
    In_Charge: '6063',
    Case_Code: 'D',
    Current_Contract: false,
    Contract_Name: 'XYA Binası Yapım İşi'
  },
  {
    Contract_ID: 2,
    Contract_Code: 'ABC_SOZ',
    Contract_Date: '2019-10-23',
    Contract_Number: 'XYZ-141231',
    Contractor_Code: 'ONE',
    Contract_Duration: '380 Gün',
    Team_Members: 'Hasan Uzun, Veli süzgeç',
    In_Charge: '5670',
    Case_Code: 'E',
    Current_Contract: false,
    Contract_Name: 'ABC Binaları Projelendirme ve Yapım İşi'
  }
]

export const useContractStore = create<ContractStore>((set, get) => ({
  contracts: initialContracts,

  addContract: (contract) => {
    set((state) => {
      const newId = Math.max(...state.contracts.map(c => c.Contract_ID)) + 1
      return {
        contracts: [...state.contracts, { ...contract, Contract_ID: newId }]
      }
    })
  },

  updateContract: (contract) => {
    set((state) => ({
      contracts: state.contracts.map(c => 
        c.Contract_ID === contract.Contract_ID ? contract : c
      )
    }))
  },

  deleteContract: (id) => {
    set((state) => ({
      contracts: state.contracts.filter(c => c.Contract_ID !== id)
    }))
    return true
  },

  getContractOptions: () => {
    const { contracts } = get()
    return contracts.map(contract => ({
      value: contract.Contract_Code,
      label: `${contract.Contract_Name} (${contract.Contract_Code})`
    }))
  }
})) 