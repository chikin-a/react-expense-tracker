import { useEffect, useMemo, useState } from 'react'
import type { Expense } from '../types/expense.type'

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const jsonData = localStorage.getItem('expense-data')
    return jsonData ? JSON.parse(jsonData) : []
  })

  useEffect(() => {
    localStorage.setItem('expense-data', JSON.stringify(expenses))
  }, [expenses])

  const addExpense = (data: Expense) => {
    setExpenses((prev) => [data, ...prev])
  }

  const removeExpense = (id: number) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id))
  }

  const updateExpense = (id: number, updates: Partial<Expense>) => {
    setExpenses((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    )
  }

  const groupedByCategory = useMemo(() => {
    return expenses.reduce<Record<string, Expense[]>>((acc, curr) => {
      if (!acc[curr.category]) {
        acc[curr.category] = []
      }

      acc[curr.category].push(curr)
      return acc
    }, {})
  }, [expenses])

  return {
    expenses,
    addExpense,
    removeExpense,
    updateExpense,
    groupedByCategory,
  }
}
