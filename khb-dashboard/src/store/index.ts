import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from '@/features/tasks/store'
import teamsReducer from '@/features/teams/store'
import usersReducer from '@/features/users/store'

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    teams: teamsReducer,
    users: usersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 