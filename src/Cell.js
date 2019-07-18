import React, { useContext } from 'react'
import { TableContext, LevelContext } from './Context'

const Cell = props => {
  const { as, children, onClick, sortBy, ...other } = props
  const ctx = useContext(TableContext)
  const level = useContext(LevelContext)

  const handleClick = event => {
    if (sortBy) {
      const direction = ctx.sortBy === sortBy && ctx.direction === 'asc' ? 'desc' : 'asc'
      ctx.onSort(sortBy, direction)
    }
    if (onClick) {
      onClick(event)
    }
  }

  console.log({ ctx })
  const Component = as ? as : level === 'header' ? 'th' : 'td'

  return (
    <Component onClick={handleClick} {...other}>
      {children}
      {sortBy && sortBy === ctx.sortBy && <div>sorted {ctx.direction}</div>}
    </Component>
  )
}

export default Cell
