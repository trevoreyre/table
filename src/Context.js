import { createContext, useContext } from 'react'

const TableContext = createContext()
const DispatchContext = createContext()
const DataContext = createContext()
const LevelContext = createContext('body')
const SortContext = createContext({ active: false, sortDirection: 'asc' })

const useTableState = () => {
  const state = useContext(TableContext)
  // if (context === undefined) {
  //   throw new Error('This component must be used within Table.Provider')
  // }
  return state
}

const paginateData = ({ page, perPage }, data) => {
  const totalPages = perPage ? Math.ceil(data.length / perPage) : 1
  const safePage = Math.min(totalPages, Math.max(1, page))
  console.log('paginateData', { page, perPage, data })
  return safePage && perPage
    ? data.slice((safePage - 1) * perPage, safePage * perPage)
    : data
}

const useTableDispatch = () => {
  const dispatch = useContext(DispatchContext)
  // if (context === undefined) {
  //   throw new Error('This component must be used within Table.Provider')
  // }
  return dispatch
}

// Add option { paginated: true/false }
const useTableData = ({ paginated } = {}) => {
  const state = useContext(TableContext)
  const data = useContext(DataContext)

  if (paginated) {
    return paginateData(state, data)
  }
  return data
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
