import React, { useContext, useLayoutEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  LevelContext,
  useTableState,
  useTableData,
  useTableDispatch,
} from './Context'

const Checkbox = props => {
  const level = useContext(LevelContext)
  const {
    as: As = 'input',
    onChange,
    type = level === 'header' ? 'selectPage' : 'select',
    value,
    ...other
  } = props
  const state = useTableState()
  const dispatch = useTableDispatch()
  const inputRef = useRef(null)

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
    const selected = type === 'select' ? value : data.map(item => item[value])

    if (!state.selectedIsControlled) {
      dispatch({ type, checked, selected })
    }
    if (onChange) {
      onChange(event, checked, selected)
    }
  }

  const checked =
    type === 'select'
      ? state.selected.includes(value)
      : type === 'selectAll'
      ? data.length > 0 && state.selected.length === data.length
      : data.length > 0 &&
        data.every(item => state.selected.includes(item[value]))

  return (
    <As
      data-table-checkbox
      type="checkbox"
      checked={checked}
      ref={inputRef}
      value={value}
      onChange={handleChange}
      {...other}
    />
  )
}

Checkbox.propTypes = {
  type: PropTypes.oneOf(['select', 'selectPage', 'selectAll']),
}

export default Checkbox
