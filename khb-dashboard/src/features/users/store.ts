import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface User {
  id: string
  name: string
  email: string
  role: string
  avatar: string
  department: string
  status: 'active' | 'away' | 'offline'
}

interface UsersState {
  users: User[]
  currentUser: User | null
}

const initialState: UsersState = {
  currentUser: {
    id: '1',
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    role: 'UI Designer',
    avatar: `https://ui-avatars.com/api/?name=Ahmet+Yılmaz&background=random`,
    department: 'Tasarım',
    status: 'active',
  },
  users: [
    {
      id: '1',
      name: 'Ahmet Yılmaz',
      email: 'ahmet@example.com',
      role: 'UI Designer',
      avatar: `https://ui-avatars.com/api/?name=Ahmet+Yılmaz&background=random`,
      department: 'Tasarım',
      status: 'active',
    },
    {
      id: '2',
      name: 'Ayşe Demir',
      email: 'ayse@example.com',
      role: 'UX Researcher',
      avatar: `https://ui-avatars.com/api/?name=Ayşe+Demir&background=random`,
      department: 'Tasarım',
      status: 'active',
    },
    {
      id: '3',
      name: 'Mehmet Kaya',
      email: 'mehmet@example.com',
      role: 'Frontend Developer',
      avatar: `https://ui-avatars.com/api/?name=Mehmet+Kaya&background=random`,
      department: 'Geliştirme',
      status: 'away',
    },
    {
      id: '4',
      name: 'Zeynep Şahin',
      email: 'zeynep@example.com',
      role: 'Backend Developer',
      avatar: `https://ui-avatars.com/api/?name=Zeynep+Şahin&background=random`,
      department: 'Geliştirme',
      status: 'active',
    },
    {
      id: '5',
      name: 'Can Özkan',
      email: 'can@example.com',
      role: 'Product Manager',
      avatar: `https://ui-avatars.com/api/?name=Can+Özkan&background=random`,
      department: 'Yönetim',
      status: 'active',
    },
    {
      id: '6',
      name: 'Elif Yıldız',
      email: 'elif@example.com',
      role: 'Data Analyst',
      avatar: `https://ui-avatars.com/api/?name=Elif+Yıldız&background=random`,
      department: 'Analitik',
      status: 'offline',
    },
    {
      id: '7',
      name: 'Burak Aydın',
      email: 'burak@example.com',
      role: 'DevOps Engineer',
      avatar: `https://ui-avatars.com/api/?name=Burak+Aydın&background=random`,
      department: 'Operasyon',
      status: 'active',
    },
    {
      id: '8',
      name: 'Selin Kara',
      email: 'selin@example.com',
      role: 'QA Engineer',
      avatar: `https://ui-avatars.com/api/?name=Selin+Kara&background=random`,
      department: 'Kalite',
      status: 'away',
    },
    {
      id: '9',
      name: 'Onur Çelik',
      email: 'onur@example.com',
      role: 'Mobile Developer',
      avatar: `https://ui-avatars.com/api/?name=Onur+Çelik&background=random`,
      department: 'Geliştirme',
      status: 'active',
    },
    {
      id: '10',
      name: 'Deniz Yılmaz',
      email: 'deniz@example.com',
      role: 'UI/UX Designer',
      avatar: `https://ui-avatars.com/api/?name=Deniz+Yılmaz&background=random`,
      department: 'Tasarım',
      status: 'active',
    },
  ],
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
    },
    updateUserStatus: (
      state,
      action: PayloadAction<{ userId: string; status: User['status'] }>
    ) => {
      const user = state.users.find((u) => u.id === action.payload.userId)
      if (user) {
        user.status = action.payload.status
      }
      if (state.currentUser?.id === action.payload.userId) {
        state.currentUser.status = action.payload.status
      }
    },
  },
})

export const { setCurrentUser, updateUserStatus } = usersSlice.actions
export default usersSlice.reducer 