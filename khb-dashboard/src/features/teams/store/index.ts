import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '@/features/auth/store'

export interface Team {
  id: string
  name: string
  description: string
  members: User[]
  createdAt: string
  updatedAt: string
}

interface TeamsState {
  teams: Team[]
  isLoading: boolean
  error: string | null
  selectedTeam: Team | null
}

const initialState: TeamsState = {
  teams: [],
  isLoading: false,
  error: null,
  selectedTeam: null,
}

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    setTeams: (state, action: PayloadAction<Team[]>) => {
      state.teams = action.payload
      state.error = null
    },
    addTeam: (state, action: PayloadAction<Team>) => {
      state.teams.push(action.payload)
    },
    updateTeam: (state, action: PayloadAction<Team>) => {
      const index = state.teams.findIndex((team) => team.id === action.payload.id)
      if (index !== -1) {
        state.teams[index] = action.payload
      }
    },
    deleteTeam: (state, action: PayloadAction<string>) => {
      state.teams = state.teams.filter((team) => team.id !== action.payload)
    },
    setSelectedTeam: (state, action: PayloadAction<Team | null>) => {
      state.selectedTeam = action.payload
    },
    addTeamMember: (state, action: PayloadAction<{ teamId: string; user: User }>) => {
      const team = state.teams.find((t) => t.id === action.payload.teamId)
      if (team) {
        team.members.push(action.payload.user)
      }
    },
    removeTeamMember: (state, action: PayloadAction<{ teamId: string; userId: string }>) => {
      const team = state.teams.find((t) => t.id === action.payload.teamId)
      if (team) {
        team.members = team.members.filter((member) => member.id !== action.payload.userId)
      }
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
  setTeams,
  addTeam,
  updateTeam,
  deleteTeam,
  setSelectedTeam,
  addTeamMember,
  removeTeamMember,
  setLoading,
  setError,
} = teamsSlice.actions

export const teamsReducer = teamsSlice.reducer 