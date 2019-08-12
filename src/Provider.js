import React, { useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import { compose, curry, orderBy } from 'lodash/fp'
import Fuse from 'fuse.js'
import { TableContext, DispatchContext } from './Context'

// CONTROLLABLE
// [ ] data
// [ ] direction
// [ ] page
// [ ] perPage
// [ ] search ???
// [ ] sortBy
// [ ] selected

const initialState = {
  data: [],
  direction: 'asc',
  fuse: { search: () => [] },
  initialData: [],
  page: 1,
  perPage: undefined,
  search: undefined,
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

const initialize = props => {
  console.log('initialize', props)
  const state = {
    ...initialState,
    ...props,
    initialData: props.data,
    fuse: new Fuse(props.data, {
      ...searchOptions,
      keys: Object.keys(props.data[0]),
    }),
  }
  return {
    ...state,
    ...getData(state),
  }
}

const searchData = curry(({ search, fuse }, { data, ...other }) => {
  const newData = search ? fuse.search(search) : data
  return { ...other, data: newData }
})

const sortData = curry(({ sortBy, direction }, { data, ...other }) => {
  const newData = orderBy(sortBy, direction, data)
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
        direction: action.direction,
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
        search: action.search,
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
  direction: PropTypes.oneOf(['asc', 'desc']),
  defaultDirection: PropTypes.oneOf(['asc', 'desc']),
  page: PropTypes.number,
  defaultPage: PropTypes.number,
  perPage: PropTypes.number,
  defaultPerPage: PropTypes.number,
  // search: undefined,
  sortBy: PropTypes.string,
  defaultSortBy: PropTypes.string,
  selected: PropTypes.array,
  defaultSelected: PropTypes.array,
}

export default Provider
