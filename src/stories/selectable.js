import React, { useState } from 'react'
import Table from '../index'
import usersData from './users.json'

export default {
  title: 'Basic|Selectable',
}

export const selectable = () => {
  const [users, setUsers] = useState(usersData)

  const handleDeleteClick = (selected, dispatch) => () => {
    setUsers(users.filter(user => !selected.includes(user.id)))
    dispatch({ type: 'selectClear' })
  }

  return (
    <Table.Provider data={users} perPage={10}>
      {({ selected }, dispatch) => (
        <>
          <Table.Search />
          {!!selected.length && (
            <>
              <p style={{ display: 'inline', marginLeft: '24px' }}>
                {selected.length} selected
              </p>
              <button onClick={() => dispatch({ type: 'selectClear' })}>
                Clear
              </button>
              <button onClick={handleDeleteClick(selected, dispatch)}>
                Delete
              </button>
            </>
          )}
          <Table.Table>
            <Table.Header>
              <Table.Row>
                <Table.Cell>
                  <Table.Checkbox value="id" />
                </Table.Cell>
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
                    <Table.Cell>
                      <Table.Checkbox
                        value={user.id}
                        data={user}
                        selector="id"
                      />
                    </Table.Cell>
                    <Table.Cell>{user.name}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.ipAddress}</Table.Cell>
                  </Table.Row>
                ))
              }
            </Table.Body>
          </Table.Table>
          <Table.Pagination />
        </>
      )}
    </Table.Provider>
  )
}
