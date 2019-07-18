import React, { useReducer } from 'react'
import { TableContext } from './Context'
import Body from './Body'
import Cell from './Cell'
import Footer from './Footer'
import Header from './Header'
import Row from './Row'

const initialState = {
  sortBy: undefined,
  direction: 'asc',
  data: undefined
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
    default:
      return state
  }
}

const Table = props => {
  const { children, data, ...other } = props
  const [state, dispatch] = useReducer(reducer, { ...initialState, data })

  const onSort = (sortBy, direction) => dispatch({ type: 'sort', sortBy, direction })

  return (
    <TableContext.Provider value={{ ...state, onSort }}>
      <table {...other}>{children}</table>
    </TableContext.Provider>
  )
}

Table.Body = Body
Table.Cell = Cell
Table.Footer = Footer
Table.Header = Header
Table.Row = Row

export default Table
