import React, { useState } from 'react'
import Table from '../index'
import users from './users.json'

export default {
  title: 'Basic|Pagination',
}

export const pagination = () => (
  <Table.Provider data={users}>
    <Table.Search />
    <Table.Table>
      <Table.Header>
        <Table.Row>
          <Table.Cell sortBy="name">
            Name <Table.SortIcon />
          </Table.Cell>
          <Table.Cell sortBy="email">
            Email <Table.SortIcon />
          </Table.Cell>
          <Table.Cell sortBy="ipAddress">
            IP Address <Table.SortIcon />
          </Table.Cell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {users =>
          users.map(user => (
            <Table.Row key={user.id}>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.ipAddress}</Table.Cell>
            </Table.Row>
          ))
        }
      </Table.Body>
    </Table.Table>
    <Table.Pagination perPage={10} />
  </Table.Provider>
)

export const defaultPage = () => (
  <Table.Provider data={users}>
    <Table.Search />
    <Table.Table>
      <Table.Header>
        <Table.Row>
          <Table.Cell sortBy="name">
            Name <Table.SortIcon />
          </Table.Cell>
          <Table.Cell sortBy="email">
            Email <Table.SortIcon />
          </Table.Cell>
          <Table.Cell sortBy="ipAddress">
            IP Address <Table.SortIcon />
          </Table.Cell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {users =>
          users.map(user => (
            <Table.Row key={user.id}>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.ipAddress}</Table.Cell>
            </Table.Row>
          ))
        }
      </Table.Body>
    </Table.Table>
    <Table.Pagination defaultPerPage={10} defaultPage={11} />
  </Table.Provider>
)
defaultPage.story = { name: 'default page' }

export const controlled = () => {
  const [page, setPage] = useState(11)

  const handleChangePage = newPage => setPage(newPage)

  const handleChange = event => setPage(parseInt(event.target.value, 10))

  return (
    <>
      <label>
        Page
        <input type="number" value={page || ''} onChange={handleChange} />
      </label>
      <Table.Provider
        data={users}
        perPage={10}
        page={page || 1}
        onChangePage={handleChangePage}
      >
        <Table.Table>
          <Table.Header>
            <Table.Row>
              <Table.Cell sortBy="name">
                Name <Table.SortIcon />
              </Table.Cell>
              <Table.Cell sortBy="email">
                Email <Table.SortIcon />
              </Table.Cell>
              <Table.Cell sortBy="ipAddress">
                IP Address <Table.SortIcon />
              </Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {users =>
              users.map(user => (
                <Table.Row key={user.id}>
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.ipAddress}</Table.Cell>
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table.Table>
        <Table.Pagination />
      </Table.Provider>
    </>
  )
}

export const customPagination = () => (
  <Table.Provider data={users} perPage={10}>
    <Table.Search />
    <Table.Table>
      <Table.Header>
        <Table.Row>
          <Table.Cell sortBy="name">
            Name <Table.SortIcon />
          </Table.Cell>
          <Table.Cell sortBy="email">
            Email <Table.SortIcon />
          </Table.Cell>
          <Table.Cell sortBy="ipAddress">
            IP Address <Table.SortIcon />
          </Table.Cell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {users =>
          users.map(user => (
            <Table.Row key={user.id}>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.ipAddress}</Table.Cell>
            </Table.Row>
          ))
        }
      </Table.Body>
    </Table.Table>
    <Table.Pagination>
      {({ totalPages }) => (
        <>
          <Table.PageButton value="first">{'<<'}</Table.PageButton>
          <Table.PageButton value="prev">{'<'}</Table.PageButton>
          <Table.PageInput />
          {`/${totalPages}`}
          <Table.PageButton value="next">{'>'}</Table.PageButton>
          <Table.PageButton value="last">{'>>'}</Table.PageButton>
          <span>Per page</span>
          <Table.PerPage>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </Table.PerPage>
        </>
      )}
    </Table.Pagination>
  </Table.Provider>
)
customPagination.story = { name: 'custom pagination' }
