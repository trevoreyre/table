import React, { useContext } from 'react'
import { SortContext } from './Context'

const defaultInactiveIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 15L12 21L18 15M18 9L12 3L6 9"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)

const defaultAscIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 9L12 3L6 9"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)

const defaultDescIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 15L12 21L18 15"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)

const SortIcon = props => {
  const {
    as: As = 'span',
    ascIcon = defaultAscIcon,
    children,
    descIcon = defaultDescIcon,
    inactiveIcon = defaultInactiveIcon,
    ...other
  } = props
  const { active, sortDirection } = useContext(SortContext)

  const dataAttributes = {
    ...(active && { [`data-table-sort-${sortDirection}`]: true }),
  }

  const icon =
    active === false
      ? inactiveIcon
      : sortDirection === 'asc'
      ? ascIcon
      : descIcon

  if (children === undefined) {
    return (
      <As data-table-sort-icon {...dataAttributes} {...other}>
        {icon}
      </As>
    )
  }

  return (
    <As data-table-sort-icon {...dataAttributes} {...other}>
      {typeof children === 'function'
        ? children({ active, sortDirection })
        : children}
    </As>
  )
}

export default SortIcon
