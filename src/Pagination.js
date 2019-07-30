import React, { useContext } from 'react'
import { TableContext } from './Context'

const Pagination = props => {
  const ctx = useContext(TableContext)
  const { as: As = 'div', children, ...other } = props

  return (
    <As {...other}>
      {typeof children === 'function'
        ? children({
            page: ctx.page,
            perPage: ctx.perPage,
            totalPages: ctx.totalPages,
          })
        : children}
    </As>
  )
}

export default Pagination
