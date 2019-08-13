import React, { useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import { compose, curry, orderBy } from 'lodash/fp'
import Fuse from 'fuse.js'
import { TableContext, DispatchContext } from './Context'

// CONTROLLABLE
// [ ] page
// [ ] perPage
// [ ] searchFor
// [ ] sortBy
// [ ] sortsortDirection
// [ ] selected

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

const searchOptions = {
  threshold: 0.3,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
}

const defaultSearch = ({ searchFor, searchKeys, data }) => {
  console.log('defaultSearch:', { searchFor, searchKeys })
  if (searchFor) {
    const fuse = new Fuse(data, {
      ...searchOptions,
      keys: searchKeys || Object.keys(data[0]),
    })
    return fuse.search(searchFor)
  }
  return data
}

const initialState = {
  data: [],
  sortDirection: 'asc',
  initialData: [],
  page: 1,
  perPage: undefined,
  search: defaultSearch,
  searchFor: undefined,
  searchKeys: undefined,
  sortBy: undefined,
  selected: [],
}

const initialize = props => {
  console.log('initialize', props)
  const state = {
    ...initialState,
    ...props,
    initialData: props.data,
  }
  return {
    ...state,
    ...getData(state),
  }
}

const searchData = curry(
  ({ search, searchFor, searchKeys }, { data, ...other }) => {
    return {
      ...other,
      data: search({ searchFor, searchKeys, data }),
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
    case 'updateData':
      return initialize({ ...state, data: action.data })
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
        searchFor: action.searchFor,
        page: 1,
      }
      return {
        ...newState,
        ...getData(newState),
      }
    }
    case 'changePage': {
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
  const { children, ...other } = props

  const [state, dispatch] = useReducer(reducer, other, initialize)
  console.log({ state })

  useEffect(() => {
    dispatch({ type: 'updateData', data: other.data })
  }, [other.data])

  return (
    <TableContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {typeof children === 'function' ? children(state, dispatch) : children}
      </DispatchContext.Provider>
    </TableContext.Provider>
  )
}

Provider.propTypes = {
  data: PropTypes.any,
  sortDirection: PropTypes.oneOf(['asc', 'desc']),
  defaultSortDirection: PropTypes.oneOf(['asc', 'desc']),
  page: PropTypes.number,
  defaultPage: PropTypes.number,
  perPage: PropTypes.number,
  defaultPerPage: PropTypes.number,
  search: PropTypes.func,
  searchFor: PropTypes.string,
  defaultSearchFor: PropTypes.string,
  searchKeys: PropTypes.array,
  sortBy: PropTypes.string,
  defaultSortBy: PropTypes.string,
  selected: PropTypes.array,
  defaultSelected: PropTypes.array,
}

export default Provider
