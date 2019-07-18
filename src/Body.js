import React, { useContext } from 'react'
import { TableContext } from './Context'

const Body = props => {
  const { children, ...other } = props
  const ctx = useContext(TableContext)

  return (
    <tbody {...other}>
      {typeof children === 'function' ? children(ctx.data) : children}
    </tbody>
  )
}

export default Body
