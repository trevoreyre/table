import React, { useContext } from 'react'
import { TableContext, LevelContext } from './Context'

const SortIndicator = props => {
  const { direction, ...other } = props
  const style = {
    display: 'inline-block',
    transform: `rotate(${direction === 'desc' ? '180deg' : '0'})`
  }

  return (
    <span style={style} {...other}>^</span>
  )
}

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
      const direction = ctx.sortBy === sortBy && ctx.direction === 'asc' ? 'desc' : 'asc'
      ctx.dispatch({ type: 'sort', sortBy, direction })
    }
    if (onClick) {
      onClick(event)
    }
  }

  return (
    <As onClick={handleClick} {...other}>
      {children}
      {sortBy && sortBy === ctx.sortBy && <SortIndicator direction={ctx.direction} />}
    </As>
  )
}

export default Cell
