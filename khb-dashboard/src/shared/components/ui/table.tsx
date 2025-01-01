'use client'

import { useState } from 'react'
import { ChevronUpDownIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

interface Column {
  key: string
  title: string
  type: 'string' | 'integer' | 'float' | 'date' | 'boolean' | 'select'
  options?: { value: string; label: string }[]
}

interface TableProps {
  columns: Column[]
  data: any[]
  onEdit?: (row: any) => void
  onDelete?: (row: any) => void
}

export function Table({ columns, data = [], onEdit, onDelete }: TableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: 'asc' | 'desc'
  } | null>(null)
  const [deleteHighlight, setDeleteHighlight] = useState<number | null>(null)

  const handleSort = (key: string) => {
    setSortConfig((current) => ({
      key,
      direction:
        current?.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const handleDelete = async (row: any, index: number) => {
    setDeleteHighlight(index)
    await new Promise(resolve => setTimeout(resolve, 500))
    onDelete?.(row)
    setDeleteHighlight(null)
  }

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0
    const aValue = a[sortConfig.key]
    const bValue = b[sortConfig.key]
    if (aValue === bValue) return 0
    if (aValue === null || aValue === undefined) return 1
    if (bValue === null || bValue === undefined) return -1

    switch (columns.find(col => col.key === sortConfig.key)?.type) {
      case 'date':
        return sortConfig.direction === 'asc'
          ? new Date(aValue).getTime() - new Date(bValue).getTime()
          : new Date(bValue).getTime() - new Date(aValue).getTime()
      case 'float':
      case 'integer':
        return sortConfig.direction === 'asc'
          ? Number(aValue) - Number(bValue)
          : Number(bValue) - Number(aValue)
      default:
        return sortConfig.direction === 'asc'
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue))
    }
  })

  const renderValue = (value: any, column: Column) => {
    if (value === null || value === undefined) return '-'

    switch (column.type) {
      case 'date':
        return new Date(value).toLocaleDateString()
      case 'boolean':
        return value ? 'Evet' : 'Hayır'
      case 'float':
        return Number(value).toLocaleString('tr-TR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      case 'integer':
        return Number(value).toLocaleString('tr-TR')
      case 'select':
        return column.options?.find(option => option.value === value)?.label || value
      default:
        return String(value)
    }
  }

  return (
    <div className="overflow-x-auto rounded-lg border dark:border-gray-800">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
              >
                <div className="flex items-center space-x-1">
                  <span>{column.title}</span>
                  <ChevronUpDownIcon
                    className="h-4 w-4 cursor-pointer"
                    onClick={() => handleSort(column.key)}
                  />
                </div>
              </th>
            ))}
            <th scope="col" className="relative px-6 py-3 w-24">
              <span className="sr-only">İşlemler</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-800">
          {sortedData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
              >
                Veri bulunamadı
              </td>
            </tr>
          ) : (
            sortedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 ${
                  deleteHighlight === rowIndex ? 'bg-red-100 dark:bg-red-900 opacity-0' : ''
                }`}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300"
                  >
                    {renderValue(row[column.key], column)}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(row)}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => handleDelete(row, rowIndex)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
} 