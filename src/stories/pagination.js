import React, { useState } from 'react'
import Table from '../index'
import users from './users.json'

export default {
  title: 'Basic|Pagination',
}

export const Pagination = () => (
  <Table.Provider>
    <Table.Search />
    <Table.Table>
      <Table.Header>
        <Table.Row>
          <Table.HeadCell sortBy="name">
            Name <Table.SortIcon />
          </Table.HeadCell>
          <Table.HeadCell sortBy="email">
            Email <Table.SortIcon />
          </Table.HeadCell>
          <Table.HeadCell sortBy="ipAddress">
            IP Address <Table.SortIcon />
          </Table.HeadCell>
        </Table.Row>
      </Table.Header>
      <Table.Body data={users}>
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

export const PerPageSelect = () => (
  <Table.Provider>
    <label htmlFor="per-page" style={{ marginRight: '8px' }}>
      Per page
    </label>
    <Table.PerPage id="per-page" defaultValue={10}>
      <option value={10}>10</option>
      <option value={25}>25</option>
      <option value={50}>50</option>
      <option value={100}>100</option>
    </Table.PerPage>
    <Table.Search style={{ marginLeft: '40px' }} />
    <Table.Table>
      <Table.Header>
        <Table.Row>
          <Table.HeadCell sortBy="name">
            Name <Table.SortIcon />
          </Table.HeadCell>
          <Table.HeadCell sortBy="email">
            Email <Table.SortIcon />
          </Table.HeadCell>
          <Table.HeadCell sortBy="ipAddress">
            IP Address <Table.SortIcon />
          </Table.HeadCell>
        </Table.Row>
      </Table.Header>
      <Table.Body data={users}>
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
)
PerPageSelect.story = { name: 'Per page select' }

export const DefaultPage = () => (
  <Table.Provider>
    <Table.Search />
    <Table.Table>
      <Table.Header>
        <Table.Row>
          <Table.HeadCell sortBy="name">
            Name <Table.SortIcon />
          </Table.HeadCell>
          <Table.HeadCell sortBy="email">
            Email <Table.SortIcon />
          </Table.HeadCell>
          <Table.HeadCell sortBy="ipAddress">
            IP Address <Table.SortIcon />
          </Table.HeadCell>
        </Table.Row>
      </Table.Header>
      <Table.Body data={users}>
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
    <Table.Pagination perPage={10} defaultPage={11} />
  </Table.Provider>
)
DefaultPage.story = { name: 'Default page' }

export const Controlled = () => {
  const [page, setPage] = useState(11)

  const handleChangePage = newPage => setPage(newPage)

  const handleChange = event => setPage(parseInt(event.target.value, 10))

  return (
    <>
      <label>
        Page
        <input type="number" value={page || ''} onChange={handleChange} />
      </label>
      <Table.Provider>
        <Table.Table>
          <Table.Header>
            <Table.Row>
              <Table.HeadCell sortBy="name">
                Name <Table.SortIcon />
              </Table.HeadCell>
              <Table.HeadCell sortBy="email">
                Email <Table.SortIcon />
              </Table.HeadCell>
              <Table.HeadCell sortBy="ipAddress">
                IP Address <Table.SortIcon />
              </Table.HeadCell>
            </Table.Row>
          </Table.Header>
          <Table.Body data={users}>
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
        <Table.Pagination
          perPage={10}
          page={page || 1}
          onChange={handleChangePage}
        />
      </Table.Provider>
    </>
  )
}

export const CustomPagination = () => (
  <Table.Provider>
    <Table.Search />
    <Table.Table>
      <Table.Header>
        <Table.Row>
          <Table.HeadCell sortBy="name">
            Name <Table.SortIcon />
          </Table.HeadCell>
          <Table.HeadCell sortBy="email">
            Email <Table.SortIcon />
          </Table.HeadCell>
          <Table.HeadCell sortBy="ipAddress">
            IP Address <Table.SortIcon />
          </Table.HeadCell>
        </Table.Row>
      </Table.Header>
      <Table.Body data={users}>
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
      {({ page, totalPages }) => (
        <>
          <Table.PageButton value="first">{'<<'}</Table.PageButton>
          <Table.PageButton value="prev">{'<'}</Table.PageButton>
          {page}/{totalPages}
          <Table.PageButton value="next">{'>'}</Table.PageButton>
          <Table.PageButton value="last">{'>>'}</Table.PageButton>
          <span>Per page</span>
          <Table.PerPage defaultValue={25}>
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
CustomPagination.story = { name: 'Custom pagination' }
