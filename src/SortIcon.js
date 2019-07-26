import React, { useContext } from 'react'
import { SortContext } from './Context'

const SortIcon = props => {
  const {
    as: As = 'span',
    ...other
  } = props
  const { active, direction } = useContext(SortContext)

  const style = {
    display: 'inline-block',
    opacity: active ? '1' : '0',
    width: '24px',
    height: '24px',
    transform: `rotate(${direction === 'desc' ? '180deg' : '0'}) scale(0.75)`,
    backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItY2hldnJvbi11cCI+PHBvbHlsaW5lIHBvaW50cz0iMTggMTUgMTIgOSA2IDE1Ij48L3BvbHlsaW5lPjwvc3ZnPg==")`
  }

  return (
    <As style={style} {...other} />
  )
}

export default SortIcon
