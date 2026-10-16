export const EXPENSE_CATEGORIES = [
  'Food',
  'Transport',
  'Housing',
  'Entertainment',
  'Shopping',
  'Health',
  'Other',
] as const

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number]

export interface Expense {
  id: string
  name: string
  amount: number
  category: ExpenseCategory
  date: Date
}
