import React from 'react'
import Table from '../index'

export default {
  title: 'Basic|Simple',
}

export const Simple = () => (
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
)

export const Striped = () => (
  <Table.Table>
    <Table.Header>
      <Table.Row>
        <Table.HeadCell>Name</Table.HeadCell>
        <Table.HeadCell>Email</Table.HeadCell>
        <Table.HeadCell>Age</Table.HeadCell>
      </Table.Row>
    </Table.Header>
    <Table.Body data-table-striped>
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
)

export const Hover = () => (
  <Table.Table>
    <Table.Header>
      <Table.Row>
        <Table.HeadCell>Name</Table.HeadCell>
        <Table.HeadCell>Email</Table.HeadCell>
        <Table.HeadCell>Age</Table.HeadCell>
      </Table.Row>
    </Table.Header>
    <Table.Body data-table-hover>
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
)
