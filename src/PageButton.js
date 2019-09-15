import React from 'react'
import { useTableState, useTableData, useTableDispatch } from './Context'

const firstIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.4 16.6L13.8 12l4.6-4.6L17 6l-6 6 6 6zM6 6h2v12H6z" />
    <path fill="none" d="M24 24H0V0h24v24z" />
  </svg>
)
const prevIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M15.4 7.4L14 6l-6 6 6 6 1.4-1.4-4.6-4.6z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
)

const nextIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M10 6L8.6 7.4l4.6 4.6-4.6 4.6L10 18l6-6z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
)

const lastIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M5.6 7.4l4.6 4.6-4.6 4.6L7 18l6-6-6-6zM16 6h2v12h-2z" />
    <path fill="none" d="M0 0h24v24H0V0z" />
  </svg>
)

const icons = {
  first: firstIcon,
  prev: prevIcon,
  next: nextIcon,
  last: lastIcon,
}

const PageButton = props => {
  const {
    as: As = 'button',
    children,
    disabled,
    onClick,
    value,
    ...other
  } = props
  const state = useTableState()
  const data = useTableData()
  const dispatch = useTableDispatch()

  const totalPages = state.perPage ? Math.ceil(data.length / state.perPage) : 1
  const dataAttributes = {
    ...(value === 'first' && { 'data-table-page-button-first': true }),
    ...(value === 'prev' && { 'data-table-page-button-prev': true }),
    ...(value === 'next' && { 'data-table-page-button-next': true }),
    ...(value === 'last' && { 'data-table-page-button-last': true }),
  }

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
      onClick(event, page)
    }
  }

  let isDisabled = false
  if (disabled !== undefined) {
    isDisabled = disabled
  } else {
    switch (value) {
      case 'next':
      case 'last':
        isDisabled = state.page >= totalPages
        break
      case 'prev':
      case 'first':
        isDisabled = state.page <= 1
        break
      default:
    }
  }

  return (
    <As
      data-table-page-button
      {...dataAttributes}
      disabled={isDisabled}
      onClick={handleClick}
      {...other}
    >
      {children || icons[value]}
    </As>
  )
}

export default PageButton
