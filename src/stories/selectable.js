import React, { useState } from 'react'
import Table from '../index'
import { useTableState, useTableDispatch } from '../Context'
import users from './users.json'

export default {
  title: 'Basic|Selectable',
}

export const Selectable = () => (
  <Table.Provider>
    <Table.Search />
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
    <Table.Pagination perPage={10} />
  </Table.Provider>
)

export const SelectByRow = () => (
  <Table.Provider>
    <Table.Search />
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
      <Table.Body data={users} data-table-hover>
        {users =>
          users.map(user => (
            <Table.Row key={user.id} select={user.id}>
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
    <Table.Pagination perPage={10} />
  </Table.Provider>
)
SelectByRow.story = { name: 'Select by row' }

export const SelectAll = () => (
  <Table.Provider>
    <Table.Search />
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
    <Table.Pagination perPage={10} />
  </Table.Provider>
)
SelectAll.story = { name: 'Select all' }

export const SelectPage = () => (
  <Table.Provider>
    <Table.Search />
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
    <Table.Pagination perPage={10} />
  </Table.Provider>
)
SelectPage.story = { name: 'Select page' }

const TableExample = () => {
  const [currentUsers, setCurrentUsers] = useState(users)
  const state = useTableState()
  const dispatch = useTableDispatch()

  const handleDeleteClick = selected => () => {
    setCurrentUsers(currentUsers.filter(user => !selected.includes(user.id)))
    dispatch({ type: 'selectAll', checked: false })
  }

  return (
    <>
      <Table.Search />
      {!!state.selected.length && (
        <>
          <p style={{ display: 'inline', margin: '0 8px 0 24px' }}>
            {state.selected.length} selected
          </p>
          <button onClick={handleDeleteClick(state.selected)}>Delete</button>
        </>
      )}
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
