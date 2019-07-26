import React, { useContext } from 'react'
import { TableContext, LevelContext, SortContext } from './Context'

const Cell = props => {
  const ctx = useContext(TableContext)
  const level = useContext(LevelContext)
  const {
    as: As = level === 'header' ? 'th' : 'td',
    children,
    onClick,
    sortBy,
    ...other
  } = props

  const active = ctx.sortBy === sortBy

  const handleClick = event => {
    if (sortBy) {
      const direction =
        ctx.sortBy === sortBy && ctx.direction === 'asc' ? 'desc' : 'asc'
      ctx.dispatch({ type: 'sort', sortBy, direction })
    }
    if (onClick) {
      onClick(event)
    }
  }

  return (
    <SortContext.Provider value={{ active, direction: ctx.direction }}>
      <As onClick={handleClick} {...other}>
        {children}
      </As>
    </SortContext.Provider>
  )
}

export default Cell
