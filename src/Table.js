import React, { useReducer } from 'react'
import orderBy from 'lodash/orderBy'
import { TableContext } from './Context'
import Body from './Body'
import Cell from './Cell'
import Filter from './Filter'
import Footer from './Footer'
import Header from './Header'
import Row from './Row'

const initialState = {
  sortBy: undefined,
  direction: 'asc',
  filter: '',
};

function reducer(state, action) {
  console.log({ action, state })
  switch (action.type) {
    case 'sort':
      return {
        ...state,
        sortBy: action.sortBy,
        direction: action.direction
      }
    case 'filter':
      return {
        ...state,
        filter: action.filter,
      }
    default:
      return state
  }
}

const Table = props => {
  const { children, data, ...other } = props
  const [state, dispatch] = useReducer(reducer, initialState)

  const onSort = (sortBy, direction) => dispatch({ type: 'sort', sortBy, direction })

  const onFilter = filter => dispatch({ type: 'filter', filter })

  const filteredData = data.filter(item => item.name.toLowerCase().startsWith(state.filter.toLowerCase()))

  const displayData = orderBy(
    filteredData,
    state.sortBy,
    state.direction
  )
  console.log({ data, filteredData, displayData, state })

  return (
    <TableContext.Provider value={{ ...state, data: displayData, onFilter, onSort }}>
      <table {...other}>{children}</table>
    </TableContext.Provider>
  )
}

Table.Body = Body
Table.Cell = Cell
Table.Filter = Filter
Table.Footer = Footer
Table.Header = Header
Table.Row = Row

export default Table
