import React from 'react'
import { State, Store } from '@sambego/storybook-state'
import Table from '../index'
import users from './users.json'

export default {
  title: 'Basic|Actions',
}

console.log(__dirname)

const store = new Store({
  users,
})

export const inline = () => (
  <State store={store}>
    {({ users: stateUsers }) => {
      const handleClickDelete = user => event => {
        if (window.confirm(`Do you want to delete ${user.name || user.id}?`)) {
          store.set({ users: stateUsers.filter(u => u.id !== user.id) })
        }
      }
      return (
        <Table.Provider data={stateUsers} perPage={10}>
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
                <Table.Cell />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {users =>
                users.map(user => (
                  <Table.Row key={user.id}>
                    <Table.Cell>{user.name}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.ipAddress}</Table.Cell>
                    <Table.Cell>
                      <button onClick={handleClickDelete(user)}>Delete</button>
                    </Table.Cell>
                  </Table.Row>
                ))
              }
            </Table.Body>
          </Table.Table>
          <Table.Pagination />
        </Table.Provider>
      )
    }}
  </State>
)
