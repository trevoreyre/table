import React, { useReducer } from 'react'
import orderBy from 'lodash/orderBy'
import Fuse from 'fuse.js'
import { TableContext } from './Context'

const initialState = {
  initialData: [],
  data: [],
  fuse: { search: () => [] },
  sortBy: undefined,
  direction: 'asc',
  search: '',
};

const searchOptions = {
  threshold: 0.3,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
}

function reducer(state, action) {
  console.log({ action, state })

  switch (action.type) {
    case 'sort':
      return {
        ...state,
        sortBy: action.sortBy,
        direction: action.direction,
        data: orderBy(
          state.search ? state.fuse.search(state.search) : state.initialData,
          action.sortBy,
          action.direction
        )
      }
    case 'search':
      return {
        ...state,
        search: action.search,
        data: orderBy(
          action.search ? state.fuse.search(action.search) : state.initialData,
          state.sortBy,
          state.direction
        )
      }
    default:
      return state
  }
}

const Provider = props => {
  const { children, data = [{}] } = props
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    initialData: data,
    data,
    fuse: new Fuse(data, { ...searchOptions, keys: Object.keys(data[0])})
  })

  return (
    <TableContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TableContext.Provider>
  )
}

Provider.displayName = 'Table.Provider'

export default Provider
