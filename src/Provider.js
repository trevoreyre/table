import React, { useReducer } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import orderBy from 'lodash/orderBy'
import Fuse from 'fuse.js'
import { TableContext } from './Context'

const initialState = {
  data: [],
  direction: 'asc',
  fuse: { search: () => [] },
  initialData: [],
  page: undefined,
  perPage: undefined,
  search: '',
  sortBy: undefined,
  selected: [],
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

const getDataAndPagination = ({
  direction,
  fuse,
  initialData,
  page,
  perPage,
  search,
  sortBy,
}) => {
  let data = cloneDeep(initialData)
  if (search) {
    data = fuse.search(search)
  }
  if (sortBy) {
    data = orderBy(data, sortBy, direction)
  }

  const totalPages = Math.ceil(data.length / perPage)

  if (page && perPage) {
    data = data.slice((page - 1) * perPage, page * perPage)
  }

  return { data, totalPages }
}

function reducer(state, action) {
  console.log({ action, state })

  switch (action.type) {
    case 'sort':
      return {
        ...state,
        sortBy: action.sortBy,
        direction: action.direction,
        page: 1,
        ...getDataAndPagination({
          ...state,
          sortBy: action.sortBy,
          direction: action.direction,
          page: 1,
        }),
      }
    case 'search':
      return {
        ...state,
        search: action.search,
        page: 1,
        ...getDataAndPagination({ ...state, search: action.search, page: 1 }),
      }
    case 'changePage':
      return {
        ...state,
        page: action.page,
        ...getDataAndPagination({ ...state, page: action.page }),
      }
    case 'changePerPage':
      return {
        ...state,
        perPage: action.perPage,
        page: 1,
        ...getDataAndPagination({ ...state, perPage: action.perPage, page: 1 }),
      }
    case 'select':
      return {
        ...state,
        selected: action.checked
          ? [...state.selected, action.value]
          : state.selected.filter(value => value !== action.value),
      }
    case 'selectAll':
      return {
        ...state,
        selected: [
          ...state.selected.filter(
            selectedItem =>
              !state.data.map(item => item[action.value]).includes(selectedItem)
          ),
          ...state.data.map(item => item[action.value]),
        ],
      }
    case 'selectNone':
      return {
        ...state,
        selected: state.selected.filter(
          selectedItem =>
            !state.data.map(item => item[action.value]).includes(selectedItem)
        ),
      }
    default:
      return state
  }
}

const Provider = props => {
  const { children, data: dataProp = [{}], page = 1, perPage } = props

  const startState = {
    ...initialState,
    initialData: dataProp,
    page,
    perPage,
    fuse: new Fuse(dataProp, {
      ...searchOptions,
      keys: Object.keys(dataProp[0]),
    }),
  }
  const [state, dispatch] = useReducer(reducer, {
    ...startState,
    ...getDataAndPagination(startState),
  })

  return (
    <TableContext.Provider
      value={{
        ...state,
        // data,
        // totalPages,
        dispatch,
      }}
    >
      {children}
    </TableContext.Provider>
  )
}

Provider.displayName = 'Table.Provider'

export default Provider
