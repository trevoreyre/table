import React, { useContext } from 'react'
import { TableContext } from './Context'

const PageButton = props => {
  const ctx = useContext(TableContext)
  const { as: As = 'button', children, onClick, type, ...other } = props

  const handleClick = event => {
    let page

    switch (type) {
      case 'next':
        page = Math.min(ctx.page + 1, ctx.totalPages)
        break
      case 'prev':
        page = Math.max(ctx.page - 1, 1)
        break
      case 'first':
        page = 1
        break
      case 'last':
        page = ctx.totalPages
        break
      default:
        page = ctx.page
    }
    ctx.dispatch({ type: 'changePage', page })

    if (onClick) {
      onClick(event)
    }
  }

  let disabled
  switch (type) {
    case 'next':
    case 'last':
      disabled = ctx.page === ctx.totalPages
      break
    case 'prev':
    case 'first':
      disabled = ctx.page === 1
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
