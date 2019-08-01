import React, { useContext } from 'react'
import { TableContext } from './Context'

const PerPage = props => {
  const { as: As = 'select', children, onChange, ...other } = props
  const ctx = useContext(TableContext)

  const handleChange = event => {
    const perPage = parseInt(event.target.value, 10)
    ctx.dispatch({ type: 'changePerPage', perPage })

    if (onChange) onChange(event)
  }

  return (
    <As onChange={handleChange} value={ctx.perPage} {...other}>
      {children}
    </As>
  )
}

export default PerPage
