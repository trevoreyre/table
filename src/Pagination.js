import React, { useContext } from 'react'
import { TableContext } from './Context'
import PageButton from './PageButton'

const Ellipses = () => (
  <span
    style={{
      display: 'inline-block',
      width: '40px',
      textAlign: 'center',
    }}
  >
    ...
  </span>
)

const getFirstLastPage = ({ page, length, totalPages }) => {
  const middlePage = Math.ceil(length / 2)

  // Show entire range if fewer pages than pages in list
  if (totalPages <= length) {
    return { firstPage: 2, lastPage: totalPages - 1 }
  }
  // Beginning of list
  if (page <= middlePage) {
    return { firstPage: 2, lastPage: length - 2 }
  }
  // End of list
  if (page >= totalPages - middlePage + 1) {
    return { firstPage: totalPages - length + 3, lastPage: totalPages - 1 }
  }
  // Middle of list. Find the range of pages between ellipses.
  // Add one page on right if showing even number of pages.
  const offset = Math.floor((length - 5) / 2)
  return {
    firstPage: page - offset,
    lastPage: length % 2 === 1 ? page + offset : page + offset + 1,
  }
}

const Pagination = props => {
  const ctx = useContext(TableContext)
  const { as: As = 'div', children, length = 7, ...other } = props

  const { firstPage, lastPage } = getFirstLastPage({
    length,
    page: ctx.page,
    totalPages: ctx.totalPages,
  })

  let pageList = []
  if (ctx.totalPages > 1) {
    pageList.push(1)
    if (firstPage > 2) pageList.push('...')
    pageList = pageList.concat(
      Array.from({ length: lastPage - firstPage + 1 }, (_, i) => i + firstPage)
    )
    if (lastPage < ctx.totalPages - 1) pageList.push('...')
    pageList.push(ctx.totalPages)
  }

  if (children === undefined) {
    return ctx.totalPages === 1 ? null : (
      <As {...other}>
        <PageButton value="prev">{'<'}</PageButton>
        {pageList.map(value => {
          if (value === '...') return <Ellipses />
          return (
            <PageButton value={value}>
              {ctx.page === value ? <strong>{value}</strong> : value}
            </PageButton>
          )
        })}
        <PageButton value="next">{'>'}</PageButton>
      </As>
    )
  }

  return (
    <As {...other}>
      {typeof children === 'function'
        ? children({
            page: ctx.page,
            pageList,
            perPage: ctx.perPage,
            totalPages: ctx.totalPages,
          })
        : children}
    </As>
  )
}

export default Pagination
