import React from 'react'
import { useSyncProps } from './util'
import { useTableDispatch, useTableState } from './Context'

const Search = props => {
  const {
    as: As = 'input',
    defaultValue,
    onChange,
    search,
    searchKeys,
    value,
    ...other
  } = props
  const state = useTableState()
  const dispatch = useTableDispatch()

  useSyncProps(
    {
      defaultSearchValue: defaultValue,
      search,
      searchKeys,
      searchValue: value,
    },
    [searchKeys, value]
  )

  const handleChange = event => {
    if (!state.searchValueIsControlled) {
      dispatch({ type: 'search', searchValue: event.target.value })
    }
    if (onChange) {
      onChange(event, event.target.value)
    }
  }

  return <As onChange={handleChange} value={state.searchValue} {...other} />
}

export default Search
