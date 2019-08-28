import React, { useState } from 'react'
import Table from '../index'
import users from './users.json'

export default {
  title: 'Basic|Sorting',
}

export const Sorting = () => (
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
          <Table.HeadCell sortBy="age">
            Age <Table.SortIcon />
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
              <Table.Cell>{user.age}</Table.Cell>
              <Table.Cell>{user.ipAddress}</Table.Cell>
            </Table.Row>
          ))
        }
      </Table.Body>
    </Table.Table>
  </Table.Provider>
)

export const DefaultSort = () => (
  <Table.Provider>
    <Table.Table>
      <Table.Header defaultSortBy="email" defaultSortDirection="asc">
        <Table.Row>
          <Table.HeadCell sortBy="name">
            Name <Table.SortIcon />
          </Table.HeadCell>
          <Table.HeadCell sortBy="email">
            Email <Table.SortIcon />
          </Table.HeadCell>
          <Table.HeadCell sortBy="age">
            Age <Table.SortIcon />
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
              <Table.Cell>{user.age}</Table.Cell>
              <Table.Cell>{user.ipAddress}</Table.Cell>
            </Table.Row>
          ))
        }
      </Table.Body>
    </Table.Table>
  </Table.Provider>
)

export const Controlled = () => {
  const [sortBy, setSortBy] = useState('email')
  const [sortDirection, setSortDirection] = useState('asc')

  const handleSort = (newSortBy, newSortDirection) => {
    setSortBy(newSortBy)
    setSortDirection(newSortDirection)
  }

  const handleChangeSortBy = event => {
    const { name, checked } = event.target
    if (checked) {
      setSortBy(name)
    }
  }

  const handleChangeSortDirection = event => {
    const { name, checked } = event.target
    if (checked) {
      setSortDirection(name)
    }
  }

  return (
    <>
      <fieldset>
        <legend>Sort by</legend>
        <label style={{ marginRight: '16px' }}>
          <input
            type="radio"
            name="name"
            style={{ marginRight: '4px' }}
            checked={sortBy === 'name'}
            onChange={handleChangeSortBy}
          />
          Name
        </label>
        <label style={{ marginRight: '16px' }}>
          <input
            type="radio"
            name="email"
            style={{ marginRight: '4px' }}
            checked={sortBy === 'email'}
            onChange={handleChangeSortBy}
          />
          Email
        </label>
        <label style={{ marginRight: '16px' }}>
          <input
            type="radio"
            name="age"
            style={{ marginRight: '4px' }}
            checked={sortBy === 'age'}
            onChange={handleChangeSortBy}
          />
          Age
        </label>
        <label style={{ marginRight: '16px' }}>
          <input
            type="radio"
            name="ipAddress"
            style={{ marginRight: '4px' }}
            checked={sortBy === 'ipAddress'}
            onChange={handleChangeSortBy}
          />
          IP Address
        </label>
      </fieldset>
      <fieldset>
        <legend>Sort direction</legend>
        <label style={{ marginRight: '16px' }}>
          <input
            type="radio"
            name="asc"
            style={{ marginRight: '4px' }}
            checked={sortDirection === 'asc'}
            onChange={handleChangeSortDirection}
          />
          Ascending
        </label>
        <label style={{ marginRight: '16px' }}>
          <input
            type="radio"
            name="desc"
            style={{ marginRight: '4px' }}
            checked={sortDirection === 'desc'}
            onChange={handleChangeSortDirection}
          />
          Descending
        </label>
      </fieldset>
      <Table.Provider>
        <Table.Table>
          <Table.Header
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSort={handleSort}
          >
            <Table.Row>
              <Table.HeadCell sortBy="name">
                Name <Table.SortIcon />
              </Table.HeadCell>
              <Table.HeadCell sortBy="email">
                Email <Table.SortIcon />
              </Table.HeadCell>
              <Table.HeadCell sortBy="age">
                Age <Table.SortIcon />
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
                  <Table.Cell>{user.age}</Table.Cell>
                  <Table.Cell>{user.ipAddress}</Table.Cell>
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table.Table>
      </Table.Provider>
    </>
  )
}

export const ControlledSortBy = () => (
  <Table.Provider>
    <Table.Table>
      <Table.Header sortBy="email">
        <Table.Row>
          <Table.HeadCell sortBy="name">
            Name <Table.SortIcon />
          </Table.HeadCell>
          <Table.HeadCell sortBy="email">
            Email <Table.SortIcon />
          </Table.HeadCell>
          <Table.HeadCell sortBy="age">
            Age <Table.SortIcon />
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
              <Table.Cell>{user.age}</Table.Cell>
              <Table.Cell>{user.ipAddress}</Table.Cell>
            </Table.Row>
          ))
        }
      </Table.Body>
    </Table.Table>
  </Table.Provider>
)
ControlledSortBy.story = { name: 'Controlled sortBy' }

export const ControlledSortDirection = () => (
  <Table.Provider>
    <Table.Table>
      <Table.Header sortDirection="asc">
        <Table.Row>
          <Table.HeadCell sortBy="name">
            Name <Table.SortIcon />
          </Table.HeadCell>
          <Table.HeadCell sortBy="email">
            Email <Table.SortIcon />
          </Table.HeadCell>
          <Table.HeadCell sortBy="age">
            Age <Table.SortIcon />
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
              <Table.Cell>{user.age}</Table.Cell>
              <Table.Cell>{user.ipAddress}</Table.Cell>
            </Table.Row>
          ))
        }
      </Table.Body>
    </Table.Table>
  </Table.Provider>
)
ControlledSortDirection.story = { name: 'Controlled sortDirection' }
