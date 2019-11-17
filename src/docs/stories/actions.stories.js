import React, { useState } from 'react'
import { Dialog } from '@material-ui/core'
import Table from '../../index'
import usersData from '../users.json'

export default {
  title: 'Stories|Actions',
}

export const Inline = () => {
  const [users, setUsers] = useState(usersData)

  const handleClickDelete = user => () => {
    if (window.confirm(`Do you want to delete ${user.name || user.id}?`)) {
      setUsers(users.filter(u => u.id !== user.id))
    }
  }

  return (
    <Table.Provider>
      <Table.Search placeholder="Search" aria-label="Search" />
      <Table.Container>
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
              <Table.HeadCell />
            </Table.Row>
          </Table.Header>
          <Table.Body data={users} striped hover>
            {users =>
              users.map(user => (
                <Table.Row key={user.id} className="inline-actions">
                  <Table.Cell>
                    <button
                      className="link"
                      onClick={() => alert(`Clicked on ${user.name}`)}
                    >
                      {user.name}
                    </button>
                  </Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.ipAddress}</Table.Cell>
                  <Table.Cell>
                    <div className="toolbar">
                      <Table.Button
                        onClick={() => alert(`Invited ${user.name}`)}
                      >
                        Invite
                      </Table.Button>
                      <span className="ml-s mr-s">|</span>
                      <Table.Button onClick={handleClickDelete(user)}>
                        Delete
                      </Table.Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table.Table>
      </Table.Container>
      <Table.Pagination perPage={10} />
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
      id: Date.now(),
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
          <Table.Button type="submit" style={{ marginTop: '16px' }}>
            Save
          </Table.Button>
        </form>
      </Dialog>

      <Table.Provider>
        <div className="toolbar">
          <Table.Search
            placeholder="Search"
            aria-label="Search"
            className="mr-m"
          />
          <Table.Button onClick={() => setOpen(true)}>Add User</Table.Button>
        </div>
        <Table.Container>
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
        </Table.Container>
        <Table.Pagination perPage={10} />
      </Table.Provider>
    </>
  )
}
