import React, { useContext } from 'react'
import { TableContext, LevelContext } from './Context'

const Body = props => {
  const { as: As = 'tbody', children, ...other } = props
  const ctx = useContext(TableContext)
  console.log('ctx:', ctx)

  return (
    <LevelContext.Provider value="body">
      <As {...other}>
        {typeof children === 'function' ? children(ctx.data) : children}
      </As>
    </LevelContext.Provider>
  )
}

export default Body
