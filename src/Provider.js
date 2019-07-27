import React, { useReducer } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import orderBy from 'lodash/orderBy'
import Fuse from 'fuse.js'
import { TableContext } from './Context'

const initialState = {
  direction: 'asc',
  fuse: { search: () => [] },
  initialData: [],
  page: undefined,
  perPage: undefined,
  search: '',
  sortBy: undefined,
}

const searchOptions = {
  threshold: 0.3,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
}

const getFilteredData = ({ direction, fuse, initialData, search, sortBy }) => {
  let data = cloneDeep(initialData)
  if (search) {
    data = fuse.search(search)
  }
  if (sortBy) {
    data = orderBy(data, sortBy, direction)
  }
  return data
}

const getTotalPages = ({ data, perPage }) => Math.ceil(data.length / perPage)

function reducer(state, action) {
  console.log({ action, state })

  switch (action.type) {
    case 'sort':
      return {
        ...state,
        sortBy: action.sortBy,
        direction: action.direction,
        page: 1,
      }
    case 'search':
      return {
        ...state,
        search: action.search,
        page: 1,
      }
    case 'changePage':
      return {
        ...state,
        page: action.page,
      }
    default:
      return state
  }
}

const Provider = props => {
  const { children, data: dataProp = [{}], page, perPage } = props
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    initialData: dataProp,
    page,
    perPage,
    fuse: new Fuse(dataProp, {
      ...searchOptions,
      keys: Object.keys(dataProp[0]),
    }),
  })

  let filteredData = getFilteredData(state)
  const totalPages = getTotalPages({ ...state, data: filteredData })
  const data =
    state.page && state.perPage
      ? filteredData.slice(
          (state.page - 1) * state.perPage,
          state.page * state.perPage
        )
      : filteredData

  return (
    <TableContext.Provider
      value={{
        ...state,
        data,
        totalPages,
        dispatch,
      }}
    >
      {children}
    </TableContext.Provider>
  )
}

Provider.displayName = 'Table.Provider'

export default Provider
