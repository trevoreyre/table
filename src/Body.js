import React, { useContext } from 'react'
import { TableContext, LevelContext } from './Context'

const Body = props => {
  const { children, ...other } = props
  const ctx = useContext(TableContext)

  return (
    <LevelContext.Provider value="body">
      <tbody {...other}>
        {typeof children === 'function' ? children(ctx.data) : children}
      </tbody>
    </LevelContext.Provider>
  )
}

export default Body
