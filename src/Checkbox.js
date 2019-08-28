import React, { useContext, useLayoutEffect, useRef } from 'react'
import {
  LevelContext,
  useTableState,
  useTableData,
  useTableDispatch,
} from './Context'

const Checkbox = props => {
  const { as: As = 'input', onChange, select = 'page', value, ...other } = props
  const state = useTableState()
  const dispatch = useTableDispatch()
  const level = useContext(LevelContext)
  const inputRef = useRef(null)
  const type =
    level === 'header' && select === 'all'
      ? 'selectAll'
      : level === 'header' && select === 'page'
      ? 'selectPage'
      : 'select'
  const data = useTableData({ paginated: type === 'selectPage' })

  useLayoutEffect(() => {
    if (!inputRef.current) {
      return
    }
    if (type === 'selectAll') {
      inputRef.current.indeterminate =
        state.selected.length > 0 && state.selected.length < data.length
    } else if (type === 'selectPage') {
      inputRef.current.indeterminate =
        data.some(item => state.selected.includes(item[value])) &&
        !data.every(item => state.selected.includes(item[value]))
    }
  })

  const handleChange = event => {
    const checked = event.target.checked

    if (!state.selectedIsControlled) {
      if (type === 'selectAll' || type === 'selectPage') {
        dispatch({ type, checked, selected: data.map(item => item[value]) })
      } else {
        dispatch({ type, checked, selected: value })
      }
    }
    if (type === 'selectAll' && state.onSelectAll) {
      state.onSelectAll(checked, data.map(item => item[value]))
    }
    if (type === 'selectPage' && state.onSelectPage) {
      state.onSelectPage(checked, data.map(item => item[value]))
    }
    if (type === 'select' && state.onSelect) {
      state.onSelect(checked, value)
    }
    if (onChange) {
      onChange(event, value, checked)
    }
  }

  const checked =
    type === 'select'
      ? state.selected.includes(value)
      : type === 'selectAll'
      ? state.selected.length === data.length
      : data.every(item => state.selected.includes(item[value]))

  return (
    <As
      type="checkbox"
      checked={checked}
      ref={inputRef}
      value={value}
      onChange={handleChange}
      {...other}
    />
  )
}

export default Checkbox
