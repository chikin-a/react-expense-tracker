import { useState } from 'react'
import { useExpenseContext } from '../hooks/useExpenseContext'
import { ExpenseCard } from './ExpenseCard'
import { Filter } from './Filter'
import type { ExpenseCategory } from '../types/expense.type'

export interface FilterParamsType {
  category: ExpenseCategory | null
  sortingType: 'ascending' | 'descending' | null
}

type Props = { handleEditExpense: (id: number) => void }
export const ExpenseHistory = ({ handleEditExpense }: Props) => {
  const { expenses, removeExpense } = useExpenseContext()
  const [filterParams, setFilterParams] = useState<FilterParamsType>({
    category: null,
    sortingType: null,
  })

  const handleChangeCategory = (category: ExpenseCategory) => {
    setFilterParams((prev) => ({
      ...prev,
      category,
    }))
  }

  const handleChangeSortingType = (type: 'ascending' | 'descending') => {
    setFilterParams((prev) => ({ ...prev, sortingType: type }))
  }

  const handleReset = () => {
    setFilterParams(() => ({
      category: null,
      sortingType: null,
    }))
  }

  return (
    <div className='bg-background'>
      <h3 className='text-base font-bold uppercase tracking-wide text-foreground mt-8 mb-3'>
        All Expenses
      </h3>

      <Filter
        currentFilterParams={filterParams}
        onChangeCategory={handleChangeCategory}
        onChangeSortingType={handleChangeSortingType}
        onReset={handleReset}
      />

      {expenses
        .filter((e) =>
          filterParams.category ? e.category === filterParams.category : e,
        )
        .sort((a, b) => {
          if (filterParams.sortingType) {
            if (filterParams.sortingType === 'descending') {
              return b.amount - a.amount
            } else if (filterParams.sortingType === 'ascending') {
              return a.amount - b.amount
            }
          }
          return 0
        })
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
