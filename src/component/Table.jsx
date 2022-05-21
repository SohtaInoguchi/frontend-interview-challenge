import React, { useEffect } from 'react'
import axios from 'axios';
import allPersons from "../mocks/personsFixtures";


export default function Table(props) {
    const { persons } = props;
    const headerNames = ['ID', 'Title', 'Name', 'Email'];

    const getDetails = async (e) => {
        try {
            e.preventDefault();
            const selectedUserId = e.currentTarget.id;
            const response = await axios.get(`http://localhost:3000/persons/${selectedUserId}`)
            console.log(response.data);
        } catch (err) {
            console.error(`Error occurred: ${err}`);
        }
    }


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
            <tr onClick={(e) => getDetails(e)} id={person.id} className='table-rows'>
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
