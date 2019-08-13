import React, { useContext } from 'react'
import {
  LevelContext,
  SortContext,
  useTableState,
  useTableDispatch,
} from './Context'

const Cell = props => {
  const state = useTableState()
  const dispatch = useTableDispatch()
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
      const sortDirection =
        state.sortBy === sortBy && state.sortDirection === 'asc'
          ? 'desc'
          : 'asc'
      dispatch({ type: 'sort', sortBy, sortDirection })
    }
    if (onClick) {
      onClick(event)
    }
  }

  const contextValue = {
    active: sortBy ? state.sortBy === sortBy : false,
    sortDirection: sortBy ? state.sortDirection : 'asc',
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
