import React, { useState } from 'react'
import { Dialog } from '@material-ui/core'
import Table from '../index'
import usersData from './users.json'

export default {
  title: 'Basic|Actions',
}

export const Inline = () => {
  const [users, setUsers] = useState(usersData)

  const handleClickDelete = user => () => {
    if (window.confirm(`Do you want to delete ${user.name || user.id}?`)) {
      setUsers(users.filter(u => u.id !== user.id))
    }
  }

  return (
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
}

export const Global = () => {
  const [users, setUsers] = useState(usersData)
  const [open, setOpen] = useState(false)

  const handleSubmit = event => {
    event.preventDefault()
    const data = new FormData(event.target)
    const newUser = {
      name: data.get('name'),
      email: data.get('email'),
      ipAddress: data.get('ipAddress'),
    }
    setUsers(users.concat(newUser))
    setOpen(false)
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <form onSubmit={handleSubmit} style={{ padding: '32px' }}>
          <h3>New user</h3>
          <label style={{ width: '100%' }}>
            Name <input name="name" style={{ width: '100%' }} />
          </label>
          <label style={{ width: '100%' }}>
            Email <input name="email" style={{ width: '100%' }} />
          </label>
          <label style={{ width: '100%' }}>
            IP Address <input name="ipAddress" style={{ width: '100%' }} />
          </label>
          <button type="submit" style={{ marginTop: '16px' }}>
            Save
          </button>
        </form>
      </Dialog>

      <Table.Provider data={users}>
        <Table.Search />
        <button onClick={() => setOpen(true)} style={{ marginLeft: '24px' }}>
          Add user
        </button>
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
