import { useExpenseContext } from '../hooks/useExpenseContext'

export const MonthlyAnalytics = () => {
  const { expenses, groupedByCategory } = useExpenseContext()

  return (
    <div className="border border-border bg-card p-6 my-6">
      <h3 className="text-base font-bold uppercase tracking-wide text-card-foreground mb-1">
        Categories
      </h3>
      <p className="text-xs text-muted-foreground mb-5">
        Grouped expenses by category
      </p>

      <div className="flex flex-col">
        {Object.entries(groupedByCategory).map(([category, items]) => {
          const totalByCategory = items.reduce(
            (sum, item) => sum + item.amount,
            0,
          )

          return (
            <div
              key={category}
              className="flex justify-between items-center py-3 border-b border-border last:border-b-0"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-muted flex items-center justify-center text-muted-foreground text-xs font-bold uppercase shrink-0">
                  {category.charAt(0)}
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-medium text-foreground uppercase tracking-wide">
                    {category}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {items.length} {items.length === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>
              <p className="text-sm font-bold tabular-nums text-foreground">
                {totalByCategory}
              </p>
            </div>
          )
        })}
      </div>

      <div className="flex justify-between pt-4 border-t border-border">
        <span className="text-sm font-bold uppercase tracking-wider text-foreground">
          Total
        </span>
        <span className="text-sm font-bold tabular-nums text-foreground">
          {expenses.reduce((sum, item) => sum + item.amount, 0)}
        </span>
      </div>
    </div>
  )
}
