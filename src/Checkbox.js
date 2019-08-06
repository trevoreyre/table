import React, { useContext } from 'react'
import { TableContext, LevelContext } from './Context'

const Checkbox = props => {
  const { as: As = 'input', data, value, ...other } = props
  const ctx = useContext(TableContext)
  const level = useContext(LevelContext)
  const isHeader = level === 'header'

  const handleChange = event => {
    const checked = event.target.checked
    if (isHeader && checked) {
      ctx.dispatch({ type: 'selectAll', value })
    } else if (isHeader && !checked) {
      ctx.dispatch({ type: 'selectNone', value })
    } else {
      ctx.dispatch({ type: 'select', value, checked })
    }
  }

  const checkDeterminate = el => {
    if (isHeader && !el.checked) {
      el.indeterminate =
        ctx.data.some(item => ctx.selected.includes(item[value])) &&
        !ctx.data.every(item => ctx.selected.includes(item[value]))
    }
  }

  const checked = isHeader
    ? ctx.data.every(item => ctx.selected.includes(item[value]))
    : ctx.selected.includes(value)

  return (
    <As
      type="checkbox"
      checked={checked}
      ref={el => el && checkDeterminate(el)}
      value={value}
      onChange={handleChange}
      {...other}
    />
  )
}

export default Checkbox
