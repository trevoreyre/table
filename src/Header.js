import React from 'react'
import { LevelContext } from './Context'

const Header = ({ children, ...other }) => (
  <LevelContext.Provider value="header">
    <thead {...other}>{children}</thead>
  </LevelContext.Provider>
)

export default Header
