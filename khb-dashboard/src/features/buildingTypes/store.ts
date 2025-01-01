import { create } from 'zustand'

interface BuildingType {
  BuildingType_ID: number
  BuildingType_Name: string
  Description: string
}

interface BuildingTypeStore {
  buildingTypes: BuildingType[]
  addBuildingType: (buildingType: Omit<BuildingType, 'BuildingType_ID'>) => void
  updateBuildingType: (buildingType: BuildingType) => void
  deleteBuildingType: (id: number) => boolean
  getBuildingTypeOptions: () => { value: string; label: string }[]
  isBuildingTypeInUse: (id: number) => boolean
  setUsedBuildingTypes: (types: string[]) => void
  usedBuildingTypes: string[]
}

export const useBuildingTypeStore = create<BuildingTypeStore>((set, get) => ({
  buildingTypes: [
    {
      BuildingType_ID: 1,
      BuildingType_Name: 'Ofis',
      Description: 'Ofis binaları',
    },
    {
      BuildingType_ID: 2,
      BuildingType_Name: 'Depo',
      Description: 'Depolama binaları',
    },
  ],
  usedBuildingTypes: [],

  addBuildingType: (buildingType) => {
    set((state) => ({
      buildingTypes: [
        ...state.buildingTypes,
        {
          ...buildingType,
          BuildingType_ID: Math.max(...state.buildingTypes.map(b => b.BuildingType_ID)) + 1,
        },
      ],
    }))
  },

  updateBuildingType: (buildingType) => {
    set((state) => ({
      buildingTypes: state.buildingTypes.map((b) =>
        b.BuildingType_ID === buildingType.BuildingType_ID ? buildingType : b
      ),
    }))
  },

  deleteBuildingType: (id) => {
    const state = get()
    if (state.isBuildingTypeInUse(id)) {
      return false
    }
    set((state) => ({
      buildingTypes: state.buildingTypes.filter((b) => b.BuildingType_ID !== id),
    }))
    return true
  },

  getBuildingTypeOptions: () => {
    const state = get()
    return state.buildingTypes.map((b) => ({
      value: b.BuildingType_Name,
      label: b.BuildingType_Name,
    }))
  },

  isBuildingTypeInUse: (id) => {
    const state = get()
    const buildingType = state.buildingTypes.find((b) => b.BuildingType_ID === id)
    return buildingType ? state.usedBuildingTypes.includes(buildingType.BuildingType_Name) : false
  },

  setUsedBuildingTypes: (types) => {
    set({ usedBuildingTypes: types })
  },
})) 