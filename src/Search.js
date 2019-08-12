import React from 'react'
import { useTableDispatch } from './Context'

const Search = props => {
  const { as: As = 'input', onChange, ...other } = props
  const dispatch = useTableDispatch()

  const handleChange = event => {
    dispatch({ type: 'search', search: event.target.value })

    if (onChange) onChange(event)
  }

  return <As onChange={handleChange} {...other} />
}

export default Search
