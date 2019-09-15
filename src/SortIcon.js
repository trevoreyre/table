import React, { useContext } from 'react'
import { SortContext } from './Context'

const defaultInactiveIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      d="M6 15L12 21L18 15M18 9L12 3L6 9"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const defaultAscIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      d="M18 9L12 3L6 9"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const defaultDescIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      d="M6 15L12 21L18 15"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
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
