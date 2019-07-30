import React from 'react'
import { storiesOf } from '@storybook/react'
import BootstrapTable from 'react-bootstrap/Table'
import {
  OutlinedInput,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core'
import users from './MOCK_DATA.json'
import Table from './index'

storiesOf('Table', module)
  .add('default', () => (
    <Table.Table as={BootstrapTable} striped>
      <Table.Header>
        <Table.Row>
          <Table.Cell>Header 1</Table.Cell>
          <Table.Cell>Header 2</Table.Cell>
          <Table.Cell>Header 3</Table.Cell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Cell 1</Table.Cell>
          <Table.Cell>Cell 2</Table.Cell>
          <Table.Cell>Cell 3</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Cell 1</Table.Cell>
          <Table.Cell>Cell 2</Table.Cell>
          <Table.Cell>Cell 3</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Table>
  ))
  .add('sorting', () => (
    <Table.Provider data={users}>
      <Table.Table as={BootstrapTable} striped>
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
    </Table.Provider>
  ))
  .add('search', () => (
    <Table.Provider data={users}>
      <Table.Search />
      <Table.Table as={BootstrapTable} striped>
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
    </Table.Provider>
  ))
  .add('pagination', () => (
    <Table.Provider data={users} page={1} perPage={100}>
      <Table.Search />
      <Table.Pagination />
      <Table.Table as={BootstrapTable} striped>
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
        {({ page, totalPages }) => (
          <>
            <Table.PageButton value="first">{'<<'}</Table.PageButton>
            <Table.PageButton value="prev">{'<'}</Table.PageButton>
            {`${page} of ${totalPages}`}
            <Table.PageButton value="next">{'>'}</Table.PageButton>
            <Table.PageButton value="last">{'>>'}</Table.PageButton>
          </>
        )}
      </Table.Pagination>
    </Table.Provider>
  ))
  .add('custom pagination', () => (
    <Table.Provider data={users} page={1} perPage={100}>
      <Table.Search />
      <Table.Pagination>
        {({ page, totalPages }) => (
          <>
            <Table.PageButton value="first">{'<<'}</Table.PageButton>
            <Table.PageButton value="prev">{'<'}</Table.PageButton>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(value => (
              <Table.PageButton value={value}>
                {page === value ? <strong>{value}</strong> : value}
              </Table.PageButton>
            ))}
            <Table.PageButton value="next">{'>'}</Table.PageButton>
            <Table.PageButton value="last">{'>>'}</Table.PageButton>
          </>
        )}
      </Table.Pagination>
      <Table.Table as={BootstrapTable} striped>
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
        {({ page, totalPages }) => (
          <>
            <Table.PageButton value="first">{'<<'}</Table.PageButton>
            <Table.PageButton value="prev">{'<'}</Table.PageButton>
            {`${page} of ${totalPages}`}
            <Table.PageButton value="next">{'>'}</Table.PageButton>
            <Table.PageButton value="last">{'>>'}</Table.PageButton>
          </>
        )}
      </Table.Pagination>
    </Table.Provider>
  ))
  .add('selectable', () => <Table.Table />)
  .add('custom cell', () => (
    <Table.Provider data={users}>
      <Table.Table as={BootstrapTable} striped>
        <Table.Header>
          <Table.Row>
            <Table.Cell />
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
                  <img
                    src={user.avatar}
                    alt="User profile"
                    width="80"
                    height="80"
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
    </Table.Provider>
  ))
  .add('material-ui table', () => (
    <Table.Provider data={users}>
      <Table.Search as={OutlinedInput} />
      <Table.Table as={MuiTable}>
        <Table.Header as={TableHead}>
          <Table.Row as={TableRow}>
            <Table.Cell as={TableCell} sortBy="name">
              Name
            </Table.Cell>
            <Table.Cell as={TableCell} sortBy="email">
              Email
            </Table.Cell>
            <Table.Cell as={TableCell} sortBy="ipAddress">
              IP Address
            </Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body as={TableBody}>
          {users =>
            users.map(user => (
              <Table.Row key={user.id} as={TableRow}>
                <Table.Cell as={TableCell}>{user.name}</Table.Cell>
                <Table.Cell as={TableCell}>{user.email}</Table.Cell>
                <Table.Cell as={TableCell}>{user.ipAddress}</Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table.Table>
    </Table.Provider>
  ))
  .add('regular-ass table', () => (
    <BootstrapTable striped>
      <thead>
        <tr>
          <th>Header 1</th>
          <th>Header 2</th>
          <th>Header 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Cell 1</td>
          <td>Cell 2</td>
          <td>Cell 3</td>
        </tr>
        <tr>
          <td>Cell 1</td>
          <td>Cell 2</td>
          <td>Cell 3</td>
        </tr>
      </tbody>
    </BootstrapTable>
  ))
