import React from 'react'
import PropTypes from 'prop-types'
import { useTableDispatch, useTableState } from './Context'

// TODO: Selectable row pass disabled and value to checkbox via context
// Prevent select on disabled rows.
const Row = props => {
  const { as: As = 'tr', children, onClick, select, ...other } = props
  const state = useTableState()
  const dispatch = useTableDispatch()

  const dataAttributes = {
    ...(select && { 'data-table-selectable': true }),
  }

  const handleClick = event => {
    if (select && !state.selectedIsControlled) {
      dispatch({ type: 'selectToggle', selected: select })
    }
    if (onClick) {
      onClick(event, select)
    }
  }

  return (
    <As
      data-table-row
      {...dataAttributes}
      tabIndex={select ? 0 : null}
      onClick={handleClick}
      {...other}
    >
      {children}
    </As>
  )
}

Row.propTypes = {
  as: PropTypes.any,
  children: PropTypes.node,
  select: PropTypes.any,
}

export default Row
