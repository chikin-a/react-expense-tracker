import { ExpenseForm } from '../components/ExpenseForm'
import { useExpenseContext } from '../hooks/useExpenseContext'
import { useState } from 'react'
import { type Expense } from '../types/expense.type'
import { MonthlyAnalytics } from '../components/MonthlyAnalytics'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll'
import { Button } from '../components/Button'
import { ExpenseHistory } from '../components/ExpenseHistory'

export const Home = () => {
  const { expenses, addExpense, updateExpense } = useExpenseContext()
  const [isFormsVisible, setIsFormVisible] = useState({
    addForm: false,
    editForm: false,
  })
  const [editingExpense, setEditingExpense] = useState<Expense>()

  useLockBodyScroll(isFormsVisible.addForm || isFormsVisible.editForm)

  const handleAddExpense = (data: Expense) => {
    addExpense(data)
    setIsFormVisible((prev) => ({ ...prev, addForm: false }))
  }

  const editExpense = ({ id, name, amount, category }: Expense) => {
    updateExpense(id, { name, amount, category })
    setIsFormVisible((prev) => ({ ...prev, editFrom: false }))
  }

  const handleEditExpense = (id: string) => {
    setEditingExpense(() => expenses.find((e) => e.id === id))
    setIsFormVisible((prev) => ({ ...prev, editFrom: true }))
  }

  return (
    <div className='max-w-3xl mx-auto px-4 py-8 min-h-screen bg-background'>
      {isFormsVisible.addForm && (
        <div className='fixed top-0 left-0 flex justify-center align-middle w-full h-full bg-black/50'>
          <div className='w-96 m-auto'>
            <ExpenseForm
              handleSubmit={handleAddExpense}
              onClose={() =>
                setIsFormVisible(() => ({ addForm: false, editForm: false }))
              }
            />
          </div>
        </div>
      )}
      {isFormsVisible.editForm && (
        <div className='fixed top-0 left-0 flex justify-center align-middle w-full h-full bg-black/50'>
          <div className='w-96 m-auto'>
            <ExpenseForm
              defaultValues={editingExpense}
              handleSubmit={editExpense}
              onClose={() =>
                setIsFormVisible(() => ({ addForm: false, editForm: false }))
              }
            />
          </div>
        </div>
      )}

      <MonthlyAnalytics />

      <Button
        title='Add Expense'
        onClick={() => setIsFormVisible((prev) => ({ ...prev, addForm: true }))}
      />

      <ExpenseHistory handleEditExpense={handleEditExpense} />
    </div>
  )
}
