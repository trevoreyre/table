import React from 'react'

const SortLabel = props => {
  const { as: As = 'span', children, ...other } = props

  return (
    <As data-table-sort-label {...other}>
      {children}
    </As>
  )
}

export default SortLabel
