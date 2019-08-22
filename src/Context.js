import { createContext, useContext } from 'react'

const TableContext = createContext()
const DispatchContext = createContext()
const DataContext = createContext()
const LevelContext = createContext('body')
const SortContext = createContext({ active: false, sortDirection: 'asc' })

const useTableState = () => {
  const context = useContext(TableContext)
  // if (context === undefined) {
  //   throw new Error('This component must be used within Table.Provider')
  // }
  return context
}

const useTableDispatch = () => {
  const context = useContext(DispatchContext)
  // if (context === undefined) {
  //   throw new Error('This component must be used within Table.Provider')
  // }
  return context
}

// Add option { paginated: true/false }
const useTableData = () => {
  const context = useContext(DataContext)
  return context
}

export {
  TableContext,
  DataContext,
  DispatchContext,
  LevelContext,
  SortContext,
  useTableState,
  useTableDispatch,
  useTableData,
}
