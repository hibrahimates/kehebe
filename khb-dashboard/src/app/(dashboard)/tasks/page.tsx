'use client'

import { useState } from 'react'
import { useAppSelector } from '@/shared/hooks/use-app-selector'
import { useAppDispatch } from '@/shared/hooks/use-app-dispatch'
import { DataTable } from '@/shared/components/ui/data-table'
import { Button } from '@/shared/components/ui/button'
import { PlusIcon } from '@heroicons/react/24/outline'
import { type Task, addTask } from '@/features/tasks/store'
import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/shared/utils/cn'

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
    accessorKey: 'dueDate',
    header: 'Bitiş Tarihi',
    cell: ({ row }) => {
      const date = new Date(row.getValue('dueDate'))
      return date.toLocaleDateString('tr-TR')
    },
  },
]

export default function TasksPage() {
  const tasks = useAppSelector((state) => state.tasks.tasks)
  const dispatch = useAppDispatch()

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Görevler</h1>
        <Button
          onClick={() => {
            // TODO: Add task modal
            const newTask: Task = {
              id: Math.random().toString(),
              title: 'Yeni Görev',
              description: 'Görev açıklaması',
              status: 'todo',
              priority: 'medium',
              assigneeId: '',
              dueDate: new Date().toISOString(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }
            dispatch(addTask(newTask))
          }}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Yeni Görev
        </Button>
      </div>

      <div className="mt-8">
        <DataTable columns={columns} data={tasks} searchKey="title" />
      </div>
    </div>
  )
} 