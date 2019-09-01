import React from 'react'

const Table = props => {
  const { as: As = 'table', children, ...other } = props

  return (
    <As data-table {...other}>
      {children}
    </As>
  )
}

export default Table
