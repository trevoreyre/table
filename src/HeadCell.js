import React, { useMemo } from 'react'
import { SortContext, useTableState, useTableDispatch } from './Context'

const HeadCell = props => {
  const { as: As = 'th', children, onClick, sortBy, sort, ...other } = props
  const state = useTableState()
  const dispatch = useTableDispatch()

  const dataAttributes = {
    ...(sortBy && { 'data-table-sortable': true }),
  }

  const handleClick = event => {
    if (!sortBy) {
      if (onClick) onClick(event)
      return
    }

    const sortDirection =
      state.sortBy === sortBy && state.sortDirection === 'asc' ? 'desc' : 'asc'

    // TODO: Does it make sense for controlled sortDirection + uncontrolled sortBy?
    // Would be much easier to require those two to be controlled as a pair.
    if (!state.sortByIsControlled && !state.sortDirectionIsControlled) {
      dispatch({ type: 'sort', sortBy, sortDirection, sort })
    } else if (!state.sortByIsControlled) {
      dispatch({
        type: 'sort',
        sortBy,
        sortDirection: state.sortDirection,
        sort,
      })
    } else if (!state.sortDirectionIsControlled) {
      dispatch({
        type: 'sort',
        sortBy: state.sortBy,
        sortDirection:
          state.sortBy === sortBy ? sortDirection : state.sortDirection,
        sort,
      })
    }
    if (state.onSort) {
      state.onSort(sortBy, sortDirection)
    }
    if (onClick) {
      onClick(event, sortBy, sortDirection)
    }
  }

  const contextValue = useMemo(
    () => ({
      active: sortBy ? state.sortBy === sortBy : false,
      sortDirection: sortBy ? state.sortDirection : 'asc',
    }),
    [sortBy, state.sortBy, state.sortDirection]
  )

  return (
    <SortContext.Provider value={contextValue}>
      <As
        data-table-head-cell
        {...dataAttributes}
        tabIndex={sortBy ? 0 : null}
        onClick={handleClick}
        {...other}
      >
        {children}
      </As>
    </SortContext.Provider>
  )
}

export default HeadCell
