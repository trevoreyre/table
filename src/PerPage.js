import React from 'react'
import { useTableState, useTableDispatch } from './Context'

const PerPage = props => {
  const { as: As = 'select', children, onChange, ...other } = props
  const state = useTableState()
  const dispatch = useTableDispatch()

  const handleChange = event => {
    const perPage = parseInt(event.target.value, 10)
    dispatch({ type: 'changePerPage', perPage })

    if (onChange) onChange(event)
  }

  return (
    <As onChange={handleChange} value={state.perPage} {...other}>
      {children}
    </As>
  )
}

export default PerPage
