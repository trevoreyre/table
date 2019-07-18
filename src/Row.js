import React from 'react'

const Row = ({ children, ...other }) => (
  <tr {...other}>{children}</tr>
)

export default Row
