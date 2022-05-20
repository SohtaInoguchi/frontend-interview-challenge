import React from 'react'

export default function Table(props) {
    const { persons } = props;
  return (
    <>
    <h1>Table</h1>
    <table>
        <thead>
            <tr>
                <th>Table header</th>
            </tr>
        </thead>
        <tbody>
            {persons.map(person => 
            <tr id={person.id}>
                <td>{person.id}</td>
                <td>{person.title}</td>
                <td>{person.firstName} + {person.lastName}</td>
                <td>{person.email}</td>
            </tr>)}
        </tbody>
    </table>
    </>
  )
}
