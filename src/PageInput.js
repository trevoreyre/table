import React, { useEffect, useState } from 'react'
import { useTableState, useTableDispatch } from './Context'

const PageInput = props => {
  const { as: As = 'input', onBlur, onChange, onKeyDown, ...other } = props
  const state = useTableState()
  const dispatch = useTableDispatch()
  const [page, setPage] = useState(state.page)
  useEffect(() => {
    setPage(state.page)
  }, [state.page])

  const submit = newPage => {
    dispatch({
      type: 'changePage',
      page: newPage,
    })
  }

  const handleChange = event => {
    const { value } = event.target
    const newPage = value !== '' ? parseInt(event.target.value, 10) : ''
    setPage(newPage)

    if (onChange) onChange(event)
  }

  const handleKeyDown = event => {
    const { key } = event

    switch (key) {
      case 'Up':
      case 'ArrowUp':
        dispatch({ type: 'changePage', page: page + 1 })
        break
      case 'Down':
      case 'ArrowDown':
        dispatch({ type: 'changePage', page: page - 1 })
        break
      case 'Esc':
      case 'Escape':
        setPage(state.page)
        break
      case 'Enter': {
        const newPage = parseInt(event.target.value, 10)
        submit(newPage)
        break
      }
      default:
    }

    if (onKeyDown) onKeyDown(event)
  }

  const handleBlur = event => {
    const { value } = event.target
    if (value === '') {
      setPage(state.page)
    } else {
      const newPage = parseInt(event.target.value, 10)
      submit(newPage)
    }

    if (onBlur) onBlur(event)
  }

  return (
    <As
      name="page"
      style={{ textAlign: 'center' }}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      value={page}
      size={3}
      {...other}
    />
  )
}

export default PageInput
