import React, { useEffect, useState } from 'react'
import { useComponentWillMount, useInitializeProps, useSyncProps } from './util'
import { useTableState, useTableData, useTableDispatch } from './Context'
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
    page,
    perPage,
    ...other
  } = props
  const state = useTableState()
  const data = useTableData()
  const dispatch = useTableDispatch()

  const totalPages = state.perPage ? Math.ceil(data.length / state.perPage) : 1
  const safePage = Math.min(totalPages, Math.max(1, state.page))

  useInitializeProps({ defaultPage, defaultPerPage })
  // useSyncProps({ defaultPage, defaultPerPage, page, perPage })

  // useComponentWillMount(() => {
  //   if (defaultPage !== undefined || defaultPerPage !== undefined) {
  //     dispatch({
  //       type: 'syncDefaultProps',
  //       defaultProps: {
  //         ...(defaultPage !== undefined && { defaultPage }),
  //         ...(defaultPerPage !== undefined && { defaultPerPage }),
  //       },
  //     })
  //   }
  // })
  useEffect(() => {
    if (page !== undefined || perPage !== undefined) {
      dispatch({
        type: 'syncProps',
        props: {
          ...(page !== undefined && { page }),
          ...(perPage !== undefined && { perPage }),
        },
      })
    }
  }, [dispatch, page, perPage])

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
      <As {...other}>
        <PageButton value="prev">Previous</PageButton>
        {pageList.map((value, i) => {
          if (value === '...')
            return (
              <PageButton key={value + i} disabled>
                ...
              </PageButton>
            )
          return (
            <PageButton key={value} value={value}>
              {safePage === value ? <strong>{value}</strong> : value}
            </PageButton>
          )
        })}
        <PageButton value="next">Next</PageButton>
      </As>
    )
  }

  return (
    <As {...other}>
      {typeof children === 'function'
        ? children({
            page: state.page,
            pageList,
            perPage: state.perPage,
            totalPages: state.totalPages,
          })
        : children}
    </As>
  )
}

export default Pagination
