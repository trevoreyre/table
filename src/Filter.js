import React, { useContext } from 'react'
import { TableContext } from './Context'

const Filter = props => {
  const { ...other } = props
  const context = useContext(TableContext)

  const handleChange = event => context.onFilter(event.target.value)

  return <input onChange={handleChange} {...other} />
}

export default Filter
