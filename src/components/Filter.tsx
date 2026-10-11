import { EXPENSE_CATEGORIES, type ExpenseCategory } from '../types/expense.type'

type Props = {
  activated: ExpenseCategory | null
  setActivated: (category: ExpenseCategory | null) => void
}

export const Filter = ({ activated, setActivated }: Props) => {
  return (
    <div className='flex flex-wrap gap-2 mb-4'>
      {EXPENSE_CATEGORIES.map((e) => (
        <button
          key={e}
          className={[
            'rounded-none uppercase tracking-wider text-xs font-medium h-8 px-3 transition-colors cursor-pointer',
            activated === e
              ? 'bg-primary text-primary-foreground border border-primary'
              : 'border border-border bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground',
          ].join(' ')}
          onClick={() => setActivated(e)}
        >
          {e}
        </button>
      ))}
      <button
        className='rounded-none uppercase tracking-wider text-xs font-medium bg-secondary text-secondary-foreground h-8 px-3 hover:bg-secondary/80 transition-colors'
        onClick={() => setActivated(null)}
      >
        Reset
      </button>
    </div>
  )
}
