import React from 'react'

const Input = props => {
  const { as: As = 'input', children, ...other } = props

  return (
    <As data-table-input {...other}>
      {children}
    </As>
  )
}

export default Input
