import React, { useContext, useEffect, useRef } from 'react'
import { LevelContext, useTableState, useTableDispatch } from './Context'

const Checkbox = props => {
  const { as: As = 'input', data, selector, value, ...other } = props
  const state = useTableState()
  const dispatch = useTableDispatch()
  const level = useContext(LevelContext)
  const el = useRef(null)
  const isHeader = level === 'header'

  useEffect(() => {
    if (isHeader && el.current) {
      el.current.indeterminate =
        state.data.some(item => state.selected.includes(item[value])) &&
        !state.data.every(item => state.selected.includes(item[value]))
    }
  })

  const handleChange = event => {
    const checked = event.target.checked
    if (isHeader && checked) {
      dispatch({ type: 'selectAll', value })
    } else if (isHeader && !checked) {
      dispatch({ type: 'selectNone', value })
    } else {
      dispatch({ type: 'select', value, checked })
    }
  }

  const checked = isHeader
    ? state.data.every(item => state.selected.includes(item[value]))
    : state.selected.includes(value)

  return (
    <As
      type="checkbox"
      checked={checked}
      ref={el}
      value={value}
      onChange={handleChange}
      {...other}
    />
  )
}

export default Checkbox
