import React from 'react'

const Cell = props => {
  const { as: As = 'td', children, ...other } = props

  return <As {...other}>{children}</As>
}

export default Cell
