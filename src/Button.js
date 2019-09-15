import React from 'react'

const Button = props => {
  const { as: As = 'button', children, ...other } = props

  return (
    <As data-table-button {...other}>
      {children}
    </As>
  )
}

export default Button
