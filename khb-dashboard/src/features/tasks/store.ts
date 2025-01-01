import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Task {
  id: string
  title: string
  description: string
  status: 'todo' | 'in_progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  assigneeId: string
  dueDate: string
  createdAt: string
  updatedAt: string
}

interface TasksState {
  tasks: Task[]
}

const initialState: TasksState = {
  tasks: [
    {
      id: '1',
      title: 'Dashboard tasarımını güncelle',
      description: 'Modern ve minimalist bir tasarım oluştur',
      status: 'in_progress',
      priority: 'high',
      assigneeId: '1',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'API entegrasyonu',
      description: 'Backend servisleri ile bağlantı kur',
      status: 'todo',
      priority: 'medium',
      assigneeId: '2',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload)
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id)
      if (index !== -1) {
        state.tasks[index] = action.payload
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload)
    },
  },
})

export const { addTask, updateTask, deleteTask } = tasksSlice.actions
export default tasksSlice.reducer 