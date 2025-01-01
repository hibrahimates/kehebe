'use client'

import { useState } from 'react'
import { Table } from './table'
import { Button } from './button'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { cn } from '@/shared/utils/cn'

interface Column {
  key: string
  title: string
  type: 'string' | 'integer' | 'float' | 'date' | 'boolean' | 'select'
  options?: { value: string; label: string }[]
}

interface DataTableProps {
  columns: Column[]
  initialData?: any[]
  onSubmit?: (formData: any, isEdit: boolean) => void
  onDelete?: (row: any) => boolean
}

export function DataTable({ columns, initialData = [], onSubmit, onDelete }: DataTableProps) {
  const [data, setData] = useState(initialData)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState<any>(null)
  const [formData, setFormData] = useState<any>({})

  const handleAdd = () => {
    setSelectedRow(null)
    setFormData({})
    setIsDrawerOpen(true)
  }

  const handleEdit = (row: any) => {
    setSelectedRow(row)
    setFormData({ ...row })
    setIsDrawerOpen(true)
  }

  const handleDelete = (row: any) => {
    if (window.confirm('Bu kaydı silmek istediğinizden emin misiniz?')) {
      if (onDelete && onDelete(row)) {
        const idField = columns.find(col => col.key.toLowerCase().includes('id'))?.key
        if (idField) {
          setData(data.filter(item => item[idField] !== row[idField]))
        }
      }
    }
  }

  const handleSubmit = () => {
    const idField = columns.find(col => col.key.toLowerCase().includes('id'))?.key
    if (idField) {
      if (selectedRow) {
        // Edit
        if (onSubmit) {
          onSubmit(formData, true)
        }
        setData(data.map(item => 
          item[idField] === selectedRow[idField] ? { ...item, ...formData } : item
        ))
      } else {
        // Add
        const newId = data.length > 0 
          ? Math.max(...data.map(item => item[idField])) + 1 
          : 1
        const newRow = { ...formData, [idField]: newId }
        if (onSubmit) {
          onSubmit(newRow, false)
        }
        setData([...data, newRow])
      }
    }
    setIsDrawerOpen(false)
  }

  const renderFormField = (column: Column) => {
    const value = formData[column.key]
    const isIdField = column.key.toLowerCase().includes('id')

    switch (column.type) {
      case 'boolean':
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) =>
                setFormData({ ...formData, [column.key]: e.target.checked })
              }
              disabled={isIdField}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        )
      case 'date':
        return (
          <input
            type="date"
            value={value ? new Date(value).toISOString().split('T')[0] : ''}
            onChange={(e) =>
              setFormData({ ...formData, [column.key]: e.target.value })
            }
            disabled={isIdField}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        )
      case 'float':
      case 'integer':
        return (
          <input
            type="number"
            value={value || ''}
            step={column.type === 'float' ? '0.01' : '1'}
            onChange={(e) =>
              setFormData({
                ...formData,
                [column.key]:
                  column.type === 'float'
                    ? parseFloat(e.target.value)
                    : parseInt(e.target.value),
              })
            }
            disabled={isIdField}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        )
      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) =>
              setFormData({ ...formData, [column.key]: e.target.value })
            }
            disabled={isIdField}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">Seçiniz...</option>
            {column.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )
      default:
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) =>
              setFormData({ ...formData, [column.key]: e.target.value })
            }
            disabled={isIdField}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        )
    }
  }

  return (
    <div className="relative">
      <div className="mb-4 flex justify-between items-center">
        <Button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Yeni Ekle
        </Button>
      </div>

      <Table
        columns={columns}
        data={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Drawer */}
      <div className={cn(
        "fixed inset-0 z-50",
        isDrawerOpen ? "visible" : "invisible"
      )}>
        <div
          className={cn(
            "fixed inset-0 bg-black/50 transition-opacity duration-300",
            isDrawerOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setIsDrawerOpen(false)}
        />
        <div className={cn(
          "fixed right-0 top-0 h-full w-[400px] bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out",
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {selectedRow ? 'Düzenle' : 'Yeni Ekle'}
              </h2>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <XMarkIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                {columns.map((column) => (
                  <div key={column.key}>
                    <label
                      htmlFor={column.key}
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      {column.title}
                    </label>
                    {renderFormField(column)}
                  </div>
                ))}
              </form>
            </div>

            <div className="p-4 border-t dark:border-gray-800">
              <Button
                onClick={handleSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {selectedRow ? 'Güncelle' : 'Kaydet'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 