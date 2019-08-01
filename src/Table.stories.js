import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  Pagination as BSPagination,
  Table as BSTable,
  Form as BSForm,
} from 'react-bootstrap'
import {
  IconButton as MuiIconButton,
  OutlinedInput as MuiInput,
  Select as MuiSelect,
  Table as MuiTable,
  TableBody as MuiTableBody,
  TableCell as MuiTableCell,
  TableHead as MuiTableHead,
  TableRow as MuiTableRow,
} from '@material-ui/core'
import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
} from '@material-ui/icons'
import users from './MOCK_DATA.json'
import Table from './index'

storiesOf('Table', module)
  .add('default', () => (
    <Table.Table>
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
    </Table.Provider>
  ))
  .add('search', () => (
    <Table.Provider data={users}>
      <Table.Search placeholder="Search" />
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
    </Table.Provider>
  ))
  .add('pagination', () => (
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
      <Table.Pagination />
    </Table.Provider>
  ))
  .add('custom pagination', () => (
    <Table.Provider data={users} page={1} perPage={10}>
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
        {({ page, totalPages }) => (
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
  ))
  .add('selectable', () => <Table.Table />)
  .add('custom cell', () => (
    <Table.Provider data={users}>
      <Table.Table>
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
    <Table.Provider data={users} perPage={10}>
      <Table.Search as={MuiInput} placeholder="Search" />
      <Table.Table as={MuiTable}>
        <Table.Header as={MuiTableHead}>
          <Table.Row as={MuiTableRow}>
            <Table.Cell as={MuiTableCell} sortBy="name">
              Name
            </Table.Cell>
            <Table.Cell as={MuiTableCell} sortBy="email">
              Email
            </Table.Cell>
            <Table.Cell as={MuiTableCell} sortBy="ipAddress">
              IP Address
            </Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body as={MuiTableBody}>
          {users =>
            users.map(user => (
              <Table.Row key={user.id} as={MuiTableRow}>
                <Table.Cell as={MuiTableCell}>{user.name}</Table.Cell>
                <Table.Cell as={MuiTableCell}>{user.email}</Table.Cell>
                <Table.Cell as={MuiTableCell}>{user.ipAddress}</Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table.Table>
      <Table.Pagination style={{ marginTop: '24px' }}>
        {({ page, perPage, totalPages }) => (
          <>
            <span style={{ marginRight: '16px', fontSize: '14px' }}>
              Rows per page:
            </span>
            <Table.PerPage
              as={MuiSelect}
              native
              disableUnderline
              style={{ marginRight: '16px ', fontSize: '14px' }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </Table.PerPage>
            <span
              style={{
                display: 'inline-block',
                width: '120px',
                fontSize: '14px',
              }}
            >
              {(page - 1) * perPage + 1}-{page * perPage} of{' '}
              {totalPages * perPage}
            </span>
            <Table.PageButton as={MuiIconButton} value="first">
              <FirstPage />
            </Table.PageButton>
            <Table.PageButton as={MuiIconButton} value="prev">
              <KeyboardArrowLeft />
            </Table.PageButton>
            <Table.PageButton as={MuiIconButton} value="next">
              <KeyboardArrowRight />
            </Table.PageButton>
            <Table.PageButton as={MuiIconButton} value="last">
              <LastPage />
            </Table.PageButton>
          </>
        )}
      </Table.Pagination>
    </Table.Provider>
  ))
  .add('Bootstrap table', () => (
    <Table.Provider data={users} perPage={10}>
      <Table.Search
        as={BSForm.Control}
        style={{ maxWidth: '300px', marginBottom: '24px' }}
        placeholder="Search"
      />
      <Table.Table as={BSTable} striped>
        <Table.Header>
          <Table.Row>
            <Table.Cell sortBy="name">Name</Table.Cell>
            <Table.Cell sortBy="email">Email</Table.Cell>
            <Table.Cell sortBy="ipAddress">IP Address</Table.Cell>
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
      <Table.Pagination as={BSPagination} style={{ marginTop: '24px' }}>
        {({ page, pageList }) => (
          <>
            <Table.PageButton as={BSPagination.Prev} value="prev" />
            {pageList.map((value, i) =>
              value === '...' ? (
                <BSPagination.Ellipsis key={value + i} />
              ) : (
                <Table.PageButton
                  key={value}
                  as={BSPagination.Item}
                  value={value}
                  active={value === page}
                >
                  {value}
                </Table.PageButton>
              )
            )}
            <Table.PageButton as={BSPagination.Next} value="next" />
          </>
        )}
      </Table.Pagination>
    </Table.Provider>
  ))
  .add('regular-ass table', () => (
    <table>
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
    </table>
  ))
