import { useState } from 'react'
import { EXPENSE_CATEGORIES, type Expense } from '../types/expense.type'

type Props = {
  defaultValues?: Expense
  handleSubmit: (expense: Expense) => void
  onClose: () => void
}

export const ExpenseForm = ({
  defaultValues,
  handleSubmit,
  onClose,
}: Props) => {
  const [inputStates, setInputStates] = useState<
    Pick<Expense, 'name' | 'amount' | 'category'>
  >(
    defaultValues
      ? defaultValues
      : { name: '', amount: 0.1, category: EXPENSE_CATEGORIES[0] },
  )

  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    handleSubmit({
      id: defaultValues?.id ? defaultValues?.id : crypto.randomUUID(),
      name: inputStates?.name,
      amount: inputStates.amount,
      category: inputStates.category,
      date: new Date(),
    })
  }

  return (
    <form
      className='border border-border bg-card p-6 my-4 flex flex-col gap-4'
      onSubmit={onSubmit}
    >
      <div className='flex flex-col gap-1'>
        <label className='text-xs uppercase tracking-wider font-medium text-muted-foreground'>
          Name
        </label>
        <input
          className='rounded-none border border-input bg-transparent px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full'
          type='text'
          placeholder='Coffee...'
          required
          value={inputStates.name}
          onChange={(e) =>
            setInputStates((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </div>

      <div className='flex flex-col gap-1'>
        <label className='text-xs uppercase tracking-wider font-medium text-muted-foreground'>
          Amount
        </label>
        <input
          className='rounded-none border border-input bg-transparent px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full'
          type='number'
          required
          min={0.1}
          step={0.1}
          value={inputStates.amount}
          onChange={(e) =>
            setInputStates((prev) => ({
              ...prev,
              amount: Number(e.target.value),
            }))
          }
        />
      </div>

      <div className='flex flex-col gap-1'>
        <label className='text-xs uppercase tracking-wider font-medium text-muted-foreground'>
          Category
        </label>
        <select
          className='rounded-none border border-input bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full cursor-pointer'
          defaultValue={
            defaultValues?.category
              ? defaultValues.category
              : EXPENSE_CATEGORIES[0]
          }
          onChange={(e) =>
            setInputStates((prev) => ({
              ...prev,
              category: e.target.value as Expense['category'],
            }))
          }
        >
          {EXPENSE_CATEGORIES.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>

      <button
        type='submit'
        className='w-full rounded-none uppercase tracking-wider font-medium text-sm bg-primary text-primary-foreground h-10 px-4 py-2 hover:bg-primary/90 transition-colors self-start cursor-pointer'
      >
        Apply
      </button>
      <button
        onClick={onClose}
        type='button'
        className='w-full rounded-none uppercase tracking-wider font-medium text-sm bg-muted text-primary h-10 px-4 py-2 hover:bg-muted/90 transition-colors self-start cursor-pointer'
      >
        Close
      </button>
    </form>
  )
}
