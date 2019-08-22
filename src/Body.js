import React from 'react'
import { LevelContext, useTableData } from './Context'

const Body = props => {
  const { as: As = 'tbody', children, ...other } = props
  const data = useTableData()

  return (
    <LevelContext.Provider value="body">
      <As {...other}>
        {typeof children === 'function' && data ? children(data) : children}
      </As>
    </LevelContext.Provider>
  )
}

export default Body
