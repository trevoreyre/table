import React, { useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import { compose, curry, orderBy } from 'lodash/fp'
import Fuse from 'fuse.js'
import { TableContext, DispatchContext } from './Context'

// CONTROLLABLE
// [ ] page
//     [x] on Provider
//     [ ] on Pagination
// [ ] perPage
//     [ ] on Provider
//     [ ] on Pagination
// [ ] onChangePage
//     [ ] on Provider
//     [ ] on Pagination (as onChange)
// [ ] onChangePerPage
//     [ ] on Provider
//     [ ] on Pagination
// [ ] searchValue
//     [ ] on Provider
//     [ ] on Search (as value/defaultValue)
// [ ] onChangeSearchValue
//     [ ] on Provider
//     [ ] on Search (as onChange)
// [ ] sortBy
// [ ] sortDirection
// [ ] onSort
// [ ] selected
// [ ] onSelect
// [ ] onSelectAll
// [ ] onSelectNone
// [ ] onSelectClear

// Should the following be controllable?
//
// --- data ---
//
// Does controlled data prop make sense? In that case none of the sorting/filtering components
// or options would have any effect since they can't change the value of data. And since the
// table would render data exactly as is, you could just render the table yourself instead.
//
// One possible use case - you control data and all values of context, but you want to use
// table components that automatically read those values out of context, without having to
// set them yourself.
//
// Possible props
//
// sort - Function called when clicking a sortable Cell
// onSort
// onChangePerPage
// onChangeSearchValue
// onSelect
// onSelectAll
// onSelectNone
// onSelectClear

const searchOptions = {
  threshold: 0.3,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
}

const defaultSearch = ({ searchValue, searchKeys, data }) => {
  console.log('defaultSearch:', { searchValue, searchKeys })
  if (searchValue) {
    const fuse = new Fuse(data, {
      ...searchOptions,
      keys: searchKeys || Object.keys(data[0]),
    })
    return fuse.search(searchValue)
  }
  return data
}

const initialState = {
  data: [],
  initialData: [],
  onChangePage: undefined,
  page: 1,
  pageIsControlled: false,
  perPage: undefined,
  perPageIsControlled: false,
  search: defaultSearch,
  searchKeys: undefined,
  searchValue: undefined,
  selected: [],
  sortBy: undefined,
  sortDirection: 'asc',
}

const initialize = props => {
  const {
    data,
    defaultPage,
    defaultPerPage,
    onChangePage,
    page,
    perPage,
  } = props

  console.log('initialize', props)
  const state = {
    ...initialState,
    // ...props,
    ...(defaultPage !== undefined ? { page: defaultPage } : {}),
    ...(page !== undefined ? { page } : {}),
    pageIsControlled: page !== undefined,
    onChangePage,
    ...(defaultPerPage !== undefined ? { perPage: defaultPerPage } : {}),
    ...(perPage !== undefined ? { perPage } : {}),
    perPageIsControlled: perPage !== undefined,
    initialData: data,
  }
  console.log('initialized state:', state)
  return {
    ...state,
    ...getData(state),
  }
}

const searchData = curry(
  ({ search, searchValue, searchKeys }, { data, ...other }) => {
    return {
      ...other,
      data: search({ searchValue, searchKeys, data }),
    }
  }
)

const sortData = curry(({ sortBy, sortDirection }, { data, ...other }) => {
  const lowerCaseItem = item =>
    typeof item[sortBy] === 'string' ? item[sortBy].toLowerCase() : item[sortBy]

  const newData = orderBy(lowerCaseItem, sortDirection, data)
  return { ...other, data: newData }
})

const paginateData = curry(({ page, perPage }, { data, ...other }) => {
  const totalPages = perPage ? Math.ceil(data.length / perPage) : 1
  const newPage = Math.min(totalPages, Math.max(1, page))
  const newData =
    newPage && perPage
      ? data.slice((newPage - 1) * perPage, newPage * perPage)
      : data
  return { ...other, data: newData, page: newPage, totalPages }
})

const getData = ({ initialData, ...state }) => {
  return compose(
    paginateData(state),
    sortData(state),
    searchData(state)
  )({ data: initialData })
}

function reducer(state, action) {
  console.log({ action, state })

  switch (action.type) {
    case 'syncProp':
      if (action.value === undefined) {
        return state
      }
      const newState = {
        ...state,
        [action.name]: action.value,
      }
      return {
        ...newState,
        ...getData(newState),
      }
    case 'sort': {
      const newState = {
        ...state,
        sortBy: action.sortBy,
        sortDirection: action.sortDirection,
        page: 1,
      }
      return {
        ...newState,
        ...getData(newState),
      }
    }
    case 'search': {
      const newState = {
        ...state,
        searchValue: action.searchValue,
        page: 1,
      }
      return {
        ...newState,
        ...getData(newState),
      }
    }
    case 'changePage': {
      if (state.pageIsControlled) {
        return state
      }
      const newState = {
        ...state,
        page: action.page,
      }
      return {
        ...newState,
        ...getData(newState),
      }
    }
    case 'changePerPage': {
      const newState = {
        ...state,
        perPage: action.perPage,
        page: 1,
      }
      return {
        ...newState,
        ...getData(newState),
      }
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
    case 'selectClear':
      return {
        ...state,
        selected: [],
      }
    default:
      return state
  }
}

const Provider = props => {
  const { children, data, page, ...other } = props

  const [state, dispatch] = useReducer(reducer, props, initialize)
  console.log({ state })

  // useEffect(() => {
  //   dispatch({ type: 'syncProp', name: 'data', value: data })
  // }, [data])
  useEffect(() => {
    dispatch({ type: 'syncProp', name: 'page', value: page })
  }, [page])

  return (
    <TableContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {typeof children === 'function' ? children(state, dispatch) : children}
      </DispatchContext.Provider>
    </TableContext.Provider>
  )
}

Provider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  data: PropTypes.any,
  defaultPage: PropTypes.number,
  defaultPerPage: PropTypes.number,
  defaultSearchValue: PropTypes.string,
  defaultSelected: PropTypes.array,
  defaultSortBy: PropTypes.string,
  defaultSortDirection: PropTypes.oneOf(['asc', 'desc']),
  onChangePage: PropTypes.func,
  page: PropTypes.number,
  perPage: PropTypes.number,
  search: PropTypes.func,
  searchKeys: PropTypes.array,
  searchValue: PropTypes.string,
  selected: PropTypes.array,
  sortBy: PropTypes.string,
  sortDirection: PropTypes.oneOf(['asc', 'desc']),
}

export default Provider
