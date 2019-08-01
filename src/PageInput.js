import React, { useContext, useEffect, useState } from 'react'
import { TableContext } from './Context'

const PageInput = props => {
  const { as: As = 'input', onBlur, onChange, onKeyDown, ...other } = props
  const ctx = useContext(TableContext)
  const [page, setPage] = useState(ctx.page)
  useEffect(() => {
    setPage(ctx.page)
  }, [ctx.page])

  const submit = newPage => {
    ctx.dispatch({
      type: 'changePage',
      page: Math.min(ctx.totalPages, Math.max(1, newPage)),
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
    const newPage = parseInt(event.target.value, 10)

    switch (key) {
      case 'Up':
      case 'ArrowUp':
        ctx.dispatch({
          type: 'changePage',
          page: Math.min(page + 1, ctx.totalPages),
        })
        break
      case 'Down':
      case 'ArrowDown':
        ctx.dispatch({ type: 'changePage', page: Math.max(page - 1, 1) })
        break
      case 'Esc':
      case 'Escape':
        setPage(ctx.page)
        break
      case 'Enter':
        submit(newPage)
        break
      default:
    }

    if (onKeyDown) onKeyDown(event)
  }

  const handleBlur = event => {
    const { value } = event.target
    if (value === '') {
      setPage(ctx.page)
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
