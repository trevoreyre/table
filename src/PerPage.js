import React from 'react'
import { useSyncProps } from './util'
import { useTableState, useTableDispatch } from './Context'

const PerPage = props => {
  const {
    as: As = 'select',
    children,
    defaultValue,
    onChange,
    value,
    ...other
  } = props
  const state = useTableState()
  const dispatch = useTableDispatch()

  useSyncProps(
    { defaultPerPage: defaultValue, onChangePerPage: onChange, perPage: value },
    [value]
  )

  const handleChange = event => {
    const perPage = parseInt(event.target.value, 10)

    if (!state.perPageIsControlled) {
      dispatch({ type: 'changePerPage', perPage })
    }
    if (state.onChangePerPage) {
      state.onChangePerPage(perPage)
    }
    if (onChange) {
      onChange(event, perPage)
    }
  }

  return (
    <As onChange={handleChange} value={state.perPage} {...other}>
      {children}
    </As>
  )
}

export default PerPage
