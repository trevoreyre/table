import React from 'react'

const Row = props => {
  const {
    as: As = 'tr',
    children,
    ...other
  } = props

  return (
    <As {...other}>{children}</As>
  )
}

export default Row
