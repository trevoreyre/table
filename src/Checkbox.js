import React, { useContext } from 'react'
import { TableContext, LevelContext } from './Context'

const Checkbox = props => {
  const { as: As = 'input', value, ...other } = props
  const ctx = useContext(TableContext)
  const level = useContext(LevelContext)
  const isHeader = level === 'header'

  const handleChange = event => {
    const { checked, value: newValue } = event.target
    if (isHeader && checked) {
      ctx.dispatch({ type: 'selectAll' })
    } else if (isHeader && !checked) {
      ctx.dispatch({ type: 'selectNone' })
    } else {
      ctx.dispatch({ type: 'select', value: newValue, checked })
    }
  }

  const checkDeterminate = el => {
    if (el && isHeader) {
      if (!el.checked) {
        el.indeterminate = ctx.selected.length > 0
        // console.log(
        //   'el.indeterminate:',
        //   ctx.selected.length > 0,
        //   ctx.selected.length
        // )
      }
    }
  }

  const checked = isHeader
    ? ctx.selected.length === ctx.data.length
    : ctx.selected.includes(String(value))

  return (
    <As
      type="checkbox"
      checked={checked}
      ref={checkDeterminate}
      value={value}
      onChange={handleChange}
      {...other}
    />
  )
}

export default Checkbox
