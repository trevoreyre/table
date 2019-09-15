import React from 'react'
import Table from '../../index'
import placeholder from '../placeholder.png'
import usersData from '../users.json'

export default {
  title: 'Stories|Basic',
}

const users = usersData.slice(0, 6)

export const Simple = () => (
  <Table.Container>
    <Table.Container>
      <Table.Table>
        <Table.Header>
          <Table.Row>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Age</Table.HeadCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Torey Allsep</Table.Cell>
            <Table.Cell>tallsep0@ask.com</Table.Cell>
            <Table.Cell>62</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Genni Fullalove</Table.Cell>
            <Table.Cell>gfullalove1@histats.com</Table.Cell>
            <Table.Cell>78</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Arnoldo Goodhand</Table.Cell>
            <Table.Cell>agoodhand2@seattletimes.com</Table.Cell>
            <Table.Cell>31</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Jarret Renoden</Table.Cell>
            <Table.Cell>jrenoden3@hatena.ne.jp</Table.Cell>
            <Table.Cell>20</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Renado McTrustey</Table.Cell>
            <Table.Cell>rmctrustey4@tinypic.com</Table.Cell>
            <Table.Cell>57</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Ali Kemmis</Table.Cell>
            <Table.Cell>akemmis9@privacy.gov.au</Table.Cell>
            <Table.Cell>88</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Table>
    </Table.Container>
  </Table.Container>
)

export const Striped = () => (
  <Table.Container>
    <Table.Container>
      <Table.Table>
        <Table.Header>
          <Table.Row>
            <Table.HeadCell colspan="2">Info</Table.HeadCell>
            <Table.HeadCell colspan="2">Demographics</Table.HeadCell>
          </Table.Row>
          <Table.Row>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Age</Table.HeadCell>
            <Table.HeadCell>Gender</Table.HeadCell>
          </Table.Row>
        </Table.Header>
        <Table.Body striped>
          <Table.Row>
            <Table.Cell>Torey Allsep</Table.Cell>
            <Table.Cell>tallsep0@ask.com</Table.Cell>
            <Table.Cell>62</Table.Cell>
            <Table.Cell>Female</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Genni Fullalove</Table.Cell>
            <Table.Cell>gfullalove1@histats.com</Table.Cell>
            <Table.Cell>78</Table.Cell>
            <Table.Cell>Female</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Arnoldo Goodhand</Table.Cell>
            <Table.Cell>agoodhand2@seattletimes.com</Table.Cell>
            <Table.Cell>31</Table.Cell>
            <Table.Cell>Male</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Jarret Renoden</Table.Cell>
            <Table.Cell>jrenoden3@hatena.ne.jp</Table.Cell>
            <Table.Cell>20</Table.Cell>
            <Table.Cell>Male</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Renado McTrustey</Table.Cell>
            <Table.Cell>rmctrustey4@tinypic.com</Table.Cell>
            <Table.Cell>57</Table.Cell>
            <Table.Cell>Male</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Ali Kemmis</Table.Cell>
            <Table.Cell>akemmis9@privacy.gov.au</Table.Cell>
            <Table.Cell>88</Table.Cell>
            <Table.Cell>Female</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Table>
    </Table.Container>
  </Table.Container>
)

export const Hover = () => (
  <Table.Container>
    <Table.Container>
      <Table.Table>
        <Table.Header>
          <Table.Row>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Age</Table.HeadCell>
          </Table.Row>
        </Table.Header>
        <Table.Body striped hover>
          <Table.Row>
            <Table.Cell>Torey Allsep</Table.Cell>
            <Table.Cell>tallsep0@ask.com</Table.Cell>
            <Table.Cell>62</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Genni Fullalove</Table.Cell>
            <Table.Cell>gfullalove1@histats.com</Table.Cell>
            <Table.Cell>78</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Arnoldo Goodhand</Table.Cell>
            <Table.Cell>agoodhand2@seattletimes.com</Table.Cell>
            <Table.Cell>31</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Jarret Renoden</Table.Cell>
            <Table.Cell>jrenoden3@hatena.ne.jp</Table.Cell>
            <Table.Cell>20</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Renado McTrustey</Table.Cell>
            <Table.Cell>rmctrustey4@tinypic.com</Table.Cell>
            <Table.Cell>57</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Ali Kemmis</Table.Cell>
            <Table.Cell>akemmis9@privacy.gov.au</Table.Cell>
            <Table.Cell>88</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Table>
    </Table.Container>
  </Table.Container>
)

export const CustomCells = () => {
  const Avatar = ({ src }) => (
    <img src={src || placeholder} alt="User avatar" className="avatar" />
  )

  const StatusTag = ({ status = 'neutral' } = {}) => {
    const label = {
      friendly: 'Friendly. Probably.',
      kill: 'KILL ALL HUMANS',
      neutral: 'Unknown',
    }[status]

    return <span className={`status ${status}`}>{label}</span>
  }

  return (
    <Table.Provider>
      <Table.Container>
        <Table.Table>
          <Table.Header>
            <Table.Row>
              <Table.HeadCell />
              <Table.HeadCell>Robot</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {users.map(user => (
              <Table.Row>
                <Table.Cell className="avatar-cell">
                  <Avatar src={user.avatar} />
                </Table.Cell>
                <Table.Cell>
                  <div className="name">{user.name}</div>
                  <div className="email">{user.email}</div>
                </Table.Cell>
                <Table.Cell>
                  <StatusTag status={user.status} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Table>
      </Table.Container>
    </Table.Provider>
  )
}

CustomCells.story = { name: 'Custom cells' }
