import React from 'react'

const Container = props => {
  const { as: As = 'div', children, ...other } = props

  return (
    <As data-table-container {...other}>
      {children}
    </As>
  )
}

export default Container
