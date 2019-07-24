import React from 'react'
import { LevelContext } from './Context'

const Footer = props => {
  const { children, ...other } = props

  return (
    <LevelContext.Provider value="footer">
      <tfoot {...other}>{children}</tfoot>
    </LevelContext.Provider>
  )
}

export default Footer
