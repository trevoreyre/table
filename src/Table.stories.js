import React from 'react'
import { storiesOf } from '@storybook/react'
import BootstrapTable from 'react-bootstrap/Table'
import {
  OutlinedInput,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core'
import users from './MOCK_DATA.json'
import T from './T'

storiesOf('Table', module)
  .add('default', () => (
    <T.Table as={BootstrapTable} striped>
      <T.Head>
        <T.R>
          <T.H>Header 1</T.H>
          <T.H>Header 2</T.H>
          <T.H>Header 3</T.H>
        </T.R>
      </T.Head>
      <T.Body>
        <T.R>
          <T.D>Cell 1</T.D>
          <T.D>Cell 2</T.D>
          <T.D>Cell 3</T.D>
        </T.R>
        <T.R>
          <T.D>Cell 1</T.D>
          <T.D>Cell 2</T.D>
          <T.D>Cell 3</T.D>
        </T.R>
      </T.Body>
    </T.Table>
  ))
  .add('sorting', () => (
    <T.Provider data={users}>
      <T.Table as={BootstrapTable} striped>
        <T.Head>
          <T.R>
            <T.H sortBy="name">
              Name <T.SortIcon />
            </T.H>
            <T.H sortBy="email">
              Email <T.SortIcon />
            </T.H>
            <T.H sortBy="ipAddress">
              IP Address <T.SortIcon />
            </T.H>
          </T.R>
        </T.Head>
        <T.Body>
          {users =>
            users.map(user => (
              <T.R key={user.id}>
                <T.D>{user.name}</T.D>
                <T.D>{user.email}</T.D>
                <T.D>{user.ipAddress}</T.D>
              </T.R>
            ))
          }
        </T.Body>
      </T.Table>
    </T.Provider>
  ))
  .add('search', () => (
    <T.Provider data={users}>
      <T.Search />
      <T.Table as={BootstrapTable} striped>
        <T.Head>
          <T.R>
            <T.H sortBy="name">
              Name <T.SortIcon />
            </T.H>
            <T.H sortBy="email">
              Email <T.SortIcon />
            </T.H>
            <T.H sortBy="ipAddress">
              IP Address <T.SortIcon />
            </T.H>
          </T.R>
        </T.Head>
        <T.Body>
          {users =>
            users.map(user => (
              <T.R key={user.id}>
                <T.D>{user.name}</T.D>
                <T.D>{user.email}</T.D>
                <T.D>{user.ipAddress}</T.D>
              </T.R>
            ))
          }
        </T.Body>
      </T.Table>
    </T.Provider>
  ))
  .add('pagination', () => (
    <T.Provider data={users} page={1} perPage={100}>
      <T.Search />
      <T.Pagination>
        {({ page, totalPages }) => (
          <>
            <T.PageButton type="first">{'<<'}</T.PageButton>
            <T.PageButton type="prev">{'<'}</T.PageButton>
            {`${page} of ${totalPages}`}
            <T.PageButton type="next">{'>'}</T.PageButton>
            <T.PageButton type="last">{'>>'}</T.PageButton>
          </>
        )}
      </T.Pagination>
      <T.Table as={BootstrapTable} striped>
        <T.Head>
          <T.R>
            <T.H sortBy="name">
              Name <T.SortIcon />
            </T.H>
            <T.H sortBy="email">
              Email <T.SortIcon />
            </T.H>
            <T.H sortBy="ipAddress">
              IP Address <T.SortIcon />
            </T.H>
          </T.R>
        </T.Head>
        <T.Body>
          {users =>
            users.map(user => (
              <T.R key={user.id}>
                <T.D>{user.name}</T.D>
                <T.D>{user.email}</T.D>
                <T.D>{user.ipAddress}</T.D>
              </T.R>
            ))
          }
        </T.Body>
      </T.Table>
      <T.Pagination>
        {({ page, totalPages }) => (
          <>
            <T.PageButton type="first">{'<<'}</T.PageButton>
            <T.PageButton type="prev">{'<'}</T.PageButton>
            {`${page} of ${totalPages}`}
            <T.PageButton type="next">{'>'}</T.PageButton>
            <T.PageButton type="last">{'>>'}</T.PageButton>
          </>
        )}
      </T.Pagination>
    </T.Provider>
  ))
  .add('selectable', () => <T.Table />)
  .add('custom cell', () => (
    <T.Provider data={users}>
      <T.Table as={BootstrapTable} striped>
        <T.Head>
          <T.R>
            <T.H />
            <T.H sortBy="name">
              Name <T.SortIcon />
            </T.H>
            <T.H sortBy="email">
              Email <T.SortIcon />
            </T.H>
            <T.H sortBy="ipAddress">
              IP Address <T.SortIcon />
            </T.H>
          </T.R>
        </T.Head>
        <T.Body>
          {users =>
            users.map(user => (
              <T.R key={user.id}>
                <T.D>
                  <img
                    src={user.avatar}
                    alt="User profile"
                    width="80"
                    height="80"
                  />
                </T.D>
                <T.D>{user.name}</T.D>
                <T.D>{user.email}</T.D>
                <T.D>{user.ipAddress}</T.D>
              </T.R>
            ))
          }
        </T.Body>
      </T.Table>
    </T.Provider>
  ))
  .add('material-ui table', () => (
    <T.Provider data={users}>
      <T.Search as={OutlinedInput} />
      <T.Table as={Table}>
        <T.Head as={TableHead}>
          <T.R as={TableRow}>
            <T.H as={TableCell} sortBy="name">
              Name
            </T.H>
            <T.H as={TableCell} sortBy="email">
              Email
            </T.H>
            <T.H as={TableCell} sortBy="ipAddress">
              IP Address
            </T.H>
          </T.R>
        </T.Head>
        <T.Body as={TableBody}>
          {users =>
            users.map(user => (
              <T.R key={user.id} as={TableRow}>
                <T.D as={TableCell}>{user.name}</T.D>
                <T.D as={TableCell}>{user.email}</T.D>
                <T.D as={TableCell}>{user.ipAddress}</T.D>
              </T.R>
            ))
          }
        </T.Body>
      </T.Table>
    </T.Provider>
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
