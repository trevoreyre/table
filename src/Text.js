import React from 'react'

const Text = props => {
  const { as: As = 'span', children, ...other } = props

  return (
    <As data-table-text {...other}>
      {children}
    </As>
  )
}

export default Text
