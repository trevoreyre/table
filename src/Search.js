import React, { useContext } from 'react'
import { TableContext } from './Context'

const Search = props => {
  const { as: As = 'input', ...other } = props
  const ctx = useContext(TableContext)

  const handleChange = event =>
    ctx.dispatch({ type: 'search', search: event.target.value })

  return <As onChange={handleChange} {...other} />
}

export default Search
