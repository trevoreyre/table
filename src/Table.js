import React from 'react'
import Body from './Body'
import Cell from './Cell'
import Footer from './Footer'
import Header from './Header'
import Provider from './Provider'
import Row from './Row'
import Search from './Search'

const Table = props => {
  const {
    as: As = 'table',
    children,
    ...other
  } = props

  return (
    <As {...other}>{children}</As>
  )
}

Table.Body = Body
Table.Cell = Cell
Table.Footer = Footer
Table.Header = Header
Table.Provider = Provider
Table.Row = Row
Table.Search = Search

export default Table
