import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import { capitalize, compose, curry, orderBy } from 'lodash/fp'
import Fuse from 'fuse.js'
import { TableContext, DispatchContext, DataContext } from './Context'

// Try making controllable only on sub-components

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

// Should data be controllable?
//
// Does controlled data prop make sense? In that case none of the sorting/filtering components
// or options would have any effect since they can't change the value of data. And since the
// table would render data exactly as is, you could just render the table yourself instead.
//
// One possible use case - you control data and all values of context, but you want to use
// table components that automatically read those values out of context, without having to set
// them yourself. Also event handlers would be fired without you having to wire all of that up.

const searchOptions = {
  threshold: 0.3,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
}

const defaultSearch = ({ searchValue, searchKeys, data }) => {
  if (searchValue) {
    const fuse = new Fuse(data, {
      ...searchOptions,
      keys: searchKeys || Object.keys(data[0]),
    })
    return fuse.search(searchValue)
  }
  return data
}

const defaultSort = ({ sortBy, sortDirection, data }) => {
  const lowerCaseItem = item =>
    typeof item[sortBy] === 'string' ? item[sortBy].toLowerCase() : item[sortBy]
  return orderBy(lowerCaseItem, sortDirection, data)
}

const initialState = {
  data: [],
  dataIsControlled: false,
  initialData: [],
  onChangePage: undefined,
  page: 1,
  pageIsControlled: false,
  perPage: undefined,
  perPageIsControlled: false,
  search: defaultSearch,
  searchIsControlled: false,
  searchKeys: undefined,
  searchValue: undefined,
  searchValueIsControlled: false,
  selected: [],
  selectedIsControlled: false,
  sort: defaultSort,
  sortIsControlled: false,
  sortBy: undefined,
  sortByIsControlled: false,
  sortDirection: 'asc',
  sortDirectionIsControlled: false,
  dispatchData: () => {},
}

const dataProps = ['searchValue', 'sortBy', 'sortDirection']

const initialize = props => {
  console.log('initialize:', props)
  const state = { ...initialState }

  Object.keys(initialState).forEach(key => {
    const prop = props[key]
    const defaultProp = props[`default${capitalize(key)}`]

    if (prop !== undefined) {
      state[key] = prop
      state[`${key}IsControlled`] = true
    } else if (defaultProp !== undefined) {
      state[key] = defaultProp
    }
  })
  // state.initialData = props.data

  // return {
  //   ...state,
  //   ...getData(state),
  // }
  return state
}

const searchData = curry(({ search, searchValue, searchKeys }, data) => {
  return search({ searchValue, searchKeys, data })
})

const sortData = curry(({ sort, sortBy, sortDirection }, data) => {
  return sort({ sortBy, sortDirection, data })
})

const getData = state =>
  compose(
    sortData(state),
    searchData(state)
  )

const dataReducer = (state, action) => {
  console.log('dataReducer', action.type, { action, state })
  switch (action.type) {
    case 'getData': {
      return getData(action.state)(action.state.data)
    }
    default:
      return state
  }
}

const reducer = (state, action) => {
  console.log('reducer', action.type, { action, state })

  switch (action.type) {
    case 'initialize': {
      return initialize(action.props)
    }
    case 'syncProps': {
      const newState = { ...state, ...action.props }
      let updateData = true
      Object.keys(action.props).forEach(prop => {
        if (state[`${prop}Initialized`] && !dataProps.includes(prop)) {
          updateData = false
        }
      })
      if (updateData) {
        state.dispatchData({ type: 'getData', state: newState })
      }
      return newState
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
      return {
        ...state,
        page: action.page,
      }
    }
    case 'changePerPage': {
      if (state.perPageIsControlled) {
        return state
      }
      return {
        ...state,
        perPage: action.perPage,
        page: 1,
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
  const { children } = props

  const [stateData, dispatchData] = useReducer(dataReducer)
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    dispatchData,
  })

  console.log('Provider.render', { state, data: stateData })
  return (
    <TableContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <DataContext.Provider value={stateData}>
          {typeof children === 'function'
            ? children(state, dispatch)
            : children}
        </DataContext.Provider>
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
  onChangePerPage: PropTypes.func,
  onSearch: PropTypes.func, // onChangeSearchValue???
  onSelect: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectClear: PropTypes.func,
  onSelectNone: PropTypes.func,
  onSort: PropTypes.func,
  page: PropTypes.number,
  perPage: PropTypes.number,
  search: PropTypes.func,
  searchKeys: PropTypes.array,
  searchValue: PropTypes.string,
  selected: PropTypes.array,
  sort: PropTypes.func,
  sortBy: PropTypes.string,
  sortDirection: PropTypes.oneOf(['asc', 'desc']),
}

export default Provider
