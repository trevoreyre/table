import React from 'react'
import { useSyncProps } from './util'
import { LevelContext } from './Context'

const Header = props => {
  const {
    as: As = 'thead',
    children,
    defaultSortBy,
    defaultSortDirection,
    onSelectAll,
    onSelectPage,
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
      onSelectAll,
      onSelectPage,
      onSort,
      sortBy,
      sortDirection,
    },
    [sortBy, sortDirection]
  )

  return (
    <LevelContext.Provider value="header">
      <As {...other}>{children}</As>
    </LevelContext.Provider>
  )
}

export default Header
