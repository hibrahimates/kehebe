import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Facility {
  id: string
  name: string
  cityName: string
  createdAt: string
  updatedAt: string
}

interface FacilitiesState {
  facilities: Facility[]
  isLoading: boolean
  error: string | null
  selectedFacility: Facility | null
}

const initialState: FacilitiesState = {
  facilities: [],
  isLoading: false,
  error: null,
  selectedFacility: null,
}

const facilitiesSlice = createSlice({
  name: 'facilities',
  initialState,
  reducers: {
    setFacilities: (state, action: PayloadAction<Facility[]>) => {
      state.facilities = action.payload
      state.error = null
    },
    addFacility: (state, action: PayloadAction<Facility>) => {
      state.facilities.push(action.payload)
    },
    updateFacility: (state, action: PayloadAction<Facility>) => {
      const index = state.facilities.findIndex((facility) => facility.id === action.payload.id)
      if (index !== -1) {
        state.facilities[index] = action.payload
      }
    },
    deleteFacility: (state, action: PayloadAction<string>) => {
      state.facilities = state.facilities.filter((facility) => facility.id !== action.payload)
    },
    setSelectedFacility: (state, action: PayloadAction<Facility | null>) => {
      state.selectedFacility = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const {
  setFacilities,
  addFacility,
  updateFacility,
  deleteFacility,
  setSelectedFacility,
  setLoading,
  setError,
} = facilitiesSlice.actions

export const facilitiesReducer = facilitiesSlice.reducer 