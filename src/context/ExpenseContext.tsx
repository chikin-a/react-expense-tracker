import { createContext, type FC, type ReactNode } from 'react'
import type { Expense } from '../types/expense.type'
import { useExpenses } from '../hooks/useExpenses'

interface ExpenseContextType {
  expenses: Expense[]
  addExpense: (data: Expense) => void
  removeExpense: (id: string) => void
  updateExpense: (id: string, updates: Partial<Expense>) => void
  groupedByCategory: Record<string, Expense[]>
}

export const ExpenseContext = createContext<ExpenseContextType | undefined>(
  undefined,
)

export const ExpenseProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const {
    expenses,
    addExpense,
    removeExpense,
    updateExpense,
    groupedByCategory,
  } = useExpenses()

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        addExpense,
        removeExpense,
        updateExpense,
        groupedByCategory,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  )
}
