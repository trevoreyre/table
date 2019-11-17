import React, { useState } from 'react'
import Table from '../../index'
import { useTableState, useTableDispatch } from '../../Context'
import users from '../users.json'

export default {
  title: 'Stories|Selectable',
}

export const Selectable = () => (
  <Table.Provider>
    <Table.Search placeholder="Search" aria-label="Search" />
    <Table.Container>
      <Table.Table>
        <Table.Header>
          <Table.Row>
            <Table.HeadCell />
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
        <Table.Body data={users} striped>
          {users =>
            users.map(user => (
              <Table.Row key={user.id}>
                <Table.Cell>
                  <Table.Checkbox value={user.id} disabled={user.disabled} />
                </Table.Cell>
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
)

export const SelectByRow = () => (
  <Table.Provider>
    <Table.Search placeholder="Search" aria-label="Search" />
    <Table.Container>
      <Table.Table>
        <Table.Header>
          <Table.Row>
            <Table.HeadCell />
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
        <Table.Body data={users} striped hover>
          {users =>
            users.map(user => (
              <Table.Row key={user.id} select={user.id}>
                <Table.Cell>
                  <Table.Checkbox value={user.id} disabled={user.disabled} />
                </Table.Cell>
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
)
SelectByRow.story = { name: 'Select by row' }

export const SelectAll = () => (
  <Table.Provider>
    <Table.Search placeholder="Search" aria-label="Search" />
    <Table.Container>
      <Table.Table>
        <Table.Header>
          <Table.Row>
            <Table.HeadCell>
              <Table.Checkbox type="selectAll" value="id" />
            </Table.HeadCell>
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
                <Table.Cell>
                  <Table.Checkbox value={user.id} disabled={user.disabled} />
                </Table.Cell>
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
)
SelectAll.story = { name: 'Select all' }

export const SelectPage = () => (
  <Table.Provider>
    <Table.Search placeholder="Search" aria-label="Search" />
    <Table.Container>
      <Table.Table>
        <Table.Header>
          <Table.Row>
            <Table.HeadCell>
              <Table.Checkbox value="id" />
            </Table.HeadCell>
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
                <Table.Cell>
                  <Table.Checkbox value={user.id} />
                </Table.Cell>
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
)
SelectPage.story = { name: 'Select page' }

const TableExample = () => {
  const [currentUsers, setCurrentUsers] = useState(users)
  const state = useTableState()
  const dispatch = useTableDispatch()

  const count = state.selected.length

  const handleDeleteClick = selected => () => {
    setCurrentUsers(currentUsers.filter(user => !selected.includes(user.id)))
    dispatch({ type: 'selectAll', checked: false })
  }

  return (
    <>
      <Table.Search placeholder="Search" aria-label="Search" />
      {!!count && (
        <>
          <span className="ml-m mr-s">
            Selected {count} user{count === 1 ? '' : 's'}
          </span>
          <Table.Button onClick={handleDeleteClick(state.selected)}>
            Delete
          </Table.Button>
        </>
      )}
      <Table.Container>
        <Table.Table>
          <Table.Header>
            <Table.Row>
              <Table.HeadCell>
                <Table.Checkbox value="id" />
              </Table.HeadCell>
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
          <Table.Body data={currentUsers}>
            {users =>
              users.map(user => (
                <Table.Row key={user.id}>
                  <Table.Cell>
                    <Table.Checkbox value={user.id} />
                  </Table.Cell>
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
    </>
  )
}

export const WithAction = () => (
  <Table.Provider>
    <TableExample />
  </Table.Provider>
)
WithAction.story = { name: 'With action' }
