import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TeamMember {
  id: string
  name: string
  role: string
  email: string
}

export interface Team {
  id: string
  name: string
  description: string
  members: TeamMember[]
  createdAt: string
  updatedAt: string
}

interface TeamsState {
  teams: Team[]
}

const initialState: TeamsState = {
  teams: [
    {
      id: '1',
      name: 'Tasarım Ekibi',
      description: 'UI/UX ve görsel tasarım ekibi',
      members: [
        {
          id: '1',
          name: 'Ahmet Yılmaz',
          role: 'UI Designer',
          email: 'ahmet@example.com',
        },
        {
          id: '2',
          name: 'Ayşe Demir',
          role: 'UX Researcher',
          email: 'ayse@example.com',
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Geliştirme Ekibi',
      description: 'Frontend ve backend geliştirme ekibi',
      members: [
        {
          id: '3',
          name: 'Mehmet Kaya',
          role: 'Frontend Developer',
          email: 'mehmet@example.com',
        },
        {
          id: '4',
          name: 'Zeynep Şahin',
          role: 'Backend Developer',
          email: 'zeynep@example.com',
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
}

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
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
    addTeamMember: (
      state,
      action: PayloadAction<{ teamId: string; member: TeamMember }>
    ) => {
      const team = state.teams.find((t) => t.id === action.payload.teamId)
      if (team) {
        team.members.push(action.payload.member)
      }
    },
    removeTeamMember: (
      state,
      action: PayloadAction<{ teamId: string; memberId: string }>
    ) => {
      const team = state.teams.find((t) => t.id === action.payload.teamId)
      if (team) {
        team.members = team.members.filter((m) => m.id !== action.payload.memberId)
      }
    },
  },
})

export const {
  addTeam,
  updateTeam,
  deleteTeam,
  addTeamMember,
  removeTeamMember,
} = teamsSlice.actions
export default teamsSlice.reducer 