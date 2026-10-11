import { ExpenseForm } from '../components/ExpenseForm'
import { ExpenseCard } from '../components/ExpenseCard'
import { useExpenseContext } from '../hooks/useExpenseContext'
import { useState } from 'react'
import { type Expense, type ExpenseCategory } from '../types/expense.type'
import { Filter } from '../components/Filter'
import { MonthlyAnalytics } from '../components/MonthlyAnalytics'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll'
import { Button } from '../components/Button'

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

  useLockBodyScroll(isFormsVisible.addForm || isFormsVisible.editFrom)

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
      {isFormsVisible.addForm && (
        <div className='fixed top-0 left-0 flex justify-center align-middle w-full h-full bg-black/50'>
          <div className='w-96 m-auto'>
            <ExpenseForm handleSubmit={handleAddExpense} />
          </div>
        </div>
      )}
      {isFormsVisible.editFrom && (
        <div className='fixed top-0 left-0 flex justify-center align-middle w-full h-full bg-black/50'>
          <div className='w-96 m-auto'>
            <ExpenseForm
              defaultValues={editingExpense}
              handleSubmit={editExpense}
            />
          </div>
        </div>
      )}

      <MonthlyAnalytics />

      <Button
        title='Add Expense'
        onClick={() => setIsFormVisible((prev) => ({ ...prev, addForm: true }))}
      />

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
