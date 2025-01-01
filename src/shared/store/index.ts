import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from '@/features/auth/store'
import { tasksReducer } from '@/features/tasks/store'
import { teamsReducer } from '@/features/teams/store'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    teams: teamsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 