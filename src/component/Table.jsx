import React, { useEffect } from 'react'

export default function Table(props) {
    const { persons } = props;
    const headerNames = ['ID', 'Title', 'Name', 'Email'];

  return (
    <>
    <table>
        <thead>
            <tr>
                {headerNames.map((headerName, i) => <th key={i}>{headerName}</th>)}
            </tr>
        </thead>
        <tbody>
            {persons.map(person => 
            <tr id={person.id}>
                <td>{person.id}</td>
                <td>{person.title}</td>
                <td>{`${person.firstName} ${person.lastName}`}</td>
                <td>{person.email}</td>
            </tr>)}
        </tbody>
    </table>
    </>
  )
}
