import type { Expense } from '../types/expense.type'

type Props = {
  data: Expense
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

export const ExpenseCard = ({ data, onEdit, onDelete }: Props) => {
  return (
    <div className="flex items-center gap-3 border-b border-border bg-card text-card-foreground px-4 py-3">
      <p className="flex-1 text-sm text-foreground">
        <span className="text-xs uppercase tracking-wider text-muted-foreground mr-1">Name</span>
        {data.name}
      </p>
      <p className="flex-1 text-sm font-bold tabular-nums text-foreground">
        <span className="text-xs uppercase tracking-wider text-muted-foreground mr-1">$</span>
        {data.amount}
      </p>
      <p className="flex-1 text-xs uppercase tracking-wider text-muted-foreground">
        {data.category}
      </p>
      <div className="flex gap-2">
        <button
          className="rounded-none uppercase tracking-wider text-xs font-medium border border-border bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground h-8 px-3 transition-colors"
          onClick={() => onEdit(data.id)}
        >
          Edit
        </button>
        <button
          className="rounded-none uppercase tracking-wider text-xs font-medium bg-destructive text-foreground hover:bg-destructive/80 h-8 px-3 transition-colors"
          onClick={() => onDelete(data.id)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}
