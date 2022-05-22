import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DetailModal from './DetailModal';

export default function Table(props) {
    const { persons, setPersons } = props;
    const headerNames = ['ID', 'Title', 'Name', 'Email'];
    const [selectedPerson, setSelectedPerson] = useState({});
    const [isSelected, setIsSelected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const getDetails = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            const selectedUserId = e.currentTarget.id;
            const response = await axios.get(`http://localhost:3000/persons/${selectedUserId}`)
            setSelectedPerson(response.data);
            setIsSelected(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);   
        } catch (err) {
            setIsLoading(false);
            setErrorMessage(err.message);
            console.error(`Error occurred: ${err}`);
        }
    }

  return (
    <>
    <table id='persons-table'>
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
    {errorMessage && <div>{errorMessage}</div>}
    {isLoading && <div>Loading data...</div>}
    {!isLoading && isSelected &&
    <DetailModal 
        selectedPerson={selectedPerson} 
        persons={persons} 
        setPersons={setPersons}
        setIsSelected={setIsSelected}
        isSelected={isSelected}
        isLoading={isLoading}
        />}
    </>
  )
}
