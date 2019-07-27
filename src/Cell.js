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

  const contextValue = {
    active: sortBy ? ctx.sortBy === sortBy : false,
    direction: sortBy ? ctx.direction : 'asc',
  }

  return (
    <SortContext.Provider value={contextValue}>
      <As onClick={handleClick} {...other}>
        {children}
      </As>
    </SortContext.Provider>
  )
}

export default Cell
