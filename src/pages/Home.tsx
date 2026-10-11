import { ExpenseForm } from '../components/ExpenseForm'
import { ExpenseCard } from '../components/ExpenseCard'
import { useExpenseContext } from '../hooks/useExpenseContext'
import { useState } from 'react'
import { type Expense, type ExpenseCategory } from '../types/expense.type'
import { Filter } from '../components/Filter'
import { MonthlyAnalytics } from '../components/MonthlyAnalytics'

export const Home = () => {
  const { expenses, addExpense, updateExpense, removeExpense } =
    useExpenseContext()
  const [isFormsVisible, setIsFormVisible] = useState({
    addForm: false,
    editFrom: false,
  })
  const [editingExpense, setEditingExpense] = useState<Expense>()
  const [filterOptions, setFilterOptions] = useState<ExpenseCategory | null>(
    null,
  )

  const handleAddExpense = (data: Expense) => {
    addExpense(data)
    setIsFormVisible((prev) => ({ ...prev, addForm: false }))
  }

  const editExpense = ({ id, name, amount, category }: Expense) => {
    updateExpense(id, { name, amount, category })
    setIsFormVisible((prev) => ({ ...prev, editFrom: false }))
  }

  const handleEditExpense = (id: number) => {
    setEditingExpense(() => expenses.find((e) => e.id === id))
    setIsFormVisible((prev) => ({ ...prev, editFrom: true }))
  }

  return (
    <div className='max-w-3xl mx-auto px-4 py-8 min-h-screen bg-background'>
      <button
        className='rounded-none uppercase tracking-wider font-medium text-sm bg-primary text-primary-foreground h-10 px-4 py-2 transition-colors hover:bg-primary/90'
        onClick={() => setIsFormVisible((prev) => ({ ...prev, addForm: true }))}
      >
        Add Expense
      </button>

      {isFormsVisible.addForm && (
        <ExpenseForm handleSubmit={handleAddExpense} />
      )}
      {isFormsVisible.editFrom && (
        <ExpenseForm
          defaultValues={editingExpense}
          handleSubmit={editExpense}
        />
      )}

      <MonthlyAnalytics />

      <h3 className='text-base font-bold uppercase tracking-wide text-foreground mt-8 mb-3'>
        All Expenses
      </h3>
      <Filter activated={filterOptions} setActivated={setFilterOptions} />
      {expenses
        .filter((e) => (filterOptions ? e.category === filterOptions : e))
        .map((e) => (
          <ExpenseCard
            key={e.id}
            data={e}
            onEdit={handleEditExpense}
            onDelete={removeExpense}
          />
        ))}
    </div>
  )
}
