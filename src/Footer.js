import React from 'react'

const Footer = ({ children, ...other }) => (
  <tfoot {...other}>{children}</tfoot>
)

export default Footer
