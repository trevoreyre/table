import React from 'react'
import { useSyncProps } from './util'
import { LevelContext } from './Context'

const Header = props => {
  const {
    as: As = 'thead',
    children,
    defaultSortBy,
    defaultSortDirection,
    onSort,
    sort,
    sortBy,
    sortDirection,
    ...other
  } = props

  useSyncProps(
    {
      defaultSort: sort,
      defaultSortBy,
      defaultSortDirection,
      onSort,
      sortBy,
      sortDirection,
    },
    [sortBy, sortDirection]
  )

  return (
    <LevelContext.Provider value="header">
      <As data-table-header {...other}>
        {children}
      </As>
    </LevelContext.Provider>
  )
}

export default Header
