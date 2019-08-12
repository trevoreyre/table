import React from 'react'
import { LevelContext, useTableState } from './Context'

const Body = props => {
  const { as: As = 'tbody', children, ...other } = props
  const state = useTableState()

  return (
    <LevelContext.Provider value="body">
      <As {...other}>
        {typeof children === 'function' && state.data
          ? children(state.data)
          : children}
      </As>
    </LevelContext.Provider>
  )
}

export default Body
