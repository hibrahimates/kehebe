'use client'

import { useState } from 'react'
import { useAppSelector } from '@/shared/hooks/use-app-selector'
import { useAppDispatch } from '@/shared/hooks/use-app-dispatch'
import { DataTable } from '@/shared/components/ui/data-table'
import { Button } from '@/shared/components/ui/button'
import { PlusIcon } from '@heroicons/react/24/outline'
import { type Task, addTask, updateTask } from '@/features/tasks/store'
import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/shared/utils/cn'
import { AddTaskModal } from '@/features/tasks/components/add-task-modal'

const columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'title',
    header: 'Başlık',
  },
  {
    accessorKey: 'description',
    header: 'Açıklama',
  },
  {
    accessorKey: 'status',
    header: 'Durum',
    cell: ({ row }) => {
      const status = row.getValue('status') as Task['status']
      return (
        <span
          className={cn(
            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
            {
              'bg-green-100 text-green-800': status === 'done',
              'bg-yellow-100 text-yellow-800': status === 'in_progress',
              'bg-gray-100 text-gray-800': status === 'todo',
            }
          )}
        >
          {status === 'done'
            ? 'Tamamlandı'
            : status === 'in_progress'
            ? 'Devam Ediyor'
            : 'Bekliyor'}
        </span>
      )
    },
  },
  {
    accessorKey: 'priority',
    header: 'Öncelik',
    cell: ({ row }) => {
      const priority = row.getValue('priority') as Task['priority']
      return (
        <span
          className={cn(
            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
            {
              'bg-red-100 text-red-800': priority === 'high',
              'bg-yellow-100 text-yellow-800': priority === 'medium',
              'bg-green-100 text-green-800': priority === 'low',
            }
          )}
        >
          {priority === 'high'
            ? 'Yüksek'
            : priority === 'medium'
            ? 'Orta'
            : 'Düşük'}
        </span>
      )
    },
  },
  {
    accessorKey: 'assigneeId',
    header: 'Atanan Kişi',
    cell: ({ row }) => {
      const users = useAppSelector((state) => state.users.users)
      const assigneeId = row.getValue('assigneeId') as string
      const assignee = users.find((user) => user.id === assigneeId)
      return assignee ? (
        <div className="flex items-center gap-x-2">
          <img
            src={assignee.avatar}
            alt={assignee.name}
            className="h-6 w-6 rounded-full"
          />
          <span className="text-sm text-gray-900 dark:text-white">
            {assignee.name}
          </span>
        </div>
      ) : null
    },
  },
  {
    accessorKey: 'dueDate',
    header: 'Bitiş Tarihi',
    cell: ({ row }) => {
      const date = new Date(row.getValue('dueDate'))
      return date.toLocaleDateString('tr-TR')
    },
  },
  {
    accessorKey: 'actions',
    header: 'Durum Değiştir',
    cell: ({ row }) => {
      const dispatch = useAppDispatch()
      const task = row.original
      const nextStatus: Record<Task['status'], Task['status']> = {
        todo: 'in_progress',
        in_progress: 'done',
        done: 'todo',
      }

      return (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            dispatch(
              updateTask({
                ...task,
                status: nextStatus[task.status],
              })
            )
          }}
        >
          {task.status === 'todo'
            ? 'Başlat'
            : task.status === 'in_progress'
            ? 'Tamamla'
            : 'Yeniden Başlat'}
        </Button>
      )
    },
  },
]

export default function TasksPage() {
  const tasks = useAppSelector((state) => state.tasks.tasks)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Görevler
        </h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Yeni Görev
        </Button>
      </div>

      <div className="mt-8">
        <DataTable columns={columns} data={tasks} searchKey="title" />
      </div>

      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  )
} 