import { create } from 'zustand'

interface Currency {
  Currency_ID: number
  Currency_Code: string
  Currency_Name: string
  Currency_Symbol: string
}

interface CurrencyStore {
  currencies: Currency[]
  addCurrency: (currency: Omit<Currency, 'Currency_ID'>) => void
  updateCurrency: (currency: Currency) => void
  deleteCurrency: (id: number) => boolean
  getCurrencyOptions: () => { value: string; label: string }[]
}

const initialCurrencies: Currency[] = [
  {
    Currency_ID: 1,
    Currency_Code: 'TRY',
    Currency_Name: 'Türk Lirası',
    Currency_Symbol: '₺'
  },
  {
    Currency_ID: 2,
    Currency_Code: 'USD',
    Currency_Name: 'Amerikan Doları',
    Currency_Symbol: '$'
  },
  {
    Currency_ID: 3,
    Currency_Code: 'EUR',
    Currency_Name: 'Euro',
    Currency_Symbol: '€'
  },
  {
    Currency_ID: 4,
    Currency_Code: 'GBP',
    Currency_Name: 'İngiliz Sterlini',
    Currency_Symbol: '£'
  },
  {
    Currency_ID: 5,
    Currency_Code: 'JPY',
    Currency_Name: 'Japon Yeni',
    Currency_Symbol: '¥'
  },
  {
    Currency_ID: 6,
    Currency_Code: 'CHF',
    Currency_Name: 'İsviçre Frangı',
    Currency_Symbol: 'Fr'
  },
  {
    Currency_ID: 7,
    Currency_Code: 'AUD',
    Currency_Name: 'Avustralya Doları',
    Currency_Symbol: 'A$'
  },
  {
    Currency_ID: 8,
    Currency_Code: 'CAD',
    Currency_Name: 'Kanada Doları',
    Currency_Symbol: 'C$'
  },
  {
    Currency_ID: 9,
    Currency_Code: 'CNY',
    Currency_Name: 'Çin Yuanı',
    Currency_Symbol: '¥'
  },
  {
    Currency_ID: 10,
    Currency_Code: 'RUB',
    Currency_Name: 'Rus Rublesi',
    Currency_Symbol: '₽'
  }
]

export const useCurrencyStore = create<CurrencyStore>((set, get) => ({
  currencies: initialCurrencies,

  addCurrency: (currency) => {
    set((state) => {
      const newId = Math.max(...state.currencies.map(c => c.Currency_ID)) + 1
      return {
        currencies: [...state.currencies, { ...currency, Currency_ID: newId }]
      }
    })
  },

  updateCurrency: (currency) => {
    set((state) => ({
      currencies: state.currencies.map(c => 
        c.Currency_ID === currency.Currency_ID ? currency : c
      )
    }))
  },

  deleteCurrency: (id) => {
    set((state) => ({
      currencies: state.currencies.filter(c => c.Currency_ID !== id)
    }))
    return true
  },

  getCurrencyOptions: () => {
    const { currencies } = get()
    return currencies.map(currency => ({
      value: currency.Currency_Code,
      label: `${currency.Currency_Name} (${currency.Currency_Symbol})`
    }))
  }
})) 