import React from 'react'
import { useSyncProps } from './util'
import { useTableState, useTableData } from './Context'
import PageButton from './PageButton'

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
  const {
    as: As = 'div',
    children,
    defaultPage,
    defaultPerPage,
    length = 7,
    onChange,
    page,
    perPage,
    ...other
  } = props
  const state = useTableState()
  const data = useTableData()

  useSyncProps(
    { defaultPage, defaultPerPage, onChangePage: onChange, page, perPage },
    [page, perPage]
  )

  const totalPages = state.perPage ? Math.ceil(data.length / state.perPage) : 1
  const safePage = Math.min(totalPages, Math.max(1, state.page))
  const { firstPage, lastPage } = getFirstLastPage({
    length,
    page: safePage,
    totalPages,
  })

  let pageList = []
  if (totalPages > 1) {
    pageList.push(1)
    if (firstPage > 2) pageList.push('...')
    pageList = pageList.concat(
      Array.from({ length: lastPage - firstPage + 1 }, (_, i) => i + firstPage)
    )
    if (lastPage < totalPages - 1) pageList.push('...')
    pageList.push(totalPages)
  }

  console.log('Pagination.render')

  if (children === undefined) {
    return totalPages === 1 ? null : (
      <As data-table-pagination {...other}>
        <PageButton value="prev" aria-label="Previous page" />

        {pageList.map((value, i) => {
          if (value === '...') {
            return (
              <PageButton key={value + i} disabled>
                ...
              </PageButton>
            )
          }
          const dataAttribues = {
            ...(safePage === value && { 'data-table-active': true }),
          }
          return (
            <PageButton
              key={value}
              value={value}
              aria-label={`Page ${value}`}
              {...dataAttribues}
            >
              {value}
            </PageButton>
          )
        })}

        <PageButton value="next" aria-label="Next page" />
      </As>
    )
  }

  return (
    <As data-table-pagination {...other}>
      {typeof children === 'function'
        ? children({
            page: safePage,
            pageList,
            perPage: state.perPage,
            totalPages: totalPages,
          })
        : children}
    </As>
  )
}

export default Pagination
