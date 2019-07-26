import React from 'react'
import { LevelContext } from './Context'

const Footer = props => {
  const { as: As = 'tfoot', children, ...other } = props

  return (
    <LevelContext.Provider value="footer">
      <As {...other}>{children}</As>
    </LevelContext.Provider>
  )
}

export default Footer
