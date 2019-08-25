import React from 'react'
import { useTableState, useTableData, useTableDispatch } from './Context'

const PageButton = props => {
  const { as: As = 'button', children, onClick, value, ...other } = props
  const state = useTableState()
  const data = useTableData()
  const dispatch = useTableDispatch()

  const totalPages = state.perPage ? Math.ceil(data.length / state.perPage) : 1

  const handleClick = event => {
    let page
    switch (value) {
      case 'first':
        page = 1
        break
      case 'prev':
        page = state.page - 1
        break
      case 'next':
        page = state.page + 1
        break
      case 'last':
        page = totalPages
        break
      default:
        page = value
    }

    if (!state.pageIsControlled) {
      dispatch({ type: 'changePage', page })
    }
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
      disabled = state.page === totalPages
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
