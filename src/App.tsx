import { ExpenseProvider } from './context/ExpenseContext'
import { Home } from './pages/Home'

export const App = () => {
  return (
    <ExpenseProvider>
      <Home />
    </ExpenseProvider>
  )
}
