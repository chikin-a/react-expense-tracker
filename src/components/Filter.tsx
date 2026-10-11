import { EXPENSE_CATEGORIES, type ExpenseCategory } from '../types/expense.type'
import type { FilterParamsType } from './ExpenseHistory'

type Props = {
  currentFilterParams: FilterParamsType
  onChangeCategory: (category: ExpenseCategory) => void
  onChangeSortingType: (type: 'ascending' | 'descending') => void
  onReset: () => void
}

export const Filter = ({
  currentFilterParams,
  onChangeCategory,
  onChangeSortingType,
  onReset,
}: Props) => {
  return (
    <div className='flex flex-col flex-wrap gap-2 mb-4'>
      <p className='text-xs uppercase tracking-wider font-medium text-muted-foreground'>CATEGORY:</p>
      <div className='flex'>
        {EXPENSE_CATEGORIES.map((e) => (
          <button
            key={e}
            className={[
              'rounded-none uppercase tracking-wider text-xs font-medium h-8 px-3 transition-colors cursor-pointer',
              currentFilterParams.category === e
                ? 'bg-primary text-primary-foreground border border-primary'
                : 'border border-border bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground',
            ].join(' ')}
            onClick={() => onChangeCategory(e)}
          >
            {e}
          </button>
        ))}
      </div>

      <p className='text-xs uppercase tracking-wider font-medium text-muted-foreground'>SORTING TYPE</p>
      <div className='flex'>
        <button
          className={[
            'rounded-none uppercase tracking-wider text-xs font-medium h-8 px-3 transition-colors cursor-pointer',
            currentFilterParams.sortingType === 'descending'
              ? 'bg-primary text-primary-foreground border border-primary'
              : 'border border-border bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground',
          ].join(' ')}
          onClick={() => onChangeSortingType('descending')}
        >
          DESC
        </button>
        <button
          className={[
            'rounded-none uppercase tracking-wider text-xs font-medium h-8 px-3 transition-colors cursor-pointer',
            currentFilterParams.sortingType === 'ascending'
              ? 'bg-primary text-primary-foreground border border-primary'
              : 'border border-border bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground',
          ].join(' ')}
          onClick={() => onChangeSortingType('ascending')}
        >
          ASC
        </button>
      </div>

      <button
        className='rounded-none uppercase tracking-wider text-xs font-medium bg-secondary text-secondary-foreground h-8 px-3 hover:bg-secondary/80 transition-colors'
        onClick={onReset}
      >
        Reset
      </button>
    </div>
  )
}
