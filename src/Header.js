import React from 'react'
import { LevelContext } from './Context'

const Header = props => {
  const { as: As = 'thead', children, ...other } = props

  return (
    <LevelContext.Provider value="header">
      <As {...other}>{children}</As>
    </LevelContext.Provider>
  )
}

export default Header
