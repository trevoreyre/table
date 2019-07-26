import React, { useContext } from 'react'
import { TableContext } from './Context'

const Search = props => {
  const { ...other } = props
  const ctx = useContext(TableContext)

  const handleChange = event => ctx.dispatch({ type: 'search', search: event.target.value })

  return <input onChange={handleChange} {...other} />
}

export default Search
