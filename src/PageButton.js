import React from 'react'
import { useTableState, useTableDispatch } from './Context'

const PageButton = props => {
  const { as: As = 'button', children, onClick, value, ...other } = props
  const state = useTableState()
  const dispatch = useTableDispatch()

  const handleClick = event => {
    let page
    switch (value) {
      case 'first':
        page = 1
        break
      case 'prev':
        page = Math.max(state.page - 1, 1)
        break
      case 'next':
        page = Math.min(state.page + 1, state.totalPages)
        break
      case 'last':
        page = state.totalPages
        break
      default:
        page = value
    }

    dispatch({ type: 'changePage', page })
    if (state.onChangePage) {
      state.onChangePage(page)
    }
    if (onClick) {
      onClick(event)
    }
  }

  let disabled
  switch (value) {
    case 'next':
    case 'last':
      disabled = state.page === state.totalPages
      break
    case 'prev':
    case 'first':
      disabled = state.page === 1
      break
    default:
      disabled = false
  }

  return (
    <As disabled={disabled} onClick={handleClick} {...other}>
      {children}
    </As>
  )
}

export default PageButton
