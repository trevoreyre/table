import React from 'react'

const Table = props => {
  const { as: As = 'table', children, ...other } = props

  return <As {...other}>{children}</As>
}

export default Table
