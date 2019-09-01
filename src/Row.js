import React from 'react'
import PropTypes from 'prop-types'
import { useTableDispatch, useTableState } from './Context'

const Row = props => {
  const { as: As = 'tr', children, onClick, select, ...other } = props
  const state = useTableState()
  const dispatch = useTableDispatch()

  const handleClick = event => {
    if (select && !state.selectedIsControlled) {
      dispatch({ type: 'selectToggle', selected: select })
    }
    if (onClick) {
      onClick(event, select)
    }
  }

  return (
    <As data-table-row onClick={handleClick} {...other}>
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
