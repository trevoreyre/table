import { createContext, useContext } from 'react'

const TableContext = createContext()
const DispatchContext = createContext()
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

export {
  TableContext,
  DispatchContext,
  LevelContext,
  SortContext,
  useTableState,
  useTableDispatch,
}
